import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  
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
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3002/login",
        { ...inputValue },
        { withCredentials: true }
      );

       console.log('BACKEND RESPONSE:', data);


      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg border-0" style={{ maxWidth: '450px', width: '100%' }}>
        {/* Header */}
        <div className="card-header bg-primary text-white text-center py-4">
          <h3 className="mb-0 fw-bold">Welcome Back</h3>
          <p className="mb-0 opacity-75">Sign in to your account</p>
        </div>
        
        {/* Form */}
        <div className="card-body p-4 p-md-5">
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="form-label fw-semibold mb-2">
                Email Address
              </label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-envelope-fill text-primary"></i>
                </span>
                <input
                  type="email"
                  className="form-control form-control-lg border-start-0 shadow-none"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-semibold mb-2">
                Password
              </label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-lock-fill text-primary"></i>
                </span>
                <input
                  type="password"
                  className="form-control form-control-lg border-start-0 shadow-none"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="d-grid mb-4">
              <button 
                type="submit" 
                className="btn btn-primary btn-lg fw-semibold py-3"
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Sign In
              </button>
            </div>

            {/* Divider */}
            <div className="d-flex align-items-center mb-4">
              <hr className="flex-grow-1" />
              <span className="px-3 text-muted small fw-semibold">or</span>
              <hr className="flex-grow-1" />
            </div>

            {/* Signup Link */}
            <div className="text-center">
              <p className="mb-0 text-muted">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-primary fw-semibold text-decoration-none hover-shadow"
                >
                  Create one now
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
      
      {/* Custom CSS */}
      <style jsx>{`
        .hover-shadow:hover {
          text-shadow: 0 0 5px rgba(13, 110, 253, 0.5);
        }
        .input-group-text i {
          font-size: 1.1rem;
        }
        @media (max-width: 576px) {
          .card {
            margin: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
