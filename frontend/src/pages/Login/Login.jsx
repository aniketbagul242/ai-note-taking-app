
import React, { useState, useContext } from "react";

import LoginForm from "../../components/LoginForm/LoginForm";
import { AuthContext } from "../../context/AuthContext";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";


const Login = () => {
  const { login } = useContext(AuthContext);

  return (
    <>


      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">

        <div className="w-full max-w-lg">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10 flex flex-col gap-6">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Log in to your account to continue
              </p>
            </div>

            {/* Form */}
            <LoginForm onLogin={login} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
