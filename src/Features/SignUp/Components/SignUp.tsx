import React from "react";
import "../SCSS/styles.css";
import { SingUpComponentTypes } from "../SingUpTypes";
export default function SignUp({
  handleSubmit,
  success,
  error,
  setEmail,
  email,
  password,
  setPassword,
  handleNavigateLogin,
}: SingUpComponentTypes) {
  return (
    <div className="signup-card">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <p className="login-link">
        Already have an account?{" "}
        <span
          onClick={() => handleNavigateLogin()}
          style={{ cursor: "pointer", color: "#4a90e2" }}
        >
          Log in
        </span>
      </p>
    </div>
  );
}
