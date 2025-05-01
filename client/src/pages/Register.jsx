import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "../api/axois";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline";
import { Header, Footer } from "../components";
import { getNames } from "country-list";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.country
    ) {
      setError("All fields are required");
      return;
    }

    try {
      const { data } = await axios.post("/auth/register", formData);

      // Store token and redirect
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <>
      <Header></Header>
      <main className="max-w-7xl min-h-screen bg-gray-200 dark:bg-gray-800/50 flex flex-col gap-20 justify-center items-center mx-auto">
        <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Register</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullname">
                <div className="mt-1 flex rounded-md shadow-sm shadow-gray-500">
                  <UserIcon className="h-5 w-5 m-3" />
                  <input
                    id="fullname"
                    type="text"
                    value={formData.name}
                    placeholder="Full Name"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="flex-1 block w-full p-2 rounded-md focus:outline-none"
                  />
                </div>
              </label>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email">
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

            {/* Password Field */}
            <div>
              <label htmlFor="password">
                <div className="mt-1 flex rounded-md shadow-sm shadow-gray-500 focus-within:ring-2 focus-within:ring-blue-500">
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

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword">
                <div className="mt-1 flex rounded-md shadow-sm shadow-gray-500 focus-within:ring-2 focus-within:ring-blue-500">
                  <LockClosedIcon className="h-5 w-5 m-3" />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    className="flex-1 block w-full p-2 rounded-md focus:outline-none"
                    required
                  />
                </div>
              </label>
              {confirmPassword &&
                formData.password !== confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    Passwords do not match
                  </p>
                )}
            </div>

            {/* Country Field */}
            <div>
              <label htmlFor="country">
                <div className="mt-1 flex rounded-md shadow-sm shadow-gray-500 focus-within:ring-2 focus-within:ring-blue-500">
                  <GlobeAmericasIcon className="h-5 w-5 m-3" />
                  <select
                    id="country"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className="flex-1 block w-full p-2 rounded-md focus:outline-none dark:bg-gray-900 dark:text-white/50 text-black/50"
                    required
                  >
                    <option value="">Select Country</option>
                    {getNames().map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Create Account
              </button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-500">Already have an account? </span>
              <Link to="/login" className="text-blue-500 hover:underline">
                Log In
              </Link>
            </div>
          </form>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Register;
