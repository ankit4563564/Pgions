import { Star, ShieldCheck } from 'lucide-react';
import StarRating from './StarRating';
import { getTimeAgo } from '@/lib/utils';
import styles from './ReviewSection.module.css';

export default function ReviewSection({ reviews, rating, trustScore }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className={styles.emptyReviews}>
        <div className={styles.emptyIcon}>
          <Star size={32} color="var(--text-muted)" />
        </div>
        <p>No reviews yet for this listing.</p>
        <button className="btn btn-outline" style={{ marginTop: '1rem' }}>Be the first to review</button>
      </div>
    );
  }

  return (
    <div className={styles.reviewSection}>
      <div className={styles.header}>
        <div className={styles.summary}>
          <h3>Guest Reviews</h3>
          <StarRating rating={rating} count={reviews.length} size={20} />
        </div>
        <div className={styles.action}>
          <button className="btn btn-outline">Write a Review</button>
        </div>
      </div>

      <div className={styles.list}>
        {reviews.map(review => (
          <div key={review.id} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <div className={styles.userWrap}>
                <div className={styles.avatar}>{review.user.charAt(0)}</div>
                <div className={styles.userInfo}>
                  <div className={styles.userNameWrap}>
                    <span className={styles.userName}>{review.user}</span>
                    {review.verified && (
                      <span className={styles.verifiedBadge} title="Verified Stay">
                        <ShieldCheck size={14} />
                      </span>
                    )}
                  </div>
                  <span className={styles.date}>{getTimeAgo(review.date)}</span>
                </div>
              </div>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < review.rating ? "#fbbf24" : "transparent"} 
                    color={i < review.rating ? "#fbbf24" : "#cbd5e1"} 
                  />
                ))}
              </div>
            </div>
            <p className={styles.reviewText}>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
