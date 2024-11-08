import { BrowserRouter as AppRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';
import Register from "../Pages/Register.js";
import Login from "../Pages/Login.js";

const Home = lazy(() => import("../Pages/Home/Home"));

const Router = () => {
    return (
        <AppRouter>
            <Suspense fallback="Loading .. ">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    {/* <Route path="/profile" element={<Profile />} /> */}
                    {/* <Route path="/book/:id" element={<BookDetails />} /> */}
                    {/* <Route path="/add-book" element={<AddBook />} /> */}
                    

                </Routes>
            </Suspense>
        </AppRouter>
    );
}

export default Router;
