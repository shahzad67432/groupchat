import ChatHeader from '@/components/chat/ChatHeader'
import { authOptions } from '@/lib/auth'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import React from 'react'

const page = ({children}:{children: React.ReactNode}) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default page