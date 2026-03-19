'use client';
import { AlertTriangle, ShieldAlert, AlertCircle } from 'lucide-react';
import styles from './ScamAlert.module.css';

export default function ScamAlert({ flags }) {
  if (!flags || flags.length === 0) return null;

  const highSeverity = flags.filter(f => f.severity === 'high');
  const isHighRisk = highSeverity.length > 0;

  return (
    <div className={`${styles.alert} ${isHighRisk ? styles.high : styles.medium}`}>
      <div className={styles.header}>
        <ShieldAlert size={20} />
        <span className={styles.title}>
          {isHighRisk ? '⚠️ High Risk Listing — Potential Scam' : '⚡ Proceed with Caution'}
        </span>
      </div>
      <ul className={styles.flags}>
        {flags.map((flag, i) => (
          <li key={i} className={styles.flag}>
            {flag.severity === 'high' ? <AlertTriangle size={14} /> : <AlertCircle size={14} />}
            <span>{flag.message}</span>
            <span className={`badge ${flag.severity === 'high' ? 'badge-danger' : 'badge-warning'}`}>
              {flag.severity}
            </span>
          </li>
        ))}
      </ul>
      <p className={styles.advice}>
        {isHighRisk
          ? '🚫 We strongly advise NOT sending any advance payment. Visit in person before any transaction.'
          : '💡 Verify details independently before making any payments.'}
      </p>
    </div>
  );
}
