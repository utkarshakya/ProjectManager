import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
// import {
//   UserIcon,
//   EnvelopeIcon,
//   GlobeAmericasIcon,
//   CheckCircleIcon
// } from '@heroicons/react/24/outline';
// import axios from "../api/axios.js"

const Profile = () => {
  // const [user, setUser] = useState({
  //   name: '',
  //   email: '',
  //   country: ''
  // });
  // const [loading, setLoading] = useState(true);
  // const [success, setSuccess] = useState('');
  // const [error, setError] = useState('');
  // const navigate = useNavigate();

  // Fetch user data
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const { data } = await axios.get('/users/me');
  //       setUser(data);
  //     } catch (err) {
  //       if(err.response?.status === 401) navigate('/login');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProfile();
  // }, [navigate]);

  // Handle form submit
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setSuccess('');

  //   try {
  //     const { data } = await axios.put('/users/me', user);
  //     setUser(data);
  //     setSuccess('Profile updated successfully!');
  //   } catch (err) {
  //     setError(err.response?.data?.error || 'Update failed');
  //   }
  // };

  // if (loading) return <div className="text-center py-8">Loading profile...</div>;

  return (
    // <main className="max-w-2xl mx-auto p-4">
    //   <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

    //   <form onSubmit={handleSubmit} className="space-y-6">
    //     {/* Success/Error Messages */}
    //     {success && (
    //       <div className="p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
    //         <CheckCircleIcon className="w-5 h-5" />
    //         {success}
    //       </div>
    //     )}
    //     {error && <div className="text-red-500 p-3 bg-red-50 rounded-lg">{error}</div>}

    //     {/* Name Field */}
    //     <div>
    //       <label className="block text-sm font-medium text-gray-700 mb-2">
    //         Name
    //       </label>
    //       <div className="flex rounded-md shadow-sm">
    //         <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50">
    //           <UserIcon className="h-5 w-5 text-gray-400" />
    //         </span>
    //         <input
    //           type="text"
    //           value={user.name}
    //           onChange={(e) => setUser({ ...user, name: e.target.value })}
    //           className="flex-1 block w-full rounded-none rounded-r-md border-gray-300"
    //         />
    //       </div>
    //     </div>

    //     {/* Email Field (similar structure) */}
    //     {/* Country Field (similar structure) */}

    //     <button
    //       type="submit"
    //       className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
    //     >
    //       Update Profile
    //     </button>
    //   </form>
    // </main>
    <main className="max-w-7xl min-h-screen bg-gray-200 dark:bg-gray-800/50 flex flex-col gap-20 justify-center items-center mx-auto">
      <h3 className="text-xl">I'm working on it</h3>
      <Link to="/" className="bg-blue-500 rounded-2xl hover:bg-blue-600">
        Go to Home
      </Link>
    </main>
  );
};

export default Profile;
