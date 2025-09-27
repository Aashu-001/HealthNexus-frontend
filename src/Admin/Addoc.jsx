

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Adsidenav from '../Component/Adsidenav';
import axios from 'axios';

function Addoc() {
    const navigate = useNavigate();
    // Form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("");
    const [qua, setQua] = useState("");
    const [exp, setExp] = useState("");
    const [address, setAddress] = useState("");
    const [spe, setSpe] = useState("");
    // UI state
    const [message, setMessage] = useState({ text: "", isError: false });

    // Corrected validation logic
    useEffect(() => {
        const isAdminLoggedIn = localStorage.getItem('admin');
        if (!isAdminLoggedIn) {
            navigate('/admin');
        }
    }, [navigate]);

    const clearForm = () => {
        setName("");
        setEmail("");
        setMobile("");
        setGender("");
        setPassword("");
        setExp("");
        setSpe("");
        setAddress("");
        setQua("");
    };

    const handleAddDoctor = async (e) => {
        e.preventDefault();
        const doctorData = { name, email, gender, "number": mobile, password, qua, exp, spe, address };
        
        try {
            const response = await axios.post('http://localhost:8000/api/doctor', doctorData);
            if (response.data.msg === "Success") {
                setMessage({ text: "Doctor added successfully!", isError: false });
                clearForm();
            } else {
                setMessage({ text: "Something went wrong. Please try again.", isError: true });
            }
        } catch (error) {
            console.error("Error adding doctor:", error);
            setMessage({ text: "An error occurred. Please try again.", isError: true });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin');
        navigate('/admin');
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Full-width blue header bar */}
            <header className="h-[8vh] bg-sky-700 text-white shadow-lg flex items-center justify-between px-6 z-10">
                <h1 className="text-xl font-bold">Admin Portal</h1>
                <button 
                    onClick={handleLogout} 
                    className="px-4 py-2 bg-white text-sky-700 font-semibold rounded-lg shadow-md hover:bg-sky-100 transition duration-300"
                >
                    Logout
                </button>
            </header>
            
            <div className="flex flex-1 overflow-hidden">
                <Adsidenav />
                
                <main className="flex-1 overflow-y-auto bg-sky-50/50">
                    <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col m-6">
                        <div className="bg-sky-100 p-4 border-b border-sky-200">
                            <h4 className='text-2xl font-bold text-sky-800 text-center'>Add New Doctor</h4>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleAddDoctor} className="max-w-2xl mx-auto space-y-4">
                                {/* Form fields here, styled with Tailwind CSS */}
                                <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500" />
                                <input type="number" placeholder="Enter Mobile No." value={mobile} onChange={(e) => setMobile(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500" />
                                <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500" />
                                <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500" />
                                <select value={gender} onChange={(e) => setGender(e.target.value)} required className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500'>
                                    <option value="">--Select Gender--</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                <input type="text" placeholder="Qualification" value={qua} onChange={(e) => setQua(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500" />
                                <input type="text" placeholder="Experience" value={exp} onChange={(e) => setExp(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500" />
                                <input type="text" placeholder="Speciality" value={spe} onChange={(e) => setSpe(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500" />
                                <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500" />
                                <button type="submit" className='w-full py-3 px-4 bg-gradient-to-r from-sky-600 to-sky-700 text-white font-bold rounded-lg shadow-md hover:from-sky-700 hover:to-sky-800 transition duration-300'>
                                    Add Doctor
                                </button>
                                {message.text && (
                                    <div className={`p-3 rounded-md text-center ${message.isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                        {message.text}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
   
    );
}

export default Addoc;