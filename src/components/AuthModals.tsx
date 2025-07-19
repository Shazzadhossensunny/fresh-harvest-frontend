"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { X, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
  // Add your Redux mutation hooks here
  useLoginMutation: any;
  useRegisterUserMutation: any;
}

const AuthModals: React.FC<AuthModalsProps> = ({
  isOpen,
  authType,
  onClose,
  onSwitchType,
  useLoginMutation,
  useRegisterUserMutation,
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
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-medium text-black mb-2">
              {authType === "login" ? "Login" : "Register"}
            </h2>
          </div>

          {authType === "login" ? (
            <LoginForm
              switchToRegister={() => onSwitchType("register")}
              closeModal={onClose}
              useLoginMutation={useLoginMutation}
            />
          ) : (
            <RegisterForm
              switchToLogin={() => onSwitchType("login")}
              closeModal={onClose}
              useRegisterUserMutation={useRegisterUserMutation}
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
  useLoginMutation,
}: {
  switchToRegister: () => void;
  closeModal: () => void;
  useLoginMutation: any;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loginUser, { isLoading, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>();

  // Handle API errors
  useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorData = error.data as any;
        if (errorData?.message) {
          toast.error(errorData.message);
        } else if (errorData?.errors) {
          // Handle validation errors
          Object.keys(errorData.errors).forEach((field) => {
            setError(field as keyof LoginFormData, {
              type: "server",
              message: errorData.errors[field][0] || `Invalid ${field}`,
            });
          });
        }
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  }, [error, setError]);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const result = await loginUser({
        email: data.email,
        password: data.password,
        remember: data.remember,
      }).unwrap();

      toast.success("Login successful! Welcome back.");
      closeModal();
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
    }
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
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
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
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
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded accent-primary"
              {...register("remember")}
            />
            <label
              htmlFor="remember"
              className="ml-2 block text-xs text-gray-700"
            >
              Remember me
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-heading font-medium transition-colors duration-200"
        >
          {isLoading ? "Signing in..." : "Login"}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-black font-heading">
              Or Sign in with
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 border border-[#D9D9D9] bg-gray-100 hover:bg-gray-200 py-3 rounded-lg font-medium transition-colors"
          >
            <FcGoogle className="w-5 h-5" />
            Google
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 border border-[#D9D9D9] bg-gray-100 hover:bg-gray-200 py-3 rounded-lg font-medium transition-colors"
          >
            <FaFacebook className="w-5 h-5 text-blue-700" />
            Facebook
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-black font-heading font-medium">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={switchToRegister}
              className="text-primary hover:text-primary/80"
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
  useRegisterUserMutation,
}: {
  switchToLogin: () => void;
  closeModal: () => void;
  useRegisterUserMutation: any;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>();

  // Handle API errors
  useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorData = error.data as any;
        if (errorData?.message) {
          toast.error(errorData.message);
        } else if (errorData?.errors) {
          // Handle validation errors
          Object.keys(errorData.errors).forEach((field) => {
            setError(field as keyof RegisterFormData, {
              type: "server",
              message: errorData.errors[field][0] || `Invalid ${field}`,
            });
          });
        }
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  }, [error, setError]);

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const result = await registerUser({
        fullName: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();

      toast.success("Registration successful! Please login to continue.");
      switchToLogin(); // Switch to login form after successful registration
    } catch (err) {
      console.error("Registration error:", err);
    }
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                },
              })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-heading font-medium transition-colors duration-200"
        >
          {isLoading ? "Creating account..." : "Register"}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-black font-heading">
              Or Sign Up with
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 border border-[#D9D9D9] bg-gray-100 hover:bg-gray-200 py-3 rounded-lg font-medium transition-colors"
          >
            <FcGoogle className="w-5 h-5" />
            Google
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 border border-[#D9D9D9] bg-gray-100 hover:bg-gray-200 py-3 rounded-lg font-medium transition-colors"
          >
            <FaFacebook className="w-5 h-5 text-blue-700" />
            Facebook
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-black font-heading font-medium">
            Already have an account?{" "}
            <button
              type="button"
              onClick={switchToLogin}
              className="text-primary hover:text-primary/80"
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
