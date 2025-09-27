

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Adsidenav from '../Component/Adsidenav';
import axios from 'axios';

function Viewfeed() {
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);

    const getFeedback = useCallback(async () => {
        setLoading(true);
        try {
            // NOTE: You will need to create this API endpoint in your backend
            const response = await axios.get(`${process.env.REACT_URL}/feedback`);
            if (response.data.msg === "Success") {
                setFeedback(response.data.value);
            }
        } catch (error) {
            console.error("Error fetching feedback:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const isAdminLoggedIn = localStorage.getItem('admin');
        if (!isAdminLoggedIn) {
            navigate('/admin');
        } else {
            getFeedback();
        }
    }, [navigate, getFeedback]);

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
                            <h4 className='text-2xl font-bold text-sky-800 text-center'>View User Feedback</h4>
                        </div>
                        <div className="p-6">
                            {loading ? (
                                <p className="text-center text-gray-500">Loading feedback...</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className='w-full text-left table-auto'>
                                        <thead className='bg-gray-50 text-gray-600 uppercase text-sm'>
                                            <tr>
                                                <th className="px-4 py-3 font-semibold">Name</th>
                                                <th className="px-4 py-3 font-semibold">Email</th>
                                                <th className="px-4 py-3 font-semibold">Message</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {feedback.map((item) => (
                                                <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50">
                                                    <td className="px-4 py-3">{item.name}</td>
                                                    <td className="px-4 py-3">{item.email}</td>
                                                    <td className="px-4 py-3 whitespace-pre-wrap">{item.message}</td>
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

export default Viewfeed;