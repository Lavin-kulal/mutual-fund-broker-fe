import React from "react";
import PageNotFound from "./PageNotFound";
import LoginComponent from "./Login";
import SignUp from "./SignUp";
import HomePage from "./HomePage";
import { Navigate } from "react-router-dom";
import SchemeCards from "./SchemeCards";
import Portfolio from "./Portfolio";

export const mainRoutes = [
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/login",
    element: <LoginComponent />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home/",
    element: <HomePage />,
    children: [
      {
        path: "",
        element: <Navigate to="schemes" replace />,
      },
      {
        path: "schemes",
        element: <SchemeCards />,
      },
      {
        path: "portfolio",
        element: <Portfolio />,
      },
    ],
  },
];
