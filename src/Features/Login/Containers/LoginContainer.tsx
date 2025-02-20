import React, { useState } from "react";
import LoginComponent from "../Components/Login";
import { LoginContainerTypes } from "../LoginTypes";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../Context/UserContext";

function LoginContainer({}: LoginContainerTypes) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      const response: any = await axios.post(
        "http://localhost:8080/mfb/client/auth",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setUser(response.data.results);
      alert("Login successful!");
      navigate("/home");
    } catch (error: any) {
      console.error("Login Error:", error);
      const errMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error?.message ||
        "An error occurred during login. Please try again.";

      setError(errMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateSignUp = () => {
    navigate("/signup");
  };

  return (
    <LoginComponent
      handleSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      error={error}
      setError={setError}
      setPassword={setPassword}
      password={password}
      handleNavigateSignUp={handleNavigateSignUp}
      loading={loading}
    />
  );
}

export default LoginContainer;
