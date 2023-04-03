import React, { useEffect, useState } from 'react';
import Alert from "./Alert"
import { IUser } from '../../models/userInterface';
import { dbConnect } from '../../lib/mongodb';

function SignInForm() {
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
                username: username
            }

            fetch("api/login/", { method: "POST", body: JSON.stringify(u) }).then((v) => {
                if (v.status == 200){
                    
                }
            })

        }
        catch (err: any) {
            SetError(err.message)
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

    useEffect(() => {
        setTimeout(() => {
            SetError("")
        }, 5000)
    }, [error])

    return (
        <form className="mx-auto max-w-sm">
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
                    id="username"
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
                    // value={formData.confirmPassword}
                    // onChange={handleInputChange}
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
            <div className="flex items-center justify-start">
                <button
                    type="submit"
                    className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleSubmit}
                >
                    Sign Up
                </button>
            </div>

        </form>
    );
}

export default SignInForm;
