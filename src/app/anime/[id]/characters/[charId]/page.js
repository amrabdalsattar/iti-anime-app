import Image from 'next/image'
import Link from 'next/link'
import styles from '../../../../../styles/CharacterDetails.module.css'

export default async function Character({ params }) {
    const { id, charId } = await params

    let anime = null
    let character = null
    let error = null

    try {
        // Fetch anime details for title
        const animeResponse = await fetch(`https://api.jikan.moe/v4/anime/${id}`)
        if (!animeResponse.ok) {
            throw new Error('Failed to fetch anime details')
        }
        const animeData = await animeResponse.json()
        anime = animeData.data

        // Fetch character details
        const characterResponse = await fetch(`https://api.jikan.moe/v4/characters/${charId}`)
        if (!characterResponse.ok) {
            throw new Error('Failed to fetch character details')
        }
        const characterData = await characterResponse.json()
        character = characterData.data
    } catch (err) {
        error = err.message
    }

    if (error || !anime || !character) {
        return (
            <div className="container py-5 text-center">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Character Not Found</h4>
                    <p>{error || 'The requested character could not be found.'}</p>
                    <Link href={`/anime/${id}`} className="btn btn-outline-secondary mt-3">Back to Anime</Link>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.pageWrapper}>
            <div className="container py-5">
                {/* Back button to return to the parent anime */}
                <Link href={`/anime/${id}`} className={styles.backLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    Back to {anime.title}
                </Link>

                <div className="row g-5 align-items-center mt-2">
                    {/* Left Column: Massive Vertical Image */}
                    <div className="col-lg-5">
                        <div className={styles.posterWrapper}>
                            <Image
                                src={character.images.jpg.image_url}
                                alt={character.name}
                                fill
                                className={styles.posterImg}
                                priority
                            />
                            <div className={styles.glowEffect}></div>
                        </div>
                    </div>

                    {/* Right Column: Profile & Details */}
                    <div className="col-lg-7">
                        <div className={styles.contentBlock}>
                            <span className={styles.originTag}>{anime.title}</span>
                            <h1 className={styles.charName}>{character.name}</h1>

                            <div className={styles.glassDivider}></div>

                            <div className="mb-4">
                                <h5 className={styles.sectionTitle}>Biography</h5>
                                <p className={styles.description}>{character.about}</p>
                            </div>

                            {/* Quick Stats Grid */}
                            <div className={styles.statsGrid}>
                                <div className={styles.statCard}>
                                    <span>Favorites</span>
                                    <strong>{character.favorites}</strong>
                                </div>
                                <div className={styles.statCard}>
                                    <span>Name (Kanji)</span>
                                    <strong>{character.name_kanji || 'N/A'}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}