'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatModal from '@/components/ChatModal';
import { Users, Search, CheckCircle2, UserPlus, MessageSquare } from 'lucide-react';
import styles from './page.module.css';

// Mock Profiles
const potentialMatches = [
  {
    id: 'm1',
    name: 'Karan Sharma',
    age: 22,
    occupation: 'Student at Christ',
    budget: '₹8,000 - ₹12,000',
    area: 'Koramangala',
    matchScore: 92,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    traits: ['Early Bird', 'Clean', 'Vegetarian', 'Non-Smoker'],
    bio: 'Looking for a chill roommate to share a 2-sharing PG in Koramangala. I study most evenings so prefer someone relatively quiet.'
  },
  {
    id: 'm2',
    name: 'Rahul Verma',
    age: 24,
    occupation: 'SDE at Amazon',
    budget: '₹10,000 - ₹15,000',
    area: 'Indiranagar',
    matchScore: 88,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    traits: ['Night Owl', 'Clean', 'Non-Veg', 'Social'],
    bio: 'Working professional, usually busy on weekdays. Love exploring cafes on weekends. Looking for a neat roommate.'
  },
  {
    id: 'm3',
    name: 'Arjun Das',
    age: 21,
    occupation: 'Student at NIFT',
    budget: '₹6,000 - ₹10,000',
    area: 'HSR Layout',
    matchScore: 75,
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400',
    traits: ['Night Owl', 'Messy', 'Eggetarian', 'Smoker'],
    bio: 'Easy going guy. Usually working on assignments late night. Not too fussed about perfect cleanliness.'
  }
];

