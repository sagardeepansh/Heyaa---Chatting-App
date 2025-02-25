// src/app/auth/login/page.js
'use client';
import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import styles from '@/styles/login.module.css';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (email, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });


    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token); // Store token
      document.cookie = `token=${data.token}; path=/; Secure; HttpOnly`;
      // window.location.href = '/'; // Redirect to home or dashboard
      router.push('/auth/home'); 
    } else {
      setError(data.message || 'Login failed');
    }
  };

  return (
    <div className={styles.container}>
      {/* {error && <p className={styles.error}>{error}</p>} */}
      <LoginForm onLogin={handleLogin} error={error} />
    </div>
  );
}
