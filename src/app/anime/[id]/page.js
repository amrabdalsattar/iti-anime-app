import Image from 'next/image'
import Link from 'next/link'
import styles from '../../../styles/AnimeDetails.module.css'

export default async function AnimeDetails({ params }) {
    const { id } = await params

    let anime = null
    let characters = []
    let error = null

    try {
        // Fetch anime details
        const animeResponse = await fetch(`https://api.jikan.moe/v4/anime/${id}`)
        if (!animeResponse.ok) {
            throw new Error('Failed to fetch anime details')
        }
        const animeData = await animeResponse.json()
        anime = animeData.data

        // Fetch characters
        const charactersResponse = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`)
        if (charactersResponse.ok) {
            const charactersData = await charactersResponse.json()
            characters = charactersData.data
        }
    } catch (err) {
        error = err.message
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
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    fill
                    className={styles.bannerImg}
                    priority
                />
                <div className={styles.bannerOverlay}></div>

                <div className={styles.heroContent}>
                    <div className="container">
                        <span className={styles.yearTag}>{anime.aired.prop.from.year}</span>
                        <h1 className={styles.mainTitle}>{anime.title}</h1>
                        <div className={styles.metaRow}>
                            <span className={styles.badge}>{anime.genres.map(g => g.name).join(', ')}</span>
                            <span className={styles.rating}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="var(--accent)" stroke="var(--accent)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                {anime.score} / 10
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
                            <h4 className={styles.sectionHeading}>Characters</h4>
                            <div className="row g-3">
                                {characters.slice(0, 12).map((char) => (
                                    <div key={char.character.mal_id} className="col-6 col-sm-4 col-md-3">
                                        <Link
                                            href={`/anime/${anime.mal_id}/characters/${char.character.mal_id}`}
                                            className={styles.charLink}
                                        >
                                            <div className={styles.charAvatarWrapper}>
                                                <Image
                                                    src={char.character.images.jpg.image_url}
                                                    alt={char.character.name}
                                                    fill
                                                    className={styles.charAvatar}
                                                />
                                            </div>
                                            <span className={styles.charName}>{char.character.name}</span>
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
                                <strong>{anime.type}</strong>
                            </div>
                            <div className={styles.infoRow}>
                                <span>Premiered</span>
                                <strong>{anime.aired.prop.from.year}</strong>
                            </div>
                            <div className={styles.infoRow}>
                                <span>Studio</span>
                                <strong>{anime.studios.map(s => s.name).join(', ')}</strong>
                            </div>
                            <div className={styles.infoRow}>
                                <span>Episodes</span>
                                <strong>{anime.episodes || 'Unknown'}</strong>
                            </div>
                            <div className={styles.infoRow}>
                                <span>Status</span>
                                <strong>{anime.status}</strong>
                            </div>
                            <div className={styles.infoRow}>
                                <span>Rating</span>
                                <strong>{anime.rating}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}