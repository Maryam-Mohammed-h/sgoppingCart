import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout.jsx";
import Home from "./Components/Home/Home";
import Product from "./Components/Product/Product";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Notfound from "./Components/Notfound";
import Cart from "./Components/Cart/Cart";
import Details from "./Components/Details/Details";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout></Layout>,
      children: [
        { index: true, element: <Home></Home> },
        { path: "products", element: <Product></Product> },
        { path: "products/:id", element: <Details></Details> },
        { path: "cart", element: <Cart></Cart> },
        { path: "login", element: <Login></Login> },
        { path: "register", element: <Register></Register> },
        { path: "*", element: <Notfound></Notfound> },
      ],
    },
  ]);

  return <RouterProvider router={routes}></RouterProvider>;
}
