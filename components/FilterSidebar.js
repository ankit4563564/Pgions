'use client';
import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import styles from './FilterSidebar.module.css';

const locations = ['All', 'Koramangala', 'HSR Layout', 'BTM Layout', 'Indiranagar', 'Whitefield', 'Electronic City', 'Marathahalli', 'JP Nagar', 'Jayanagar', 'Kothrud, Pune', 'Hinjewadi, Pune', 'Viman Nagar, Pune'];

export default function FilterSidebar({ filters, onFilterChange, resultCount }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearAll = () => {
    onFilterChange({
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
  };

  const sidebar = (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h3><SlidersHorizontal size={18} /> Filters</h3>
        <button className={styles.clear} onClick={clearAll}>Clear All</button>
      </div>

      <div className={styles.searchBox}>
        <Search size={16} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search PG name or area..."
          className={`input ${styles.searchInput}`}
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
        />
      </div>

      <div className={styles.group}>
        <label className={styles.groupLabel}>Location</label>
        <select
          className={`input ${styles.select}`}
          value={filters.location}
          onChange={(e) => handleChange('location', e.target.value)}
        >
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <div className={styles.group}>
        <label className={styles.groupLabel}>
          Price Range: ₹{filters.minPrice.toLocaleString()} — ₹{filters.maxPrice.toLocaleString()}
        </label>
        <div className={styles.rangeWrap}>
          <input
            type="range"
            min="0"
            max="25000"
            step="500"
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', Number(e.target.value))}
            className={styles.range}
          />
          <input
            type="range"
            min="0"
            max="25000"
            step="500"
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
            className={styles.range}
          />
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.groupLabel}>Gender</label>
        <div className={styles.chips}>
          {['All', 'Men', 'Women', 'Unisex'].map(g => (
            <button
              key={g}
              className={`${styles.chip} ${filters.gender === g ? styles.chipActive : ''}`}
              onClick={() => handleChange('gender', g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.groupLabel}>Amenities</label>
        <div className={styles.checkboxes}>
          <label className={styles.checkbox}>
            <input type="checkbox" checked={filters.food} onChange={(e) => handleChange('food', e.target.checked)} />
            <span>🍽️ Food Included</span>
          </label>
          <label className={styles.checkbox}>
            <input type="checkbox" checked={filters.ac} onChange={(e) => handleChange('ac', e.target.checked)} />
            <span>❄️ AC Rooms</span>
          </label>
          <label className={styles.checkbox}>
            <input type="checkbox" checked={filters.wifi} onChange={(e) => handleChange('wifi', e.target.checked)} />
            <span>📶 WiFi</span>
          </label>
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.groupLabel}>Sort By</label>
        <select
          className={`input ${styles.select}`}
          value={filters.sortBy}
          onChange={(e) => handleChange('sortBy', e.target.value)}
        >
          <option value="trust">Trust Score (High → Low)</option>
          <option value="price-low">Price (Low → High)</option>
          <option value="price-high">Price (High → Low)</option>
          <option value="rating">Rating (High → Low)</option>
          <option value="reviews">Most Reviewed</option>
        </select>
      </div>

      <div className={styles.resultInfo}>
        <span>{resultCount} PGs found</span>
      </div>
    </div>
  );

  return (
    <>
      <button className={styles.mobileToggle} onClick={() => setMobileOpen(true)}>
        <SlidersHorizontal size={18} /> Filters
      </button>
      <div className={styles.desktopSidebar}>{sidebar}</div>
      {mobileOpen && (
        <div className={styles.mobileOverlay}>
          <div className={styles.mobileSheet}>
            <button className={styles.mobileClose} onClick={() => setMobileOpen(false)}>
              <X size={20} /> Close
            </button>
            {sidebar}
          </div>
        </div>
      )}
    </>
  );
}
