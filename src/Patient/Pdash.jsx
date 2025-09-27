

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Psidenav from '../Component/Psidenav';

function Pdash() {
    const navigate = useNavigate();

    // This validation logic remains the same
    useEffect(() => {
        const data = localStorage.getItem('patient');
        if (!data) {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("patient");
        navigate('/login');
    };

    return (
        <>
            {/* Header with a dark green theme */}
            <div className="flex items-center h-[8vh] bg-green-800 text-white px-4 shadow-md">
                <div className="w-1/3">
                    <h4 className="text-xl font-semibold">Patient Dashboard</h4>
                </div>
                <div className="ml-auto">
                    <button 
                        onClick={handleLogout} 
                        className='px-4 py-2 bg-white text-green-800 font-semibold rounded-lg hover:bg-gray-200 transition duration-300'
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main content area with a light mint-green background */}
            <div className="flex p-4 h-[92vh] bg-green-50">
                <Psidenav />
                
                {/* Main content panel */}
                <div className="w-10/12 ml-auto bg-white rounded-2xl shadow-lg p-6 overflow-y-auto">
                    <h4 className='my-5 text-center text-3xl font-bold text-gray-700'>
                        Welcome to Your Dashboard
                    </h4>
                    {/* You can add more dashboard content here */}
                </div>
            </div>
        </>
    );
}

export default Pdash;