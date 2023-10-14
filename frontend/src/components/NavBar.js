import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <nav className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">

                        <Link href="/" className="flex ml-2 md:mr-24">
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                Students & Teachers Record App
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar