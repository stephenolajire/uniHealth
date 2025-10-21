import React from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md relative">
        <div className="mb-3 w-ful flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full border-2 border-blue-600">
            <img src="/logo.png" className="w-20 h-20 rounded-full" />
          </div>
        </div>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 text-center">
          Login
        </h2>
        <p className="text-base text-gray-500 text-center mb-6">
          Please enter your email and password to login.
        </p>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Enter your email address"
          />
        </div>
        <div className="mb-6 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
            required
            placeholder="Enter your password"
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 mt-7 flex items-center cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="text-gray-700"/> : <Eye className="text-gray-700"/>}
          </div>
        </div>

        <div className="w-full flex justify-end mb-6">
          <Link
            to="/forgot-password"
            className="text-base text-blue-600 hover:underline inline-block text-right"
          >
            Forgot Password?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition-colors"
        >
          Login
        </button>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
