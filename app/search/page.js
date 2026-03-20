'use client';
import { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FilterSidebar from '@/components/FilterSidebar';
import ListingCard from '@/components/ListingCard';
import { SearchX, Loader2 } from 'lucide-react';
import styles from './page.module.css';

export default function SearchPage() {
  const [filters, setFilters] = useState({
    search: '',
    location: 'All',
    minPrice: 0,
    maxPrice: 25000,
    gender: 'All',
    food: false,
    ac: false,
    wifi: false,
    sortBy: 'trust',
  });
  
  const [dbListings, setDbListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch('/api/listings');
        if (!res.ok) {
          let details = '';
          try {
            details = await res.text();
          } catch {
            // ignore
          }
          console.error('Failed to fetch listings', res.status, details);
          setDbListings([]);
          setErrorMsg('Could not load listings right now.');
          return;
        }

        const data = await res.json();
        setDbListings(Array.isArray(data) ? data : []);
        setErrorMsg('');
      } catch (error) {
        console.error('Failed to fetch listings');
        setDbListings([]);
        setErrorMsg('Could not load listings right now.');
      } finally {
        setIsLoading(false);
      }
    };
    // Only run once
    fetchListings();
  }, []);

  const filteredListings = useMemo(() => {
    let result = Array.isArray(dbListings) ? dbListings : [];

    // Search text
    if (filters.search) {
      const s = filters.search.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(s) ||
          l.location.toLowerCase().includes(s) ||
          l.address.toLowerCase().includes(s)
      );
    }

    // Location
    if (filters.location && filters.location !== 'All') {
      result = result.filter((l) => l.location === filters.location);
    }

    // Price
    result = result.filter(
      (l) => l.price >= filters.minPrice && l.price <= filters.maxPrice
    );

    // Gender/Type
    if (filters.gender && filters.gender !== 'All') {
      if (filters.gender === 'Men') {
        result = result.filter((l) => l.type === 'Men' || l.type === 'Unisex');
      } else if (filters.gender === 'Women') {
        result = result.filter((l) => l.type === 'Women' || l.type === 'Unisex');
      } else if (filters.gender === 'Unisex') {
        result = result.filter((l) => l.type === 'Unisex');
      }
    }

    // Amenities
    if (filters.food) result = result.filter((l) => l.foodIncluded);
    if (filters.ac) result = result.filter((l) => l.ac);
    if (filters.wifi) result = result.filter((l) => l.wifi);

    // Sort
    if (filters.sortBy === 'trust') {
      result = [...result].sort((a, b) => b.trustScore - a.trustScore);
    } else if (filters.sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      result = [...result].sort((a, b) => b.avgRating - a.avgRating);
    } else if (filters.sortBy === 'reviews') {
      result = [...result].sort((a, b) => b.totalReviews - a.totalReviews);
    }

    return result;
  }, [filters, dbListings]);

  return (
    <div className={styles.container}>
      <Navbar />
      
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1>Find your perfect PG</h1>
          <p>Discover verified stays with transparent pricing and real reviews.</p>
        </div>

        <div className={styles.content}>
          <div className={styles.sidebarWrapper}>
            <FilterSidebar 
              filters={filters} 
              onFilterChange={setFilters} 
              resultCount={filteredListings.length}
            />
          </div>

          <div className={styles.resultsWrapper}>
            {errorMsg && !isLoading ? (
              <div className={styles.emptyState}>
                <h2>{errorMsg}</h2>
                <p>Check your database/API configuration and try again.</p>
              </div>
            ) : null}
            {isLoading ? (
              <div className={styles.grid}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className={styles.skeletonCard}>
                    <div className="skeleton" style={{ height: '200px', borderRadius: 'var(--radius-lg)' }} />
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div className="skeleton" style={{ width: '60%', height: '24px' }} />
                      <div className="skeleton" style={{ width: '40%', height: '16px' }} />
                      <div className="skeleton" style={{ width: '100%', height: '32px', marginTop: '8px' }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredListings.length === 0 && !errorMsg ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIconWrapper}>
                  <SearchX size={64} className={styles.emptyIcon} />
                </div>
                <h2>No PGs here yet—be the first to list one!</h2>
                <p>Try adjusting your search filters or expand your area to find more options.</p>
                <div className={styles.emptyActions}>
                  <button 
                    className={styles.resetBtn}
                    onClick={() => setFilters({
                      search: '', location: 'All', minPrice: 0, maxPrice: 25000, 
                      gender: 'All', food: false, ac: false, wifi: false, sortBy: 'trust'
                    })}
                  >
                    Reset all filters
                  </button>
                  <button className="btn btn-secondary">List your PG</button>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.resultsHeader}>
                  <h2>Showing {filteredListings.length} results</h2>
                </div>
                <div className={styles.grid}>
                  {filteredListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
