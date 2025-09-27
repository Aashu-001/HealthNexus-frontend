

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Adsidenav from '../Component/Adsidenav';

function Admindash() {
    const navigate = useNavigate();

    useEffect(() => {
        const isAdminLoggedIn = localStorage.getItem('admin');
        if (!isAdminLoggedIn) {
            navigate('/admin');
        }
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
                    className="px-4 py-2 bg-white text-sky-700 font-semibold rounded-lg shadow-md hover:bg-sky-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-700 focus:ring-white"
                >
                    Logout
                </button>
            </header>
            
            <div className="flex flex-1 overflow-hidden">
                <Adsidenav />
                
                {/* Main Content Area */}
                <main className="flex-1 p-6 overflow-y-auto bg-sky-50/50">
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <h2 className='text-2xl font-semibold text-gray-700 text-center'>Welcome to the Control Panel</h2>
                        {/* Dashboard content goes here */}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Admindash;