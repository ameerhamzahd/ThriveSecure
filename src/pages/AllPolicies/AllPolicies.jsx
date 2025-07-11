import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaFilter } from "react-icons/fa";
import useAxios from "../../hooks/useAxios/useAxios";
import Pagination from "../../components/shared/Pagination/Pagination";
import { FaTags, FaArrowRight } from "react-icons/fa";
import Loader from "../../components/shared/Loader/Loader";

const AllPolicies = () => {
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const limit = 9;

    const { data, isLoading } = useQuery({
        queryKey: ["policies", currentPage, selectedCategory],
        queryFn: async () => {
            const res = await axiosInstance.get(`/policies?page=${currentPage}&limit=${limit}`);
            return res.data;
        },
        keepPreviousData: true,
    });

    const { policies = [], totalPages = 1 } = data || {};

    // Extract unique categories for filtering
    const uniqueCategories = ["All", ...new Set(policies.map(policy => policy.category))];

    const filteredPolicies = selectedCategory === "All"
        ? policies
        : policies.filter(policy => policy.category === selectedCategory);

    return (
        <div className="min-h-screen bg-white pt-30">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-11/12 mx-auto"
            >
                <h2 className="text-center text-3xl font-bold text-blue-800 mb-8">
                    All Insurance Policies
                </h2>

                {/* Filter Section */}
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                    {uniqueCategories.map(category => (
                        <button
                            key={category}
                            onClick={() => {
                                setSelectedCategory(category);
                                setCurrentPage(1);
                            }}
                            className={`px-4 py-2 rounded-full border transition ${selectedCategory === category
                                ? "bg-blue-700 text-white border-blue-700"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                                }`}
                        >
                            <FaFilter className="inline-block mr-2" />
                            {category}
                        </button>
                    ))}
                </div>

                {/* Policy Cards */}
                {isLoading ? (
                    <Loader></Loader>
                ) : filteredPolicies.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10">No policies found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPolicies.map(policy => (
                            <motion.div
                                key={policy._id}
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="bg-white shadow rounded-xl overflow-hidden flex flex-col transition hover:shadow-lg"
                            >
                                <img
                                    src={policy.image}
                                    alt={policy.title}
                                    className="h-50 w-full object-cover object-top"
                                />
                                <div className="p-4 flex flex-col flex-grow">
                                    {/* Title + Category */}
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                                            {policy.title}
                                        </h3>
                                        <p className="px-2 py-1 rounded-full text-xs font-bold bg-teal-100 text-blue-800 flex items-center gap-1">
                                            <FaTags className="text-sm" />
                                            {policy.category}
                                        </p>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-700 text-sm flex-grow mb-4 flex items-start gap-2">
                                        {policy.description.split(" ").slice(0, 50).join(" ")}...
                                    </p>

                                    {/* View Details */}
                                    <button
                                        onClick={() => navigate(`/policy/${policy._id}`)}
                                        className="mt-auto btn btn-primary btn-sm w-full flex items-center justify-center gap-2"
                                    >
                                        View Details <FaArrowRight />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-10">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default AllPolicies;
