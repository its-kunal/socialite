import Layout from "@/components/Layout";
import { useApplicationContext } from "@/services/Application";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function profile({ name }: { name: string }) {
    const { user } = useApplicationContext()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push("/signup")
        }
    }, [user])

    return (
        <Layout>
            {/* Avatar, display name, followers, following, edit profile */}
            <ProfileInfo name={user?.username || ""} followers={0} following={0} username={user?.username || ""} />

            <div className="h-0.5 bg-gray-200 rounded-full my-4"></div>

            <div className="mt-4 flex md:justify-start justify-center" >
                <button className="bg-red-500 px-3 rounded shadow-sm text-white font-semibold text-xl">Delete my account</button>
            </div>
        </Layout>
    )
}
function ProfileInfo({ name, followers, following, username }: { username: string, name: string, followers: number, following: number }) {

    const handleClipBoard = () => {
        // const data = [new ClipboardItem({ username })]
        navigator.clipboard.writeText(username)
        // const data = new Clipboard() 
        // const u: ClipboardItems = [new ClipboardItem({ username })]
        // data.write(u)
    }

    return <div className="flex">
        <div> <img src={`https://api.dicebear.com/6.x/pixel-art/svg?seed=${username}`} alt="" className="h-20 w-20 mt-4" /></div>
        <div className="md:w-10 w-10 h-10"></div>
        <div className="flex flex-col">
            <h1 className="font-bold text-2xl mb-1">{name}</h1>
            <div className="flex bg-gray-100 px-2 py-1 rounded mb-2 justify-between">
                <div className="text-gray-950">@ {username}</div>
                <button onClick={handleClipBoard}><i className="bi bi-clipboard-fill"></i></button>
            </div>
            <div className="flex">
                <div className="flex flex-col items-center">
                    <span className="font-semibold text-lg">
                        Followers
                    </span>
                    <span className="text-md">
                        {followers}
                    </span>
                </div>
                <div className="md:w-10 w-2"></div>
                <div className="flex flex-col items-center">
                    <span className="font-semibold text-lg">Following</span>
                    <span className="text-md">
                        {following}
                    </span>
                </div>
            </div>
            <div className="h-2"></div>
            <div className="">
                <button className="w-full bg-sky-500 text-white rounded shadow-sm py-1 px-2">Edit Profile</button>
            </div>
        </div>
    </div>
}

