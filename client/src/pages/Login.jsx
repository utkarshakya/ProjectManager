import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Header, Footer } from "../components/";
import axios from "../api/axios.js"

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post("/user/login", formData);
      console.log(data);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Header></Header>
      <main className="max-w-7xl min-h-screen bg-gray-200 dark:bg-gray-800/50 flex flex-col gap-20 justify-center items-center mx-auto">
        <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center">Log In</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                <div className="mt-1 flex rounded-md shadow-sm shadow-gray-500">
                  <EnvelopeIcon className="h-5 w-5 m-3" />
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    placeholder="Email"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="flex-1 block w-full p-2 rounded-md focus:outline-none"
                  />
                </div>
              </label>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                <div className="mt-1 flex rounded-md shadow-sm shadow-gray-500">
                  <LockClosedIcon className="h-5 w-5 m-3" />
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    placeholder="Password"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="flex-1 block w-full p-2 rounded-md focus:outline-none"
                  />
                </div>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Login
            </button>

            <div className="text-center text-sm">
              <span className="text-gray-500">New user? </span>
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </div>
          </form>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Login;
