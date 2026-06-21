import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Adsidenav() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/admindash', label: 'Dashboard' },
        { path: '/addoc', label: 'Add Doctor' },
        { path: '/viewdoc', label: 'View Doctor' },
        { path: '/adpatient', label: 'Add Patient' },
        { path: '/viewpatient', label: 'View Patient' },
        { path: '/viewapp', label: 'View Appointment' },
        { path: '/viewfeed', label: 'View Feedback' },
        { path: '/viewenquiry', label: 'View Enquiry' },
        { path: '/adnews', label: 'Add News' },
    ];

    return (
        <div className="w-2/12 min-w-[180px] h-full bg-white text-gray-800 rounded-2xl shadow-lg p-4 flex flex-col overflow-y-auto">
            <h5 className="text-lg font-bold mb-6 text-center text-sky-800">Admin Menu</h5>
            <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                            isActive(link.path)
                                ? 'bg-sky-100 text-sky-800'
                                : 'text-gray-600 hover:bg-sky-50 hover:text-sky-800'
                        }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
}

export default Adsidenav;