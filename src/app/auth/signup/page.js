// src/app/auth/signup/page.js
'use client';
import { useState } from 'react';
import SignupForm from '@/components/SignupForm';
import styles from '@/styles/signup.module.css';

export default function Signup() {
  const [error, setError] = useState('');

  const handleSignup = async (email, password) => {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = '/auth/login'; // Redirect to login page after successful signup
    } else {
      setError(data.message || 'Signup failed');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Signup</h1>
      {error && <p className={styles.error}>{error}</p>}
      <SignupForm onSignup={handleSignup} />
    </div>
  );
}
