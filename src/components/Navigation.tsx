import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-red-500 text-white">
      <h3 className="font-bold">Search</h3>

      <span>
        <Link to="/" className="mr-2">
          Home
        </Link>
        <Link to="/Favorites">Favorites</Link>
      </span>
    </nav>
  );
};
