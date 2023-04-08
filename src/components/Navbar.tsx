import { useApplicationContext } from "@/services/Application"
import Link from "next/link"

export default function Navbar({ loading = false }) {

    const { user, setUser } = useApplicationContext()
    return (
        <div>
            <nav className={`bg-gray-50 h-12 select-none shadow`}>
                <div className="max-w-4xl mx-auto flex items-center min-h-full justify-between">
                    {/* nav brandin */}
                    <Link href={"home"}>
                        <div className="text-2xl font-bold mx-4 text-sky-700 tracking-tight">
                            Socia<span className="font-medium text-gray-900">lite</span>
                        </div>
                    </Link>
                    <div className="mx-4 gap-x-2 flex items-center justify-between">

                        {user ? <button className="mx-1" onClick={(e) => {
                            // @ts-ignore
                            setUser(undefined)
                        }}><i className="bi bi-box-arrow-right text-gray-900"></i></button> : <></>}
                    </div>
                </div>
            </nav>
            {/* interactive element when something is loading */}
            <div className={`h-0.5 ${loading ? 'bg-sky-700 animate-pulse' : ''}`}>
            </div>

        </div>
    )
}
