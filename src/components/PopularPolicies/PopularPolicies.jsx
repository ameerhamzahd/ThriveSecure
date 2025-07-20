import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion } from "motion/react";
import { FaShieldAlt, FaArrowRight, FaDollarSign, FaClock, FaFire } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import Loader from "../../components/shared/Loader/Loader";
import { Link, useNavigate } from "react-router";

const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3, slidesToSlide: 1 },
    tablet: { breakpoint: { max: 1024, min: 425 }, items: 2, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 425, min: 0 }, items: 1, slidesToSlide: 1 },
};

const PopularPolicies = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["popularPolicies"],
        queryFn: async () => {
            const res = await axiosSecure("policies", { params: { popular: true, limit: 6 } });
            return res.data;
        },
    });
    
    const policies = data.policies || [];

    return (
        <section className="py-15 lg:pt-20 bg-white relative overflow-hidden">
            <div className="max-w-11/12 mx-auto relative z-10 px-4">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Popular{" "}Policies{" "}of{" "}
                        <span className="bg-gradient-to-r from-blue-800 to-accent bg-clip-text text-transparent">
                            ThriveSecure
                        </span>
                    </h2>
                    <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover the most purchased policies trusted by families to secure their future.
                    </p>
                </motion.div>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader />
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <Carousel
                            responsive={responsive}
                            infinite
                            autoPlay
                            autoPlaySpeed={5000}
                            keyBoardControl
                            customTransition="transform 300ms ease-in-out"
                            transitionDuration={300}
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            arrows
                            showDots
                            renderDotsOutside
                            className="py-8"
                            customLeftArrow={
                                <button className="cursor-pointer absolute left-0 top-1/3 transform -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-blue-800 hover:bg-blue-800 hover:text-white transition">
                                    <FaArrowRight className="w-5 h-5 rotate-180" />
                                </button>
                            }
                            customRightArrow={
                                <button className="cursor-pointer absolute right-0 top-1/3 transform -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-blue-800 hover:bg-blue-800 hover:text-white transition">
                                    <FaArrowRight className="w-5 h-5" />
                                </button>
                            }
                        >
                            {policies.map((policy) => (
                                <motion.div
                                    key={policy._id}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    className="bg-white shadow rounded-2xl overflow-hidden flex flex-col mx-2"
                                >
                                    <img
                                        src={policy.image}
                                        alt={policy.title}
                                        className="h-60 w-full object-cover object-top"
                                    />
                                    <div className="p-5 flex flex-col flex-grow">
                                        <h3 className="text-lg font-semibold text-blue-800 mb-2">
                                            {policy.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                                            {policy.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-4">
                                            <span className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                                                <FaDollarSign className="text-blue-800" /> Coverage: {policy.coverageRange}
                                            </span>
                                            <span className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                                                <FaClock className="text-blue-800" /> Term: {policy.durationOptions} years
                                            </span>
                                            <span className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                                                <FaFire className="text-blue-800" /> Popularity: {policy.purchaseCount ?? 0}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => navigate(`/policy/${policy._id}`)}
                                            className="btn btn-primary btn-sm w-full flex items-center justify-center gap-2"
                                        >
                                            View Details <FaArrowRight />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </Carousel>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default PopularPolicies;
