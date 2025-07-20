import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import Loader from "../../components/shared/Loader/Loader";

const LatestArticles = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedArticle, setSelectedArticle] = useState(null);

    const { data = {}, isLoading } = useQuery({
        queryKey: ["latestArticles"],
        queryFn: async () => {
            const res = await axiosSecure.get("/blogs", { params: { limit: 4 } });
            return res.data;
        },
    });

    const articles = data.blogs || [];

    return (
        <section className="py-15 lg:py-20 bg-white">
            <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                        Latest <span className="bg-gradient-to-r from-blue-800 to-accent bg-clip-text text-transparent">Articles</span>
                    </h2>
                    <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover insights and updates from ThriveSecure to stay informed and empowered.
                    </p>
                </motion.div>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader />
                    </div>
                ) : articles.length === 0 ? (
                    <p className="text-center text-gray-500">No articles available.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {articles.map((article) => (
                            <motion.div
                                key={article._id}
                                whileHover={{ scale: 1.02, y: -4 }}
                                transition={{ type: "spring", stiffness: 180, damping: 15 }}
                                className="bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col overflow-hidden"
                            >
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-48 object-cover object-center"
                                />
                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="text-lg font-bold text-blue-800 mb-2 line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-4 flex-grow">
                                        {article.content}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-xs text-gray-500">
                                            {new Date(article.publishDate).toLocaleDateString(undefined, {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </span>
                                        <button
                                            onClick={() => {
                                                setSelectedArticle(article);
                                                document.getElementById("article_details_modal").showModal();
                                            }}
                                            className="flex items-center gap-1 text-blue-700 hover:text-blue-900 text-sm font-semibold transition"
                                        >
                                            Read More <FaArrowRight className="w-3 h-3 mt-0.5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="flex justify-center mt-12">
                    <Link
                        to="/articles"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn btn-accent btn-md text-white transition font-semibold shadow"
                    >
                        View All Articles <FaArrowRight />
                    </Link>
                </div>

                {/* Article Details Modal */}
                <dialog id="article_details_modal" className="modal">
                    <div className="modal-box max-w-2xl">
                        {selectedArticle && (
                            <>
                                <h3 className="text-xl font-bold text-blue-800 mb-4">
                                    {selectedArticle.title}
                                </h3>
                                <img
                                    src={selectedArticle.image}
                                    alt={selectedArticle.title}
                                    className="rounded shadow mb-4 w-full max-h-96 object-cover"
                                />
                                <p className="text-gray-700 text-sm whitespace-pre-wrap mb-4">
                                    {selectedArticle.content}
                                </p>
                                <div className="text-xs text-gray-500 flex justify-between">
                                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">
                                        {selectedArticle.author}
                                    </span>
                                    <span>
                                        {new Date(selectedArticle.publishDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="modal-action">
                                    <form method="dialog" className="w-full">
                                        <button
                                            className="btn btn-outline w-full"
                                            onClick={() => {
                                                document.getElementById("claim_modal").close();
                                                setSelectedArticle(null);
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
            </div>
        </section>
    );
};

export default LatestArticles;
