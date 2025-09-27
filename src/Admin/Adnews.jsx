

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Adsidenav from '../Component/Adsidenav';
import axios from 'axios';

function Adnews() {
    const navigate = useNavigate();
    // Form state
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    // UI state
    const [message, setMessage] = useState({ text: "", isError: false });

    // Corrected validation logic
    useEffect(() => {
        const isAdminLoggedIn = localStorage.getItem('admin');
        if (!isAdminLoggedIn) {
            navigate('/admin');
        }
    }, [navigate]);

    const clearForm = () => {
        setTitle("");
        setDesc("");
    };

    const handleAddNews = async (e) => {
        e.preventDefault();
        const newsData = { title, desc };
        
        try {
            const response = await axios.post(`${process.env.REACT_URL}/news`, newsData);
            if (response.data.msg === "Success") {
                setMessage({ text: "News added successfully!", isError: false });
                clearForm();
            } else {
                setMessage({ text: "Something went wrong. Please try again.", isError: true });
            }
        } catch (error) {
            console.error("Error adding news:", error);
            setMessage({ text: "An error occurred. Please try again.", isError: true });
        }
    };

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
                    className="px-4 py-2 bg-white text-sky-700 font-semibold rounded-lg shadow-md hover:bg-sky-100 transition duration-300"
                >
                    Logout
                </button>
            </header>
            
            <div className="flex flex-1 overflow-hidden">
                <Adsidenav />
                
                <main className="flex-1 overflow-y-auto bg-sky-50/50">
                    <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col m-6">
                        {/* Light blue title bar */}
                        <div className="bg-sky-100 p-4 border-b border-sky-200">
                            <h4 className='text-2xl font-bold text-sky-800 text-center'>Add News Article</h4>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleAddNews} className="max-w-2xl mx-auto space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input 
                                        type="text" 
                                        value={title} 
                                        onChange={(e) => setTitle(e.target.value)} 
                                        required 
                                        className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea 
                                        value={desc} 
                                        onChange={(e) => setDesc(e.target.value)} 
                                        required 
                                        rows="6"
                                        className='mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500'
                                    ></textarea>
                                </div>
                                <button 
                                    type="submit" 
                                    className='w-full py-3 px-4 bg-gradient-to-r from-sky-600 to-sky-700 text-white font-bold rounded-lg shadow-md hover:from-sky-700 hover:to-sky-800 transition duration-300'
                                >
                                    Publish News
                                </button>
                                {message.text && (
                                    <div className={`p-3 rounded-md text-center ${message.isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                        {message.text}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Adnews;