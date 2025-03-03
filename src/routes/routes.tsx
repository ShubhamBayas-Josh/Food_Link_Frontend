import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Donors from '../pages/Donors';
import About from '../pages/About';
import Ngos from '../pages/Ngos';
import DonorProfile from '../pages/DonorProfile';
import NGOProfile from '../pages/NGOProfile';
// import { Sidebar } from 'lucide-react';

const router = createBrowserRouter([
    {
        path: '/signup',
        element: <SignUp />,
    },

    {
        path: '/login',
        element: <Login />,
    },

    {
        path: '/',
        element: <Home />,
    },

    {
        path: '/donors',
        element: <Donors />,
    },

    {
        path: '/about',
        element: <About />,
    },

    {
        path: '/ngos',
        element: <Ngos />,
    },
    
    {
        path: '/donor_profile',
        element: <DonorProfile />,
    },

    {
        path: '/ngo_profile',
        element: <NGOProfile />,
    },

    
    

]);

export default router;