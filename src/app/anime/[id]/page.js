import { animeList } from '@/data/anime_data_source'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../../styles/AnimeDetails.module.css'

export default async function AnimeDetails({ params }) {
    const { id } = await params

    const anime = animeList.find(
        (a) => a.id.toString() === id
    )

    if (!anime) {
        return (
            <div className="container py-5 text-center">
                <h2 className="display-6 font-weight-bold">Anime Not Found</h2>
                <Link href="/anime" className="btn btn-outline-secondary mt-3">Back to Library</Link>
            </div>
        )
    }

    return (
        <div className={styles.detailsWrapper}>
            {/* 1. Immersive Hero Banner */}
            <div className={styles.heroBanner}>
                <Image
                    src={anime.image}
                    alt={anime.title}
                    fill
                    className={styles.bannerImg}
                    priority
                />
                <div className={styles.bannerOverlay}></div>
                
                <div className={styles.heroContent}>
                    <div className="container">
                        <span className={styles.yearTag}>{anime.year}</span>
                        <h1 className={styles.mainTitle}>{anime.title}</h1>
                        <div className={styles.metaRow}>
                            <span className={styles.badge}>{anime.genre}</span>
                            <span className={styles.rating}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="var(--accent)" stroke="var(--accent)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                {anime.rating} / 10
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
                            <p className={styles.description}>{anime.description}</p>
                        </section>

                        {/* Characters Grid */}
                        <section>
                            <h4 className={styles.sectionHeading}>Characters</h4>
                            <div className="row g-3">
                                {anime.characters.map((char) => (
                                    <div key={char.id} className="col-6 col-sm-4 col-md-3">
                                        <Link 
                                            href={`/anime/${anime.id}/characters/${char.id}`}
                                            className={styles.charLink}
                                        >
                                            <div className={styles.charAvatarWrapper}>
                                                <Image 
                                                    src={char.image}
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
                                <strong>Series</strong>
                            </div>
                            <div className={styles.infoRow}>
                                <span>Premiered</span>
                                <strong>{anime.year}</strong>
                            </div>
                            <div className={styles.infoRow}>
                                <span>Studio</span>
                                <strong>Mappa / Ufotable</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}