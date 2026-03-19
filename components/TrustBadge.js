'use client';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { getTrustColor, getTrustLabel } from '@/lib/utils';
import styles from './TrustBadge.module.css';

export default function TrustBadge({ score, size = 'md', showLabel = true }) {
  const color = getTrustColor(score);
  const label = getTrustLabel(score);
  const isSmall = size === 'sm';

  return (
    <div className={`${styles.badge} ${isSmall ? styles.small : ''}`} style={{ borderColor: color }}>
      <div className={styles.scoreCircle} style={{ background: `${color}20`, borderColor: color }}>
        {score >= 6 ? (
          <Shield size={isSmall ? 14 : 18} color={color} />
        ) : score >= 4 ? (
          <AlertTriangle size={isSmall ? 14 : 18} color={color} />
        ) : (
          <AlertTriangle size={isSmall ? 14 : 18} color={color} />
        )}
      </div>
      <div className={styles.info}>
        <span className={styles.score} style={{ color }}>{score.toFixed(1)}</span>
        {showLabel && <span className={styles.label}>{label}</span>}
      </div>
    </div>
  );
}
