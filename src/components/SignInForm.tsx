import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router"
import Alert from "./Alert"
import { IUser, UserCredentials } from '../../models/userInterface';
import { dbConnect } from '../../lib/mongodb';
import { useApplicationContext } from "@/services/Application"
import Link from 'next/link';

function SignInForm() {
    const { user, setUser } = useApplicationContext()
    const router = useRouter()
    const [fullname, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const interestList = ["Food", "Technology", "Sports", "Music"]
    const [interests, setInterests] = useState<string[]>([])
    const [cPass, setCPass] = useState('')
    const [error, SetError] = useState('')

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value)
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value)
    };

    const handleInterestClick = (event: any) => {
        // console.log(event.target.value)
        const interest = event.target.value as string;
        if (interests.includes(interest)) {
            setInterests(interests.filter((item) => item !== interest));
        } else {
            setInterests([...interests, interest])
        }
    }

    const handleCpassChange = (e: any) => {
        e.preventDefault()
        setCPass(e.target.value)
    }

    const handleFullNameChange = (e: any) => {
        e.preventDefault()
        setFullName(e.target.value)
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            if (!fullname) throw new Error("Please, Enter your good name.")
            if (!username) throw new Error("Enter mail id, username")
            if (!password) throw new Error("Enter password")
            if (!cPass) throw new Error("Enter confirm password")
            if (cPass !== password) throw new Error("Entered Password do not match")
            if (interests.length == 0) throw new Error("Select atleast one interest.")

            let u: IUser = {
                name: fullname,
                interests: interests,
                password: password,
                username: username,
                followers: [],
                following: []
            }

            fetch("api/signup", { method: "POST", body: JSON.stringify(u) }).then(async (v) => {
                if (v.status == 200) {
                    v.json().then((v) => {
                        if (v != undefined) {
                            //@ts-ignore
                            setUser(v as UserCredentials)
                        }
                    })
                    // setUser(JSON.parse(await v.json()) as UserCredentials)
                    console.log("Success")
                    router.push("/home")
                }
                else {
                    v.json().then((v) => {
                        SetError(v.message)
                    })
                }
            })
        }
        catch (err: any) {
            SetError(err.message)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            SetError("")
        }, 5000)
    }, [error])

    return (

        <div className='mx-auto max-w-sm'>
            {!user ?
                <form className="">
                    <div>
                        <h3 className='text-xl font-bold tracking-tight text-center'>Sign Up</h3>
                    </div>
                    <div className='h-0.5 bg-gray-500 rounded-full my-3'>

                    </div>

                    {error !== "" ? <><Alert message={error} type='error' />
                        <div className='h-4'></div>
                    </> : <></>}

                    {/* Optional, when there is alert */}
                    {/* <Alert message={"Hello"} type="success" /><div className='h-4'></div> */}

                    {/* Full name */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                            Name
                        </label>
                        <input
                            id="fullname"
                            name="fullname"
                            type="text"
                            autoComplete="fullname"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Full name"
                            value={fullname}
                            onChange={handleFullNameChange}
                        />
                    </div>

                    {/* Username / Mail Id */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                            Username / Mail Id
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="email"
                            autoComplete="username"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Username / Mail Id"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
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

                    {/* Confirm Password */}
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block mb-2 font-bold text-gray-700 ">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={cPass}
                            placeholder='Confirm Password'
                            onChange={handleCpassChange}
                            required
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${cPass === password ? "focus:border-teal-500" : "focus:border-red-500"}`}
                        />
                    </div>

                    {/* Interests */}
                    <div className="mb-4">
                        <label htmlFor="interests" className="block text-gray-700 font-bold mb-2">
                            Interests
                        </label>


                        <div className="flex flex-wrap">
                            {
                                interestList.map((v, i) =>
                                    <button
                                        key={i}
                                        type="button"
                                        className={`rounded-full ${interests.includes(v)
                                            ? 'bg-sky-500 text-white'
                                            : 'bg-gray-200 text-gray-700'
                                            } font-bold py-2 px-4 rounded mr-2 mb-2`}
                                        value={v}
                                        onClick={handleInterestClick}
                                    >
                                        {interests.includes(v) ? <><i className="bi bi-check2-circle pr-3"></i></> : <></>}
                                        {v}
                                    </button>
                                )
                            }
                        </div>

                    </div>

                    {/* Sign Up */}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleSubmit}
                        >
                            Sign Up
                        </button>
                        <Link
                            className="inline-block align-baseline font-bold text-sm text-sky-500 hover:text-sky-800"
                            href="/login"
                        >
                            Already have an account
                        </Link>
                    </div>

                </form> :
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

export default SignInForm;
