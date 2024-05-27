"use client"
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import LottieAnimation from './animation'
import { getUsersDetails } from '@/queries'
import Image from 'next/image'
import ShuffleButton from '@/components/ShuffleButton'
import { addFriend, getRandomUsersData } from '../actions'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { useSession } from 'next-auth/react'
const animationData = require('../../public/users.json')


const Users = () => {
  const [users, setUsers] = useState<{ id: number; name: string; }[]>([]);
  const [name, setName] = useState<string>()

  useEffect(() => {
    fetchUsers();
  }, []);

  const addFriendsHandler = async()=>{
    //@ts-ignore
    const friends = await addFriend({name})
    return friends
  }
  const fetchUsers = async () => {
    const fetchedUsers = await getRandomUsersData();
    setUsers(fetchedUsers);
  };

  const handleShuffle = async () => {
    const shuffledUsers: { id: number; name: string; }[] = await getRandomUsersData();
    setUsers(shuffledUsers);
  };

  return (
    <div className='flex flex-row-reverse gap-[48px] px-6'>
        <div className='w-full flex flex-col items-center '>
          <div className='max-w-[140px] max-h-[140px] lg:max-w-[200px] lg:max-h-[200px] mx-auto lg:mx-auto'>
            <LottieAnimation animationData = {animationData}/>
          </div>

          <h1 className='text-center font-bold text-2xl text-neutral-800 my-6'>
            Users
          </h1>
          <p className='text-muted-foreground text-center text-lg mb-6'>
            make Productive friends and join sessions.
          </p>
          <div className='flex justify-start items-start text-left'>
            <ShuffleButton onShuffle={handleShuffle}/>
          </div>
          {users.map((u, index)=>(
              <div
                key={u.id}
                className='flex items-center w-[400px] p-4 m-2 rounded-xl bg-blue-200/50 hover:bg-blue-200/50 justify-center'
                >
                <p className='font-bold text-lime-700 mr-4'>{index}</p>
                <p className='font-bold text-neutral-800 flex-1'>{u.name}</p>
                <div className='px-1 rounded-xl text-white'>
                    <button onClick={()=>{setName(u.name)}}>
                      <button onClick={()=>{addFriendsHandler()}}>
                        <Image
                          alt='friend'
                          src={'./friend.svg'}
                          width={24}
                          height={24}
                        />
                      </button>
                    </button>
                </div>
              </div>
          ))}
        </div>
    </div>
  )
}

export default Users;