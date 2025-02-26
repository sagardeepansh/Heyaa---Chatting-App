"use client"
import React, { useState, useEffect } from 'react';
import { useIndexedDB } from "@/hooks/useIndexedDB";
import ChatBox from "@/components/ChatBox";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import UserListing from '@/components/UserListing';
import { getAllUsersProfiles } from '@/utils/api';
import jwt from 'jsonwebtoken';


export default function FriendList() {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const profiles = await getAllUsersProfiles();
      console.log(profiles);
      setUsers(profiles?.users);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {

    fetchUsers();
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
              <div className="md:col-span-9 bg-gray-100 p-8	rounded-2xl ">
                <div style={{ minHeight: "500px" }} className="flex flex-col h-dvh	max-h-96 rounded-2xl">
                  <div className="bg-purple-700 text-white p-4 flex items-center  rounded-2xl">
                    <h1 className="text-xl font-semibold">Friends List</h1>
                  </div>
                  <UserListing users={users} />
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>

    </>
  )
}
