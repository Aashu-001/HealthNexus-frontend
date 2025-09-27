

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  async function adlog(e) {
    e.preventDefault();
    const user = { email, password, role };
    console.log(user);

    if (user.role === "Doctor") {
      const response = await axios.post('http://localhost:8000/api/doctor/log', user);
      if (response.data.msg === "Success") {
        localStorage.setItem("doctor", response.data.id);
        setEmail("");
        setPassword("");
        setRole("");
        navigate('/ddash');
      } else {
        window.alert("Invalid Doctor Credential");
        setPassword("");
      }
    } else if (user.role === "Patient") {
      const response = await axios.post('http://localhost:8000/api/patient/log', user);
      if (response.data.msg === "Success") {
        localStorage.setItem("patient", response.data.id);
        setEmail("");
        setPassword("");
        setRole("");
        navigate('/pdash');
      } else {
        window.alert("Invalid Patient Credential");
        setPassword("");
      }
    } else {
      window.alert("Select Valid Role");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-200 via-emerald-300 to-teal-400 px-4">
      <form
        onSubmit={adlog}
        className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md space-y-6 transform hover:scale-[1.02] transition duration-300 ease-in-out"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Welcome Back 👋</h2>
        <p className="text-center text-gray-500">Please login to continue</p>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
          >
            <option value="">Select Role</option>
            <option value="Doctor">Doctor</option>
            <option value="Patient">Patient</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 active:scale-95 transition duration-200"
        >
          Login
        </button>
  {/* ******************************************************************************** */}
        <p className="text-sm text-center text-gray-600">
          Don’t have an account? <a href="/reg" className="text-emerald-600 hover:underline">Sign up</a>
        </p>
      </form>
    </div>
  );
}

export default Login;