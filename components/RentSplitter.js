'use client';
import { useState, useEffect } from 'react';
import { Users, Info, Check, AppWindow as WindowIcon, Bath, Wind } from 'lucide-react';
import styles from './RentSplitter.module.css';

const PERKS = [
  { id: 'window', name: 'Window Bed', icon: WindowIcon, premium: 500 },
  { id: 'washroom', name: 'Attached Washroom', icon: Bath, premium: 1000 },
  { id: 'ac', name: 'AC / Cooler Space', icon: Wind, premium: 800 },
];

export default function RentSplitter({ totalRent }) {
  const [numPeople, setNumPeople] = useState(2);
  const [peoplePerks, setPeoplePerks] = useState({
    1: [], 2: [], 3: []
  });
  const [shares, setShares] = useState({});

  useEffect(() => {
    calculateShares();
  }, [numPeople, peoplePerks, totalRent]);

  const togglePerk = (personId, perkId) => {
    setPeoplePerks(prev => {
      const current = prev[personId];
      const next = current.includes(perkId) 
        ? current.filter(id => id !== perkId)
        : [...current, perkId];
      
      return { ...prev, [personId]: next };
    });
  };

  const calculateShares = () => {
    const rent = parseFloat(totalRent) || 0;
    let totalPremiums = 0;
    
    // Calculate total premiums across all people
    for (let i = 1; i <= numPeople; i++) {
      peoplePerks[i].forEach(perkId => {
        const perk = PERKS.find(p => p.id === perkId);
        if (perk) totalPremiums += perk.premium;
      });
    }

    const baseRent = (rent - totalPremiums) / numPeople;
    const newShares = {};

    for (let i = 1; i <= numPeople; i++) {
      let personPremium = 0;
      peoplePerks[i].forEach(perkId => {
        const perk = PERKS.find(p => p.id === perkId);
        if (perk) personPremium += perk.premium;
      });
      newShares[i] = Math.round(baseRent + personPremium);
    }

    setShares(newShares);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h3>💸 Fair Rent Splitter</h3>
          <p>Divide rent based on who gets the perks!</p>
        </div>
        <div className={styles.peopleToggle}>
          {[2, 3].map(n => (
            <button 
              key={n}
              className={numPeople === n ? styles.activeTab : ''}
              onClick={() => setNumPeople(n)}
            >
              <Users size={16} /> {n} People
            </button>
          ))}
        </div>
      </div>

      <div className={styles.splitterGrid}>
        {[...Array(numPeople)].map((_, i) => {
          const personId = i + 1;
          return (
            <div key={personId} className={styles.personCard}>
              <div className={styles.personHeader}>
                <div className={styles.avatar}>P{personId}</div>
                <div className={styles.shareInfo}>
                  <span className={styles.label}>Fair Share</span>
                  <span className={styles.value}>₹{shares[personId]?.toLocaleString()}</span>
                </div>
              </div>

              <div className={styles.perksList}>
                {PERKS.map(perk => (
                  <button
                    key={perk.id}
                    className={`${styles.perkBtn} ${peoplePerks[personId].includes(perk.id) ? styles.activePerk : ''}`}
                    onClick={() => togglePerk(personId, perk.id)}
                  >
                    <perk.icon size={14} />
                    <span>{perk.name}</span>
                    <span className={styles.premium}>+₹{perk.premium}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.footerNote}>
        <Info size={14} />
        <span>Base rent is reduced for everyone to account for these specific premiums fairly.</span>
      </div>
    </div>
  );
}
