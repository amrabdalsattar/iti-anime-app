'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getCharacterById } from '@/lib/api'
import styles from '../../../styles/CharacterDetails.module.css'

export default function CharacterDetails() {
    const params = useParams()
    const id = params.charId

    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const data = await getCharacterById(id)
                setCharacter(data.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        
        if (id) {
            fetchCharacter()
        }
    }, [id])

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    if (error || !character) {
        return (
            <div className="container py-5 text-center">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Character Not Found</h4>
                    <p>{error || 'The requested character could not be found.'}</p>
                    <Link href="/anime" className="btn btn-outline-secondary mt-3">Back to Library</Link>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.detailsWrapper}>
            <div className="container py-5">
                <div className="row g-5">
                    {/* Left Column: Image */}
                    <div className="col-lg-4">
                        <div className={styles.imageCard}>
                            <Image
                                src={character.image || 'https://via.placeholder.com/400x600'}
                                alt={character.name || character.charName || 'Character'}
                                fill
                                className={styles.mainImg}
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="col-lg-8">
                        <h1 className={styles.characterName}>{character.name || character.charName}</h1>
                        <h3 className={styles.kanjiName}>{character.kanjiName}</h3>
                        
                        <div className={styles.statsRow}>
                            <div className={styles.statBox}>
                                <span className={styles.statLabel}>Favorites</span>
                                <span className={styles.statValue}>
                                    ❤️ {character.favouritesNumber || 0}
                                </span>
                            </div>
                            {character.animeName && (
                                <div className={styles.statBox}>
                                    <span className={styles.statLabel}>Anime</span>
                                    <span className={styles.statValue}>
                                        {character.animeName}
                                    </span>
                                </div>
                            )}
                        </div>

                        <section className="mt-5">
                            <h4 className={styles.sectionHeading}>Biography</h4>
                            <div className={styles.biography}>
                                {character.biography ? (
                                    <p>{character.biography}</p>
                                ) : (
                                    <p className="text-secondary">No biography available for this character.</p>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
