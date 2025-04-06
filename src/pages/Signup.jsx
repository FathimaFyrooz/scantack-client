import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css"; // Import the updated CSS file

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // ✅ New state for email
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/auth/signup/", {
        username,
        email, // ✅ Send email in request
        password,
      });
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Signup</h2>
        <form onSubmit={handleSignup} className="signup-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="signup-input"
          />
          <input
            type="email" // ✅ Email input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-input"
          />
          <button type="submit" className="signup-button">Signup</button>
        </form>

        <p className="signup-text">
          Already have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/login")}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
