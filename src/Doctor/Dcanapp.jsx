


import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dsidenav from '../Component/Dsidenav';

function Dcanapp() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCancelledAppointments = useCallback(async () => {
        setLoading(true);
        try {
            const doctorId = localStorage.getItem("doctor");
            if (!doctorId) {
                navigate('/login');
                return;
            }
            const response = await axios.get(`${process.env.REACT_URL}/app/d/${doctorId}`);
            if (response.data.msg === "Success") {
                const cancelled = response.data.value.filter(app => app.status === "cancelled");
                setAppointments(cancelled);
            }
        } catch (error) {
            console.error("Error fetching appointments:", error);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        getCancelledAppointments();
    }, [getCancelledAppointments]);

    const handleLogout = () => {
        localStorage.removeItem("doctor");
        navigate('/login');
    };

    return (
        <>
            {/* Dark green top bar */}
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
                    {/* NEW: Light red title bar */}
                    <div className="bg-red-100 p-4 border-b border-red-200">
                        <h4 className='text-2xl font-bold text-red-800 text-center'>Cancelled Appointments</h4>
                    </div>
                    
                    <div className="p-6 flex-grow overflow-y-auto">
                        <div className="overflow-x-auto">
                            {loading ? (
                                <p className="text-center text-gray-500">Loading appointments...</p>
                            ) : appointments.length > 0 ? (
                                <table className='w-full text-left table-auto'>
                                    <thead className='bg-gray-50 text-gray-600 uppercase text-sm'>
                                        <tr>
                                            <th className="px-4 py-3 font-semibold">S.No</th>
                                            <th className="px-4 py-3 font-semibold">Patient Name</th>
                                            <th className="px-4 py-3 font-semibold">Date & Slot</th>
                                            <th className="px-4 py-3 font-semibold">Reason</th>
                                            <th className="px-4 py-3 font-semibold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointments.map((app, i) => (
                                            <tr key={app._id} className="border-b border-gray-200 hover:bg-gray-50">
                                                <td className="px-4 py-3">{i + 1}</td>
                                                <td className="px-4 py-3">{app.pid.name}</td>
                                                <td className="px-4 py-3">{app.date} ({app.slot})</td>
                                                <td className="px-4 py-3">{app.desc}</td>
                                                <td className="px-4 py-3">
                                                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-red-200 text-red-900">
                                                        {app.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-center text-gray-500 mt-8">No cancelled appointments found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dcanapp;