import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";

import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    // Add your validation logic here
    // For example, you can check if the fields are not empty
    if (!inputs.username || !inputs.email || !inputs.password || !inputs.name) {
      setErr("All fields are required");
      return false;
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      setErr("Invalid email format. Example: example@gmail.com");
      return false;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/;
    if (!passwordRegex.test(inputs.password)) {
      setErr(
        "Password must contain an uppercase letter, a special character, and be at least 8 characters long"
      );
      return false;
    }

    return true;
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    } else {
      try {
        await axios.post("http://localhost:8800/api/auth/register", inputs);
        setSuccess("Successfully registered!");
        setErr(null);
      } catch (err) {
        setErr(err.response.data);
      }
    }
  };

  console.log(err);
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Faithbook</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur. Lorem60
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <span style={{ display: "flex", justifyContent: "center" }}>
              {success && success}
              {err && err}
            </span>
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
