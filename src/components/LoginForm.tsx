import React, { useEffect, useState } from 'react';
import Alert from './Alert';
import Link from 'next/link';
import { useApplicationContext } from '@/services/Application';
import { UserCredentials } from '../../models/userInterface';
import { useRouter } from 'next/router';

function LoginForm() {
    const { user, setUser } = useApplicationContext()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, SetError] = useState('')
    const router = useRouter()
    
    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // Todo : Complete this function
        try {
            if (!username)
                throw new Error("Enter username / mail id")
            if (!password)
                throw new Error("Enter password")
        }
        catch (err: any) {
            SetError(err.message)
            console.log(err.message)
        }

        fetch('api/login', { method: "POST", body: JSON.stringify({ username, password }) }).then((v) => {
            if (v.status === 200) {
                v.json().then((v) => {
                    // @ts-ignore
                    setUser(v)
                    router.push("/home")
                })
            }
            else {
                v.json().then((u) => {
                    SetError(u.message)
                })
            }
        })
    };

    useEffect(() => {
        setTimeout(() => {
            SetError("")
        }, 5000)
    }, [error])

    return (
        <div className='mx-auto max-w-sm'>
            {
                !user ?
                    <form className="mx-auto max-w-sm text-gray-900">
                        < div >
                            <h3 className='text-xl font-bold tracking-tight text-center'>Login</h3>
                        </div >
                        <div className='h-0.5 bg-gray-500 rounded-full my-3'>
                        </div>

                        {
                            error !== "" ? <><Alert message={error} type='error' />
                                <div className='h-4'></div>
                            </> : <></>
                        }

                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                                Username / Mail Id
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Username / Mail Id"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={handleSubmit}
                            >
                                Log In
                            </button>
                            <Link
                                className="inline-block align-baseline font-bold text-sm text-sky-500 hover:text-sky-800"
                                href="/"
                            >
                                Register Now
                            </Link>
                        </div>
                    </form > :
                    <div className='text-xl text-left'>
                        You're already Authenticated <button className="inline mx-1 text-base font-bold bg-gray-50 py-2 px-3 rounded hover:bg-gray-100" onClick={(e) => {
                            // @ts-ignore
                            setUser(undefined)
                        }}><i className="bi bi-box-arrow-right text-red-600 "></i> Sign Out</button>
                    </div>
            }
        </div>
    );
}

export default LoginForm;
