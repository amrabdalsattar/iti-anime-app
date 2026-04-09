'use client'

import { useState, useEffect } from 'react'
import AnimeCard from '@/components/AnimeCard'
import { getAnimeList, searchAnime, filterAnime } from '@/lib/api'
import { isAdmin } from '@/lib/auth'
import styles from '../../styles/Anime.module.css'

export default function Anime() {
  const [animeList, setAnimeList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [isUserAdmin, setIsUserAdmin] = useState(false)

  useEffect(() => {
    setIsUserAdmin(isAdmin())
    fetchAnime()
  }, [])

  const fetchAnime = async (filter = 'all', query = '') => {
    setLoading(true)
    setError(null)
    try {
      let data;
      if (query) {
        data = await searchAnime(query)
      } else if (filter !== 'all') {
        data = await filterAnime(filter === 'Top Rated' ? 'topRated' : filter.toLowerCase())
      } else {
        data = await getAnimeList()
      }
      setAnimeList(data.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setActiveFilter('all')
    if (searchQuery.trim()) {
      fetchAnime('all', searchQuery)
    } else {
      fetchAnime()
    }
  }

  const handleFilter = (filterName) => {
    setSearchQuery('')
    setActiveFilter(filterName)
    fetchAnime(filterName)
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading anime library...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Oops!</h4>
          <p>{error}</p>
          <button className="btn btn-outline-primary" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      {/* Header Area */}
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <span className={styles.categorySub}>The Library</span>
          <h1 className={styles.pageHeader}>All Anime</h1>
          <p className={styles.pageSub}>
            Explore our complete directory of series, movies, and specials.
          </p>
        </div>
        {isUserAdmin && (
          <button className="btn text-white px-4 py-2 rounded-3" style={{ background: 'var(--accent)', fontWeight: '600' }} onClick={() => alert('Add Anime Form: To be implemented in modal')}>
            + Add Anime
          </button>
        )}
      </div>

      {/* Quick Filter Bar (Minimalist) */}
      <div className={styles.filterBar}>
        <form onSubmit={handleSearch} className={styles.searchWrapper}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={handleSearch} style={{ cursor: 'pointer' }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            type="text"
            placeholder="Search anime..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className={styles.pills}>
          {['All', 'Series', 'Movies', 'Top Rated'].map(filter => (
            <button
              key={filter}
              className={`${styles.pill} ${activeFilter === filter ? styles.pillActive : ''}`}
              onClick={() => handleFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Cleaned up Grid spacing with Bootstrap g-4 */}
      <div className="row g-4">
        {animeList.length === 0 && !loading && (
          <div className="col-12 text-center py-5 text-secondary">
            <h5>No anime found.</h5>
          </div>
        )}
        {animeList.map((anime) => (
          <AnimeCard key={anime._id} anime={anime} onDelete={(id) => setAnimeList(prev => prev.filter(a => a._id !== id))} />
        ))}
      </div>
    </div>
  )
}