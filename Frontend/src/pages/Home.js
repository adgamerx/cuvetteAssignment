import React from "react";
import { ArrowRight } from "lucide-react";

const Home = () => {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="max-w-md w-full mx-auto p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 animate-fade-in-up">
              Welcome to Cuvette
            </h1>
            <p className="text-xl text-white/80">Assignment Loading...</p>
          </div>
  
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => (window.location.href = "/login")}
              className="w-full sm:w-1/2 px-6 py-3 text-lg font-medium text-white bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition duration-300 flex items-center justify-center group"
            >
              Login
              <ArrowRight className="ml-2 h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={() => (window.location.href = "/register")}
              className="w-full sm:w-1/2 px-6 py-3 text-lg font-medium text-indigo-900 bg-white rounded-lg shadow-lg hover:bg-indigo-50 transition duration-300 flex items-center justify-center group"
            >
              Register
              <ArrowRight className="ml-2 h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;