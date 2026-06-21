


import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dsidenav from '../Component/Dsidenav';

function Dappointment() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const getPendingAppointments = useCallback(async () => {
        setLoading(true);
        try {
            const doctorId = localStorage.getItem("doctor");
            if (!doctorId) {
                navigate('/login');
                return;
            }
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/app/d/${doctorId}`);
            if (response.data.msg === "Success") {
                const pending = response.data.value.filter(app => app.status === "pending");
                setAppointments(pending);
            }
        } catch (error) {
            console.error("Error fetching appointments:", error);
            setMessage("Failed to load appointments.");
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        getPendingAppointments();
    }, [getPendingAppointments]);
    
    const handleUpdateStatus = async (id, status) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/app/${id}`, { status });
            if (response.data.msg === "Success") {
                // Refresh the list after a successful update
                getPendingAppointments();
                setMessage(`Appointment successfully ${status}.`);
                setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
            }
        } catch (error) {
            console.error(`Error updating appointment to ${status}:`, error);
            setMessage("An error occurred. Please try again.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("doctor");
        navigate('/login');
    };

    return (
        <>
            {/* Header with a dark green theme */}
            <div className="flex items-center h-[8vh] bg-green-800 text-white px-4 shadow-md">
                <h4 className="text-xl font-semibold">Doctor Dashboard</h4>
                <button 
                    onClick={handleLogout} 
                    className='ml-auto px-4 py-2 bg-white text-green-800 font-semibold rounded-lg hover:bg-gray-200 transition duration-300'
                >
                    Logout
                </button>
            </div>

            {/* Main content area */}
            <div className="flex p-4 h-[92vh] bg-green-50">
                <Dsidenav />
                
                <div className="w-10/12 ml-auto bg-white rounded-2xl shadow-lg p-6 overflow-y-auto">
                    <h4 className='mb-6 text-2xl font-bold text-gray-700'>Pending Appointment Requests</h4>
                    
                    {message && <div className="p-3 mb-4 rounded-md text-center bg-green-100 text-green-800">{message}</div>}

                    <div className="overflow-x-auto">
                        {loading ? (
                            <p className="text-center text-gray-500">Loading requests...</p>
                        ) : appointments.length > 0 ? (
                            <table className='w-full text-left table-auto'>
                                <thead className='bg-green-100 text-green-800'>
                                    <tr>
                                        <th className="px-4 py-3 font-semibold">S.No</th>
                                        <th className="px-4 py-3 font-semibold">Patient Name</th>
                                        <th className="px-4 py-3 font-semibold">Date & Slot</th>
                                        <th className="px-4 py-3 font-semibold">Reason</th>
                                        <th className="px-4 py-3 font-semibold text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((app, i) => (
                                        <tr key={app._id} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="px-4 py-3">{i + 1}</td>
                                            <td className="px-4 py-3">{app.pid.name}</td>
                                            <td className="px-4 py-3">{app.date} ({app.slot})</td>
                                            <td className="px-4 py-3">{app.desc}</td>
                                            <td className="px-4 py-3 text-center"> {/* Centered buttons */}
                                                <div className="flex justify-center space-x-2"> {/* Flex container for buttons */}
                                                    <button 
                                                        onClick={() => handleUpdateStatus(app._id, 'confirmed')}
                                                        className='px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg shadow-md hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300'
                                                    >
                                                        Accept
                                                    </button>
                                                    <button 
                                                        onClick={() => handleUpdateStatus(app._id, 'cancelled')}
                                                        className='px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg shadow-md hover:from-red-700 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300'
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center text-gray-500 mt-8">You have no pending appointment requests.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dappointment;
