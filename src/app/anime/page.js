'use client'

import { animeList } from '@/data/anime_data_source'
import AnimeCard from '@/components/AnimeCard'
import styles from '../../styles/Anime.module.css'

export default function Anime() {
    return (
        <div className="container py-5">
            {/* Header Area */}
            <div className="mb-5">
                <span className={styles.categorySub}>The Library</span>
                <h1 className={styles.pageHeader}>All Anime</h1>
                <p className={styles.pageSub}>
                    Explore our complete directory of series, movies, and specials.
                </p>
            </div>

            {/* Quick Filter Bar (Minimalist) */}
            <div className={styles.filterBar}>
                <div className={styles.searchWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input 
                        type="text" 
                        placeholder="Search anime..." 
                        className={styles.searchInput}
                    />
                </div>
                
                <div className={styles.pills}>
                    <button className={`${styles.pill} ${styles.pillActive}`}>All</button>
                    <button className={styles.pill}>Series</button>
                    <button className={styles.pill}>Movies</button>
                    <button className={styles.pill}>Top Rated</button>
                </div>
            </div>

            {/* Cleaned up Grid spacing with Bootstrap g-4 */}
            <div className="row g-4">
                {animeList.map((anime) => (
                    <AnimeCard key={anime.id} anime={anime} />
                ))}
            </div>
        </div>
    )
}