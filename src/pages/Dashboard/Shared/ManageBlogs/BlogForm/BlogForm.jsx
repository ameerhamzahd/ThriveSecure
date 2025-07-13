// BlogForm.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast, Bounce } from "react-toastify";
import Swal from "sweetalert2";
import { FaUpload } from "react-icons/fa6";
import axios from "axios";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth/useAuth";

const BlogForm = ({ blog, closeModal, refetchKey }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [uploading, setUploading] = useState(false);
    const [uploadedPhotoURL, setUploadedPhotoURL] = useState("");
    const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        if (blog) {
            setValue("title", blog.title || "");
            setValue("content", blog.content || "");
            setUploadedPhotoURL(blog.image || "");
        } else {
            reset();
            setUploadedPhotoURL("");
        }
    }, [blog, setValue, reset]);

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        if (!image) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
            const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
            setUploadedPhotoURL(res.data.secure_url);
            toast.success("Image uploaded successfully.", { transition: Bounce });
        } catch {
            toast.error("Failed to upload image.", { transition: Bounce });
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data) => {
        if (!uploadedPhotoURL) {
            toast.error("Please upload an image before publishing.", { transition: Bounce });
            return;
        }

        const blogData = {
            ...data,
            authorName: user?.displayName || "Unknown Agent",
            authorEmail: user?.email,
            publishDate: new Date().toISOString(),
            image: uploadedPhotoURL
        };

        if (blog) {
            const confirm = await Swal.fire({
                title: "Confirm Update",
                text: "Do you want to update this blog?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, update it!"
            });
            if (!confirm.isConfirmed) return;
            await axiosSecure.patch(`blogs/${blog._id}`, blogData);
            Swal.fire("Updated!", "Blog updated successfully.", "success");
        } else {
            await axiosSecure.post("blogs", blogData);
            Swal.fire("Published!", "New blog published successfully.", "success");
        }
        queryClient.invalidateQueries(refetchKey);
        closeModal();
        reset();
    };

    return (
        <div>
            <input type="checkbox" id="blog-form-modal" className="modal-toggle" checked readOnly />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-lg">
                    <h3 className="font-bold text-xl mb-4 text-center text-blue-800">
                        {blog ? "Edit Blog" : "Add New Blog"}
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="label"><span className="label-text">Title</span></label>
                            <input type="text" placeholder="Blog Title" className={`input input-bordered w-full ${errors.title ? "border-red-500" : ""}`} {...register("title", { required: "Title is required." })} />
                            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Author</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Author Name"
                                className={`input input-bordered w-full ${errors.author ? "border-red-500" : ""}`}
                                {...register("author", { required: "Author name is required." })}
                                defaultValue={user?.displayName || ""} disabled// auto-fill from firebase user
                            />
                            {errors.author && (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.author.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="label"><span className="label-text">Content</span></label>
                            <textarea placeholder="Write your blog content here..." className={`textarea textarea-bordered w-full ${errors.content ? "border-red-500" : ""}`} rows={6} {...register("content", { required: "Content is required." })} />
                            {errors.content && <p className="text-xs text-red-500 mt-1">{errors.content.message}</p>}
                        </div>
                        <div>
                            <label className="label"><span className="label-text">Upload Blog Image</span></label>
                            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                                <FaUpload className="text-gray-500 text-xl mb-2" />
                                <span className="text-gray-600">{uploading ? "Uploading..." : uploadedPhotoURL ? "Image Uploaded" : "Click to upload image"}</span>
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            </label>
                            {uploadedPhotoURL && (
                                <img src={uploadedPhotoURL} alt="Blog" className="mt-2 rounded-lg max-h-40 mx-auto shadow" />
                            )}
                        </div>
                        <div className="modal-action flex flex-col gap-2">
                            <button type="submit" disabled={isSubmitting || uploading} className="btn btn-primary w-full">
                                {isSubmitting ? (blog ? "Updating..." : "Publishing...") : blog ? "Update Blog" : "Publish Blog"}
                            </button>
                            <label htmlFor="blog-form-modal" onClick={closeModal} className="btn btn-outline w-full">Cancel</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogForm;
