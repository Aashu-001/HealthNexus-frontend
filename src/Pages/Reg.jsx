

import axios from 'axios';
import React, { useState } from 'react';

function Reg() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [altnumber, setAltnumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [bloodgrp, setBloodgrp] = useState("");
  const [address, setAddress] = useState("");

  async function regcode(e) {
    e.preventDefault();
    const patient = { name, email, password, altnumber, number, age, gender, bloodgrp, address };
    const response = await axios.post('http://localhost:8000/api/patient', patient);
    console.log(response);
    if (response.data.msg === "Success") {
      window.alert("Patient Registration Successful");
      setName("");
      setEmail("");
      setNumber("");
      setAltnumber("");
      setPassword("");
      setGender("");
      setAge("");
      setBloodgrp("");
      setAddress("");
    } else {
      window.alert("Something Went Wrong");
      setPassword("");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-200 via-emerald-300 to-teal-400 px-4">
      <form
        onSubmit={regcode}
        className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-2xl space-y-6 transform hover:scale-[1.01] transition duration-300 ease-in-out"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Patient Registration</h2>
        <p className="text-center text-gray-500">Fill the form below to create an account</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Name</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter full name" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400" />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Number</label>
            <input type="number" value={number} onChange={(e)=>setNumber(e.target.value)} placeholder="Enter phone number" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400" />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Alternate Number</label>
            <input type="number" value={altnumber} onChange={(e)=>setAltnumber(e.target.value)} placeholder="Enter alternate number" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400" />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400" />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400" />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Age</label>
            <input type="number" value={age} onChange={(e)=>setAge(e.target.value)} placeholder="Enter your age" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400" />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Gender</label>
            <select value={gender} onChange={(e)=>setGender(e.target.value)} className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400">
              <option value="">--Select Gender--</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Blood Group</label>
            <select value={bloodgrp} onChange={(e)=>setBloodgrp(e.target.value)} className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400">
              <option value="">--Select Blood Group--</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Address</label>
          <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Enter your address" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400" />
        </div>

        <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 active:scale-95 transition duration-200">
          Register
        </button>
      </form>
    </div>
  );
}

export default Reg;
