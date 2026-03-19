import { useState } from 'react';
import { Calendar, Clock, X, CheckCircle2 } from 'lucide-react';
import styles from './ScheduleVisitModal.module.css';

export default function ScheduleVisitModal({ listing, isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: form, 2: success
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: listing.id,
          date,
          timeSlot: time,
          phone
        }),
      });

      if (res.ok) {
        setStep(2);
      } else {
        alert('Failed to schedule visit. Please try again.');
      }
    } catch (error) {
      alert('An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setDate('');
    setTime('');
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={handleClose}>
          <X size={20} />
        </button>

        {step === 1 ? (
          <>
            <div className={styles.header}>
              <h2>Schedule a Visit</h2>
              <p>Visit {listing?.name} before you pay anything. No advance required.</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Select Date</label>
                <div className={styles.inputWrap}>
                  <Calendar size={18} className={styles.icon} />
                  <input 
                    type="date" 
                    className="input" 
                    required 
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]} // Today onwards
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Select Time</label>
                <div className={styles.inputWrap}>
                  <Clock size={18} className={styles.icon} />
                  <select 
                    className="input" 
                    required
                    value={time}
                    onChange={e => setTime(e.target.value)}
                  >
                    <option value="">Choose a time slot...</option>
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                    <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                    <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                  </select>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Your Phone Number</label>
                <input 
                  type="tel" 
                  className="input" 
                  placeholder="+91 XXXXX XXXXX" 
                  required 
                  pattern="[+0-9\s]{10,14}"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>

              <div className={styles.trustNote}>
                <CheckCircle2 size={14} color="#10b981" />
                <span>Your number is only shared with verified owners.</span>
              </div>

              <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={isLoading}>
                {isLoading ? 'Confirming...' : 'Confirm Visit Request'}
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successState}>
            <div className={styles.successIcon}>
              <CheckCircle2 size={48} color="#10b981" />
            </div>
            <h2>Visit Scheduled!</h2>
            <p className={styles.successMsg}>
              Your visit to <strong>{listing?.name}</strong> is confirmed for <strong>{date}</strong> at <strong>{time}</strong>.
            </p>
            <p className={styles.ownerMsg}>
              The owner, {listing?.ownerName || 'the manager'}, will contact you shortly to confirm the exact location.
            </p>
            <button className="btn btn-outline" onClick={handleClose} style={{ marginTop: '1.5rem', width: '100%' }}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
