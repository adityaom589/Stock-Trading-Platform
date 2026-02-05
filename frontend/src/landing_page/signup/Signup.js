import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3002/signup",
        {
          ...inputValue,
          createdAt: new Date().toISOString(),
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login"); // go to login after signup
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card shadow-lg border-0"
        style={{ maxWidth: "450px", width: "100%", margin: "1rem" }}
      >
        {/* Header */}
        <div className="card-header bg-primary text-white text-center py-4">
          <h2 className="mb-1 fw-bold">Create Account</h2>
          <p className="mb-0 opacity-75">Sign up to start using the dashboard</p>
        </div>

        {/* Form */}
        <div className="card-body p-4 p-md-5">
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label className="form-label fw-semibold mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-envelope-fill text-primary"></i>
                </span>
                <input
                  type="email"
                  className="form-control shadow-none"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>

            {/* Username */}
            <div className="mb-4">
              <label className="form-label fw-semibold mb-2" htmlFor="username">
                Username
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-person-fill text-primary"></i>
                </span>
                <input
                  type="text"
                  className="form-control shadow-none"
                  id="username"
                  name="username"
                  value={username}
                  placeholder="Choose a username"
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="form-label fw-semibold mb-2" htmlFor="password">
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-lock-fill text-primary"></i>
                </span>
                <input
                  type="password"
                  className="form-control shadow-none"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Create a password"
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-100 py-3 mb-3 fw-semibold"
            >
              <i className="bi bi-person-plus-fill me-2"></i>
              Sign Up
            </button>

            {/* Divider */}
            <div className="d-flex align-items-center mb-3">
              <hr className="flex-grow-1" />
              <span className="px-3 text-muted small fw-semibold">or</span>
              <hr className="flex-grow-1" />
            </div>

            {/* Login link */}
            <div className="text-center">
              <p className="mb-0 text-muted">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary fw-semibold text-decoration-none"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="card-footer bg-light text-center py-3 border-0">
          <small className="text-muted">
            © 2026 Trading Dashboard. All rights reserved.
          </small>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
