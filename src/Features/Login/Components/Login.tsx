import React from "react";
import "../SCSS/styles.css";
import { LoginComponentTypes } from "../LoginTypes";

function LoginComponent({
  handleSubmit,
  error,
  setEmail,
  email,
  password,
  setPassword,
  handleNavigateSignUp,
  loading,
}: LoginComponentTypes) {
  return (
    <div className="signup-card">
      <h2>Login</h2>
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
        <button type="submit" className="signup-button" disabled={loading}>
          Login
        </button>
      </form>
      <p className="login-link">
        Don't have an account?{" "}
        <span
          onClick={() => handleNavigateSignUp()}
          style={{ cursor: "pointer", color: "#4a90e2" }}
        >
          Sign up
        </span>
      </p>
    </div>
  );
}
export default LoginComponent;
