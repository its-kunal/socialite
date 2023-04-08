import CreatePost from "@/components/CreatePost";
import Feeds from "@/components/Feeds";
import InfiniteFeeds from "@/components/InfiniteFeeds";
import Layout from "@/components/Layout";
import { useApplicationContext } from "@/services/Application";
import { useEffect, useState } from "react";
import { useRouter } from "next/router"

export default function home() {
    const interestList = ["Food", "Technology", "Sports", "Music"]
    const [interests, setInterests] = useState<string[]>([])
    const { user, isLoading } = useApplicationContext()
    const router = useRouter()

    const handleInterestClick = (event: any) => {
        // console.log(event.target.value)
        const interest = event.target.value as string;
        if (interests.includes(interest)) {
            setInterests(interests.filter((item) => item !== interest))
        } else {
            setInterests([...interests, interest])
        }
    }

    useEffect(() => {
        if (!user) {
            router.push("/login")
        }
    }, [user])

    return (
        <Layout>
            <h1 className="text-sm text-gray-400 mb-2">Interests</h1>
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

            <div className="h-0.5 bg-gray-300 my-4 rounded "></div>

            <div className="bg-gray-100 py-2 px-3 rounded-sm">
                <CreatePost onSubmit={() => { }} />
            </div>
            <Feeds />
        </Layout>
    )
}

