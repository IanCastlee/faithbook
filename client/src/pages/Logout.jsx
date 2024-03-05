import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const handleLogout = async () => {
    const navigate = useNavigate;
    try {
      // Make a request to the server's logout endpoint
      const response = await axios.post("/logout"); // Adjust the endpoint URL as needed

      // Assuming the server responds with a success message
      console.log(response.data);
      navigate("/login");

      // You can also redirect the user or perform other actions after successful logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
};

export default Logout;
