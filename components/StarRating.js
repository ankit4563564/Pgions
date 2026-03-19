import { Star, StarHalf } from 'lucide-react';
import styles from './StarRating.module.css';

export default function StarRating({ rating, count, size = 16, showCount = true }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={styles.ratingWrapper}>
      <div className={styles.stars}>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={size} fill="#fbbf24" color="#fbbf24" />
        ))}
        {hasHalfStar && (
          <div className={styles.halfStarWrap} style={{ width: size, height: size }}>
            <StarHalf size={size} fill="#fbbf24" color="#fbbf24" />
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={size} color="#cbd5e1" />
        ))}
      </div>
      <span className={styles.ratingNumber}>{rating.toFixed(1)}</span>
      {showCount && <span className={styles.countText}>({count} reviews)</span>}
    </div>
  );
}
