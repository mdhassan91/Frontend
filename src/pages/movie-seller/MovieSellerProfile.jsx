import React, { useState, useEffect } from 'react';

import Modal from '../../components/Modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance/axiosInstance';

const MovieSellerProfile = ({ user, onLogout }) => {
    const [userData, setUserData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate(); 

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/user');
                console.log(user);
                setUserData(user);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleUpdate = async (updatedData) => {
        console.log(updatedData);
        const newUpdatedData = {
            Email: userData.Email,
            Username: userData.Username,
            Name: updatedData.name,
            Password: updatedData.newPassword ? updatedData.newPassword : userData.Password
        };

        try {
            await axiosInstance.post('/user', newUpdatedData);
            setUserData(newUpdatedData);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="container mx-auto p-4">
                <h2 className="text-2xl mb-4">Movie Seller Profile</h2>
                <div>
                    <p><strong>Name:</strong> {userData.Name}</p>
                    <p><strong>Email:</strong> {userData.Email}</p>
                    <p><strong>Username:</strong> {userData.Username}</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-indigo-500 text-white px-4 py-2 rounded mt-4">
                    Update User Information
                </button>
                {isModalOpen && (
                    <Modal
                        user={userData}
                        onClose={() => setIsModalOpen(false)}
                        onUpdate={handleUpdate}
                    />
                )}
            </div>
        </>
    );
};

export default MovieSellerProfile;
