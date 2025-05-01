import { useEffect } from "react";
import { useNavigate } from "react-router";

const GuestRoute = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return !token ? children : null;
};

export default GuestRoute;
