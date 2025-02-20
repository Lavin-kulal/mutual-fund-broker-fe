import React, { useEffect, useState } from "react";
import Auth from "../Components/Auth";
import { useNavigate, useRoutes } from "react-router-dom";
import { mainRoutes } from "../../routes";
import { useUser } from "../../Context/UserContext";
import axios from "axios";

const FETCH_FUNDS_API = "http://localhost:8080/mfb/client/auth/check";

function AuthContainer() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(FETCH_FUNDS_API, {
          withCredentials: true,
        });

        if (response.data.results?.userInfo) {
          setUser(response.data.results.userInfo);
        } else {
          setUser(null);
          navigate("/signup");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
        navigate("/signup");
      } finally {
        setIsLoading(false);
      }
    };

    checkUserAuth();
  }, []);

  const renderRoutes = useRoutes(mainRoutes);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Auth renderRoutes={renderRoutes} />;
}

export default AuthContainer;
