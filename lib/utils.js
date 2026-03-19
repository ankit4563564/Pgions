import { areaAverages } from '@/data/listings';

export function calculateTrustScore(listing) {
  let score = 0;
  if (listing.ownerVerified) score += 3;
  if (listing.totalReviews >= 20) score += 2;
  else if (listing.totalReviews >= 10) score += 1.5;
  else if (listing.totalReviews >= 5) score += 1;
  else score += 0.3;
  if (listing.avgRating >= 4) score += 2;
  else if (listing.avgRating >= 3) score += 1;
  if (listing.images && new Set(listing.images).size === listing.images.length) score += 1;
  if (listing.ownerResponseRate >= 80) score += 1;
  if (listing.scamFlags.length === 0) score += 1;
  else score -= listing.scamFlags.length * 0.5;
  return Math.max(0, Math.min(10, Math.round(score * 10) / 10));
}

export function detectScam(listing) {
  const flags = [];
  const areaAvg = areaAverages[listing.location] || 7000;
  if (listing.price < areaAvg * 0.4) {
    flags.push({ type: 'unrealistic_price', message: 'Price is suspiciously low for this area', severity: 'high' });
  }
  if (listing.images) {
    const uniqueImages = new Set(listing.images);
    if (uniqueImages.size < listing.images.length) {
      flags.push({ type: 'duplicate_images', message: 'Same image used multiple times', severity: 'medium' });
    }
  }
  const suspiciousPhonePatterns = ['00000', '11111', '12345', '99999'];
  if (suspiciousPhonePatterns.some(p => listing.ownerPhone.includes(p))) {
    flags.push({ type: 'suspicious_phone', message: 'Phone number looks suspicious', severity: 'high' });
  }
  if (!listing.ownerVerified) {
    flags.push({ type: 'unverified_owner', message: 'Owner identity not verified', severity: 'medium' });
  }
  if (listing.description && listing.description.includes('!!!')) {
    flags.push({ type: 'excessive_urgency', message: 'Listing uses excessive urgency tactics', severity: 'medium' });
  }
  if (listing.description && (listing.description.toLowerCase().includes('advance') || listing.description.toLowerCase().includes('pay now'))) {
    flags.push({ type: 'advance_payment', message: 'Demands advance payment before visit', severity: 'high' });
  }
  if (listing.totalReviews === 0 && listing.trustScore < 3) {
    flags.push({ type: 'no_history', message: 'No reviews or history available', severity: 'medium' });
  }
  if (listing.ownerResponseRate < 30) {
    flags.push({ type: 'low_response', message: 'Owner rarely responds to inquiries', severity: 'low' });
  }
  return flags;
}

export function getPriceInsight(price, location) {
  const areaAvg = areaAverages[location] || 7000;
  const diff = ((price - areaAvg) / areaAvg) * 100;
  if (diff < -30) return { label: '⚠️ Suspiciously Low', color: '#ef4444', description: `${Math.abs(Math.round(diff))}% below area average (₹${areaAvg.toLocaleString()}/mo)` };
  if (diff < -10) return { label: '🎉 Great Deal', color: '#22c55e', description: `${Math.abs(Math.round(diff))}% below area average (₹${areaAvg.toLocaleString()}/mo)` };
  if (diff <= 10) return { label: '✅ Fair Price', color: '#3b82f6', description: `Close to area average (₹${areaAvg.toLocaleString()}/mo)` };
  if (diff <= 30) return { label: '📈 Above Average', color: '#f59e0b', description: `${Math.round(diff)}% above area average (₹${areaAvg.toLocaleString()}/mo)` };
  return { label: '💰 Premium Price', color: '#ef4444', description: `${Math.round(diff)}% above area average (₹${areaAvg.toLocaleString()}/mo)` };
}

export function getTrustColor(score) {
  if (score >= 8) return '#22c55e';
  if (score >= 6) return '#f59e0b';
  if (score >= 4) return '#f97316';
  return '#ef4444';
}

export function getTrustLabel(score) {
  if (score >= 8) return 'Highly Trusted';
  if (score >= 6) return 'Moderately Trusted';
  if (score >= 4) return 'Low Trust';
  return 'Very Low Trust';
}

export function formatPrice(price) {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function getTimeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