export default function RoommateFinder() {
  const [step, setStep] = useState('landing'); // landing, quiz, matches
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({
    budget: '',
    area: '',
    sleep: '',
    clean: '',
    food: '',
    drink: ''
  });

  const handleAnswer = (key, value) => {
    setQuizAnswers(prev => ({ ...prev, [key]: value }));
  };

  const isQuizComplete = Object.values(quizAnswers).every(a => a !== '');

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        {step === 'landing' && (
          <div className={styles.landing}>
            <div className={styles.heroContent}>
              <div className={styles.heroIconWrap}>
                <Users size={48} color="var(--primary)" />
              </div>
              <h1>Find your perfect roommate</h1>
              <p>Take our 1-minute compatibility quiz and get matched with people who share your vibe, budget, and lifestyle.</p>
              
              <div className={styles.features}>
                <div className={styles.feature}>
                  <CheckCircle2 color="#10b981" /> <span>Verified Profiles</span>
                </div>
                <div className={styles.feature}>
                  <CheckCircle2 color="#10b981" /> <span>Lifestyle Matching</span>
                </div>
                <div className={styles.feature}>
                  <CheckCircle2 color="#10b981" /> <span>Secure Chat</span>
                </div>
              </div>

              <button 
                className="btn btn-primary" 
                style={{ fontSize: '1.25rem', padding: '1rem 2.5rem', marginTop: '2rem' }}
                onClick={() => setStep('quiz')}
              >
                Take the Quiz
              </button>
            </div>
            <div className={styles.illustration}>
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800" alt="Roommates" className={styles.heroImg} />
            </div>
          </div>
        )}

        {step === 'quiz' && (
          <div className={styles.quizWrapper}>
            <div className={styles.quizHeader}>
              <h2>Let's understand your vibe</h2>
              <p>We use this to calculate your Match Score with others.</p>
            </div>

            <div className={styles.quizGrid}>
              <div className={styles.question}>
                <label>Budget Range</label>
                <div className={styles.optionsGrid}>
                  {['< ₹8,000', '₹8K - 12K', '₹12K - 18K', '> ₹18K'].map(opt => (
                    <button 
                      key={opt}
                      className={`${styles.optionBtn} ${quizAnswers.budget === opt ? styles.activeOption : ''}`}
                      onClick={() => handleAnswer('budget', opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.question}>
                <label>Preferred Area</label>
                <select 
                  className={`input ${styles.quizSelect}`}
                  value={quizAnswers.area}
                  onChange={(e) => handleAnswer('area', e.target.value)}
                >
                  <option value="">Select an area...</option>
                  <option value="Koramangala">Koramangala</option>
                  <option value="HSR Layout">HSR Layout</option>
                  <option value="Indiranagar">Indiranagar</option>
                  <option value="Whitefield">Whitefield</option>
                </select>
              </div>

              <div className={styles.question}>
                <label>Sleep Schedule</label>
                <div className={styles.optionsFlex}>
                  <button 
                    className={`${styles.optionBtn} ${quizAnswers.sleep === 'early' ? styles.activeOption : ''}`}
                    onClick={() => handleAnswer('sleep', 'early')}
                  >🌅 Early Bird</button>
                  <button 
                    className={`${styles.optionBtn} ${quizAnswers.sleep === 'late' ? styles.activeOption : ''}`}
                    onClick={() => handleAnswer('sleep', 'late')}
                  >🦉 Night Owl</button>
                </div>
              </div>

              <div className={styles.question}>
                <label>Cleanliness</label>
                <div className={styles.optionsFlex}>
                  <button 
                    className={`${styles.optionBtn} ${quizAnswers.clean === 'neat' ? styles.activeOption : ''}`}
                    onClick={() => handleAnswer('clean', 'neat')}
                  >✨ Neat freak</button>
                  <button 
                    className={`${styles.optionBtn} ${quizAnswers.clean === 'chill' ? styles.activeOption : ''}`}
                    onClick={() => handleAnswer('clean', 'chill')}
                  >🤷‍♂️ Chill/Messy</button>
                </div>
              </div>

              <div className={styles.question}>
                <label>Dietary Pref</label>
                <div className={styles.optionsGrid}>
                  {['Pure Veg', 'Eggetarian', 'Non-Veg'].map(opt => (
                    <button 
                      key={opt}
                      className={`${styles.optionBtn} ${quizAnswers.food === opt ? styles.activeOption : ''}`}
                      onClick={() => handleAnswer('food', opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.question}>
                <label>Habits</label>
                <div className={styles.optionsFlex}>
                  <button 
                    className={`${styles.optionBtn} ${quizAnswers.drink === 'no' ? styles.activeOption : ''}`}
                    onClick={() => handleAnswer('drink', 'no')}
                  >🚫 No Smoking/Drinking</button>
                  <button 
                    className={`${styles.optionBtn} ${quizAnswers.drink === 'yes' ? styles.activeOption : ''}`}
                    onClick={() => handleAnswer('drink', 'yes')}
                  >🍻 Don't mind</button>
                </div>
              </div>
            </div>

            <div className={styles.quizFooter}>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                disabled={!isQuizComplete}
                onClick={() => setStep('matches')}
              >
                {isQuizComplete ? 'Find My Matches' : 'Complete all questions'}
              </button>
            </div>
          </div>
        )}

        {step === 'matches' && (
          <div className={styles.matchesWrapper}>
            <div className={styles.matchesHeader}>
              <div className={styles.matchesTitle}>
                <h2>Your Top Matches</h2>
                <p>Based on your compatibility score. Higher is better.</p>
              </div>
              <button className="btn btn-outline" onClick={() => setStep('quiz')}>
                Edit Preferences
              </button>
            </div>

            <div className={styles.matchesGrid}>
              {potentialMatches.map(match => (
                <div key={match.id} className={styles.matchCard}>
                  <div className={styles.matchScore} style={{ 
                    backgroundColor: match.matchScore >= 90 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                    color: match.matchScore >= 90 ? '#10b981' : '#3b82f6'
                  }}>
                    {match.matchScore}% Match
                  </div>
                  
                  <div className={styles.matchProfile}>
                    <img src={match.image} alt={match.name} className={styles.matchImage} />
                    <div className={styles.matchInfo}>
                      <h3>{match.name}, {match.age}</h3>
                      <span className={styles.matchOcc}>{match.occupation}</span>
                    </div>
                  </div>

                  <div className={styles.matchDetails}>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Prefers:</span>
                      <span className={styles.detailValue}>{match.area}</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Budget:</span>
                      <span className={styles.detailValue}>{match.budget}</span>
                    </div>
                  </div>

                  <div className={styles.matchTraits}>
                    {match.traits.map(trait => (
                      <span key={trait} className={styles.traitChip}>{trait}</span>
                    ))}
                  </div>

                  <p className={styles.matchBio}>{match.bio}</p>

                  <div className={styles.matchActions}>
                    <button 
                      className="btn btn-primary" 
                      style={{ flex: 1, display: 'flex', gap: '8px', justifyContent: 'center' }}
                      onClick={() => setActiveChatUser(match)}
                    >
                      <MessageSquare size={18} /> Chat
                    </button>
                    <button className="btn btn-outline" style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <UserPlus size={18} /> Connect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <ChatModal 
        isOpen={!!activeChatUser} 
        user={activeChatUser} 
        onClose={() => setActiveChatUser(null)} 
      />

      <Footer />
    </div>
  );
}
