'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getCharacterById } from '@/lib/api'
import styles from '../../../styles/CharacterDetails.module.css'

export default function CharacterDetails() {
    const { charId } = useParams()

    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!charId) return

        const fetchCharacter = async () => {
            try {
                const response = await getCharacterById(charId)
                // Accessing data based on your API structure (data.data)
                setCharacter(response?.data || null)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCharacter()
    }, [charId])

    if (loading) return <LoadingSpinner />

    if (error || !character) {
        return <ErrorState message={error} />
    }

    return (
        <main className={styles.detailsWrapper}>
            <div className="container py-5">
                {/* Back Link with subtle hover interaction */}
                <Link href="/anime" className={styles.backLink}>
                    <span>←</span> Back to Library
                </Link>

                <div className="row g-5">
                    {/* Left Column: Poster Image */}
                    <div className="col-lg-4">
                        <div className={styles.posterContainer}>
                            <div className={styles.posterWrapper}>
                                <Image
                                    src={character.image || '/placeholder-character.png'}
                                    alt={character.name || "Character Poster"}
                                    fill
                                    className={styles.posterImg}
                                    priority
                                    sizes="(max-width: 992px) 100vw, 33vw"
                                />
                                <div className={styles.glowEffect} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Character Details */}
                    <div className="col-lg-8">
                        <header className={styles.contentBlock}>
                            {/* This is the badge we are styling */}
                            <span className={styles.originTag}>Character Profile</span>

                            <h1 className={styles.charName}>
                                {character.name || character.charName}
                            </h1>
                            {character.kanjiName && (
                                <p className={styles.kanjiName}>{character.kanjiName}</p>
                            )}
                        </header>

                        <div className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <span className={styles.statLabel}>Favorites</span>
                                <strong className={styles.statValue}>
                                    {character.favouritesNumber?.toLocaleString() || 0}
                                </strong>
                            </div>
                            {character.animeName && (
                                <div className={styles.statCard}>
                                    <span className={styles.statLabel}>Anime Origin</span>
                                    <div className={styles.statValue}>
                                        {character.animeId ? (
                                            <Link
                                                href={`/anime/${character.animeId}`}
                                                className={styles.originLink}
                                            >
                                                {character.animeName}
                                                <span className={styles.arrowIcon}>→</span>
                                            </Link>
                                        ) : (
                                            character.animeName
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className={styles.glassDivider} />

                        <section className={styles.contentBlock}>
                            <h2 className={styles.sectionTitle}>Biography</h2>
                            <div className={styles.biography}>
                                {character.biography || (
                                    <span className="text-secondary opacity-50">No biography available.</span>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    )
}

function LoadingSpinner() {
    return (
        <div className="container py-5 text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

function ErrorState({ message }) {
    return (
        <div className="container py-5 text-center">
            <div className="alert border-0 bg-danger-subtle text-danger p-5 rounded-4">
                <h4 className="fw-bold">Character Not Found</h4>
                <p>{message || 'The requested character could not be found.'}</p>
                <Link href="/anime" className="btn btn-outline-danger px-4 mt-3">
                    Back to Library
                </Link>
            </div>
        </div>
    )
}