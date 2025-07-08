import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa6";
import loginLottie from "../../assets/login.json";
import Lottie from "lottie-react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth/useAuth";
import { toast, Bounce } from "react-toastify";
import useAxios from "../../hooks/useAxios/useAxios";
import { motion } from 'motion/react';

const Login = () => {
    const { googleLogin, loginUser, setUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosInstance = useAxios();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const { email, password } = data;
            const userCredential = await loginUser(email, password);
            const user = userCredential.user;

            // Update or insert user info with lastLogin
            const userInfo = {
                name: user.displayName || "User",
                email: user.email,
                photoURL: user.photoURL || "",
                role: "customer",
                lastLogin: new Date().toISOString(),
            };

            await axiosInstance.post("/users", userInfo);

            toast.success("Login successful!", { transition: Bounce });
            navigate(location.state || "/");
        } catch (error) {
            toast.error(`Login failed: ${error.message}`, { transition: Bounce });
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const userCredential = await googleLogin();
            const user = userCredential.user;

            const userInfo = {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                role: "customer",
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
            };

            await axiosInstance.post("/users", userInfo);

            toast.success("Login successful!", { transition: Bounce });
            navigate(location.state || "/");
        } catch (error) {
            toast.error(`Google login failed: ${error.message}`, { transition: Bounce });
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 pt-30">
            <div className="w-full max-w-11/12 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 justify-items-center">
                {/* Login Form */}
                <div className="w-full max-w-md mx-auto">
                    <div className="bg-white rounded-2xl shadow border border-gray-100 p-8">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                            <p className="text-gray-600">Login to continue your journey</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className={`input input-bordered w-full ${errors.email ? "border-red-500" : ""}`}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className={`input input-bordered w-full pr-12 ${errors.password ? "border-red-500" : ""}`}
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: { value: 6, message: "Password must be at least 6 characters" },
                                            pattern: {
                                                value: /(?=.*[a-z])(?=.*[A-Z]).{6,}/,
                                                message: "Must contain uppercase, lowercase, and number",
                                            },
                                        })}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn bg-blue-800 hover:opacity-80 w-full text-white font-semibold"
                            >
                                {isSubmitting ? "Logging in..." : "Login"}
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-2">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="text-gray-500 text-sm">or</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>

                            {/* Google Login */}
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="btn btn-outline btn-accent w-full flex items-center justify-center gap-2"
                            >
                                <FaGoogle /> Continue with Google
                            </button>

                            {/* Redirect to Register */}
                            <p className="text-center text-sm text-gray-600">
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate("/register")}
                                    className="font-semibold text-accent hover:underline cursor-pointer"
                                >
                                    Register
                                </button>
                            </p>
                        </form>
                    </div>
                </div>

                {/* Lottie Animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full flex justify-center items-center"
                >
                    <Lottie
                        style={{ width: "600px" }}
                        animationData={loginLottie}
                        loop
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
