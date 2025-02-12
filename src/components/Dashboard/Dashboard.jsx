import React from 'react';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import authService from "../../appwrite/auth";

const Dashboard = () => {

  const [userName, setUserName] = useState(""); // String to hold the user's name
  const authStatus = useSelector((state)=> state.auth.status)

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = await authService.getcurrentUser(); 
        setUserName(user.name); 
      } catch (error) {
        console.error("Failed to fetch user name:", error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className="bg-gray-100 py-20 flex items-center justify-center w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md ">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome, {userName}!</h1>
        <p className="text-center text-gray-600 mb-4">This is your personal dashboard. Explore your projects and settings.</p>
        
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
            View Projects
          </button>
          <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300">
            Download Resume
          </button>
        </div>

        <div className="mt-8 text-center">
          <button className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300" onClick={() => alert('Logging out...')}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
