'use client';
import Link from 'next/link';
import { MapPin, Utensils, Wifi, Wind, Star, Eye, Users, ShieldCheck } from 'lucide-react';
import TrustBadge from './TrustBadge';
import { formatPrice, getPriceInsight } from '@/lib/utils';
import styles from './ListingCard.module.css';

export default function ListingCard({ listing }) {
  const priceInsight = getPriceInsight(listing.price, listing.location);
  const isScam = listing.scamFlags && listing.scamFlags.length > 0;

  return (
    <Link href={`/listing/${listing.id}`} className={styles.card}>
      {isScam && (
        <div className={styles.scamBanner}>⚠️ Low Trust Listing</div>
      )}
      <div className={styles.imageWrap}>
        <img src={listing.images[0]} alt={listing.name} className={styles.image} />
        <div className={styles.imageOverlay}>
          <span className={styles.sharing}>{listing.sharing}</span>
          <span className={styles.type} data-type={listing.type}>{listing.type}</span>
        </div>
        {listing.viewsThisWeek > 20 && (
          <div className={styles.demand}>
            <Eye size={12} /> {listing.viewsThisWeek} views this week
          </div>
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.topRow}>
          <h3 className={styles.name}>{listing.name}</h3>
          <div className={styles.trustGroup}>
            {listing.ownerVerified && <ShieldCheck size={14} className={styles.shieldIcon} />}
            <TrustBadge score={listing.trustScore} size="sm" showLabel={false} />
          </div>
        </div>
        <div className={styles.location}>
          <MapPin size={14} />
          <span>{listing.location}, {listing.city}</span>
        </div>
        <div className={styles.amenities}>
          {listing.foodIncluded && <span className={styles.amenity}><Utensils size={13} /> Food</span>}
          {listing.wifi && <span className={styles.amenity}><Wifi size={13} /> WiFi</span>}
          {listing.ac && <span className={styles.amenity}><Wind size={13} /> AC</span>}
        </div>

        <div className={styles.vibeSection}>
          <div className={styles.vibeScore}>
            <Users size={12} />
            <span>92% Vibe Match</span>
          </div>
          <div className={styles.vibeTags}>
            <span className={styles.vibeTag}>🧘‍♂️ Quiet</span>
            <span className={styles.vibeTag}>☕ WFH</span>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.price}>
            <span className={styles.priceValue}>{formatPrice(listing.price)}</span>
            <span className={styles.priceLabel}>/month</span>
          </div>
          <div className={styles.rating}>
            <Star size={14} fill="#fbbf24" color="#fbbf24" />
            <span>{listing.avgRating > 0 ? listing.avgRating.toFixed(1) : 'New'}</span>
            <span className={styles.reviewCount}>({listing.totalReviews})</span>
          </div>
        </div>
        <div className={styles.priceInsight} style={{ color: priceInsight.color }}>
          {priceInsight.label}
        </div>
      </div>
    </Link>
  );
}
