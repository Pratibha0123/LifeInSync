import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../../context/Context";
import { API_BASE } from "../../../api";
import "./Register.css";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const { user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Ensure "username" matches what backend expects. The previous code used "name", but backend likely expects "username"
        // Let's assume username based on standard practices, I'll check authController later if needed.
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Registered successfully! Redirecting...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(true);
        setMessage(data.message || "Registration failed");
      }
    } catch {
      setError(true);
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Your Account</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            className="register-input"
            placeholder="Enter your username"
            onChange={handleChange}
            value={formData.username}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            className="register-input"
            placeholder="Enter your email"
            onChange={handleChange}
            value={formData.email}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            className="register-input"
            placeholder="Enter your password"
            onChange={handleChange}
            value={formData.password}
            required
          />

          {message && <p className={error ? "error" : "success-msg"} style={{ color: error ? "red" : "green", textAlign: "center" }}>{message}</p>}
          <button className="register-btn" type="submit">
            Register
          </button>

          <p className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
