import { GraduationCap, Train, Hospital, ShoppingBag, Building2, MapPin } from 'lucide-react';
import styles from './LocationInsights.module.css';

const iconMap = {
  college: GraduationCap,
  metro: Train,
  hospital: Hospital,
  shopping: ShoppingBag,
  office: Building2,
};

export default function LocationInsights({ nearbyPlaces }) {
  if (!nearbyPlaces || nearbyPlaces.length === 0) return null;

  return (
    <div className={styles.wrap}>
      <h4 className={styles.title}>📍 Nearby Places</h4>
      <div className={styles.places}>
        {nearbyPlaces.map((place, i) => {
          const Icon = iconMap[place.type] || MapPin;
          return (
            <div key={i} className={styles.place}>
              <div className={styles.iconWrap} data-type={place.type}>
                <Icon size={16} />
              </div>
              <div className={styles.placeInfo}>
                <span className={styles.placeName}>{place.name}</span>
                <span className={styles.placeDistance}>{place.distance}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
