'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/AnimeCard.module.css'

const AnimeCard = ({ anime }) => {
    // Handle both static data and API data
    const id = anime.mal_id || anime.id
    const image = anime.images?.jpg?.large_image_url
    const title = anime.title
    const year = anime.aired?.prop?.from?.year || anime.year

    return (
        <div className="col-12 col-sm-6 col-lg-4 mb-4">
            <Link href={`/anime/${id}`} className={styles.cardLink}>
                <div className={styles.animeCard}>
                    {/* Image Container with precise aspect ratio */}
                    <div className={styles.imageWrapper}>
                        <Image
                            src={image}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className={styles.cardImg}
                            priority={false}
                        />
                        {/* Soft dark gradient overlay for text readability */}
                        <div className={styles.overlay}></div>
                    </div>

                    {/* Minimalist Card Content Floating on top */}
                    <div className={styles.cardContent}>
                        <div className={styles.textGroup}>
                            <span className={styles.yearTag}>{year}</span>
                            <h5 className={styles.title}>{title}</h5>
                        </div>

                        <div className={styles.actionArrow}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default AnimeCard