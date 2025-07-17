"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { X } from "lucide-react";

// Types
type AuthType = "login" | "register";

type LoginFormData = {
  email: string;
  password: string;
  remember: boolean;
};

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

interface AuthModalsProps {
  isOpen: boolean;
  authType: AuthType;
  onClose: () => void;
  onSwitchType: (type: AuthType) => void;
}

const AuthModals: React.FC<AuthModalsProps> = ({
  isOpen,
  authType,
  onClose,
  onSwitchType,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-medium text-black mb-2">
              {authType === "login" ? "Login" : "Register"}
            </h2>
            <p className="text-gray-600">
              {authType === "login"
                ? "Welcome back to Fresh Harvest"
                : "Create your Fresh Harvest account"}
            </p>
          </div>

          {authType === "login" ? (
            <LoginForm
              switchToRegister={() => onSwitchType("register")}
              closeModal={onClose}
            />
          ) : (
            <RegisterForm
              switchToLogin={() => onSwitchType("login")}
              closeModal={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Login Form Component
const LoginForm = ({
  switchToRegister,
  closeModal,
}: {
  switchToRegister: () => void;
  closeModal: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log("Login data:", data);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-green focus:border-green ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-green focus:border-green ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 text-green focus:ring-green border-gray-300 rounded"
              {...register("remember")}
            />
            <label
              htmlFor="remember"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>
          <button
            type="button"
            className="text-sm text-green hover:text-green/80 font-medium"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green hover:bg-green/90 text-white py-3 rounded-lg font-medium transition-colors duration-200"
        >
          Login
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or Sign in with</span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 py-3 rounded-lg font-medium transition-colors"
          >
            <FcGoogle className="w-5 h-5" />
            Google
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            <FaFacebook className="w-5 h-5" />
            Facebook
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={switchToRegister}
              className="text-green hover:text-green/80 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </form>
  );
};

// Register Form Component
const RegisterForm = ({
  switchToLogin,
  closeModal,
}: {
  switchToLogin: () => void;
  closeModal: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    console.log("Register data:", data);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-green focus:border-green ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-green focus:border-green ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-green focus:border-green ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green hover:bg-green/90 text-white py-3 rounded-lg font-medium transition-colors duration-200"
        >
          Register
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or Sign Up with</span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 py-3 rounded-lg font-medium transition-colors"
          >
            <FcGoogle className="w-5 h-5" />
            Google
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            <FaFacebook className="w-5 h-5" />
            Facebook
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={switchToLogin}
              className="text-green hover:text-green/80 font-medium"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </form>
  );
};

export default AuthModals;
