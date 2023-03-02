import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function LoginUi() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  function handleLogin() {
    axios
      .get("http://localhost:8080/authCheck", { params: userDetails })
      .then((res) => {
        localStorage.setItem("user-token", res.data.accessToken);
        if (res.status === 200) {
          navigate("/todo");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form>
                <div className="mb-6">
                  <input
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                    type="email"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Email address"
                    required
                  />
                </div>

                <div className="mb-6">
                  <input
                    value={userDetails.password}
                    onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Password"
                    required
                  />
                </div>

                <div className="text-center lg:text-left">
                  <button
                    type="button"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don&apos;t have an account?
                    <a
                      href="#!"
                      className="text-red-600 ml-2 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      <Link to="/signup">Sign Up</Link>
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default LoginUi;
