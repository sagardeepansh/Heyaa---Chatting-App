"use client"
import React, { useState, useEffect, useRef  } from 'react';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import jwt from 'jsonwebtoken';
import { getUserById, updateProfile } from '@/utils/api';


export default function Profile() {
    const hasRun = useRef(false); 
    const [decoded, setDecoded] = useState(null);
    const [userDetails, setUserDetails] = useState({
        userId: decoded?._id,
        fullname: '',
        email: '',
        phone: '',
        profilePicture: 'https://placehold.co/150',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    


    // Handle input changes for all fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value,
        });
    };

    // Handle profile picture change
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type and size
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file.');
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('File size must be less than 5MB.');
                return;
            }
    
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserDetails({
                    ...userDetails,
                    profilePicture: reader.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Ensure new password and confirm password match
        if (userDetails.newPassword !== userDetails.confirmPassword) {
            alert('New password and confirm password do not match.');
            return;
        }
    
        try {
            const response = await updateProfile(userDetails);
    
            // console.log('Profile updated successfully:', response);
            alert('Profile updated successfully!');
        } catch (error) {
            // console.error('Failed to update profile:', error.message);
            alert(error.message);
        }
    };

    const fetchUsers = async () => {
        try {
            const details = await getUserById(decoded?._id);
            setUserDetails({
                userId: decoded?._id,
                fullname: details?.user?.fullname || '',
                email: details?.user?.email || '',
                phone: details?.user?.phone || '',
                profilePicture: details?.user?.profilePicture || 'https://placehold.co/150',
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decodedToken = jwt.decode(token);
                    if (!decodedToken || !decodedToken._id) {
                        throw new Error('Invalid token');
                    }
                    setDecoded(decodedToken);
                } catch (err) {
                    console.error('Token decoding failed:', err.message);
                    localStorage.removeItem('token');
                    // Redirect to login page or show an error message
                    window.location.href = '/login'; // Example: Redirect to login
                }
            }
        }
    }, []);

    useEffect(() => {
        if (decoded?._id && !hasRun.current) {
            hasRun.current = true; // Mark as run
            fetchUsers(); // Fetch users
        }
    }, [decoded?._id]);





    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html className="h-full bg-gray-100">
        <body className="h-full">
        ```
      */}
            <div className="min-h-full">

                <Header />
                <header className="bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile </h1>
                    </div>
                </header>
                <main>
                    <div className="md:container md:mx-auto">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="md:col-span-3 bg-gray-100 p-2	rounded-2xl ">
                                <Sidebar />
                            </div>
                            <div className="md:col-span-9 bg-gray-100 p-8 rounded-2xl">
                                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
                                        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {/* Profile Picture */}
                                            <div className="flex items-center space-x-8">
                                                <div className="w-32 h-32 rounded-full overflow-hidden">
                                                    <img
                                                        src={userDetails.profilePicture}
                                                        alt="Profile"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleProfilePictureChange}
                                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                                                    />
                                                    <p className="mt-2 text-sm text-gray-500">Upload a new profile picture.</p>
                                                </div>
                                            </div>

                                            {/* Name */}
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="fullname"
                                                    name="fullname"
                                                    value={userDetails.fullname}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                                />
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={userDetails.email}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                                />
                                            </div>

                                            {/* Phone Number */}
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={userDetails.phone}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                                />
                                            </div>

                                            {/* Change Password Section */}
                                            <div>
                                                <h2 className="text-xl font-bold text-gray-900 mb-4">Change Password</h2>
                                                <div className="space-y-4">
                                                    {/* Old Password */}
                                                    <div>
                                                        <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                                                            Old Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="oldPassword"
                                                            name="oldPassword"
                                                            value={userDetails.oldPassword}
                                                            onChange={handleInputChange}
                                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                                        />
                                                    </div>

                                                    {/* New Password */}
                                                    <div>
                                                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                                            New Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="newPassword"
                                                            name="newPassword"
                                                            value={userDetails.newPassword}
                                                            onChange={handleInputChange}
                                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                                        />
                                                    </div>

                                                    {/* Confirm New Password */}
                                                    <div>
                                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                                            Confirm New Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="confirmPassword"
                                                            name="confirmPassword"
                                                            value={userDetails.confirmPassword}
                                                            onChange={handleInputChange}
                                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Submit Button */}
                                            <div className="flex justify-end">
                                                <button
                                                    type="submit"
                                                    className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                
                            </div>

                        </div>
                    </div>
                </main>
            </div>

        </>
    )
}
