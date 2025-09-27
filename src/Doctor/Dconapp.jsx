


import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dsidenav from '../Component/Dsidenav';

function Dconapp() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const getConfirmedAppointments = useCallback(async () => {
        // ... (logic remains the same)
        setLoading(true);
        try {
            const doctorId = localStorage.getItem("doctor");
            if (!doctorId) {
                navigate('/login');
                return;
            }
            const response = await axios.get(`http://localhost:8000/api/app/d/${doctorId}`);
            if (response.data.msg === "Success") {
                const confirmed = response.data.value.filter(app => app.status === "confirmed");
                setAppointments(confirmed);
            }
        } catch (error) {
            console.error("Error fetching appointments:", error);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        getConfirmedAppointments();
    }, [getConfirmedAppointments]);

    const handleMarkAsCompleted = async (id) => {
        // ... (logic remains the same)
        try {
            const response = await axios.put(`http://localhost:8000/api/app/${id}`, { "status": "completed" });
            if (response.data.msg === "Success") {
                setMessage("Appointment marked as completed successfully.");
                getConfirmedAppointments(); // Refresh the list
                setTimeout(() => setMessage(""), 3000);
            }
        } catch (error) {
            console.error("Error completing appointment:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("doctor");
        navigate('/login');
    };

    return (
        <>
            {/* Top bar is back to dark green */}
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
                
                <div className="w-10/12 ml-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
                    {/* NEW: Light green title bar */}
                    <div className="bg-green-100 p-4 border-b border-green-200">
                        <h4 className='text-2xl font-bold text-green-800 text-center'>Confirmed Appointments</h4>
                    </div>
                    
                    <div className="p-6 flex-grow overflow-y-auto">
                        {message && <div className="p-3 mb-4 rounded-md text-center bg-green-100 text-green-800">{message}</div>}

                        <div className="overflow-x-auto">
                            {loading ? (
                                <p className="text-center text-gray-500">Loading appointments...</p>
                            ) : appointments.length > 0 ? (
                                <table className='w-full text-left table-auto'>
                                    {/* Table Head remains the same */}
                                    <thead className='bg-gray-50 text-gray-600 uppercase text-sm'>
                                        <tr>
                                            <th className="px-4 py-3 font-semibold">S.No</th>
                                            <th className="px-4 py-3 font-semibold">Patient Name</th>
                                            <th className="px-4 py-3 font-semibold">Date & Slot</th>
                                            <th className="px-4 py-3 font-semibold">Status</th>
                                            <th className="px-4 py-3 font-semibold text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointments.map((app, i) => (
                                            <tr key={app._id} className="border-b border-gray-200 hover:bg-gray-50">
                                                <td className="px-4 py-3">{i + 1}</td>
                                                <td className="px-4 py-3">{app.pid.name}</td>
                                                <td className="px-4 py-3">{app.date} ({app.slot})</td>
                                                <td className="px-4 py-3">
                                                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-200 text-green-900">
                                                        {app.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <button 
                                                        onClick={() => handleMarkAsCompleted(app._id)}
                                                        className='px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300'
                                                    >
                                                        Mark as Completed
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-center text-gray-500 mt-8">No confirmed appointments found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dconapp;