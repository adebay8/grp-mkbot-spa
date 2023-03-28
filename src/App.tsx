import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Complete, Home, Navigation, Search, Stores } from "./pages";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/stores/:storeId",
      element: <Stores />,
    },
    {
      path: "/stores/:storeId/navigation",
      element: <Navigation />,
    },
    {
      path: "/stores/:storeId/complete",
      element: <Complete />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
