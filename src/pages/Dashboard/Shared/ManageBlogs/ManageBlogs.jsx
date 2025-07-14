import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth/useAuth";
import Pagination from "../../../../components/shared/Pagination/Pagination";
import BlogForm from "./BlogForm/BlogForm";
import useUserRole from "../../../../hooks/useUserRole/useUserRole";

const ManageBlogs = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { role, isLoading: roleLoading } = useUserRole();
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const limit = 5;

    const { data: blogs = [], isLoading } = useQuery({
        queryKey: ["blogs", user?.email, role, currentPage],
        queryFn: async () => {
            if (roleLoading) return []; // optionally wait for role to load
            
            let url = `blogs?page=${currentPage}&limit=${limit}&role=${role}`;
            if (role !== "admin") {
                url += `&authorEmail=${user?.email}`;
            }
            console.log("URL:", url);
            const res = await axiosSecure.get(url);
            setTotalPages(res.data.totalPages);
            return res.data.blogs;
        },
        enabled: !!user?.email && !!role && !roleLoading,
        keepPreviousData: true,
    });
    


    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This blog will be deleted permanently.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });
        if (confirm.isConfirmed) {
            await axiosSecure.delete(`blogs/${id}`);
            queryClient.invalidateQueries(["blogs", user?.email, role, currentPage]);
            Swal.fire("Deleted!", "The blog has been deleted.", "success");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl w-full bg-white shadow-lg rounded-2xl overflow-x-auto p-6"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-blue-800">Manage Blogs</h2>
                    <button
                        onClick={() => {
                            setSelectedBlog(null);
                            setIsFormOpen(true);
                        }}
                        className="btn btn-sm btn-primary flex items-center gap-2"
                    >
                        <FaPlus /> Add New Blog
                    </button>
                </div>
                <table className="table w-full">
                    <thead className="bg-blue-50 sticky top-0">
                        <tr>
                            <th>Title</th>
                            <th>Content Summary</th>
                            <th>Author</th>
                            <th>Publish Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-gray-500">
                                    Loading blogs...
                                </td>
                            </tr>
                        ) : blogs.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-gray-500">
                                    No blogs found.
                                </td>
                            </tr>
                        ) : (
                            blogs.map((blog) => (
                                <motion.tr
                                    key={blog._id}
                                    whileHover={{ scale: 1.01, backgroundColor: "#f9fafb" }}
                                    transition={{ duration: 0.2 }}
                                    className="border-b"
                                >
                                    <td className="py-3 font-medium text-gray-800">{blog.title}</td>
                                    <td className="py-3 font-medium text-gray-800">
                                        {blog.content.split(" ").slice(0, 10).join(" ")}...
                                    </td>
                                    <td className="text-sm text-gray-700">{blog.author}</td>
                                    <td className="text-sm text-gray-700">
                                        {new Date(blog.publishDate).toLocaleDateString()}
                                    </td>
                                    <td className="flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                setSelectedBlog(blog);
                                                setIsFormOpen(true);
                                            }}
                                            className="btn btn-sm btn-info text-white"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog._id)}
                                            className="btn btn-sm btn-error text-white"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </motion.div>

            {isFormOpen && (
                <BlogForm
                    blog={selectedBlog}
                    closeModal={() => setIsFormOpen(false)}
                    refetchKey={["blogs", user?.email, role, currentPage]}
                />
            )}
        </div>
    );
};

export default ManageBlogs;
