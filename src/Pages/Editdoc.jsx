import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Adsidenav from '../Component/Adsidenav';
import axios from 'axios';

function Editdoc() {
    const navigate = useNavigate();
    const [doctorData, setDoctorData] = useState({
        name: '', email: '', number: '', gender: '',
        qua: '', exp: '', spe: '', address: ''
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        const isAdminLoggedIn = localStorage.getItem('admin');
        const doctorId = localStorage.getItem('editDoctorId'); // Using the key from our Viewdoc component
        
        if (!isAdminLoggedIn) {
            navigate('/admin');
        } else if (!doctorId) {
            navigate('/viewdoc'); // Redirect if no ID is found
        } else {
            const getDoctorData = async () => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/doctor/${doctorId}`);
                    if (response.data.msg === "Success") {
                        setDoctorData(response.data.value);
                    }
                } catch (error) {
                    console.error("Error fetching doctor data:", error);
                }
            };
            getDoctorData();
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDoctorData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleUpdateDoctor = async (e) => {
        e.preventDefault();
        const doctorId = localStorage.getItem('editDoctorId');
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/doctor/${doctorId}`, doctorData);
            if (response.data.msg === "Success") {
                setMessage("Doctor updated successfully!");
                setTimeout(() => {
                    localStorage.removeItem('editDoctorId');
                    navigate('/viewdoc');
                }, 2000);
            }
        } catch (error) {
            console.error("Error updating doctor:", error);
            setMessage("An error occurred while updating.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin');
        navigate('/admin');
    };

    return (
        <div className="flex flex-col h-screen">
            <header className="h-[8vh] bg-green-800 text-white shadow-lg flex items-center justify-between px-6 z-10">
                <h1 className="text-xl font-bold">Admin Portal</h1>
                <button onClick={handleLogout} className="px-4 py-2 bg-white text-green-800 font-semibold rounded-lg shadow-md hover:bg-green-100 transition">
                    Logout
                </button>
            </header>
            <div className="flex flex-1 overflow-hidden">
                <Adsidenav />
                <main className="flex-1 overflow-y-auto bg-green-50/30">
                    <div className="w-full bg-white rounded-2xl shadow-lg flex flex-col m-6">
                        <div className="bg-green-100 p-4 border-b border-green-200">
                            <h4 className='text-2xl font-bold text-green-800 text-center'>Edit Doctor Information</h4>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleUpdateDoctor} className="max-w-2xl mx-auto space-y-4">
                                <input type="text" placeholder="Name" name="name" value={doctorData.name} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                                <input type="email" placeholder="Email" name="email" value={doctorData.email} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                                <input type="number" placeholder="Number" name="number" value={doctorData.number} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                                <select name="gender" value={doctorData.gender} onChange={handleInputChange} className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500'>
                                    <option value="">--Select Gender--</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                <input type="text" placeholder="Qualification" name="qua" value={doctorData.qua} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                                <input type="text" placeholder="Experience" name="exp" value={doctorData.exp} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                                <input type="text" placeholder="Specialty" name="spe" value={doctorData.spe} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                                <input type="text" placeholder="Address" name="address" value={doctorData.address} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                                
                                <button type="submit" className='w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg shadow-md hover:from-green-700 hover:to-green-800 transition'>
                                    Update Doctor
                                </button>
                                {message && <div className="p-3 rounded-md text-center bg-green-100 text-green-800">{message}</div>}
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Editdoc;
