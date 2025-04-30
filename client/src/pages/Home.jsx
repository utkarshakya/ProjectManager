import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <Header></Header>
      <main className="max-w-7xl min-h-screen bg-gray-200 dark:bg-gray-800/50 flex flex-col gap-20 justify-center items-center mx-auto">
        <h1 className="font-bold md:text-7xl text-blue-600 dark:text-blue-400 max-w-3xl text-center">
          Define Your Tasks, Organise Your Project With Full Control And
          Security
        </h1>
        <div className="flex ">
          <Link
            to="/dashboard"
            className="text-white font-semibold bg-blue-600 dark:bg-blue-500 px-5 py-3 rounded-full hover:px-10 transition-padding duration-300 ease-in-out"
          >
            Get Started
          </Link>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}
