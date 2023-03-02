import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="h-full w-full flex flex-col justify-evenly items-center align-center bg-red-100">
      <h1 className="text-center text-xl">Welcome To ToDo</h1>
      <div className="links flex flex-col   w-1/2 justify-evenly align-center items-center">
        <img
          className=""
          src="https://ik.imagekit.io/d5scjfbjc/ezgif.com-crop__1__QghLD5GnT.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1676965779867"
          alt="todo-gif"
        />
        <Link
          className="text-center w-1/2 p-5 mt-2 rounded bg-red-400 hover:bg-red-600"
          to="/signup"
        >
          Get Started With Sign Up
        </Link>
      </div>
    </div>
  );
}
export default Homepage;
