import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Track current route
  const [menu, Setmenu] = useState("All");

  // Update menu state based on the current route
  useEffect(() => {
    if (location.pathname === "/music") {
      Setmenu("Music");
    } else if (location.pathname === "/podcast") {
      Setmenu("Podcast");
    } else {
      Setmenu("All");
    }
  }, [location.pathname]); // Run when the route changes

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            onClick={() => {
              navigate(-1);
            }}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-[#4e4d4d]"
            src={assets.arrow_left}
            alt="Go back"
          />
          <img
            onClick={() => {
              navigate(1);
            }}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-[#4e4d4d]"
            src={assets.arrow_right}
            alt="Go forward"
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Explore Premium
          </p>
          <a
            href="http://play.google.com/store/apps/details?id=com.spotify.music"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer"
          >
            Install App
          </a>
          <p className="bg-purple-500 text-black w-7 h-7 flex items-center justify-center rounded-full">
            V
          </p>
        </div>
      </div>
      <ul className="flex items-center gap-2 mt-4">
        <NavLink to="/">
          <li
            className={`px-4 py-1 rounded-2xl cursor-pointer ${
              menu === "All" ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            <p>All</p>
          </li>
        </NavLink>
        <NavLink to="/music">
          <li
            className={`px-4 py-1 rounded-2xl cursor-pointer ${
              menu === "Music" ? "bg-white text-black font-medium" : "bg-black text-white"
            }`}
          >
            <p>Music</p>
          </li>
        </NavLink>
        <NavLink to="/podcast">
          <li
            className={`px-4 py-1 rounded-2xl cursor-pointer ${
              menu === "Podcast" ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            <p>Podcast</p>
          </li>
        </NavLink>
      </ul>
    </>
  );
};

export default Navbar;
