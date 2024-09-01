import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signuporin.css";
import Logo from "../../assets/Logo2.png";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import backgroundPattern from "../../assets/stacked-waves-haikei.svg";

const Signuporin = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    age: "",
    address: "",
    membershipType: "BRONZE SHUTTLE",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp && formData.password !== formData.confirmPassword) {
      enqueueSnackbar("Passwords do not match", {
        variant: "error",
        autoHideDuration: 1000,
      });
      return;
    }

    const signupUrl = "http://localhost:3000/api/users/signup";
    const signinUrl = "http://localhost:3000/api/users/signin";

    try {

      if (isSignUp) {
        // Signup process
        await axios.post(signupUrl, formData);
        enqueueSnackbar("You have signed up successfully.", {
          variant: "success",
          autoHideDuration: 1000,
        });

        // Sign in automatically after signup
        const signinResponse = await axios.post(signinUrl, {
          email: formData.email,
          password: formData.password,
        });

        // Save token, userName, and userId in local storage
        localStorage.setItem("token", signinResponse.data.token);
        localStorage.setItem("userName", signinResponse.data.user.name);
        localStorage.setItem("userId", signinResponse.data.user.userId);

        navigate("/memberaccount");
      } else {
        // Sign in process
        const signinResponse = await axios.post(signinUrl, formData);

        enqueueSnackbar("You have signed in successfully.", {
          variant: "success",
          autoHideDuration: 1000,
        });

        // Save token, userName, and userId in local storage
        localStorage.setItem("token", signinResponse.data.token);
        localStorage.setItem("userName", signinResponse.data.user.name);
        localStorage.setItem("userId", signinResponse.data.user.userId);

        navigate("/memberaccount");
      }

    } catch (error) {
      console.error(
        `Error ${isSignUp ? "creating user" : "signing in"}:`,
        error
      );
      enqueueSnackbar("Your Username or Password is incorrect, try again", {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };


  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="auth-wrapper"
      style={{
        backgroundImage: `url(${backgroundPattern}), linear-gradient(to right, #f8f9fa, #e9ecef)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="backbutton-container"></div>
      <div className="auth-container">
        <img src={Logo} alt="Logo" className="auth-logo" />
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                inputProps={{ min: 1 }}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <select
                name="membershipType"
                value={formData.membershipType}
                onChange={handleChange}
                required
              >
                <option value="BRONZE SHUTTLE">BRONZE SHUTTLE</option>
                <option value="SILVER SHUTTLE">SILVER SHUTTLE</option>
                <option value="GOLD SHUTTLE">GOLD SHUTTLE</option>
              </select>
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="eye-icon" onClick={toggleShowPassword}>
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </span>
          </div>
          {isSignUp && (
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span className="eye-icon" onClick={toggleShowPassword}>
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </span>
            </div>
          )}
          <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
          <button onClick={toggleAuthMode} className="toggle-button">
            {isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signuporin;
