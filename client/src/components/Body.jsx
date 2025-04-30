import React from "react";
import { Link } from "react-router";

export default function Body() {
  return (
    <Link
      to="https://github.com/utkarshakya/TaskManager"
      className="text-blue-600 hover:text-black font-semibold bg-white rounded-full px-4 py-2"
    >
      Source Code
    </Link>
  );
}
