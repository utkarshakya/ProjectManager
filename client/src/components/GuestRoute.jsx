import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const GuestRoute = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return !token ? <Outlet/> : null;
};

export default GuestRoute;
