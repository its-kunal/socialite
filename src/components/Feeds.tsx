import React, { useEffect, useState } from "react";
import { postInterface } from "../../models/postInterface";

export const Post = ({ caption, image, like, owner, timestamp }: any) => {
    return (
        <div className="min-w-sm w-full rounded overflow-hidden shadow-lg m-4 ml-0">
            <img className="mx-auto w-full aspect-square object-fill" src={image} alt={caption} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{caption}</div>
                <p className="text-gray-700 text-base">
                    <i className="text-red-600 mr-2 bi bi-heart-fill"></i>
                    {like}
                    <i className="ml-5 mr-2 bi bi-hand-thumbs-down-fill"></i>
                    {like}
                </p>
            </div>
            <div className="px-6 mb-4 flex flex-wrap gap-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{owner}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{timestamp}</span>
            </div>
        </div>
    );
};

const Feeds = () => {
    const [feeds, setFeeds] = useState<postInterface[]>([
        {
            id: 1,
            caption: "Beautiful sunset at the beach",
            image: "https://picsum.photos/600/400?random=1",
            likes: 100,
            owner: "John Doe",
            timestamp: "2022-04-06T14:30:00.000Z",
        },
        {
            id: 2,
            caption: "My cute dog enjoying the sun",
            image: "https://picsum.photos/600/400?random=2",
            likes: 50,
            owner: "Jane Doe",
            timestamp: "2022-04-06T14:45:00.000Z",
        },
        {
            id: 3,
            caption: "Amazing view from the top of the mountain",
            image: "https://picsum.photos/600/400?random=3",
            likes: 200,
            owner: "Bob Smith",
            timestamp: "2022-04-06T15:00:00.000Z",
        },
        {
            id: 4,
            caption: "Delicious food at the new restaurant in town",
            image: "https://picsum.photos/600/400?random=4",
            likes: 80,
            owner: "Alice Johnson",
            timestamp: "2022-04-06T15:15:00.000Z",
        },
        {
            id: 5,
            caption: "My new painting, what do you think?",
            image: "https://picsum.photos/600/400?random=5",
            likes: 120,
            owner: "David Lee",
            timestamp: "2022-04-06T15:30:00.000Z",
        },
    ]);


    // useEffect(() => {
    //     fetch('api/post').then((v) => {
    //         v.json().then(v => {
    //             console.log(v)
    //             setFeeds(v)
    //         })

    //         // setFeeds(v)
    //     })
    // }, [])

    return (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4 items-stretch">
            {feeds.map((feed) => (
                <Post
                    key={feed.id}
                    id={feed.id}
                    caption={feed.caption}
                    image={feed.image}
                    like={feed.like}
                    owner={feed.owner}
                    timestamp={feed.timestamp}
                />
            ))}
        </div>
    );
};

export default Feeds;