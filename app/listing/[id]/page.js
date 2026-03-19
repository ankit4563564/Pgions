'use client';
import { useState, use, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrustBadge from '@/components/TrustBadge';
import ScamAlert from '@/components/ScamAlert';
import PriceComparison from '@/components/PriceComparison';
import LocationInsights from '@/components/LocationInsights';
import ReviewSection from '@/components/ReviewSection';
import ScheduleVisitModal from '@/components/ScheduleVisitModal';
import { formatPrice, getPriceInsight } from '@/lib/utils';
import { MapPin, Check, ShieldCheck, Zap, Users, ShieldAlert, BedDouble, CalendarHeart, Loader2, FileText } from 'lucide-react';
import RentSplitter from '@/components/RentSplitter';
import AgreementGenerator from '@/components/AgreementGenerator';
import styles from './page.module.css';

export default function ListingPage({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listings/${id}`);
        if (res.ok) {
          const data = await res.json();
          setListing(data);
        } else {
          setListing(null);
        }
      } catch (error) {
        setListing(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Navbar />
        <main className={styles.main} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <Loader2 size={48} className="animate-spin" color="var(--primary)" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!listing) {
    notFound();
  }

  const priceInsight = getPriceInsight(listing.price, listing.location);
  const scamFlags = listing.scamFlags || [];

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        {/* Scam Disclaimer if applicable */}
        {scamFlags.length > 0 && (
          <div className={styles.scamBannerWrapper}>
            <ScamAlert flags={scamFlags} trustScore={listing.trustScore} />
          </div>
        )}

        <div className={styles.header}>
          <div className={styles.titleInfo}>
            <div className={styles.badgeRow}>
              <span className={styles.typeBadge}>{listing.type}</span>
              <span className={styles.sharingBadge}>{listing.sharing}</span>
            </div>
            <h1>{listing.name}</h1>
            <p className={styles.address}>
              <MapPin size={16} /> 
              {listing.address}
            </p>
          </div>
          <div className={styles.trustScoreWrapper}>
            <TrustBadge score={listing.trustScore} />
          </div>
        </div>

        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <img src={listing.images[0] || 'https://via.placeholder.com/800x400'} alt={listing.name} />
          </div>
          <div className={styles.subImages}>
            {listing.images.slice(1, 3).map((img, i) => (
              <div key={i} className={styles.subImageWrapper}>
                <img src={img} alt={`${listing.name} ${i+2}`} />
              </div>
            ))}
            {listing.images.length > 3 && (
              <div className={styles.moreImages}>
                <img src={listing.images[3]} alt="More" />
                <div className={styles.moreOverlay}>
                  <span>+{listing.images.length - 3}</span>
                  <span>Photos</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.leftCol}>
            
            <section className={styles.section}>
              <h2>About this Place</h2>
              <p className={styles.description}>{listing.description}</p>
            </section>

            <section className={styles.section}>
              <h2>Amenities & Highlights</h2>
              <div className={styles.amenitiesList}>
                {listing.amenities.map((amenity, i) => (
                  <div key={i} className={styles.amenityItem}>
                    <Check size={18} className={styles.checkIcon} />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <h2>Location Insights</h2>
              <LocationInsights 
                location={listing.location} 
                nearbyPlaces={listing.nearbyPlaces || []}
              />
            </section>

            <section className={styles.section}>
              <h2>House Rules</h2>
              <ul className={styles.rulesList}>
                {listing.rules && listing.rules.map((rule, i) => (
                  <li key={i}>{rule}</li>
                ))}
                {(!listing.rules || listing.rules.length === 0) && (
                  <li>No specific rules listed. Please confirm with owner.</li>
                )}
              </ul>
            </section>

            <section className={styles.section} id="reviews">
              <ReviewSection 
                reviews={listing.reviews} 
                rating={listing.avgRating} 
                trustScore={listing.trustScore} 
              />
            </section>

          </div>

          <div className={styles.rightCol}>
            <div className={styles.bookingCard}>
              <div className={styles.priceSection}>
                <div className={styles.priceRow}>
                  <span className={styles.priceValue}>{formatPrice(listing.price)}</span>
                  <span className={styles.priceTerm}>/month</span>
                </div>
                <div className={styles.depositRow}>
                  <span>Deposit:</span>
                  <span className={styles.depositValue}>{formatPrice(listing.deposit)}</span>
                </div>
              </div>

              <div className={styles.priceComparisonWrapper}>
                <PriceComparison 
                  price={listing.price} 
                  location={listing.location} 
                  insight={priceInsight} 
                />
              </div>

              <div className={styles.ownerInfo}>
                <div className={styles.ownerHeader}>
                  <div className={styles.ownerAvatar}>{listing.ownerName?.charAt(0) || 'O'}</div>
                  <div>
                    <h4 className={styles.ownerName}>{listing.ownerName || 'Unknown Owner'}</h4>
                    <p className={styles.ownerResponse}>{listing.ownerResponseTime} response time</p>
                  </div>
                </div>
                {listing.ownerVerified ? (
                  <div className={styles.verifiedRow}>
                    <ShieldCheck size={16} color="#10b981" />
                    <span>Identity Verified</span>
                  </div>
                ) : (
                  <div className={styles.unverifiedRow}>
                    <ShieldAlert size={16} color="#ef4444" />
                    <span>Identity Not Verified</span>
                  </div>
                )}
              </div>

              <div className={styles.actions}>
                <button 
                  className={`btn btn-primary ${styles.actionBtn} ${scamFlags.length > 0 ? styles.scamBtn : ''}`}
                  onClick={() => setIsModalOpen(true)}
                >
                  {scamFlags.length > 0 ? 'Proceed with Caution' : 'Book a Visit'}
                </button>
                <div className={styles.actionDisclaimer}>
                  <Zap size={14} />
                  <span>Never pay advance online before visiting.</span>
                </div>
              </div>

              <div className={styles.roommatePromo}>
                <Users size={20} color="var(--primary)" />
                <div className={styles.promoText}>
                  <h4>Looking for a roommate?</h4>
                  <p>Find someone with a similar vibe for this PG.</p>
                </div>
                <button className="btn btn-outline" style={{ width: '100%', marginTop: '0.5rem' }}>Find Match</button>
              </div>

            </div>
          </div>
        </div>


        {/* Smart Tools Section */}
        <section className={styles.smartToolsSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.badge}>Killer Tools ⚡</div>
            <h2>Smart Tenant Hub</h2>
            <p>Tools designed to make your PG stay effortless.</p>
          </div>

          <div className={styles.toolsGrid}>
            <div className={styles.toolCard}>
              <RentSplitter totalRent={listing.price} />
            </div>
            <div className={styles.toolCard}>
              <AgreementGenerator listing={listing} />
            </div>
          </div>
        </section>
      </main>

      <ScheduleVisitModal 
        listing={listing} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <Footer />
    </div>
  );
}
