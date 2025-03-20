import React, { useState } from "react";
import GoogleLogo from "../../assets/images/google.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/features/loadingSlice";
import { register } from "../../api/authenticationAPI";
import { VerifyCode } from "./VerifyCode";

export const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const [enableVerify, setEnableVerify] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    dispatch(setLoading(true));
    register(formData)
      .then((res) => {
        if (res?.code === 200) {
          setEnableVerify(true);
        }
      })
      .catch(() => {
        setError("Email already existed!");
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="px-20">
      {!enableVerify && (
        <>
          <p className="text-3xl font-bold text-center mb-2">
            Create new account
          </p>
          <p className="text-gray-500 mb-10 text-center">
            Sign up to get free access to all our new products
          </p>
          <button className="flex justify-center items-center rounded border px-4 py-2 mb-10 w-full cursor-pointer hover:bg-gray-100">
            <img src={GoogleLogo} className="w-12 h-6"></img>
            <p className="">Sign up with Google</p>
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
                  name="email"
                  required
                  onChange={handleChange}
                  value={formData.email}
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
              <div className="mb-5">
                <label>Re-enter your password:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  className="w-full border border-gray-400 px-4 py-3 focus:outline-none rounded mt-2 focus:border-black"
                ></input>
              </div>

              <button
                type="submit"
                className="rounded bg-blue-600 text-white px-4 py-2 cursor-pointer w-full hover:bg-blue-700 mb-3"
              >
                Sign up {"->"}
              </button>
              <Link
                to="/auth/login"
                className="underline mt-3 text-gray-500 hover:text-gray-700 mb-5 focus:outline-none"
              >
                Already have an account? Log in
              </Link>
            </form>
            {error && <p className="text-red-500 mt-5">{error}</p>}
          </div>
        </>
      )}
      {enableVerify && <VerifyCode email={formData.email} />}
    </div>
  );
};
