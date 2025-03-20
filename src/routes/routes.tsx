import { createBrowserRouter } from "react-router";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import dashboardRouts from "./dashboardRouts";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [

        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: dashboardRouts
    }
])

export default router;