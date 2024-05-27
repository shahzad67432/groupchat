"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const Sidebar = () => {
  const [connectedClients, setConnectedClients] = useState<string[]>([]);
  const session = useSession();
  const name = session.data?.user.name;

  useEffect(() => {
    if (!name) return;

    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('connected');
      socket.send(JSON.stringify({ type: 'setUsername', username: name }));
    };

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log('Received data:', data);
      if (data.type === 'connectedClients') {
        setConnectedClients(data.clients);
      }
    };

    return () => {
      socket.close();
    };
  }, [session]);

  return (
    <div className='w-[250px] bg-orange-100 inset-0 border-orange-500 fixed rounded-tr-3xl'>
      <div>
        <h1 className='p-4 text-xt-black border-b border-orange-500 pt-4'>Connected Users</h1>
        <h1 className='p-1 pl-4 text-xt-black  border-b border-white'>Friends</h1>
        {connectedClients.map((client, index) => (
          <div key={index} className='m-1 ml-4 text-black w-28 p-1 rounded-r-lg flex'> <span className='bg-white rounded-2xl text-orange-600 font-semibold p-1 w-6 h-6 flex items-center text-center justify-center mr-2'>{client[0]}</span> {client}</div>
        ))}
        <h1 className='p-1 pl-4 text-black border-y border-orange-500 border-b-white'>Others</h1>
      </div>
    </div>
  );
};

export default Sidebar;
