'use client';

import './globals.css';
import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import AuthModal from '../components/Shared/AuthModal';

export default function Layout({ children }: { children: ReactNode }) {
  const [showAuth, setShowAuth] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedEmail = localStorage.getItem('userEmail');
      setUserEmail(storedEmail);
    };

    handleStorageChange(); // initial check
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setUserEmail(null);
    window.location.reload();
  };

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">Mumbai Booking Hub</h1>
          <nav className="space-x-4 flex items-center">
            {userEmail ? (
              <>
                <span className="text-sm text-gray-700">Welcome, {userEmail}</span>
                <button
                  onClick={handleLogout}
                  className="ml-2 text-red-600 hover:underline text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="text-blue-600 hover:underline"
              >
                Login
              </button>
            )}
          </nav>
        </header>

        <main>{children}</main>

        <footer className="bg-white border-t text-center py-6 text-sm text-gray-500">
          © 2025 Mumbai Booking Hub. All rights reserved.
        </footer>

        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      </body>
    </html>
  );
}