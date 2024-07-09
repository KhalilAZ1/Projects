// src/LogoutButton.tsx
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Button } from '@/components/ui/button';

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully');
    } catch (error: any) {
      console.error('Error logging out:', error.message);
      alert(`Error logging out: ${error.message}`);
    }
  };

  return (
    <Button onClick={handleLogout}>Logout</Button>
  );
};

export default LogoutButton;