import { useState } from "react";
import { Link } from "react-router-dom";
import "./register_2.scss";

import axios from "axios";

const Register_2 = () => {
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

  return (
    <div className="login_2">
      <div className="login-container">
        <div className="top-wrapper">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span
              className="logo"
              style={{ fontSize: "30px", fontWeight: "700" }}
            >
              Sheep
            </span>
          </Link>
          <h3>Sign Up</h3>
          <span className="dhaa">
            Already have an account
            <Link to="/login">
              {" "}
              <strong>Sign in</strong>{" "}
            </Link>
          </span>

          <h2 className="title"></h2>
        </div>

        <div className="form-wrapper">
          <div className="inputss">
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
          </div>

          <span onClick={handleClick} className="btn_login">
            Register
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register_2;
