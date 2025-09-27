

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Adsidenav from '../Component/Adsidenav';
import axios from 'axios';

function Viewapp() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Corrected validation and data fetching
    useEffect(() => {
        const isAdminLoggedIn = localStorage.getItem('admin');
        if (!isAdminLoggedIn) {
            navigate('/admin');
            return; // Stop execution if not logged in
        }

        const fetchAppointments = async () => {
            try {
                // You'll need to create this API endpoint in your backend
                const response = await axios.get(`${process.env.REACT_URL}/app/all`);
                if (response.data.msg === "Success") {
                    setAppointments(response.data.value);
                }
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [navigate]);

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
                            <h4 className='text-2xl font-bold text-sky-800 text-center'>View All Appointments</h4>
                        </div>
                        <div className="p-6">
                            {loading ? (
                                <p className="text-center text-gray-500">Loading appointments...</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className='w-full text-left table-auto'>
                                        <thead className='bg-gray-50 text-gray-600 uppercase text-sm'>
                                            <tr>
                                                <th className="px-4 py-3 font-semibold">Patient Name</th>
                                                <th className="px-4 py-3 font-semibold">Doctor Name</th>
                                                <th className="px-4 py-3 font-semibold">Date & Slot</th>
                                                <th className="px-4 py-3 font-semibold">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments.map((app) => (
                                                <tr key={app._id} className="border-b border-gray-200 hover:bg-gray-50">
                                                    <td className="px-4 py-3">{app.pid.name}</td>
                                                    <td className="px-4 py-3">{app.did.name}</td>
                                                    <td className="px-4 py-3">{app.date} ({app.slot})</td>
                                                    <td className="px-4 py-3">
                                                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                                            app.status === 'confirmed' ? 'bg-green-200 text-green-900' :
                                                            app.status === 'cancelled' ? 'bg-red-200 text-red-900' :
                                                            app.status === 'completed' ? 'bg-blue-200 text-blue-900' :
                                                            'bg-yellow-200 text-yellow-900' // pending
                                                        }`}>
                                                            {app.status}
                                                        </span>
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

export default Viewapp;