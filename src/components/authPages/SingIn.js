import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { serverUrl , secretEnKey } from "../../config";
import {
  addAmin,
} from "../../StoreRedux/adminSlice";
import axios from "axios";
import { Loader } from "../Loader/loader";
import CryptoJS from 'crypto-js';

export default function SignIn() {
  const [loading, setloading] = useState(false)
  const [error, setError] = useState(false)
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setshowpassword] = useState(false);

  const encryptUserData = (data, secretKey) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey);
    return encryptedData.toString();
  }

  const handleChange = async () => {
    setloading(true);
    try {
      const response = await axios.post(`${serverUrl}/api/admin/login`, {
        email,
        password,
      });
      if (response && response.status === 200) {
        console.log("success" , response)
        setloading(false);
        dispatch(addAmin(response.data.admin));
        const admin = encryptUserData(response.data.admin, secretEnKey);
        localStorage.setItem('ARABIC_ADMIN_KEY_STRING', JSON.stringify({ admin, expiration: response.data.admin.sessionExpiration }));

        toast.success("Login Succefully")
        navigate("/Admin/starter");
      }
    } catch (error) {
      setloading(false);
      if (error.response) {
        console.log(error);
        setError(error.response.message)
        toast.error("Failed to Login")
      } else {
        console.log("Failed to login: Invalid credentials");

      }
    }
  };

  return (
    <>
      <div className="area bg-purple-900">
        <ul className="circles  bg-purple-900">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="bg-white p-14 rounded-md shadow-md">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex items-center justify-between">
              <img className="mx-auto h-12 w-auto" src='/logo.svg' alt="Food" />
              <h2 className="my-2 text-center text-2xl font-bold leading-9 tracking-tight text-purple-800">
              Blog Website Admin Panel
              </h2>
            </div>
            <h2 className="my-1 text-center text-2xl font-bold leading-9 tracking-tight text-purple-800">
              Sign-In
            </h2>
          </div>

          <div className="my-2 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="my-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>

                </div>
                <div className="my-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showpassword ? 'text' : 'password'}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div onClick={() => { setshowpassword(!showpassword) }} className="absolute right-3 top-2 cursor-pointer  ">
                    {showpassword ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                    }
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleChange}
                  className="flex w-full justify-center rounded-md bg-purple-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
            {error && <p className="mt-5 text-red-500">{error}</p>}

            {/* <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                to="/signup"

                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Create a New Account
              </Link>
            </p> */}

          </div>
        </div>
      </div>

      {/* wave */}
      {/* <Wave fill={"#9333EA"}
    paused={false}
    style={{ display: 'flex',position: "absolute",
bottom: 0,
}}
    options={{
      height: 16,
      amplitude: 30,
      speed: 0.10,
      points: 6,

    }}
/> */}
      <Loader loading={loading} />
    </>
  );
}
