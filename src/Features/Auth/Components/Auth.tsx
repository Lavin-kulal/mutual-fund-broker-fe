import React from "react";
import LoginComponent from "../../Login";
import { AuthComponentTypes } from "../AuthTypes";
import SignUp from "../../SignUp";
import "../SCSS/styles.css";

function Auth({ renderRoutes }: AuthComponentTypes) {
  return <div className="auth-container">{renderRoutes}</div>;
}

export default Auth;
