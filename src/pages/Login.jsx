import React from "react";
import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
  return (
    <div className="bg">
    <div className="wrapper">
      <form action="" className="form">
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" required="required" placeholder="Username" />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" required="required" placeholder="Password" />
          <FaLock className="icon" />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember Me
          </label>
          <a href="#">Forgot Password?</a>
        </div>

        <button type="submit"   onClick={(e) => {
    e.preventDefault(); 
    navigate("/dashboard");
  }}>
          Login
        </button>

        <div className="register">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Login;
