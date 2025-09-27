

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Dsidenav() {
    const location = useLocation();

    // Helper to determine the active link
    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/ddash', label: 'Dashboard' },
        { path: '/penapp', label: 'Pending Appointments' },
        { path: '/conapp', label: 'Confirmed Appointments' },
        { path: '/comapp', label: 'Completed Appointments' },
        { path: '/canapp', label: 'Cancelled Appointments' },
    ];

    return (
        // Sidenav container with a light background
        <div className="w-2/12 h-full bg-white text-gray-800 rounded-2xl shadow-lg p-4 flex flex-col">
            <h5 className="text-lg font-bold mb-6 text-center text-green-800">Doctor Menu</h5>
            <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                            isActive(link.path)
                                ? 'bg-green-100 text-green-800' // Style for the active link
                                : 'text-gray-600 hover:bg-green-50 hover:text-green-800' // Style for inactive links
                        }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
}

export default Dsidenav;