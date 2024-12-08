import React from "react";

const Home = React.lazy(() => import("../pages/Home"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Laporan = React.lazy(() => import("../pages/Laporan"));

const routes = [
    { path: "/", element: Home },
    { path: "/dashboard", element: Dashboard },
    { path: "/laporan", element: Laporan },
];

export default routes;
