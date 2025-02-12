import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import authService from "../../appwrite/auth";

const WelcomeMessage = () => {
  const[userName, setUserName] = useState("");

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
    <div className="bg-gray-100 text-center p-4">
      <h1 className="text-xl font-bold">Welcome, {userName}!</h1>
    </div>
  );
};

export default WelcomeMessage;
