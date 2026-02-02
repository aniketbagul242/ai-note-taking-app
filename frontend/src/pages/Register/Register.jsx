
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";


const Register = () => {
  const { register } = useContext(AuthContext);

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="w-full max-w-lg">
          {/* Main card */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10 flex flex-col gap-6">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Join us today! Fill in your details to get started.
              </p>
            </div>

            {/* Form */}
            <RegisterForm onRegister={register} />

            {/* Footer */}
            <div className="text-center mt-4">
              <p className="text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-500 dark:text-blue-400 hover:underline font-medium"
                >
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
