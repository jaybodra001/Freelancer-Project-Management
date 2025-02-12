import React, { useState } from 'react';
import axios from 'axios';

const ProjectForm = ({ refreshProjects }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        

        try {
    
                       
            await axios.post('http://localhost:8083/api/projects', { name, description, startDate, endDate }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            
            refreshProjects(); // Refresh the project list after submission
            setName('');
            setDescription('');
            setStartDate('');
            setEndDate('');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl mb-4">Create Project</h2>
            <input type="text" placeholder="Title" value={name} onChange={(e) => setName(e.target.value)} className="border mb-4 p-2 w-full" required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border mb-4 p-2 w-full" required></textarea>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border mb-4 p-2 w-full" required />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border mb-4 p-2 w-full" required />
            <button type="submit" className="bg-blue-500 text-white p-2 w-full">Create Project</button>
        </form>
    );
};

export default ProjectForm;
