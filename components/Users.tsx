"use client"
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import LottieAnimation from './animation'
import { getUsersDetails } from '@/queries'
import Image from 'next/image'
import ShuffleButton from '@/components/ShuffleButton'
import { addFriend, getRandomUsersData } from '@/app/actions'
import animationData from '../public/users.json';
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'


const Users = () => {
  const [users, setUsers] = useState<{ id: number; name: string; }[]>([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const addFriendsHandler = async (name: string) => {
    try {
      await addFriend({ FriendName: name});
      console.log(`${name} added as a friend`);
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  const fetchUsers = async () => {
    const fetchedUsers = await getRandomUsersData();
    setUsers(fetchedUsers);
  };

  const handleShuffle = async () => {
    const shuffledUsers: { id: number; name: string; }[] = await getRandomUsersData();
    setUsers(shuffledUsers);
  };

  return (
    <>
      <div className='pl-8'>
        <h1 className='flex text-start font-bold text-2xl text-white my-6' title='Find Friends'>
                <Link href={'/users'}>
                  Users
                </Link>
                <div className='flex justify-start items-start text-left mr-2 pl-2 pt-1'>
                  <ShuffleButton onShuffle={handleShuffle}/>
                </div>

        </h1>
        <p className='text-white text-start text-lg mb-6'>
          Make <span className='text-orange-300 font-semibold'>Productive</span> friends and join sessions.
        </p>
      </div>
      <div className='flex bg-slate-50  gap-[48px] px-20 w-full h-[600px] overflow-y-auto scroll-smooth'>
          <div className='flex justify-center items-center text-center w-[500px] h-full '>
              <div className='max-w-[240px] max-h-[240px] lg:max-w-[300px] lg:max-h-[300px] mx-auto lg:mx-auto items-start mb-12'>
                <LottieAnimation animationData = {animationData}/>
              </div>
          </div>
          <div className='flex flex-col items-center w-[600px] h-[400px] overflow-y-auto overflow-auto scroll-smooth justify-center text-center mt-[70px]'>
            {users.map((u, index)=>(
                <div
                  key={u.id}
                  className='flex items-center w-[350px] p-4 m-2 rounded-xl bg-blue-200/50 hover:bg-blue-200/50 justify-center'
                  >
                  <p className='font-bold text-lime-700 mr-4'>{index + 1}</p>
                  <p className='font-bold text-neutral-800 flex-1'>{u.name}</p>
                  <div className='px-1 rounded-xl text-white'>
                      <button onClick={()=>{addFriendsHandler(u.name)}}>
                        <Image
                          alt='friend'
                          src={'./friend.svg'}
                          width={24}
                          height={24}
                        />
                      </button>
                  </div>
                </div>
            ))}
          </div>
      </div>
    </>
  )
}

export default Users;