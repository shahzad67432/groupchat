"use client"
import { getRandomUsersData } from '@/app/actions'
import Image from 'next/image'
import React from 'react'

//@ts-ignore
const ShuffleButton = ({onShuffle}) => {
    return (
    <div className=''>
      <button onClick={onShuffle}>
        <Image
          alt='shuffle'
          src={'./shuffle.svg'}
          width={24}
          height={24}
        />
      </button>
    </div>
    )
}

export default ShuffleButton