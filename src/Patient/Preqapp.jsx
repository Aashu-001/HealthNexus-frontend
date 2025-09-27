


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Psidenav from '../Component/Psidenav';

function Preqapp() {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [pid, setPid] = useState("");
    
    // Form state
    const [specialty, setSpecialty] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [date, setDate] = useState("");
    const [slot, setSlot] = useState("");
    const [desc, setDesc] = useState("");
    
    // UI state
    const [message, setMessage] = useState({ text: "", isError: false });

    useEffect(() => {
        // ... (logic remains the same)
        const patientId = localStorage.getItem('patient');
        if (!patientId) {
            navigate('/login');
        } else {
            setPid(patientId);
        }

        const getDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/doctor');
                if (response.data.msg === "Success") {
                    setDoctors(response.data.value);
                    setFilteredDoctors(response.data.value);
                }
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };
        getDoctors();
    }, [navigate]);

    const handleFilterDoctors = (e) => {
        // ... (logic remains the same)
        const selectedSpecialty = e.target.value;
        setSpecialty(selectedSpecialty);
        if (selectedSpecialty) {
            const filtered = doctors.filter(doc => doc.spe === selectedSpecialty);
            setFilteredDoctors(filtered);
        } else {
            setFilteredDoctors(doctors);
        }
        setDoctorId("");
    };
    
    const clearForm = () => {
        // ... (logic remains the same)
        setSpecialty("");
        setDoctorId("");
        setDate("");
        setSlot("");
        setDesc("");
        setFilteredDoctors(doctors);
    };

    const handleRequestAppointment = async (e) => {
        // ... (logic remains the same)
        e.preventDefault();
        const appointmentData = { pid, did: doctorId, date, slot, desc };
        
        try {
            const response = await axios.post('http://localhost:8000/api/app', appointmentData);
            if (response.data.msg === "Success") {
                setMessage({ text: "Appointment request sent successfully!", isError: false });
                clearForm();
            } else {
                setMessage({ text: "Something went wrong. Please try again.", isError: true });
            }
        } catch (error) {
            setMessage({ text: "An error occurred while sending your request.", isError: true });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("patient");
        navigate('/login');
    };

    return (
        <>
            {/* Dark green top bar */}
            <div className="flex items-center h-[8vh] bg-green-800 text-white px-4 shadow-md">
                <h4 className="text-xl font-semibold">Patient Dashboard</h4>
                <button 
                    onClick={handleLogout} 
                    className='ml-auto px-4 py-2 bg-white text-green-800 font-semibold rounded-lg hover:bg-gray-200 transition duration-300'
                >
                    Logout
                </button>
            </div>

            {/* Main content area */}
            <div className="flex p-4 h-[92vh] bg-green-50">
                <Psidenav />
                
                <div className="w-10/12 ml-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
                    {/* Light green title bar */}
                    <div className="bg-green-100 p-4 border-b border-green-200">
                        <h4 className='text-2xl font-bold text-green-800 text-center'>Request an Appointment</h4>
                    </div>
                    
                    <div className="p-6 flex-grow overflow-y-auto">
                        <div className="max-w-2xl mx-auto">
                            <form onSubmit={handleRequestAppointment} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Select Specialty</label>
                                    <select value={specialty} onChange={handleFilterDoctors} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                                        <option value="">-- All Specialties --</option>
                                        {[...new Set(doctors.map(d => d.spe))].map(spe => <option key={spe} value={spe}>{spe}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Select Doctor</label>
                                    <select required value={doctorId} onChange={(e) => setDoctorId(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                                        <option value="">-- Select a Doctor --</option>
                                        {filteredDoctors.map((doc) => (
                                            <option key={doc._id} value={doc._id}>Dr. {doc.name} ({doc.spe})</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Select Date</label>
                                    <input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Select Slot</label>
                                    <select required value={slot} onChange={(e) => setSlot(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                                        <option value="">-- Select a Time Slot --</option>
                                        <option value="Morning">Morning (09am - 12pm)</option>
                                        <option value="Afternoon">Afternoon (1pm - 04pm)</option>
                                        <option value="Evening">Evening (04pm - 08pm)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Reason for Appointment</label>
                                    <textarea required value={desc} onChange={(e) => setDesc(e.target.value)} rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"></textarea>
                                </div>

                                <button type="submit" className="w-full py-3 px-4 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300">
                                    Send Appointment Request
                                </button>
                                
                                {message.text && (
                                    <div className={`p-3 rounded-md text-center ${message.isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                        {message.text}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Preqapp;