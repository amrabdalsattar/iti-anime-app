'use client'

import AnimeCard from '@/components/AnimeCard'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getAnimeList, getTopCharacters } from '@/lib/api'
import styles from '../styles/Home.module.css'

function FeaturedCharacters({ animeId }) {
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const data = await getTopCharacters()
                setCharacters(data.data.slice(0, 3))
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (animeId) {
            fetchCharacters()
        }
    }, [animeId])

    if (loading) {
        return <div className="text-center">Loading characters...</div>
    }

    if (error) {
        return <div className="text-center text-muted">Unable to load characters</div>
    }

    return characters.map((char) => (
        <div key={char._id || char.characterId} className="col-12 col-md-4">
            <Link
                href={`/characters/${char._id || char.characterId}`}
                className={styles.characterLink}
            >
                <div className={styles.characterCard}>
                    <div className={styles.avatarWrapper}>
                        <Image
                            src={char.image || 'https://via.placeholder.com/150'}
                            alt={char.name}
                            fill
                            className={styles.avatarImg}
                        />
                    </div>
                    <div className={styles.charDetails}>
                        <h5 className={styles.charName}>{char.name}</h5>
                        <p className={styles.charDesc}>{char.kanjiName || 'Main Character'}</p>
                        <span className={styles.animeOrigin}>From Top Anime</span>
                    </div>
                </div>
            </Link>
        </div>
    ))
}

export default function Home() {
    const [animeList, setAnimeList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTopAnime = async () => {
            try {
                const data = await getAnimeList({ sort: '-rate', limit: 3 })
                setAnimeList(data.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchTopAnime()
    }, [])

    if (loading) {
        return (
            <div className={styles.homeWrapper}>
                <div className="container text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading popular anime...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className={styles.homeWrapper}>
                <div className="container text-center py-5">
                    <div className="alert alert-danger" role="alert">
                        <h4 className="alert-heading">Oops!</h4>
                        <p>{error}</p>
                        <button className="btn btn-outline-primary" onClick={() => window.location.reload()}>
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.homeWrapper}>
            {/* 1. Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroGlow}></div>
                <div className="container text-center position-relative">
                    <span className={styles.heroSub}>Your Ultimate Anime Destination</span>
                    <h1 className={styles.heroTitle}>Welcome to Otaku</h1>
                    <p className={styles.heroLead}>Discover your favorite anime series, hidden gems, and iconic characters.</p>

                    <Link href="/anime" className={styles.heroBtn}>
                        Explore Library
                    </Link>
                </div>
            </section>

            <div className="container">
                {/* 2. Popular Anime Section */}
                <section className="mb-5 pb-3">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className={styles.sectionTitle}>Popular Anime</h2>
                        <Link href="/anime" className={styles.viewAll}>View All</Link>
                    </div>

                    <div className="row g-4">
                        {animeList.slice(0, 3).map(anime => (
                            <AnimeCard key={anime._id} anime={anime} />
                        ))}
                    </div>
                </section>

                {/* 3. Featured Characters Section */}
                <section className="pb-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className={styles.sectionTitle}>Featured Characters</h2>
                        <Link href="/anime" className={styles.viewAll}>View All</Link>
                    </div>

                    <div className="row g-4">
                        {animeList.length > 0 && (
                            <FeaturedCharacters animeId={animeList[0]._id} />
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}