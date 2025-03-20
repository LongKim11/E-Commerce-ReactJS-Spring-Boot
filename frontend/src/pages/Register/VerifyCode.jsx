import React, { useState } from "react";
import { setLoading } from "../../store/features/loadingSlice";
import { useDispatch } from "react-redux";
import { verifyCode } from "../../api/authenticationAPI";

export const VerifyCode = ({ email }) => {
  const [formData, setFormData] = useState({ username: email, code: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    verifyCode(formData)
      .then((res) => {
        console.log(res);
        setMessage(
          "Successfully verified! Now you can sign in to your account."
        );
      })
      .catch((err) => {
        console.log(err);
        setError("The verification code is incorrect or expired!");
      })
      .finally(() => dispatch(setLoading(false)));
  };

  return (
    <div>
      {!message && (
        <>
          <p className="text-3xl font-bold text-center mb-2">
            Verify Your Account
          </p>
          <p className="text-gray-500 mb-2 text-center">
            We have sent you the verification code to {email}
          </p>
          <p className="text-gray-500 text-center">
            Enter the code below to confirm your email address
          </p>
          <form onSubmit={handleOnSubmit}>
            <div className="mt-10">
              <label>Enter 6-digit verification code</label>
              <input
                type="text"
                name="code"
                required
                onChange={handleChange}
                value={formData.code}
                maxLength={6}
                className="w-full border border-gray-400 px-4 py-3 focus:outline-none rounded mt-2 focus:border-black"
              ></input>
            </div>
            <button
              type="submit"
              className="rounded bg-blue-600 text-white px-4 py-2 cursor-pointer w-full hover:bg-blue-700 mt-5"
            >
              Verify {"->"}
            </button>
          </form>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </>
      )}
      {message && <p className="text-3xl text-center">{message}</p>}
    </div>
  );
};
