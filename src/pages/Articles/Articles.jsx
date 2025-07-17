import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaEye, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios/useAxios";

const Articles = ({ blogs }) => {
    const [selectedBlog, setSelectedBlog] = useState(null);
    const axiosInstance = useAxios();

    const handleReadMore = async (blog) => {
        try {
            await axiosInstance.patch(`blogs/${blog._id}/increment`);
            setSelectedBlog(blog);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
                <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition group"
                >
                    <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="p-5 flex flex-col flex-grow">
                        <h2 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">{blog.title}</h2>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.details.slice(0, 120)}...</p>
                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                            <FaUser className="text-accent" />
                            <span className="font-medium">{blog.authorName}</span>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded ml-2">Author</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400">
                            <span>Published: {new Date(blog.publishedAt).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1"><FaEye /> {blog.totalVisit}</span>
                        </div>
                        <button
                            onClick={() => handleReadMore(blog)}
                            className="mt-4 w-full bg-blue-800 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                        >
                            Read More
                        </button>
                    </div>
                </motion.div>
            ))}

            <AnimatePresence>
                {selectedBlog && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
                        onClick={() => setSelectedBlog(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-xl max-w-lg w-full p-6 overflow-y-auto max-h-[80vh] shadow-xl"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedBlog.title}</h2>
                            <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                            <p className="text-gray-700 mb-4 whitespace-pre-line">{selectedBlog.details}</p>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Author: {selectedBlog.authorName}</span>
                                <span>Visits: {selectedBlog.totalVisit + 1}</span>
                            </div>
                            <Link
                                to={`/blogs/${selectedBlog._id}`}
                                className="mt-4 inline-block w-full bg-blue-800 hover:bg-blue-700 text-white py-2 rounded-lg text-center font-semibold transition"
                            >
                                Go to Details Page
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Articles;
