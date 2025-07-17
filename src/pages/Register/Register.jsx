import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaEye, FaEyeSlash, FaUpload } from "react-icons/fa6";
import regLottie from "../../assets/register.json";
import Lottie from "lottie-react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth/useAuth";
import { toast, Bounce } from "react-toastify";
import useAxios from "../../hooks/useAxios/useAxios";
import axios from "axios";
import { motion } from 'motion/react';

const Register = () => {
    const { googleLogin, createUser, updateUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadedPhotoURL, setUploadedPhotoURL] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const axiosInstance = useAxios();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        if (!image) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', image);
            formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                formData
            );
    
            setUploadedPhotoURL(res.data.secure_url);
            toast.success("Photo uploaded successfully!", { transition: Bounce });
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload photo.", { transition: Bounce });
        } finally {
            setUploading(false);
        }
    };
    

    const onSubmit = async (data) => {
        try {
            if (!uploadedPhotoURL) {
                toast.error("Please upload a profile photo before submitting.", { transition: Bounce });
                return;
            }

            const { fullName, email, password } = data;
            const userCredential = await createUser(email, password);
            await updateUser({ displayName: fullName, photoURL: uploadedPhotoURL });

            const userInfo = {
                name: fullName,
                email,
                photoURL: uploadedPhotoURL,
                role: "customer",
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };

            await axiosInstance.post("users", userInfo);

            toast.success("Registration successful!", { transition: Bounce });
            navigate(location.state || "/");
        } catch (error) {
            toast.error(`Registration failed: ${error.message}`, { transition: Bounce });
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const userCredential = await googleLogin();
            const userInfo = {
                name: userCredential.user.displayName,
                email: userCredential.user.email,
                photoURL: userCredential.user.photoURL,
                role: "customer",
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };

            await axiosInstance.post("users", userInfo);

            toast.success("Registration successful!", { transition: Bounce });
            navigate(location.state || "/");
        } catch (error) {
            toast.error(`Google registration failed: ${error.message}`, { transition: Bounce });
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 pt-30">
            <div className="w-full max-w-11/12 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 justify-items-center">
                {/* Registration Form */}
                <div className="w-full max-w-md mx-auto">
                    <div className="bg-white rounded-2xl shadow border border-gray-100 p-8">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
                            <p className="text-gray-600">Join us and start your journey today</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* Full Name */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className={`input input-bordered w-full ${errors.fullName ? "border-red-500" : ""}`}
                                    {...register("fullName", { required: "Full name is required" })}
                                />
                                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                            </div>

                            {/* Upload Photo */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Profile Photo</label>
                                <label className="flex items-center justify-center gap-2 cursor-pointer border-2 border-dashed rounded-lg p-3 hover:bg-gray-50 transition">
                                    <FaUpload className="text-gray-500" />
                                    <span className="text-gray-600">
                                        {uploading ? "Uploading..." : uploadedPhotoURL ? "Photo Uploaded" : "Click to upload photo"}
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </label>
                            </div>

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
                                disabled={isSubmitting || uploading}
                                className="btn bg-blue-800 hover:opacity-80 w-full text-white font-semibold"
                            >
                                {isSubmitting ? "Creating Account..." : "Create Account"}
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

                            {/* Redirect to Login */}
                            <p className="text-center text-sm text-gray-600">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    className="font-semibold text-accent hover:underline cursor-pointer"
                                >
                                    Login
                                </button>
                            </p>
                        </form>
                    </div>
                </div>

                {/* Lottie Animation */}
                <div className="hidden w-full lg:flex justify-center items-center"
                >
                    <Lottie
                        style={{ width: "600px" }}
                        animationData={regLottie}
                        loop
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
