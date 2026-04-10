'use client'

import { useState } from 'react'
import { addCharacterToAnime } from '@/lib/api'
import styles from '../styles/Modal.module.css'

export default function CharacterModal({ show, onClose, onSuccess, animeId }) {
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        biography: '',
        kanjiName: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    if (!show) return null

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await addCharacterToAnime(animeId, formData)
            onSuccess()
            onClose()
            setFormData({ name: '', image: '', biography: '', kanjiName: '' })
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent} style={{ maxWidth: '500px' }}>
                <div className={styles.modalHeader}>
                    <h2>Add Character</h2>
                    <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                </div>
                {error && <div className="alert alert-danger p-2 mb-3">{error}</div>}
                
                <form onSubmit={handleSubmit} className={styles.formBody}>
                    <div className="row g-3">
                        <div className="col-12">
                            <label className="form-label">Name *</label>
                            <input type="text" name="name" className="form-control" required value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Kanji Name</label>
                            <input type="text" name="kanjiName" className="form-control" value={formData.kanjiName} onChange={handleChange} />
                        </div>
                        
                        <div className="col-12">
                            <label className="form-label">Image URL</label>
                            <input type="text" name="image" className="form-control" placeholder="https://..." value={formData.image} onChange={handleChange} />
                        </div>

                        <div className="col-12">
                            <label className="form-label">Biography</label>
                            <textarea name="biography" className="form-control" rows="4" value={formData.biography} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    
                    <div className={styles.modalFooter}>
                        <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
                        <button type="submit" className="btn text-white" style={{ background: 'var(--accent)' }} disabled={loading}>
                            {loading ? 'Adding...' : 'Add Character'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
