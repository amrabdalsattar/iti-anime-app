'use client'

import Link from 'next/link'
import styles from '../../styles/About.module.css'

export default function About() {
    return (
        <div className={styles.aboutWrapper}>
            <div className="container py-5">
                <div className={styles.contentBlock}>
                    {/* Header Zone */}
                    <span className={styles.subTitle}>Project Info</span>
                    <h1 className={styles.mainHeading}>About Otacku</h1>
                    <div className={styles.glassDivider}></div>

                    {/* Main Description */}
                    <p className={styles.description}>
                        Otacku is a highly curated, premium visual experience built for anime fans.
                        It showcases high-fidelity artwork and profiles in a cinematic interface, prioritizing
                        immersion, minimalism, and buttery-smooth interactions.
                    </p>

                    {/* App Features / Highlights */}
                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <div className={styles.iconWrapper}>⚡</div>
                            <h5>Fast & Immersive</h5>
                            <p>Powered by Next.js App Router for dynamic, server-rendered delivery.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.iconWrapper}>🎨</div>
                            <h5>Minimalist UI</h5>
                            <p>Generous whitespace, premium typography, and glowing glassmorphism.</p>
                        </div>
                    </div>

                    {/* Footer Call to Action */}
                    <div className={styles.footerAction}>
                        <p>Curious to see it in action?</p>
                        <Link href="/anime" className={styles.ctaBtn}>
                            Explore the Library
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}