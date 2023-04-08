import { useRouter } from 'next/router'
import Navbar from './Navbar'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { useApplicationContext } from '@/services/Application'
import SignInForm from './SignInForm'
import Spinner from './Spinner'
import BottomNavigation from './BottomNavigation'
import Link from 'next/link'
import MetaDetails from './MetaDetails'

const inter = Inter({ subsets: ['latin'] })


export default function Layout({ children }: { children: any }) {
    const { user, isLoading } = useApplicationContext()


    return (
        <>
            <MetaDetails /> 
            <main className={inter.className + " static select-none"}>
                <Navbar />
                <div className='h-10'></div>
                <div className='mx-4 md:mx-auto max-w-4xl flex gap-x-4'>
                    <div className='w-1/4 hidden md:flex flex-col rounded gap-y-2 py-3'>
                        <Link href="/profile" className='text-xl mx-3'>
                            Profile
                        </Link>
                        <div className='h-0.5 bg-gray-300 mx-3'></div>
                        <Link href="/home" className='text-xl mx-3'>
                            Home
                        </Link>
                        {/* <div className='h-0.5 bg-gray-300 mx-3'></div> */}
                    </div>
                    {!isLoading ?
                        <div className='w-full md:w-3/4'>
                            {children}
                        </div> : <div className='w-full md:w-3/4'>
                            <Spinner />
                        </div>
                    }
                </div>
                <div className='h-24'></div>
                <BottomNavigation />
            </main>


        </>
    )
}