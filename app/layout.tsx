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

    handleStorageChange();
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
      <body className="bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 min-h-screen flex flex-col font-sans">
        {/* Header */}
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center border-b border-gray-200">
          <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight">
            BookMyMumbai
          </h1>
          <nav className="space-x-4 flex items-center">
            {userEmail ? (
              <>
                <span className="text-sm text-gray-700">Welcome, {userEmail}</span>
                <button
                  onClick={handleLogout}
                  className="ml-2 text-sm text-red-600 hover:text-red-700 hover:underline transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition"
              >
                Login
              </button>
            )}
          </nav>
        </header>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 text-center py-6 text-sm text-gray-500">
          © 2025 <span className="font-semibold text-blue-600">BookMyMumbai</span>. All rights reserved.
        </footer>

        {/* Auth Modal */}
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      </body>
    </html>
  );
}