import React, { useState } from 'react';
import { useApplicationContext } from '@/services/Application';
import { storage } from '@/services/firebaseStorage';
import { ref, uploadBytes } from "firebase/storage"
import Alert from './Alert';
import { postInterface } from '../../models/postInterface';

const PostForm = () => {
    const { error, setError } = useApplicationContext()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState<File | undefined>();
    const { user } = useApplicationContext()
    const interestList = ["Food", "Technology", "Sports", "Music"]
    const [interests, setInterests] = useState<string[]>([])

    const handleModalOpen = () => {
        if (!user) {
            alert("Please Authenticate to continue")
        } else {
            setIsModalOpen(true)
        }
    };
    const handleModalClose = () => setIsModalOpen(false);
    const handleInterestClick = (event: any) => {
        // console.log(event.target.value)
        const interest = event.target.value as string;
        if (interests.includes(interest)) {
            setInterests(interests.filter((item) => item !== interest));
        } else {
            setInterests([...interests, interest])
        }
    }
    const handleTitleChange = (event: any) => setTitle(event.target.value);
    const handleImageChange = (event: any) => setImage(event.target.files[0]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        let postid: string = ""
        const u: postInterface = {
            caption: title,
            // @ts-ignore
            comment: [],
            image: "",
            // @ts-ignore
            interests,
            owner: user?.username || "",

        }

        // Upload data -> get uuid
        await fetch('api/post', { method: "POST", body: JSON.stringify(u) }).then((v) => {
            if (v.status === 200) {
                v.json().then(async (val) => {
                    postid = val._id
                    const imageRef = ref(storage, `images/${postid}`)
                    await uploadBytes(imageRef, image!)
                        .catch(err => setError(err.message))
                })
            } else {
                v.json().then((message) => {
                    // @ts-ignore
                    setError(message.message)
                })
            }
        }).catch((err) => {
            // @ts-ignore
            setError(err.message)
        })
    };



    return (
        <div className='flex justify-between'>
            {error != undefined ? <Alert message={error} /> : <></>}
            <div className='flex flex-grow'><input type="text" className="flex-grow w-32 md:w-56 px-2 rounded-lg outline-none leading-tight focus:outline-none focus:shadow-outline" placeholder="Search Users" />
                <div className="w-1 md:w-4"></div>
                <button className="mx-1 bg-gray-300 px-2 rounded"
                ><i className="bi bi-search text-gray-900"></i></button></div>
            <div className='w-3'></div>
            <button
                className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleModalOpen}
            >
                New Post
            </button>
            {/* Modal */}
            <div
                className={`${isModalOpen ? 'fixed' : 'hidden'} inset-0 bg-gray-900 bg-opacity-75 transition-opacity`}
            >
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0">
                        <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div
                        className={`${isModalOpen ? 'inline-block' : 'hidden'
                            } align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="w-full">
                                        <label
                                            htmlFor="title"
                                            className="block text-gray-700 font-bold mb-2"
                                        >
                                            Caption
                                        </label>
                                        <input
                                            type="text"
                                            name="caption"
                                            id="title"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            value={title}
                                            onChange={handleTitleChange}
                                        />
                                    </div>
                                </div>

                                <div className="sm:flex sm:items-start" >
                                </div>
                                <div className="sm:flex sm:items-start mt-4">
                                    <div className="w-full">
                                        <label
                                            htmlFor="image"
                                            className="block text-gray-700 font-bold mb-2"
                                        >
                                            Image
                                        </label>
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="submit"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Create Post
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={handleModalClose}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default PostForm;