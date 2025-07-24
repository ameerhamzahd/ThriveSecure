import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { FaEye } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { toast } from "react-toastify";
import Pagination from "../../components/shared/Pagination/Pagination";
import Loader from "../../components/shared/Loader/Loader";
import { Helmet } from "react-helmet-async";

const Articles = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [selectedBlog, setSelectedBlog] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 9;

    const { data = {}, isLoading } = useQuery({
        queryKey: ["blogs", currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get("/blogs", {
                params: {
                    page: currentPage,
                    limit: limit
                },
            });
            return res.data;
        },
        keepPreviousData: true,
    });

    const blogs = data.blogs || [];
    const totalPages = data.totalPages || 1;

    const visitMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/blogs/${id}/increment-visit`);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Visit count updated successfully!");
            queryClient.invalidateQueries(["blogs"]);
        },
        onError: () => {
            toast.error("Failed to update visit count.");
        }
    });

    const handleReadMore = (blog) => {
        setSelectedBlog(blog);
        visitMutation.mutate(blog._id);
        document.getElementById("blog_details_modal").showModal();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen bg-white pt-30"
        >
            <Helmet>
                <title>ThriveSecure | Articles</title>
            </Helmet>

            <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Latest Articles</h2>
            {isLoading ? (
                <Loader></Loader>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-11/12 mx-auto">
                        {blogs.length === 0 ? (
                            <p className="text-center text-gray-500 col-span-full">No articles available.</p>
                        ) : (
                            blogs.map((blog) => (
                                <motion.div
                                    key={blog._id}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white shadow rounded-2xl overflow-hidden flex flex-col"
                                >
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="h-48 w-full object-cover object-top"
                                    />
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="text-lg font-bold text-blue-800 mb-2 line-clamp-2">{blog.title}</h3>
                                        <p className="text-sm text-gray-600 flex-grow line-clamp-4">{blog.content}</p>
                                        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                                            <span className="bg-accent-50 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">{blog.author}</span>
                                            <span>{new Date(blog.publishDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                            <span className="flex items-center gap-1"><FaEye /> {blog.totalVisit} Visits</span>
                                            <button
                                                onClick={() => handleReadMore(blog)}
                                                className="btn btn-sm btn-outline btn-primary"
                                            >
                                                Read More
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )))}
                    </div>

                    <div className="mt-10 flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </>
            )}

            {/* Blog Details Modal */}
            <dialog id="blog_details_modal" className="modal">
                <div className="modal-box max-w-2xl">
                    {selectedBlog && (
                        <>
                            <h3 className="text-xl font-bold text-blue-800 mb-4">{selectedBlog.title}</h3>
                            <img
                                src={selectedBlog.image}
                                alt={selectedBlog.title}
                                className="rounded shadow mb-4 w-full max-h-96 object-cover"
                            />
                            <p className="text-gray-700 text-sm whitespace-pre-wrap mb-4">{selectedBlog.content}</p>
                            <div className="text-xs text-gray-500 flex justify-between">
                                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">{selectedBlog.author}</span>
                                <span>{new Date(selectedBlog.publishDate).toLocaleDateString()}</span>
                            </div>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button
                                        className="btn btn-outline w-full"
                                        onClick={() => {
                                            document.getElementById("claim_modal").close();
                                            setSelectedBlog(null);
                                        }}
                                    >
                                        Close
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </dialog>
        </motion.div>
    );
};

export default Articles;
