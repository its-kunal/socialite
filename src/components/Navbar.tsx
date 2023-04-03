export default function Navbar({ loading = false }) {


    return (
        <div>
            <nav className={`bg-gray-50 h-12 select-none shadow`}>
                <div className="max-w-4xl mx-auto flex items-center min-h-full justify-between">
                    {/* nav brandin */}
                    <div className="text-2xl font-bold mx-4 text-sky-700 tracking-tight">
                        Socia<span className="font-medium text-gray-900">lite</span>
                    </div>
                    <div className="mx-4 gap-x-2 flex items-center justify-between">
                        <input type="text" className="w-32 md:w-56 px-2 rounded-lg outline-none leading-tight focus:outline-none focus:shadow-outline" placeholder="Search" />
                        <div className="md:w-4"></div>
                        <button
                        ><i className="bi bi-search text-gray-900"></i></button>
                    </div>
                </div>
            </nav>
            {/* interactive element when something is loading */}
            <div className={`h-0.5 ${loading ? 'bg-sky-700 animate-pulse' : ''}`}>
            </div>

        </div>
    )
}
