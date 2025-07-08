import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import { motion } from "motion/react";
import applicationLottie from "../../assets/application.json";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxios from "../../hooks/useAxios/useAxios";

const Application = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const applicationData = {
                applicantName: user?.displayName || "",
                email: user?.email || "",
                ...data,
                status: "Pending",
                createdAt: new Date().toISOString(),
            };

            const res = await axiosInstance.post("/applications", applicationData);

            if (res.data.insertedId || res.data.success) {
                toast.success("Application submitted successfully!", { position: "top-center" });
                reset();
            } else {
                toast.error("Submission failed, please try again.", { position: "top-center" });
            }
        } catch (error) {
            toast.error(error.message, { position: "top-center" });
        }
    };

    const healthConditions = [
        "Diabetes",
        "Hypertension",
        "Heart Disease",
        "Smoking",
        "Asthma",
        "Obesity",
        "Cancer History",
        "Chronic Kidney Disease",
        "Liver Disease",
        "Mental Health Disorders",
        "High Cholesterol",
        "Thyroid Disorders",
        "Arthritis",
        "Sleep Apnea",
        "COVID-19 Long-term Effects"
    ];

    return (
        <div className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center pt-30 bg-white gap-10">
            <div className="w-full max-w-11/12 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 justify-items-center">
                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-2xl"
                >
                    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">Life Insurance Application</h1>
                    <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">Fill in your details to apply for your policy</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Personal Details */}
                        <fieldset className="border border-gray-300 rounded-lg p-4">
                            <legend className="text-lg font-semibold px-2">Personal Details</legend>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                {/* Name */}
                                <div>
                                    <label className="block mb-1 font-medium">Full Name</label>
                                    <input
                                        type="text"
                                        value={user?.displayName || ""}
                                        disabled
                                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block mb-1 font-medium">Email</label>
                                    <input
                                        type="email"
                                        value={user?.email || ""}
                                        disabled
                                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                                    />
                                </div>

                                {/* NID */}
                                <div>
                                    <label className="block mb-1 font-medium">NID</label>
                                    <input
                                        type="text"
                                        className={`input input-bordered w-full ${errors.nid ? "border-red-500" : ""}`}
                                        {...register("nid", { required: "NID is required" })}
                                    />
                                    {errors.nid && <p className="text-red-500 text-sm">{errors.nid.message}</p>}
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block mb-1 font-medium">Address</label>
                                    <input
                                        type="text"
                                        className={`input input-bordered w-full ${errors.address ? "border-red-500" : ""}`}
                                        {...register("address", { required: "Address is required" })}
                                    />
                                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                                </div>

                                {/* Date of Birth */}
                                <div>
                                    <label className="block mb-1 font-medium">Date of Birth</label>
                                    <input
                                        type="date"
                                        className={`input input-bordered w-full ${errors.dob ? "border-red-500" : ""}`}
                                        {...register("dob", { required: "Date of Birth is required" })}
                                    />
                                    {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
                                </div>

                                {/* Contact Number */}
                                <div>
                                    <label className="block mb-1 font-medium">Contact Number</label>
                                    <input
                                        type="tel"
                                        className={`input input-bordered w-full ${errors.contact ? "border-red-500" : ""}`}
                                        {...register("contact", { required: "Contact number is required" })}
                                    />
                                    {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
                                </div>
                            </div>
                        </fieldset>

                        {/* Nominee Details */}
                        <fieldset className="border border-gray-300 rounded-lg p-4">
                            <legend className="text-lg font-semibold px-2">Nominee Details</legend>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                {/* Nominee Name */}
                                <div>
                                    <label className="block mb-1 font-medium">Nominee Name</label>
                                    <input
                                        type="text"
                                        className={`input input-bordered w-full ${errors.nomineeName ? "border-red-500" : ""}`}
                                        {...register("nomineeName", { required: "Nominee Name is required" })}
                                    />
                                    {errors.nomineeName && <p className="text-red-500 text-sm">{errors.nomineeName.message}</p>}
                                </div>

                                {/* Relationship */}
                                <div>
                                    <label className="block mb-1 font-medium">Relationship</label>
                                    <input
                                        type="text"
                                        className={`input input-bordered w-full ${errors.nomineeRelation ? "border-red-500" : ""}`}
                                        {...register("nomineeRelation", { required: "Relationship is required" })}
                                    />
                                    {errors.nomineeRelation && <p className="text-red-500 text-sm">{errors.nomineeRelation.message}</p>}
                                </div>

                                {/* Nominee Contact */}
                                <div>
                                    <label className="block mb-1 font-medium">Nominee Contact</label>
                                    <input
                                        type="tel"
                                        className={`input input-bordered w-full ${errors.nomineeContact ? "border-red-500" : ""}`}
                                        {...register("nomineeContact", { required: "Nominee Contact is required" })}
                                    />
                                    {errors.nomineeContact && <p className="text-red-500 text-sm">{errors.nomineeContact.message}</p>}
                                </div>

                                {/* Nominee NID */}
                                <div>
                                    <label className="block mb-1 font-medium">Nominee NID</label>
                                    <input
                                        type="text"
                                        className={`input input-bordered w-full ${errors.nomineeNID ? "border-red-500" : ""}`}
                                        {...register("nomineeNID", { required: "Nominee NID is required" })}
                                    />
                                    {errors.nomineeNID && <p className="text-red-500 text-sm">{errors.nomineeNID.message}</p>}
                                </div>

                                {/* Nominee Email */}
                                <div>
                                    <label className="block mb-1 font-medium">Nominee Email</label>
                                    <input
                                        type="email"
                                        className={`input input-bordered w-full ${errors.nomineeEmail ? "border-red-500" : ""}`}
                                        {...register("nomineeEmail", { required: "Nominee Email is required" })}
                                    />
                                    {errors.nomineeEmail && <p className="text-red-500 text-sm">{errors.nomineeEmail.message}</p>}
                                </div>
                            </div>
                        </fieldset>

                        {/* Health Disclosures */}
                        <fieldset className="border border-gray-300 rounded-lg p-4">
                            <legend className="text-lg font-semibold px-2">Health Disclosures</legend>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                                {healthConditions.map((condition) => (
                                    <label key={condition} className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            value={condition}
                                            {...register("healthDisclosures")}
                                            className="checkbox checkbox-accent"
                                        />
                                        {condition}
                                    </label>
                                ))}
                            </div>
                        </fieldset>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn bg-blue-800 text-white w-full hover:bg-blue-700"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Application"}
                        </button>
                    </form>
                </motion.div>

                {/* Lottie Animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full flex justify-center items-center"
                >
                    <Lottie
                        animationData={applicationLottie}
                        loop
                        style={{ width: "800px" }}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default Application;
