import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios/useAxios";
import { motion } from "motion/react";
import {
    FaArrowLeft, FaPhone, FaCalculator, FaShieldAlt,
    FaListUl, FaUserCheck, FaTags
} from "react-icons/fa";
import Loader from "../../components/shared/Loader/Loader";

const PolicyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    const { data: policy, isLoading, isError } = useQuery({
        queryKey: ["policy", id],
        queryFn: async () => {
            const res = await axiosInstance.get(`policies/${id}`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <Loader></Loader>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-red-600">Failed to load policy details.</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen max-w-11/12 mx-auto bg-white pt-30"
        >
            {/* Back Button */}
            <button
                onClick={() => navigate("/all-policies")}
                className="flex items-center gap-2 mb-6 text-blue-700 hover:underline cursor-pointer"
            >
                <FaArrowLeft /> Back to All Policies
            </button>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg p-6">
                {/* Image with motion from left */}
                <motion.div
                    initial={{ opacity: 0, x: -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center justify-center"
                >
                    <img
                        src={policy.image}
                        alt={policy.title}
                        className="rounded-2xl object-cover w-full shadow-md"
                    />
                </motion.div>

                {/* Details with motion from right */}
                <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center space-y-6"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                            {policy.title}
                        </h1>
                        <div className="flex items-center gap-2 mb-3">
                            <FaTags className="text-blue-700" />
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                {policy.category}
                            </span>
                        </div>
                        <p className="text-gray-700">{policy.description}</p>
                    </div>

                    {/* Key Information Blocks */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Eligibility */}
                        <div className="bg-teal-50 rounded-lg p-4 flex flex-col gap-1">
                            <h3 className="text-base font-semibold text-green-700 flex items-center gap-2">
                                <FaUserCheck /> Eligibility
                            </h3>
                            <p className="text-gray-700">Ages {policy.minAge} - {policy.maxAge} years</p>
                        </div>

                        {/* Premium Calculation */}
                        <div className="bg-teal-50 rounded-lg p-4 flex flex-col gap-1">
                            <h3 className="text-base font-semibold text-green-700 flex items-center gap-2">
                                <FaCalculator /> Premium Calculation
                            </h3>
                            <p className="text-gray-700">
                                Base premium: ${policy.basePremiumRate}/month. Final premium varies with eligibility and add-ons.
                            </p>
                        </div>

                        {/* Coverage Range */}
                        <div className="bg-teal-50 rounded-lg p-4 flex flex-col gap-1">
                            <h3 className="text-base font-semibold text-green-700 flex items-center gap-2">
                                <FaShieldAlt /> Coverage Range
                            </h3>
                            <p className="text-gray-700">{policy.coverageRange}</p>
                        </div>

                        {/* Term Length Options */}
                        <div className="bg-teal-50 rounded-lg p-4 flex flex-col gap-1">
                            <h3 className="text-base font-semibold text-green-700 flex items-center gap-2">
                                <FaListUl /> Term Length Options
                            </h3>
                            <p className="text-gray-700">{policy.durationOptions}</p>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <button
                            onClick={() => navigate(`/policy-quote/${policy._id}`)}
                            className="btn btn-primary flex items-center gap-2 flex-grow"
                        >
                            <FaCalculator /> Get Quote
                        </button>
                        <button
                            onClick={() => navigate(`/book-agent/${policy._id}`)}
                            className="btn btn-outline btn-accent flex items-center gap-2 flex-grow"
                        >
                            <FaPhone /> Book Agent Consultation
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default PolicyDetails;
