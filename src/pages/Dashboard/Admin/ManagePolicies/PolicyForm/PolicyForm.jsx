import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import { toast, Bounce } from "react-toastify";
import { FaUpload } from "react-icons/fa6";
import axios from "axios";
import Swal from "sweetalert2";

const PolicyForm = ({ policy, closeModal, refetchKey }) => {
    const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [uploading, setUploading] = useState(false);
    const [uploadedPhotoURL, setUploadedPhotoURL] = useState("");

    // Prefill if editing
    useEffect(() => {
        if (policy) {
            setValue("title", policy.title || "");
            setValue("category", policy.category || "");
            setValue("description", policy.description || "");
            setValue("minAge", policy.minAge || "");
            setValue("maxAge", policy.maxAge || "");
            setValue("coverageRange", policy.coverageRange || "");
            setValue("durationOptions", policy.durationOptions || "");
            setValue("basePremiumRate", policy.basePremiumRate || "");
            setUploadedPhotoURL(policy.image || "");
        } else {
            reset();
            setUploadedPhotoURL("");
        }
    }, [policy, setValue, reset]);

    // Upload Image
    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        if (!image) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", image); // 👈 use "file", not "image"
            formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                formData
            );

            setUploadedPhotoURL(res.data.secure_url); // ✅ Correct field
            toast.success("Photo uploaded successfully!", { transition: Bounce });
        } catch (error) {
            toast.error("Failed to upload photo.", { transition: Bounce });
        } finally {
            setUploading(false);
        }
    };


    // Submit Form
    const onSubmit = async (data) => {
        if (!uploadedPhotoURL) {
            toast.error("Please upload a policy image before submitting.", { transition: Bounce });
            return;
        }

        const policyData = { ...data, image: uploadedPhotoURL };

        try {
            if (policy) {
                const confirm = await Swal.fire({
                    title: "Confirm Update",
                    text: "Do you want to update this policy?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, update it!"
                });

                if (!confirm.isConfirmed) return;

                await axiosSecure.patch(`/policies/${policy._id}`, policyData);
                Swal.fire("Updated!", "Policy updated successfully.", "success");
            } else {
                await axiosSecure.post("/policies", policyData);
                Swal.fire("Added!", "New policy added successfully.", "success");
            }

            queryClient.invalidateQueries(refetchKey);
            closeModal();
            reset();
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Something went wrong. Please try again.", "error");
        }
    };

    return (
        <div>
            {/* DaisyUI Modal */}
            <input type="checkbox" id="policy-form-modal" className="modal-toggle" checked readOnly />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-lg">
                    <h3 className="font-bold text-xl mb-4 text-center text-blue-800">
                        {policy ? "Edit Policy" : "Add New Policy"}
                    </h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100">

                        {/* Title */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Policy Title</span>
                            </label>
                            <input
                                type="text"
                                placeholder="E.g., Comprehensive Health Plan"
                                className={`input input-bordered w-full ${errors.title ? "border-red-500" : ""}`}
                                {...register("title", { required: "Title is required" })}
                            />
                            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Category</span>
                            </label>
                            <input
                                type="text"
                                placeholder="E.g., Term Life, Senior Citizen"
                                className={`input input-bordered w-full ${errors.category ? "border-red-500" : ""}`}
                                {...register("category", { required: "Category is required" })}
                            />
                            {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Description</span>
                            </label>
                            <textarea
                                placeholder="Brief description about the policy..."
                                className={`textarea textarea-bordered w-full ${errors.description ? "border-red-500" : ""}`}
                                {...register("description", { required: "Description is required" })}
                            />
                            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
                        </div>

                        {/* Age Range */}
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text font-medium">Min Age</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="E.g., 18"
                                    className={`input input-bordered w-full ${errors.minAge ? "border-red-500" : ""}`}
                                    {...register("minAge", { required: "Minimum age is required" })}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text font-medium">Max Age</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="E.g., 65"
                                    className={`input input-bordered w-full ${errors.maxAge ? "border-red-500" : ""}`}
                                    {...register("maxAge", { required: "Maximum age is required" })}
                                />
                            </div>
                        </div>
                        {(errors.minAge || errors.maxAge) && (
                            <p className="text-xs text-red-500 mt-1">Both min and max age are required.</p>
                        )}

                        {/* Coverage Range */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Coverage Range</span>
                            </label>
                            <input
                                type="text"
                                placeholder="E.g., $10,000 - $100,000"
                                className={`input input-bordered w-full ${errors.coverageRange ? "border-red-500" : ""}`}
                                {...register("coverageRange", { required: "Coverage range is required" })}
                            />
                            {errors.coverageRange && <p className="text-xs text-red-500 mt-1">{errors.coverageRange.message}</p>}
                        </div>

                        {/* Duration Options */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Duration Options</span>
                            </label>
                            <input
                                type="text"
                                placeholder="E.g., 1 year, 5 years, 10 years"
                                className={`input input-bordered w-full ${errors.durationOptions ? "border-red-500" : ""}`}
                                {...register("durationOptions", { required: "Duration options are required" })}
                            />
                            {errors.durationOptions && <p className="text-xs text-red-500 mt-1">{errors.durationOptions.message}</p>}
                        </div>

                        {/* Base Premium Rate */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Base Premium Rate</span>
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="E.g., 120.50"
                                className={`input input-bordered w-full ${errors.basePremiumRate ? "border-red-500" : ""}`}
                                {...register("basePremiumRate", { required: "Base premium rate is required" })}
                            />
                            {errors.basePremiumRate && <p className="text-xs text-red-500 mt-1">{errors.basePremiumRate.message}</p>}
                        </div>

                        {/* Upload Photo */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Policy Image</span>
                            </label>
                            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition">
                                <FaUpload className="text-gray-500 text-xl mb-2" />
                                <span className="text-gray-600">
                                    {uploading ? "Uploading..." : uploadedPhotoURL ? "Photo Uploaded" : "Click to upload photo"}
                                </span>
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            </label>
                            {uploadedPhotoURL && (
                                <img src={uploadedPhotoURL} alt="Uploaded Policy" className="mt-2 rounded-lg max-h-40 mx-auto shadow" />
                            )}
                        </div>

                        {/* Actions */}
                        <div className="modal-action flex flex-col gap-2">
                            <button
                                type="submit"
                                disabled={isSubmitting || uploading}
                                className="btn btn-primary w-full"
                            >
                                {isSubmitting ? (policy ? "Updating..." : "Adding...") : policy ? "Update Policy" : "Add Policy"}
                            </button>
                            <label
                                htmlFor="policy-form-modal"
                                onClick={closeModal}
                                className="btn btn-outline w-full"
                            >
                                Cancel
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PolicyForm;
