'use client'; // Add this line to mark the file as a client component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Friendslist from '@/app/auth/friendslist/page';

export default function Homee() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("tokentokentoken", token);
    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  if (!isAuthenticated) {  
    return <div>Loading...</div>;
  }

  return (
    <Friendslist />
    // <div style={{ padding: '20px' }}>
    //   <h1>Welcome to the App!</h1>
    //   <p>You are successfully logged in.</p>
    //   <button onClick={handleLogout}>Logout</button>
    // </div>
  );
}
