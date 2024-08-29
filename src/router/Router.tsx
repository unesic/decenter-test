import { Navigate, createBrowserRouter } from "react-router-dom";

import { PageLayout } from "@/pages/PageLayout";
import { CDPInfo } from "@/pages/CDPInfo";
import { Home } from "@/pages/Home";

export const router = createBrowserRouter([
  {
    path: "",
    element: <PageLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cdp/:id",
        element: <CDPInfo />,
      },
      // Handling 404 pages, just in case
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
