import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Adsidenav from '../Component/Adsidenav';
import axios from 'axios';

function Editpatient() {
    const navigate = useNavigate();
    const [patientData, setPatientData] = useState({
        name: '', email: '', number: '', altnumber: '',
        gender: '', age: '', bloodgrp: '', address: ''
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        const isAdminLoggedIn = localStorage.getItem('admin');
        const patientId = localStorage.getItem('editPatientId'); // Using the key from our Viewpatient component
        
        if (!isAdminLoggedIn) {
            navigate('/admin');
        } else if (!patientId) {
            navigate('/viewpatient'); // Redirect if no ID is found
        } else {
            const getPatientData = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_URL}/patient/${patientId}`);
                    if (response.data.msg === "Success") {
                        setPatientData(response.data.value);
                    }
                } catch (error) {
                    console.error("Error fetching patient data:", error);
                }
            };
            getPatientData();
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatientData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleUpdatePatient = async (e) => {
        e.preventDefault();
        const patientId = localStorage.getItem('editPatientId');
        try {
            const response = await axios.put(`${process.env.REACT_URL}/patient/${patientId}`, patientData);
            if (response.data.msg === "Success") {
                setMessage("Patient updated successfully!");
                setTimeout(() => {
                    localStorage.removeItem('editPatientId');
                    navigate('/viewpatient');
                }, 2000);
            }
        } catch (error) {
            console.error("Error updating patient:", error);
            setMessage("An error occurred while updating.");
        }
    };
    
    const handleLogout = () => {
        localStorage.removeItem('admin');
        navigate('/admin');
    };

    return (
        <div className="flex flex-col h-screen">
            <header className="h-[8vh] bg-green-800 text-white shadow-lg flex items-center justify-between px-6 z-10">
                <h1 className="text-xl font-bold">Admin Portal</h1>
                <button onClick={handleLogout} className="px-4 py-2 bg-white text-green-800 font-semibold rounded-lg shadow-md hover:bg-green-100 transition">
                    Logout
                </button>
            </header>
            <div className="flex flex-1 overflow-hidden">
                <Adsidenav />
                <main className="flex-1 overflow-y-auto bg-green-50/30">
                    <div className="w-full bg-white rounded-2xl shadow-lg flex flex-col m-6">
                        <div className="bg-green-100 p-4 border-b border-green-200">
                            <h4 className='text-2xl font-bold text-green-800 text-center'>Edit Patient Information</h4>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleUpdatePatient} className="max-w-2xl mx-auto space-y-4">
                                <input type="text" placeholder="Name" name="name" value={patientData.name} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                                <input type="email" placeholder="Email" name="email" value={patientData.email} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                                <input type="number" placeholder="Number" name="number" value={patientData.number} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                                <input type="number" placeholder="Alternate Number" name="altnumber" value={patientData.altnumber} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                                <input type="number" placeholder="Age" name="age" value={patientData.age} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                                <select name="gender" value={patientData.gender} onChange={handleInputChange} className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500'>
                                    <option value="">--Select Gender--</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                <select name="bloodgrp" value={patientData.bloodgrp} onChange={handleInputChange} className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500'>
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
                                <input type="text" placeholder="Address" name="address" value={patientData.address} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                                
                                <button type="submit" className='w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg shadow-md hover:from-green-700 hover:to-green-800 transition'>
                                    Update Patient
                                </button>
                                {message && <div className="p-3 rounded-md text-center bg-green-100 text-green-800">{message}</div>}
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Editpatient;