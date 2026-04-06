'use client'

import AnimeCard from '@/components/AnimeCard'
import { animeList } from '@/data/anime_data_source'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
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
                            <AnimeCard key={anime.id} anime={anime} />
                        ))}
                    </div>
                </section>

                {/* 3. Featured Characters Section */}
                <section className="pb-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className={styles.sectionTitle}>Featured Characters</h2>
                        <Link href="/characters" className={styles.viewAll}>View All</Link>
                    </div>

                    <div className="row g-4">
                        {animeList.slice(0, 3).map(anime => {
                            const character = anime.characters[0];
                            if (!character) return null;

                            return (
                                <div key={anime.id} className="col-12 col-md-4">
                                    <Link
                                        href={`/anime/${anime.id}/characters/${character.id}`}
                                        className={styles.characterLink}
                                    >
                                        <div className={styles.characterCard}>
                                            <div className={styles.avatarWrapper}>
                                                <Image
                                                    src={character.image}
                                                    alt={character.name}
                                                    fill
                                                    className={styles.avatarImg}
                                                />
                                            </div>
                                            <div className={styles.charDetails}>
                                                <h5 className={styles.charName}>{character.name}</h5>
                                                <p className={styles.charDesc}>{character.description}</p>
                                                <span className={styles.animeOrigin}>{anime.title}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
        </div>
    )
}