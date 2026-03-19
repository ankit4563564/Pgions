'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Shield, Users, ArrowRight, Zap, Star, Layout } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>Pgions 1.0 is Live 🐦🚀</div>
          <h1>Find your perfect <span className="text-gradient">Home away from Home</span></h1>
          <p className={styles.subtext}>
            Stay in verified PGs in India's top tech hubs. Secure, vetted, and backed by our proprietary **Pgions Trust Score** algorithm.
          </p>
          
          <div className={styles.searchBar}>
            <div className={styles.searchInput}>
              <Search size={20} color="var(--primary)" />
              <input type="text" placeholder="Search by area or city (e.g. Koramangala)" />
            </div>
            <Link href="/search" className="btn btn-primary">Find a PG</Link>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <strong>500+</strong>
              <span>Verified PGs</span>
            </div>
            <div className={styles.statItem}>
              <strong>10k+</strong>
              <span>Happy Seekers</span>
            </div>
            <div className={styles.statItem}>
              <strong>98%</strong>
              <span>Safety Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={`${styles.iconWrap} bg-soft-primary`}>
              <Shield size={24} color="var(--primary)" />
            </div>
            <h3>Proprietary Trust Score</h3>
            <p>Every PG is scored on 20+ parameters including owner verification and past tenant reviews.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={`${styles.iconWrap} bg-soft-accent`}>
              <Zap size={24} color="var(--accent)" />
            </div>
            <h3>Z-Scam Detection</h3>
            <p>Our AI-powered engine flags suspicious listings and protects you from online rental scams.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={`${styles.iconWrap} bg-soft-success`}>
              <Users size={24} color="#10b981" />
            </div>
            <h3>Roommate Matcher</h3>
            <p>Find roommates who match your vibe, habits, and budget using our compatibility algorithm.</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.categorySection}>
        <div className={styles.sectionHeader}>
          <h2>Popular Selections</h2>
          <Link href="/search" className={styles.viewAll}>View all <ArrowRight size={16} /></Link>
        </div>
        
        <div className={styles.categories}>
          <Link href="/search" className={styles.catCard}>
            <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400" alt="Men's PG" />
            <div className={styles.catOverlay}>
              <h3>Men's PGs</h3>
              <p>Safe & Professional stays</p>
            </div>
          </Link>
          <Link href="/search" className={styles.catCard}>
            <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400" alt="Women's PG" />
            <div className={styles.catOverlay}>
              <h3>Women's PGs</h3>
              <p>Secure & Comfortable stays</p>
            </div>
          </Link>
          <Link href="/search" className={styles.catCard}>
            <img src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400" alt="Coliving" />
            <div className={styles.catOverlay}>
              <h3>Coliving Spaces</h3>
              <p>Premium & Community focused</p>
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
