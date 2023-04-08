import React, { useState, useEffect } from "react";
import { Post } from "./Feeds";

const InfiniteScroll = () => {
    const [feeds, setFeeds] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loadFeeds = async () => {
        setLoading(true)
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
        )
        const data = await response.json()
        setFeeds([...feeds, ...data])
        setLoading(false)
    }

    useEffect(() => {
        loadFeeds();
    }, [page]);

    useEffect(() => {
        if (!loading && hasMore) {
            const observer = new IntersectionObserver(
                (entries) => {
                    const first = entries[0];
                    if (first.isIntersecting) {
                        setPage((prevPage) => prevPage + 1);
                    }
                },
                { threshold: 1 }
            );
            observer.observe(document.querySelector("#bottom-feed")!);
            return () => observer.disconnect();
        }
    }, [loading, hasMore]);

    return (
        <div className="max-w-3xl mx-auto">
            {feeds.map((feed: { id: any; title: any; url: any; albumId: any; }) => (
                <Post
                    key={feed.id}
                    caption={feed.title}
                    image={feed.url}
                    likes={feed.id}
                    owner={feed.albumId}
                    timestamp={feed.id}
                />
            ))}
            <div id="bottom-feed" className="pb-8">
                {loading && <div className="text-center">Loading...</div>}
                {!hasMore && (
                    <div className="text-center">
                        <span className="text-gray-500">No more feeds to show</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InfiniteScroll;