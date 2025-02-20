import React, { useEffect } from "react";
import "./App.css";
import Auth from "./Features/Auth";
import { useNavigate } from "react-router-dom";
import { UserProvider, useUser } from "./Features/Context/UserContext";

function App() {
  return (
    <div className="App">
      <div className="main-header-container">
        <UserProvider>
          <Auth />
        </UserProvider>
      </div>
    </div>
  );
}

export default App;
