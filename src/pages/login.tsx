import Head from 'next/head'
import LoginForm from '@/components/LoginForm'
import { useEffect } from 'react'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useApplicationContext } from '@/services/Application'

function Home() {
    const router = useRouter()
    const { user } = useApplicationContext()

    useEffect(() => {
        if (user) {
            router.push("/home")
        }
    }, [user])

    return (
        <>
            <Layout>
                <LoginForm />
            </Layout>
        </>
    )
}



export default Home