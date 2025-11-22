import React from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
function SignUp() {
  return (
    <div className="bg">
    <div className="wrapper">
      <form action="" className="form">
        <h1>Create An Account</h1>
        <div className="input-box">
          <input type="text" required="required" placeholder="Full name" />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="text" required="required" placeholder="email address" />
          <MdEmail className="icon" />
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

        <button type="submit">SignUp</button>

        <div className="register">
          <p>
            Already have an account? <Link to="/">Log in</Link>
          </p>
        </div>
      </form>
    </div>
    </div>
  );
}

export default SignUp;
