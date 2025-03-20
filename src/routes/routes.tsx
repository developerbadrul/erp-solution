import { createBrowserRouter } from "react-router";
import App from "../App";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [

        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard />
    }
])

export default router;