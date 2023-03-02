/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUpUi() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/newuser", userDetails)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <nav className="w-full p-2 flex items-center bg-slate-200">
        <img
          className="object-fill w-16 h-12 mr-2"
          src="https://ik.imagekit.io/d5scjfbjc/ezgif.com-crop__1__QghLD5GnT.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1676965779867"
          alt="todo-logo"
        />
        <Link to="/">Home</Link>
      </nav>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign up for your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label className="sr-only">
                  <input
                    id="name"
                    name="name"
                    onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                    type="text"
                    required
                    value={userDetails.name}
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="name"
                  />
                  Name
                </label>
              </div>
              <div>
                <label className="sr-only">
                  Email address
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                    required
                    className="relative block w-full appearance-none rounded-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </label>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={userDetails.password}
                  onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/login"
                  class="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Already have account?
                </Link>
              </div>

              <div className="text-sm">
                <a
                  href="/"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default SignUpUi;
