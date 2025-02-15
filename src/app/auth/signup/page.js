// src/app/auth/signup/page.js
'use client';
import { useState } from 'react';
import SignupForm from '@/components/SignupForm';
import styles from '@/styles/signup.module.css';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (fullname, email, password) => {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullname, email, password }),
    });

    const data = await response;

    console.log("", data);

    if (response.ok) {
      router.push('/auth/login'); 
      // window.location.href = '/auth/login'; // Redirect to login page after successful signup
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
