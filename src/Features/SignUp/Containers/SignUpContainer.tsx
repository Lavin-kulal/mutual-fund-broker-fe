import React, { FormEvent, useState } from "react";
import SignUp from "../Components/SignUp";
import { SingUpContainerTypes } from "../SingUpTypes";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUpContainer({}: SingUpContainerTypes) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const naviagte = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (email && password) {
      try {
        const res = await axios.post(
          "http://localhost:8080/mfb/client/sign-up",
          {
            email,
            password,
          }
        );
        console.log(res);
        setSuccess(true);
        setError("");
      } catch (error: any) {
        console.log(error);
        const errMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error?.message;
        if (errMessage) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred during signup. Please try again.");
        }
      }
    }
  };

  const handleNavigateLogin = () => {
    naviagte("/login");
  };
  console.log(email, password);
  return (
    <SignUp
      error={error}
      handleSubmit={handleSubmit}
      success={success}
      email={email}
      setEmail={setEmail}
      setPassword={setPassword}
      password={password}
      handleNavigateLogin={handleNavigateLogin}
    />
  );
}

export default SignUpContainer;
