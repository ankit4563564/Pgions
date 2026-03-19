'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Shield, Menu, X, LogOut, User } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navInner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}><Shield size={20} color="white" /></span>
          <span className="gradient-text">Pgions</span>
        </Link>
        <div className={`${styles.navLinks} ${open ? styles.open : ''}`}>
          <Link href="/" className={styles.navLink} onClick={() => setOpen(false)}>Home</Link>
          <Link href="/search" className={styles.navLink} onClick={() => setOpen(false)}>Search PGs</Link>
          <Link href="/roommate" className={styles.navLink} onClick={() => setOpen(false)}>Find Roommate</Link>
          <div className={styles.navActions} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: open ? '1rem' : '0' }}>
            {session ? (
              <>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hey, {session.user?.name?.split(' ')[0] || 'User'}</span>
                <button onClick={() => { signOut(); setOpen(false); }} className={`btn btn-outline btn-sm`}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/signup" className={styles.navLink} onClick={() => setOpen(false)}>Log in</Link>
                <Link href="/signup" className={`btn btn-primary btn-sm ${styles.navCta}`} onClick={() => setOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
        <button className={styles.mobileToggle} onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
