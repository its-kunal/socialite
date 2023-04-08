import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from "next/router"
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar'
import BottomNavigation from '@/components/BottomNavigation'
import LoginForm from '@/components/LoginForm'
import SignInForm from '@/components/SignInForm'
import { useEffect } from 'react'
import { useApplicationContext } from '@/services/Application'
import Spinner from '@/components/Spinner'
import Layout from '@/components/Layout'

const inter = Inter({ subsets: ['latin'] })



function Home() {
    const { user, isLoading } = useApplicationContext()
    const router = useRouter()
    useEffect(() => {
        if (user) {
            router.push("/home")
        }
    }, [user])

    return (
        <>
            <Layout>
                <SignInForm />
            </Layout>

        </>
    )
}



export default Home