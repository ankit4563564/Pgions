'use client';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatPrice, getPriceInsight } from '@/lib/utils';
import { areaAverages } from '@/data/listings';
import styles from './PriceComparison.module.css';

export default function PriceComparison({ price, location }) {
  const areaAvg = areaAverages[location] || 7000;
  const insight = getPriceInsight(price, location);
  const percentage = Math.min(100, (price / (areaAvg * 2)) * 100);
  const avgPercentage = Math.min(100, (areaAvg / (areaAvg * 2)) * 100);

  return (
    <div className={styles.wrap}>
      <h4 className={styles.title}>📊 Price Comparison</h4>
      <div className={styles.bars}>
        <div className={styles.barRow}>
          <span className={styles.barLabel}>This PG</span>
          <div className={styles.barTrack}>
            <div className={styles.barFill} style={{ width: `${percentage}%`, background: insight.color }} />
          </div>
          <span className={styles.barValue} style={{ color: insight.color }}>{formatPrice(price)}</span>
        </div>
        <div className={styles.barRow}>
          <span className={styles.barLabel}>Area Avg</span>
          <div className={styles.barTrack}>
            <div className={styles.barFill} style={{ width: `${avgPercentage}%`, background: 'var(--text-muted)' }} />
          </div>
          <span className={styles.barValue}>{formatPrice(areaAvg)}</span>
        </div>
      </div>
      <div className={styles.insight} style={{ color: insight.color, borderColor: `${insight.color}30` }}>
        {price > areaAvg ? <TrendingUp size={16} /> : price < areaAvg ? <TrendingDown size={16} /> : <Minus size={16} />}
        <span>{insight.label} — {insight.description}</span>
      </div>
    </div>
  );
}
