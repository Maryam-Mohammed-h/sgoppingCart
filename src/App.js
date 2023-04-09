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
import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import { CartContextProvider } from "./Context/CartContext.js";
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveUserData();
    }
  }, []);

  const [userData, setuserData] = useState(null);
  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setuserData(decodedToken);
  }

  const routes = createBrowserRouter([
    {
      path: "shoppingCart",
      element: <Layout userData={userData} setuserData={setuserData}></Layout>,
      children: [
        { index: true, element: <Home></Home> },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          ),
        },
        {
          path: "products/:id",
          element: (
            <ProtectedRoute>
              <Details />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login saveUserData={saveUserData}></Login> },
        { path: "register", element: <Register></Register> },
        { path: "*", element: <Notfound></Notfound> },
      ],
    },
  ]);
  return (
    <CartContextProvider>
      <Toaster/>
      <RouterProvider router={routes}></RouterProvider>
    </CartContextProvider>
  );
}
