import Footer from '@/components/Footer'
import Users from '@/components/Users'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='bg-blue-900'>
      <div className='flex h-[400px] w-full justify-between px-8'>
        <div className=' bg-white text-orange-700 flex items-center text-center h-full w-full justify-center rounded-b-3xl'>
          <Image 
            src={'./chat.svg'}
            height={350}
            width={350}
            alt='chat'
          />
        </div>
        <div className='bg-blue-900 flex items-center text-center h-full w-full justify-center  rounded-l-3xl'>
            <Link href={'/chat'}>
              <button className='bg-orange-300 outline-none text-white font-bold rounded-md p-4'>
                Join Group
              </button>
            </Link>
        </div>
      </div>
      <div>
        <Users/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default page