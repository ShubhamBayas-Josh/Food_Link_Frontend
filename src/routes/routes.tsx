import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';

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

]);

export default router;