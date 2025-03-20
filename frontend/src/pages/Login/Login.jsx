import React, { useState } from "react";
import GoogleLogo from "../../assets/images/google.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/features/loadingSlice";
import { login } from "../../api/authenticationAPI";
import { saveToken } from "../../utils/jwt-helper";
import { API_BASE_URL } from "../../api/endpoints";

export const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    dispatch(setLoading(true));
    login(formData)
      .then((res) => {
        if (res?.token) {
          saveToken(res.token);
          navigate("/");
        }
      })
      .catch(() => {
        setError("Username or password is incorrect!");
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleButton = () => {
    window.location.href = API_BASE_URL + "/oauth2/authorization/google";
  };

  return (
    <div className="px-20">
      <p className="text-3xl font-bold mb-3 text-center">Log in</p>
      <p className="text-gray-500 mb-10 text-center">
        Welcome back! Please enter your details
      </p>
      <button
        onClick={handleGoogleButton}
        className="flex justify-center items-center rounded border px-4 py-2 mb-10 w-full cursor-pointer hover:bg-gray-100"
      >
        <img src={GoogleLogo} className="w-12 h-6"></img>
        <p className="">Continue With Google</p>
      </button>
      <div className="flex gap-x-2 text-gray-500 items-center mb-10">
        <hr className="w-full"></hr>
        <p className="w-fit">OR</p>
        <hr className="w-full"></hr>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label>Email Address:</label>
            <input
              type="email"
              name="username"
              required
              onChange={handleChange}
              value={formData.username}
              className="w-full border border-gray-400 px-4 py-3 focus:outline-none rounded mt-2 focus:border-black"
            ></input>
          </div>
          <div className="mb-5">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              value={formData.password}
              className="w-full border border-gray-400 px-4 py-3 focus:outline-none rounded mt-2 focus:border-black"
            ></input>
          </div>
          <Link className="flex justify-end underline mt-3 text-gray-500 hover:text-gray-700 mb-5 focus:outline-none">
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="rounded bg-blue-600 text-white px-4 py-2 cursor-pointer w-full hover:bg-blue-700 mb-3"
          >
            Log In {"->"}
          </button>
          <Link
            to="/auth/register"
            className="underline mt-3 text-gray-500 hover:text-gray-700 mb-5 focus:outline-none"
          >
            Don't have an account? Sign up
          </Link>
        </form>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
};
