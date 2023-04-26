import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Complete, Home, Navigation, Search, Stores } from "./pages";
import { ApolloProvider } from "@apollo/client";
import { client } from "./helpers";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/stores",
      element: <Search />,
    },
    {
      path: "/stores/:categoryId",
      element: <Search />,
    },
    {
      path: "/stores/:categoryId/:storeId",
      element: <Stores />,
    },
    {
      path: "/stores/:categoryId/:storeId/navigation",
      element: <Navigation />,
    },
    {
      path: "/stores/:categoryId/:storeId/complete",
      element: <Complete />,
    },
  ]);

  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
};

export default App;
