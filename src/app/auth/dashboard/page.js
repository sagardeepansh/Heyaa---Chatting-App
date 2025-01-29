import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import { useIndexedDB } from "@/hooks/useIndexedDB";
import ChatBox from "@/components/ChatBox";
import jwt from 'jsonwebtoken';


export default function Dashboard() {
  const decoded = jwt.decode(localStorage.getItem('token'));
  const [chatMessage, setChatMessage] = useState('adsd');
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const chatId = `${decoded?._id}:12345`;
  const { messages, addMessage, deleteMessage, loading } = useIndexedDB(chatId);
  const [input, setInput] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents adding a new line in the textarea
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      addMessage({
        chatId,
        content: input,
        timestamp: new Date().toISOString(),
      });
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(input); // Send the message to the server
      }
      setInput("");
    }
  };

 

  const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
  const navigation = [
    { name: 'Chats', href: '#', current: true },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Reports', href: '#', current: false },
  ]
  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '/auth/login' },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:3000/api/socket?chatId=${chatId}`);

    ws.onopen = () => {
      console.log('Connected to chat:', chatId);
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      setMessage(event.data);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [chatId]);

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
        <Disclosure as="nav" className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <h1 className=" block text-center text-3xl/9 font-bold tracking-tight text-black">HEY<span className="text-purple-700">AA</span></h1>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? 'bg-purple-700 text-white' : 'text-gray-900 hover:bg-purple-300 hover:text-gray-800',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img alt="" src={user.imageUrl} className="size-8 rounded-full" />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <Link
                            href={item.href}
                            onClick={(e) => {
                              if (item.name == "Sign out") {
                                handleLogout()
                              }
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                          >
                            {item.name}
                          </Link>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img alt="" src={user.imageUrl} className="size-10 rounded-full" />
                </div>
                <div className="ml-3">
                  <div className="text-base/5 font-medium text-white">{user.name}</div>
                  <div className="text-sm font-medium text-gray-400">{user.email}</div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Chats</h1>
          </div>
        </header>
        <main>
          <div className="md:container md:mx-auto">
            <div className="grid grid-cols-12 gap-4">
              <div className="md:col-span-3 bg-gray-100 p-2	rounded-2xl ">
                <nav >
                  <ul className="flex flex-col space-y-2 p-4">
                    <li>
                      <a href="#" className="block p-3 rounded-md text-xl font-semibold	 text-gray-700 hover:bg-gray-200">Home</a>
                    </li>
                    <li>
                      <a href="#" className="block p-3 rounded-md text-xl font-semibold	 text-white bg-purple-700">My Friends</a>
                    </li>
                    <li>
                      <a href="#" className="block p-3 rounded-md text-xl font-semibold	 text-gray-700 hover:bg-gray-200">Chats</a>
                    </li>
                    <li>
                      <a href="#" className="block p-3 rounded-md text-xl font-semibold	 text-gray-700 hover:bg-gray-200">Help</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="md:col-span-9 bg-gray-100 p-8	rounded-2xl ">
                <div style={{ minHeight: "500px" }} className="flex flex-col h-dvh	max-h-96 rounded-2xl">
                  <div className="bg-purple-700 text-white p-4 flex items-center  rounded-2xl">
                    <h1 className="text-xl font-semibold">Deepansh Sagar</h1>
                  </div>

                  <div className="flex-grow p-4 overflow-y-auto">
                    <div className="mb-4">
                      <div className="text-sm text-gray-500">Deepansh Sagar</div>
                      <div className="inline-block bg-gray-200 text-gray-800 rounded-lg p-2 mt-1">
                        Hello! How are you?
                      </div>
                    </div>
                    {/* {messages.map((msg,index) => (
                      <div key={index} className="mb-4 text-right">
                        <div className="text-sm text-gray-500">You</div>
                        <div className="inline-block bg-purple-700 text-white rounded-lg p-2 mt-1">
                          {msg.content}
                        </div>
                        <small className="text-xs block hover:text-gray-400 text-gray-100">{new Date(msg.timestamp).toLocaleTimeString()}</small>
                        <button onClick={() => deleteMessage(msg.id)} >
                          Delete {msg.id}
                        </button>
                      </div>
                    ))} */}
                    <ChatBox messages={messages} onDelete={deleteMessage} />
                    <div className="mb-4 text-right">
                      <div className="text-sm text-gray-500">You</div>
                      <div className="inline-block bg-purple-700 text-white rounded-lg p-2 mt-1">
                        I'm good, thanks! How about you?
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-200 p-4 flex items-center">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={handleSendMessage} className="ml-2 bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                      Send
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>

    </>
  )
}
