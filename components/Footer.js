import Link from 'next/link';
import { Shield, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.brand}>
          <h3 className="gradient-text">Pgions</h3>
          <p>India&apos;s most trusted platform to find safe, verified, and affordable PGs. No scams, no hidden charges — just honest listings.</p>
        </div>
        <div className={styles.column}>
          <h4>Platform</h4>
          <Link href="/search">Search PGs</Link>
          <Link href="/roommate">Find Roommate</Link>
          <a href="#">List Your PG</a>
          <a href="#">Price Trends</a>
        </div>
        <div className={styles.column}>
          <h4>Cities</h4>
          <Link href="/search?city=Bangalore">Bangalore</Link>
          <Link href="/search?city=Pune">Pune</Link>
          <a href="#">Mumbai</a>
          <a href="#">Hyderabad</a>
        </div>
        <div className={styles.column}>
          <h4>Support</h4>
          <a href="#">Report Scam</a>
          <a href="#">Safety Guide</a>
          <a href="#">FAQs</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© 2026 Pgions. All rights reserved.</span>
        <div className={styles.socials}>
          <a href="#" aria-label="Twitter"><Twitter size={16} /></a>
          <a href="#" aria-label="Instagram"><Instagram size={16} /></a>
          <a href="#" aria-label="LinkedIn"><Linkedin size={16} /></a>
          <a href="#" aria-label="Email"><Mail size={16} /></a>
        </div>
      </div>
    </footer>
  );
}
