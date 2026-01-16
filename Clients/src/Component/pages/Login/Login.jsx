import React, { useState, useContext, useEffect } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../../context/Context";
import { API_BASE } from "../../../api";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMSG, setErrorMSG] = useState("");

  const { user, dispatch, isFetching } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMSG("");
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        navigate("/");
      } else {
        setErrorMSG(data.message || "Something went wrong!");
        dispatch({ type: "LOGIN_FAILURE" });
      }
    } catch (err) {
      setErrorMSG("Server error. Please try again.");
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <div className="loginCard">
        <h2 className="loginTitle">Welcome Back 👋</h2>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <FaEnvelope className="inputIcon" />
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="inputGroup">
            <FaLock className="inputIcon" />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMSG && <p className="error">{errorMSG}</p>}

          <button type="submit" className="loginButton" disabled={isFetching}>
            {isFetching ? "Logging in..." : "Login"}
          </button>

          <Link to="/register" className="loginRegisterButtonLink">
            <button type="button" className="loginRegisterButton">
              Create Account
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
