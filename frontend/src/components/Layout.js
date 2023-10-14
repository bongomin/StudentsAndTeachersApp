import React from 'react'
import SideBar from './SideBar'
import Footer from './Footer'
import NavBar from './NavBar'
import TopPanel from './TopPanel'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <>
            <NavBar />
            <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
                <SideBar />
                <div id="main-content" class="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
                    <main>
                        <TopPanel />
                    </main>
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default Layout