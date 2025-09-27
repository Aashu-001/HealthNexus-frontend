

import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ to, icon, title, description, color }) => (
    <Link 
        to={to} 
        className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
        <div className={`text-4xl mb-4 text-${color}-600`}>{icon}</div>
        <h3 className={`text-xl font-semibold text-gray-800 mb-2`}>{title}</h3>
        <p className="text-gray-600">{description}</p>
    </Link>
);

function ServicesSection() {
    return (
        <section id="services" className="py-16 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-800">Your Portal to Health Management</h2>
                    <p className="text-gray-600 mt-2">Access your dashboard and manage appointments with ease.</p>
                </div>

                {/* The main grid now includes a central column for the partition */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] lg:gap-12 items-start">
                    
                    {/* == For Doctors Section == */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-6 text-center">For Doctors</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ServiceCard 
                                to="/penapp" 
                                icon="⏳" 
                                title="Pending Appointments" 
                                description="Review and respond to new patient requests."
                                color="yellow"
                            />
                            <ServiceCard 
                                to="/conapp" 
                                icon="✅" 
                                title="Confirmed Appointments" 
                                description="View your upcoming scheduled consultations."
                                color="green"
                            />
                            <ServiceCard 
                                to="/comapp" 
                                icon="🏁" 
                                title="Completed Appointments" 
                                description="Access the history of your past consultations."
                                color="blue"
                            />
                            <ServiceCard 
                                to="/canapp" 
                                icon="❌" 
                                title="Cancelled Appointments" 
                                description="See a list of all cancelled appointments."
                                color="red"
                            />
                        </div>
                    </div>

                    {/* == Vertical Partition Line == */}
                    {/* This div acts as the visual separator. It's hidden on small screens. */}
                    <div className="hidden lg:block w-px h-full bg-gray-200 self-stretch mx-auto"></div>

                    {/* == For Patients Section == */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-6 text-center">For Patients</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ServiceCard 
                                to="/papp" 
                                icon="🗓️" 
                                title="My Appointments" 
                                description="View and manage all your scheduled appointments."
                                color="purple"
                            />
                            <ServiceCard 
                                to="/preqapp" 
                                icon="➕" 
                                title="Request Appointment" 
                                description="Find a doctor and book a new appointment today."
                                color="teal"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ServicesSection;