




import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Adlogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const admin = { email, password };
      const response = await axios.post(
        `${process.env.REACT_URL}/admin/log`,
        admin
      );

      if (response.data.msg === 'Success') {
        
        localStorage.setItem('admin', 'true'); // Use a simple flag
        navigate('/Admindash');
      } else {
        setError(response.data.msg || 'Invalid credentials. Please try again.');
        setPassword('');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Admin Portal</h2>
          <p className="text-gray-500">Access the HealthNexus control panel</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-sky-600 to-sky-700 text-white font-bold rounded-lg shadow-md hover:from-sky-700 hover:to-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-300"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-sky-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Adlogin;