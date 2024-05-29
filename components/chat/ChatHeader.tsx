"use client"
import { authOptions } from '@/lib/auth';
import { cn } from '@/lib/utilis';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import React from 'react';

const ChatHeader: React.FC = () => {
    const pathname = usePathname()
    const session = useSession();
    const name = session.data?.user.name;
  return (
    <div className={cn('flex items-center bg-white p-4 px-10', pathname === '/' ? "text-blue-500" : "", pathname === '/chat' && "lg:pl-[270px]" )}>
      <div className="flex-grow">
        <Link href={'/'}>
          <h1 className="text-xl font-bold pl-2 border-l-2 border-orange-600-2 p-1 text-orange-500">Group Chat</h1>
        </Link>
        {pathname === '/' ? <p></p> : <p className="text-sm">Online</p>}
      </div>
      <div className='flex'>
        <div>
          <h1 className='p-2 mr-12 flex text-center text-orange-600 rounded-md border-blue-600'>{name}</h1>
        </div>
        <Link href={'/api/auth/signin'}>        
          <button className="bg-orange-300 text-white px-3 rounded-md p-2">
            Signin
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ChatHeader;
