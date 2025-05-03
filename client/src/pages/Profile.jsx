import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "../api/axios.js";
import { getNames } from "country-list";
import {
  UserIcon,
  EnvelopeIcon,
  GlobeAmericasIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Header, Footer } from "../components/index.js";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    country: "",
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/user/profile");
        setUser(data.profile);
      } catch (err) {
        if (err.response?.status === 401) navigate("/user/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const { data } = await axios.put("/user/profile", user);
      setUser(data.user);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Update failed");
    }
  };

  if (loading)
    return <div className="text-center py-8">Loading profile...</div>;

  return (
    <>
      <Header></Header>
      <main className="max-w-7xl min-h-screen bg-gray-200 dark:bg-gray-800/50 flex flex-col gap-20 justify-center items-center mx-auto">
        <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Success/Error Messages */}
            {success && (
              <div className="p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5" />
                {success}
              </div>
            )}
            {error && (
              <div className="text-red-500 p-3 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Name
              </label>
              <div className="mt-1 flex rounded-md shadow-sm shadow-gray-500">
                <UserIcon className="h-5 w-5 m-3" />
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="flex-1 block w-full p-2 rounded-md focus:outline-none"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Email
              </label>
              <div className="mt-1 flex rounded-md shadow-sm shadow-gray-500">
                <EnvelopeIcon className="h-5 w-5 m-3" />
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="flex-1 block w-full p-2 rounded-md focus:outline-none"
                />
              </div>
            </div>

            {/* Country Field */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Country
              </label>
              <div className="mt-1 flex rounded-md shadow-sm shadow-gray-500 focus-within:ring-2 focus-within:ring-blue-500">
                <GlobeAmericasIcon className="h-5 w-5 m-3" />
                <select
                  id="country"
                  value={user.country}
                  onChange={(e) =>
                    setFormData({ ...user, country: e.target.value })
                  }
                  className="flex-1 block w-full p-2 rounded-md focus:outline-none dark:bg-gray-900 dark:text-white/50 text-black/50"
                  defaultValue={user.country}
                >
                  <option value="">Select Country</option>
                  {getNames().map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Update Profile
            </button>
          </form>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Profile;
