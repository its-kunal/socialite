
export default function BottomNavigation() {

    return (
        <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 md:hidden ">
            <div className="mx-auto px-4 max-w-4xl sm:px-6 lg:px-8">
                <div className="flex justify-between h-14">
                    <div className="flex space-x-4">
                        <a href="#" className="flex items-center justify-center w-full px-2 py-2 text-sm font-medium text-gray-500 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Home
                        </a>
                        <a href="#" className="flex items-center justify-center w-full px-2 py-2 text-sm font-medium text-gray-500 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Dashboard
                        </a>
                        <a href="#" className="flex items-center justify-center w-full px-2 py-2 text-sm font-medium text-gray-500 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Settings
                        </a>
                    </div>
                    <div className="flex items-center">
                        <a href="#" className="flex-shrink-0 p-3 rounded-full text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Account</span>
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12a8 8 0 11-16 0 8 8 0 0116 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 9a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}
