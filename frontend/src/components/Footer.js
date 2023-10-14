import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="p-4 my-6 mx-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 xl:p-8 dark:bg-gray-800">
            <ul className="flex flex-wrap items-center mb-6 space-y-1 md:mb-0">
                <li><Link className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Developed by Bongomin Daniel</Link></li>
                <li><Link className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Home</Link></li>
                <li><Link className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Students</Link></li>
                <li><Link className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Teachers</Link></li>
            </ul>
        </footer>
    )
}

export default Footer