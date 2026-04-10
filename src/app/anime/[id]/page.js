'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { getAnimeById, getAnimeCharacters, deleteAnime } from '@/lib/api'
import { isAdmin } from '@/lib/auth'
import AnimeModal from '@/components/AnimeModal'
import CharacterModal from '@/components/CharacterModal'
import styles from '../../../styles/AnimeDetails.module.css'

export default function AnimeDetails() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;

    const [anime, setAnime] = useState(null)
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isUserAdmin, setIsUserAdmin] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showCharModal, setShowCharModal] = useState(false)

    const fetchData = useCallback(async () => {
        try {
            // Fetch anime details
            const animeData = await getAnimeById(id)
            setAnime(animeData.data)

            // Fetch characters
            const charactersData = await getAnimeCharacters(id)
            setCharacters(charactersData.data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [id])

    useEffect(() => {
        setIsUserAdmin(isAdmin())
        if (id) {
            fetchData()
        }
    }, [id, fetchData])

    const handleDelete = async () => {
        if (confirm(`Are you sure you want to delete ${anime.name}?`)) {
            try {
                await deleteAnime(id)
                router.push('/anime')
            } catch (err) {
                alert(err.message)
            }
        }
    }

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    if (error || !anime) {
        return (
            <div className="container py-5 text-center">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Anime Not Found</h4>
                    <p>{error || 'The requested anime could not be found.'}</p>
                    <Link href="/anime" className="btn btn-outline-secondary mt-3">Back to Library</Link>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.detailsWrapper}>
            {/* 1. Immersive Hero Banner */}
            <div className={styles.heroBanner}>
                <Image
                    src={anime.image || 'https://via.placeholder.com/1200x400'}
                    alt={anime.name}
                    fill
                    className={styles.bannerImg}
                    priority
                />
                <div className={styles.bannerOverlay}></div>

                {isUserAdmin && (
                    <div className="position-absolute" style={{ top: '20px', right: '20px', zIndex: 10 }}>
                        <button className="btn btn-light rounded-circle p-2 mx-1 shadow" onClick={() => setShowEditModal(true)} title="Edit Anime">✏️</button>
                        <button className="btn btn-light rounded-circle p-2 mx-1 shadow text-danger" onClick={handleDelete} title="Delete Anime">🗑️</button>
                    </div>
                )}

                <div className={styles.heroContent}>
                    <div className="container">
                        <span className={styles.yearTag}>{anime.year || 'N/A'}</span>
                        <h1 className={styles.mainTitle}>{anime.name}</h1>
                        <div className={styles.metaRow}>
                            <span className={styles.badge}>{(anime.classifications || []).join(', ')}</span>
                            <span className={styles.rating}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="var(--accent)" stroke="var(--accent)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                {anime.rate || 0} / 10
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Content Section */}
            <div className="container py-5">
                <div className="row g-5">
                    {/* Left Column: Synopses */}
                    <div className="col-lg-8">
                        <section className="mb-5">
                            <h4 className={styles.sectionHeading}>Synopsis</h4>
                            <p className={styles.description}>{anime.synopsis}</p>
                        </section>

                        {/* Characters Grid */}
                        <section>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className={styles.sectionHeading} style={{ marginBottom: 0 }}>Characters</h4>
                                {isUserAdmin && (
                                    <button className="btn text-white px-3 py-1 rounded-3" style={{ background: 'var(--accent)', fontSize: '0.9rem' }} onClick={() => setShowCharModal(true)}>
                                        + Add Character
                                    </button>
                                )}
                            </div>
                            <div className="row g-3">
                                {characters.slice(0, 12).map((char) => (
                                    <div key={char.characterId} className="col-6 col-sm-4 col-md-3">
                                        <Link
                                            href={`/characters/${char.characterId}`}
                                            className={styles.charLink}
                                        >
                                            <div className={styles.charAvatarWrapper}>
                                                <Image
                                                    src={char.image || 'https://via.placeholder.com/150'}
                                                    alt={char.name}
                                                    fill
                                                    className={styles.charAvatar}
                                                />
                                            </div>
                                            <span className={styles.charName}>{char.name}</span>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Quick Info Sidebar */}
                    <div className="col-lg-4">
                        <div className={styles.sidebarCard}>
                            <h5 className="mb-3 font-weight-bold">Information</h5>
                            <div className={styles.infoRow}>
                                <span>Type</span>
                                <strong>{anime.type || 'series'}</strong>
                            </div>
                            <div className={styles.infoRow}>
                                <span>Premiered</span>
                                <strong>{anime.year || 'N/A'}</strong>
                            </div>
                            <div className={styles.infoRow}>
                                <span>Studio</span>
                                <strong>{anime.studio || 'N/A'}</strong>
                            </div>
                            <div className={styles.infoRow}>
                                <span>Episodes</span>
                                <strong>{anime.episodes || 'Unknown'}</strong>
                            </div>
                            <div className={styles.infoRow}>
                                <span>Status</span>
                                <strong>{anime.status || 'ongoing'}</strong>
                            </div>
                            <div className={styles.infoRow}>
                                <span>Rating</span>
                                <strong>{anime.rating || 'N/A'}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isUserAdmin && (
                <>
                    <AnimeModal 
                        show={showEditModal} 
                        onClose={() => setShowEditModal(false)}
                        onSuccess={fetchData}
                        initialData={anime}
                    />
                    <CharacterModal
                        show={showCharModal}
                        onClose={() => setShowCharModal(false)}
                        onSuccess={fetchData}
                        animeId={id}
                    />
                </>
            )}
        </div>
    )
}