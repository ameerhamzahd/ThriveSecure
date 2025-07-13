import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import { FaFileUpload, FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { Bounce, toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth/useAuth";

const ClaimRequest = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [uploading, setUploading] = useState(false);

    // Fetch customer applications with policy details
    const { data: applications = [], isLoading } = useQuery({
        queryKey: ["approvedPolicies", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications?email=${user?.email}`);
            return res.data.applications || [];
        },
        enabled: !!user?.email,
    });

    // Mutation for claim submission
    const claimMutation = useMutation({
        mutationFn: async (claimData) => {
            const res = await axiosSecure.post("/claims", claimData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["approvedPolicies"]);
            Swal.fire("Submitted!", "Your claim request has been submitted.", "success");
            reset();
        },
        onError: () => {
            Swal.fire("Error", "Failed to submit claim. Try again.", "error");
        },
    });

    // Form submission handler
    const onSubmit = async (data) => {
        if (!data.document[0]) {
            toast.error("Please upload a claim document.", { transition: Bounce });
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", data.document[0]);
            formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

            const res = await axiosSecure.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`,
                formData
            );
            const documentURL = res.data.secure_url;

            const claimData = {
                policyName: data.policyName,
                reason: data.reason,
                document: documentURL,
                status: "Pending",
                email: user?.email,
            };

            claimMutation.mutate(claimData);
        } catch (error) {
            toast.error("Failed to upload document.", { transition: Bounce });
        } finally {
            setUploading(false);
        }
    };

    // Filter policies with agentAssignStatus === "Approved"
    const approvedPolicies = applications.filter(app =>
        app.agentAssignStatus === "Approved" &&
        app.policyDetails?.title
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6"
        >
            <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">Request a Claim</h2>

                {isLoading ? (
                    <p className="text-center text-gray-500">Loading approved policies...</p>
                ) : approvedPolicies.length === 0 ? (
                    <p className="text-center text-gray-500">No approved policies available for claim.</p>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Policy selection */}
                        <div>
                            <label className="label"><span className="label-text font-medium">Select Approved Policy</span></label>
                            <select
                                className={`select select-bordered w-full ${errors.policyName ? "border-red-500" : ""}`}
                                {...register("policyName", { required: "Policy is required." })}
                            >
                                <option value="">Select a policy</option>
                                {approvedPolicies.map(app => (
                                    <option key={app._id} value={app.policyDetails.title}>
                                        {app.policyDetails.title}
                                    </option>
                                ))}
                            </select>
                            {errors.policyName && <p className="text-xs text-red-500 mt-1">{errors.policyName.message}</p>}
                        </div>

                        {/* Reason for claim */}
                        <div>
                            <label className="label"><span className="label-text font-medium">Reason for Claim</span></label>
                            <textarea
                                placeholder="Describe your reason for claiming..."
                                className={`textarea textarea-bordered w-full ${errors.reason ? "border-red-500" : ""}`}
                                {...register("reason", { required: "Reason for claim is required." })}
                            ></textarea>
                            {errors.reason && <p className="text-xs text-red-500 mt-1">{errors.reason.message}</p>}
                        </div>

                        {/* Document upload */}
                        <div>
                            <label className="label"><span className="label-text font-medium">Upload Claim Document (PDF/Image)</span></label>
                            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition">
                                <FaFileUpload className="text-gray-500 text-2xl mb-2" />
                                <span className="text-gray-600">
                                    {uploading ? "Uploading..." : "Click to upload document"}
                                </span>
                                <input
                                    type="file"
                                    accept="application/pdf,image/*"
                                    className="hidden"
                                    {...register("document", { required: "Document is required." })}
                                />
                            </label>
                            {errors.document && <p className="text-xs text-red-500 mt-1">{errors.document.message}</p>}
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isSubmitting || uploading}
                            className="btn btn-primary w-full flex items-center justify-center gap-2"
                        >
                            {isSubmitting || uploading ? "Submitting..." : <>Submit Claim <FaCheckCircle /></>}
                        </button>
                    </form>
                )}
            </div>
        </motion.div>
    );
};

export default ClaimRequest;