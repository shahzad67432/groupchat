import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='bg-blue-900 w-full h-[80px] flex justify-between'>
        <div className='px-8 p-4 bg-slate-50 ml-8 mb-4 rounded-b-3xl'>
            <div className='text-blue-900'>
                <h1 className='font-bold'>Developer Contact</h1>
                <h1>Email: <span >Shaa1891641@gmail.com</span></h1>
            </div>
        </div>
        <div className='p-4 mx-4 flex'>
            <h1 className='text-blue-900 px-4'>
                <Link href={'https://github.com/shahzad67432'}>
                    <Image
                        src={'./github.svg'}
                        width={32}
                        height={32}
                        alt='Linkedin'
                    />
                </Link>
            </h1>
            <h1 className='text-blue-900 px-4'>
                <Link href={'https://www.linkedin.com/in/shahzad-ali-225893298/'}>
                    <Image
                        src={'./linkedin.svg'}
                        width={32}
                        height={32}
                        alt='linkedin'
                    />
                </Link>
            </h1>
            <h1 className='text-blue-900 px-4'>
                <Link href={'https://www.instagram.com/shahzad.ali.16/'}>
                    <Image
                        src={'./twitter.svg'}
                        width={32}
                        height={32}
                        alt='Instagram'
                    />
                </Link>
            </h1>
        </div>
    </div>
  )
}

export default Footer