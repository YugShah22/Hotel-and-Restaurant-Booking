'use client';
import { useState } from 'react';

type RegisterFormProps = {
  onSuccess?: () => void;
};

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleRegister = async () => {
    // ✅ Basic email validation
    if (!email.includes('@')) {
      setStatus('Please enter a valid email address');
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('userEmail', email); // ✅ store email
        setStatus('Registered successfully!');
        onSuccess?.(); // ✅ close modal without reload
      } else {
        setStatus(data.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto text-black">
      <input
        type="email"
        placeholder="Email address"
        className="border px-3 py-2 w-full rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border px-3 py-2 w-full rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleRegister}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Register
      </button>
      {status && <p className="text-center text-sm text-gray-600">{status}</p>}
    </div>
  );
}