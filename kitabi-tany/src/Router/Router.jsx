import { BrowserRouter as AppRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';


const Home = lazy(() => import("../Pages/Home/Home"));
const Login = lazy(() => import("../Pages/Login.js"));
const Register = lazy(() => import("../Pages/Register.js"));
const Profile = lazy(() => import("../Pages/Profile.js"));

const Router = () => {
    return (
        <AppRouter>
            <Suspense fallback="Loading .. ">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    {/* <Route path="/book/:id" element={<BookDetails />} /> */}
                    {/* <Route path="/add-book" element={<AddBook />} /> */}
                </Routes>
            </Suspense>
        </AppRouter>
    );
}

export default Router;
