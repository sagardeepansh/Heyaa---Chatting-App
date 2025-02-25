"use client"
import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";


export default function Home() {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    //   const fetchUsers = async () => {
    //     try {
    //       const profiles = await getAllUsersProfiles();
    //       setUsers(profiles?.users);
    //     } catch (err) {
    //       setError(err.message);
    //     }
    //   };

    useEffect(() => {

        // fetchUsers();
    }, []);

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
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Chats</h1>
                    </div>
                </header>
                <main>
                    <div className="md:container md:mx-auto">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="md:col-span-3 bg-gray-100 p-2	rounded-2xl ">
                                <Sidebar />
                            </div>
                            <div className="md:col-span-9 bg-gray-100 p-8 rounded-2xl">
                                <div className="flex flex-col items-center justify-center min-h-[500px] max-h-[500px] rounded-2xl">
                                    <p className="text-center pb-2 font-bold text-gray-700">Welcome to</p>
                                    <h1 className="text-center text-6xl font-bold tracking-tight text-gray-900">
                                        HEY<span className="text-purple-700">AA</span>
                                    </h1>
                                    <p className="text-center max-w-lg mt-4 text-gray-600">
                                        Heyaa is a fast and secure chat app that lets you talk to your friends in real time.
                                        Your privacy is our priority—none of your messages are stored, so you can chat freely without worry.
                                        Enjoy instant and hassle-free conversations anytime! 🚀💬
                                    </p>
                                    {/* <UserListing users={users} /> */}
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>

        </>
    )
}
