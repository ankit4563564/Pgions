'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Eye, EyeOff, Shield } from 'lucide-react';
import styles from './page.module.css';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState('signup'); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (mode === 'signup') {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          // Immediately log them in
          const result = await signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password,
          });
          if (result?.error) {
            setError(result.error);
          } else {
            window.location.href = '/search';
          }
        } else {
          setError(await res.text() || 'Registration failed');
        }
      } else {
        // Login mode
        const result = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (result?.error) {
          setError(result.error);
        } else {
          window.location.href = '/search';
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.authWrapper}>
          <div className={styles.authCard}>
            <div className={styles.header}>
              <div className={styles.logoWrap}>
                <Shield size={24} color="var(--primary)" />
              </div>
              <h2>{mode === 'signup' ? 'Create an Account' : 'Welcome Back'}</h2>
              <p>{mode === 'signup' ? 'Join Pgions to book visits and chat with roommates.' : 'Log in to continue your search.'}</p>
            </div>

            {error && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

            <form onSubmit={handleSubmit} className={styles.form}>
              {mode === 'signup' && (
                <div className={styles.inputGroup}>
                  <label>Full Name</label>
                  <input type="text" name="name" onChange={handleChange} value={formData.name} className="input" placeholder="Enter your full name" required />
                </div>
              )}
              
              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <input type="email" name="email" onChange={handleChange} value={formData.email} className="input" placeholder="you@example.com" required />
              </div>

              <div className={styles.inputGroup}>
                <label>Password</label>
                <div className={styles.passwordWrapper}>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    className={`input ${styles.passwordInput}`} 
                    placeholder={mode === 'signup' ? "Create a strong password" : "Enter password"} 
                    required 
                  />
                  <button type="button" className={styles.eyeBtn} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={isLoading}>
                {isLoading ? 'Processing...' : (mode === 'signup' ? 'Sign Up' : 'Log In')}
              </button>
            </form>

            <div className={styles.footer}>
              {mode === 'signup' ? (
                <p>Already have an account? <button onClick={() => setMode('login')} className={styles.linkBtn}>Log in</button></p>
              ) : (
                <p>Don't have an account? <button onClick={() => setMode('signup')} className={styles.linkBtn}>Sign up</button></p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
