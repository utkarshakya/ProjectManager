import React from "react";
import { CodeBracketIcon, CommandLineIcon, UsersIcon, ClockIcon, CodeBracketSquareIcon } from '@heroicons/react/24/outline';
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
    <Header></Header>
    <main className="max-w-7xl min-h-screen bg-gray-200 dark:bg-gray-800/50 flex flex-col gap-20 justify-center items-center mx-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">About Task Manager</h1>
        
        <div className="space-y-6 mb-12">
          <p className="text-lg">
            Task Manager is a modern project management solution designed to help teams and individuals 
            organize their work efficiently. Built with cutting-edge technologies, it provides a seamless 
            experience for tracking project progress and collaborating effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <CodeBracketIcon className="w-6 h-6 text-indigo-400" />
              Key Features
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <CommandLineIcon className="w-5 h-5 text-green-400" />
                Create 4 Projects With Free Account
              </li>
              <li className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5 text-blue-400" />
                Create Many Tasks In A Single Project
              </li>
              <li className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-purple-400" />
                Access From Anywhere At Anytime
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <CodeBracketIcon className="w-6 h-6 text-indigo-400" />
              Technology Stack
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 p-3 rounded text-center">React</div>
              <div className="bg-gray-700 p-3 rounded text-center">Node.js</div>
              <div className="bg-gray-700 p-3 rounded text-center">MongoDB</div>
              <div className="bg-gray-700 p-3 rounded text-center">Tailwind</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <h3 className="text-xl font-semibold text-white mb-4">Version Information</h3>
          <div className="space-y-2">
            <p>Current Version: 1.0.0</p>
            <p>Last Updated: July 2023</p>
            <p>License: MIT</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center gap-4">
          <a 
            href="https://github.com/utkarshakya/ProjectManager" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full md:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <CodeBracketSquareIcon className="w-5 h-5" />
            View Source Code
          </a>
        </div>
      </div>
    </main>
    <Footer></Footer>
    </>
  );
};

export default About;