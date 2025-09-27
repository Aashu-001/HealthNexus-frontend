

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Adsidenav from '../Component/Adsidenav';
import axios from 'axios';

function Viewdoc() {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const getDoctors = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_URL}/doctor`);
            if (response.data.msg === "Success") {
                setDoctors(response.data.value);
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const isAdminLoggedIn = localStorage.getItem('admin');
        if (!isAdminLoggedIn) {
            navigate('/admin');
        } else {
            getDoctors();
        }
    }, [navigate, getDoctors]);

    const handleDeleteDoctor = async (id) => {
        // Add a confirmation step to prevent accidental deletion
        if (window.confirm("Are you sure you want to delete this doctor?")) {
            try {
                const response = await axios.delete(`${process.env.REACT_URL}/doctor/${id}`);
                if (response.data.msg === "Success") {
                    setMessage("Doctor deleted successfully.");
                    getDoctors(); // Refresh the list
                    setTimeout(() => setMessage(""), 3000);
                }
            } catch (error) {
                console.error("Error deleting doctor:", error);
                setMessage("An error occurred. Please try again.");
            }
        }
    };

    const handleEditDoctor = (id) => {
        localStorage.setItem('editDoctorId', id);
        navigate('/editdoc');
    };

    const handleLogout = () => {
        localStorage.removeItem('admin');
        navigate('/admin');
    };

    return (
        <div className="flex flex-col h-screen">
            <header className="h-[8vh] bg-sky-700 text-white shadow-lg flex items-center justify-between px-6 z-10">
                <h1 className="text-xl font-bold">Admin Portal</h1>
                <button 
                    onClick={handleLogout} 
                    className="px-4 py-2 bg-white text-sky-700 font-semibold rounded-lg shadow-md hover:bg-sky-100 transition"
                >
                    Logout
                </button>
            </header>
            
            <div className="flex flex-1 overflow-hidden">
                <Adsidenav />
                
                <main className="flex-1 overflow-y-auto bg-sky-50/50">
                    <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col m-6">
                        <div className="bg-sky-100 p-4 border-b border-sky-200">
                            <h4 className='text-2xl font-bold text-sky-800 text-center'>Manage Doctors</h4>
                        </div>
                        <div className="p-6">
                            {message && <div className="p-3 mb-4 rounded-md text-center bg-green-100 text-green-800">{message}</div>}
                            {loading ? (
                                <p className="text-center text-gray-500">Loading doctors...</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className='w-full text-left table-auto'>
                                        <thead className='bg-gray-50 text-gray-600 uppercase text-sm'>
                                            <tr>
                                                <th className="px-4 py-3 font-semibold">Name</th>
                                                <th className="px-4 py-3 font-semibold">Email</th>
                                                <th className="px-4 py-3 font-semibold">Specialty</th>
                                                <th className="px-4 py-3 font-semibold text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {doctors.map((doc) => (
                                                <tr key={doc._id} className="border-b border-gray-200 hover:bg-gray-50">
                                                    <td className="px-4 py-3">{doc.name}</td>
                                                    <td className="px-4 py-3">{doc.email}</td>
                                                    <td className="px-4 py-3">{doc.spe}</td>
                                                    <td className="px-4 py-3 text-center">
                                                        <div className="flex justify-center space-x-2">
                                                            <button 
                                                                onClick={() => handleEditDoctor(doc._id)}
                                                                className='px-3 py-1 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition'
                                                            >
                                                                Edit
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDeleteDoctor(doc._id)}
                                                                className='px-3 py-1 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition'
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Viewdoc;