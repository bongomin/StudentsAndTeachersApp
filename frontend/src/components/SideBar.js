import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../core/routes'

function SideBar() {
    return (
        <aside
            id="sidebar"
            className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width bg-gray-900 text-white"
            aria-label="Sidebar"
        >
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    <li>
                        <Link to="/" className="block py-2 px-4">Home</Link>
                    </li>
                    <li>
                        <Link to={`/${ROUTES.STUDENTS}`} className="block py-2 px-4">Students</Link>
                    </li>
                    <li>
                        <Link to={`/${ROUTES.TEACHERS}`} className="block py-2 px-4">Teachers</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default SideBar