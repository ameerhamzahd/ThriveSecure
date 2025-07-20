import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion } from "motion/react";
import { FaStar, FaQuoteLeft, FaQuoteRight, FaArrowRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import Loader from "../../components/shared/Loader/Loader";

const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

const CustomerReviews = () => {
    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["customerReviews"],
        queryFn: async () => {
            const res = await axiosSecure.get("reviews", { params: { limit: 5 } });
            return res.data;
        },
    });

    const reviews = data.reviews || [];

    return (
        <section className="py-15 lg:py-20 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
            <div className="max-w-11/12 mx-auto px-4">
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                        What Our{" "}
                        <span className="bg-gradient-to-r from-blue-800 to-accent bg-clip-text text-transparent">
                            Customers Say
                        </span>
                    </h2>
                    <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                        Real stories and feedback from customers who trust us to secure their future.
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
                            arrows
                            showDots
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            className="py-8"
                            customLeftArrow={
                                <button className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-blue-800 hover:bg-blue-800 hover:text-white transition-all duration-300 z-10 cursor-pointer">
                                  <FaArrowRight className="w-5 h-5 rotate-180" />
                                </button>
                              }
                              customRightArrow={
                                <button className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-blue-800 hover:bg-blue-800 hover:text-white transition-all duration-300 z-10 cursor-pointer">
                                  <FaArrowRight className="w-5 h-5" />
                                </button>
                              }
                        >
                            {reviews.map((review) => (
                                <motion.div
                                    key={review._id}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white shadow rounded-2xl overflow-hidden flex flex-col mx-2 p-8 relative"
                                >
                                    <FaQuoteLeft className="absolute top-4 left-8 text-blue-200 text-3xl" />
                                    <FaQuoteRight className="absolute bottom-4 right-8 text-blue-200 text-3xl" />

                                    <div className="flex flex-row-reverse items-center gap-5 mb-4">
                                        <img
                                            src={review.userImage}
                                            alt={review.applicantName}
                                            className="w-14 h-14 rounded-full ring ring-blue-800 ring-offset-base-100 ring-offset-2"
                                        />
                                        <div className="flex flex-col items-end">
                                            <h3 className="text-lg font-semibold text-blue-800">{review.applicantName}</h3>
                                            <div className="flex text-yellow-400">
                                                {Array.from({ length: review.rating }, (_, i) => (
                                                    <FaStar key={i} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-sm flex-grow line-clamp-5 italic">
                                        {review.feedback}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-2">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </p>
                                </motion.div>
                            ))}
                        </Carousel>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default CustomerReviews;
