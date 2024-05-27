import Sidebar from '@/components/Sidebar'
import ChatComp from '@/components/chat/ChatComp'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async() => {
  const session = await getServerSession(authOptions)
  if(session?.user?.name){
    return (
      <div className='w-full h-full'>
          <div className=''>
            <Sidebar/>
          </div>
          <div className='pt-2'>
            <ChatComp userName={session.user.name}/>
          </div>
      </div>
    )
  }
}

export default page;