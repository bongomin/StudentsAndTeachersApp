import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { ROUTES } from './routes';
import Students from '../pages/students';
import Teachers from '../pages/teachers';
import Home from '../pages/home';
import Layout from '../components/Layout';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path='/' element={<Layout />}>
                    <Route path={ROUTES.STUDENTS} element={<Students />} />
                    <Route path={ROUTES.TEACHERS} element={<Teachers />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
