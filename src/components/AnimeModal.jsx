'use client'

import { useState, useEffect } from 'react'
import { createAnime, updateAnime } from '@/lib/api'
import styles from '../styles/Modal.module.css'

export default function AnimeModal({ show, onClose, onSuccess, initialData = null }) {
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        year: '',
        type: 'series',
        rate: '',
        episodes: '',
        status: 'ongoing',
        studio: '',
        rating: '',
        classifications: '',
        synopsis: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                image: initialData.image || '',
                year: initialData.year || '',
                type: initialData.type || 'series',
                rate: initialData.rate || '',
                episodes: initialData.episodes || '',
                status: initialData.status || 'ongoing',
                studio: initialData.studio || '',
                rating: initialData.rating || '',
                classifications: initialData.classifications ? initialData.classifications.join(', ') : '',
                synopsis: initialData.synopsis || ''
            })
        } else {
            setFormData({
                name: '',
                image: '',
                year: '',
                type: 'series',
                rate: '',
                episodes: '',
                status: 'ongoing',
                studio: '',
                rating: '',
                classifications: '',
                synopsis: ''
            })
        }
    }, [initialData, show])

    if (!show) return null

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const payload = { ...formData }
        if (payload.year) payload.year = parseInt(payload.year, 10)
        if (payload.rate) payload.rate = parseFloat(payload.rate)
        if (payload.episodes) payload.episodes = parseInt(payload.episodes, 10)
        if (payload.classifications) payload.classifications = payload.classifications.split(',').map(s => s.trim())

        try {
            if (initialData && initialData._id) {
                await updateAnime(initialData._id, payload)
            } else {
                await createAnime(payload)
            }
            onSuccess()
            onClose()
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>{initialData ? 'Edit Anime' : 'Add Anime'}</h2>
                    <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                </div>
                {error && <div className="alert alert-danger p-2 mb-3">{error}</div>}
                
                <form onSubmit={handleSubmit} className={styles.formBody}>
                    <div className="row g-3">
                        <div className="col-12 col-md-8">
                            <label className="form-label">Name *</label>
                            <input type="text" name="name" className="form-control" required value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="col-12 col-md-4">
                            <label className="form-label">Type</label>
                            <select name="type" className="form-select" value={formData.type} onChange={handleChange}>
                                <option value="series">Series</option>
                                <option value="movie">Movie</option>
                                <option value="ova">OVA</option>
                                <option value="special">Special</option>
                            </select>
                        </div>
                        
                        <div className="col-12 col-md-6">
                            <label className="form-label">Image URL</label>
                            <input type="text" name="image" className="form-control" placeholder="https://..." value={formData.image} onChange={handleChange} />
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label">Studio</label>
                            <input type="text" name="studio" className="form-control" value={formData.studio} onChange={handleChange} />
                        </div>

                        <div className="col-6 col-md-3">
                            <label className="form-label">Year</label>
                            <input type="number" name="year" className="form-control" value={formData.year} onChange={handleChange} />
                        </div>
                        <div className="col-6 col-md-3">
                            <label className="form-label">Episodes</label>
                            <input type="number" name="episodes" className="form-control" value={formData.episodes} onChange={handleChange} />
                        </div>
                        <div className="col-6 col-md-3">
                            <label className="form-label">Rate (0-10)</label>
                            <input type="number" step="0.1" name="rate" className="form-control" value={formData.rate} onChange={handleChange} />
                        </div>
                        <div className="col-6 col-md-3">
                            <label className="form-label">Status</label>
                            <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                                <option value="upcoming">Upcoming</option>
                            </select>
                        </div>

                        <div className="col-12 col-md-6">
                            <label className="form-label">Age Rating</label>
                            <input type="text" name="rating" className="form-control" placeholder="e.g. PG-13" value={formData.rating} onChange={handleChange} />
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label">Genres (Comma separated)</label>
                            <input type="text" name="classifications" className="form-control" placeholder="Action, Drama, Fantasy" value={formData.classifications} onChange={handleChange} />
                        </div>

                        <div className="col-12">
                            <label className="form-label">Synopsis</label>
                            <textarea name="synopsis" className="form-control" rows="4" value={formData.synopsis} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    
                    <div className={styles.modalFooter}>
                        <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
                        <button type="submit" className="btn text-white" style={{ background: 'var(--accent)' }} disabled={loading}>
                            {loading ? 'Saving...' : 'Save Anime'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
