'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { isAdmin } from '@/lib/auth'
import { deleteAnime } from '@/lib/api'
import styles from '../styles/AnimeCard.module.css'

const AnimeCard = ({ anime, onDelete }) => {
    const router = useRouter()
    const id = anime._id || anime.id
    const image = anime.image || 'https://via.placeholder.com/300x400'
    const title = anime.name || anime.title
    const year = anime.year || 'N/A'

    // Only show admin controls if user is admin
    const isUserAdmin = typeof window !== 'undefined' ? isAdmin() : false;

    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (confirm(`Are you sure you want to delete ${title}?`)) {
            try {
                await deleteAnime(id);
                if (onDelete) onDelete(id);
                else window.location.reload();
            } catch (err) {
                alert(err.message);
            }
        }
    }

    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/anime/${id}?edit=true`);
    }

    return (
        <div className="col-12 col-sm-6 col-lg-4 mb-4">
            <Link href={`/anime/${id}`} className={styles.cardLink}>
                <div className={styles.animeCard}>
                    {/* Admin Controls Overlay */}
                    {isUserAdmin && (
                        <div className={styles.adminControls}>
                            <button onClick={handleEdit} className={styles.adminBtn} title="Edit">✏️</button>
                            <button onClick={handleDelete} className={`${styles.adminBtn} ${styles.deleteBtn}`} title="Delete">🗑️</button>
                        </div>
                    )}

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