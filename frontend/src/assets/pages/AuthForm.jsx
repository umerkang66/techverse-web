import axios from 'axios';
import React, { useState } from 'react';

export default function AuthForm({ mode, onClose, onSuccess }) {
  const [form, setForm] = useState({ username: '', password: '', role: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { username, email, password, passwordConfirm, role } = form;
    if (
      !username ||
      !email ||
      !password ||
      !passwordConfirm ||
      (mode === 'signup' && !role)
    ) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      if (mode === 'signup') {
        const response = await axios.post(
          'http://10.56.92.1:3000/users/signup',
          {
            name: username,
            email,
            password,
            passwordConfirm,
            role,
          },
          {
            withCredentials: true,
          }
        );

        console.log('Signup successful:', response);
        onSuccess();
      } else {
        const response = await fetch('http://10.56.92.1:3000/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) throw new Error('Login failed');

        const result = await response.json();
        localStorage.setItem('user', JSON.stringify(result));
        onSuccess();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a1a2e] p-6 rounded-lg w-[90%] max-w-md shadow-xl"
      >
        <h2 className="text-2xl text-center font-bold text-[#00ffff] mb-4">
          {mode === 'signup' ? 'Sign Up' : 'Sign In'}
        </h2>

        {mode === 'signup' && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full mb-3 p-2 rounded bg-[#0f0f1a] text-white border border-[#00ffff] focus:outline-none focus:ring-2 focus:ring-[#00ffff]"
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-[#0f0f1a] text-white border border-[#00ffff] focus:outline-none focus:ring-2 focus:ring-[#00ffff]"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-[#0f0f1a] text-white border border-[#00ffff] focus:outline-none focus:ring-2 focus:ring-[#00ffff]"
          required
        />
        {mode === 'signup' && (
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Re-Enter Password"
            value={form.passwordConfirm}
            onChange={handleChange}
            className="w-full mb-3 p-2 rounded bg-[#0f0f1a] text-white border border-[#00ffff] focus:outline-none focus:ring-2 focus:ring-[#00ffff]"
            required
          />
        )}

        {mode === 'signup' && (
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full mb-3 p-2 rounded bg-[#0f0f1a] text-white border border-[#00ffff] focus:outline-none focus:ring-2 focus:ring-[#00ffff]"
            required
          >
            <option value="">Select Role</option>
            <option value="user">user</option>
            <option value="faculty">faculty</option>
            <option value="security-staff">security-staff</option>
          </select>
        )}

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#ff00ff] text-white rounded font-semibold hover:bg-pink-600"
        >
          {mode === 'signup' ? 'Sign Up' : 'Sign In'}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full mt-3 text-sm text-center text-[#00ffff] underline"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
