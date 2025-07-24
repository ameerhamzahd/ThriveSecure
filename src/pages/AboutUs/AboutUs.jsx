import React from "react";
import { motion } from "motion/react";
import Lottie from "lottie-react";
import aboutusLottie from "../../assets/About us.json";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
    return (
        <section className="max-w-11/12 mx-auto px-4 lg:px-0 pt-30 text-gray-800 grid grid-cols-1 lg:grid-cols-2 items-center">
            <Helmet>
                <title>ThriveSecure | About Us</title>
            </Helmet>
            
            {/* Lottie Animation */}
            <div className="hidden w-full lg:flex justify-center items-center"
            >
                <Lottie
                    style={{ width: "600px" }}
                    animationData={aboutusLottie}
                    loop
                />
            </div>

            {/* Text Content */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                    About <span className="bg-gradient-to-r from-blue-800 to-accent bg-clip-text text-transparent">ThriveSecure</span>
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                    ThriveSecure is on a mission to redefine how you experience insurance. We believe in making life and health insurance accessible, transparent, and secure through technology.
                </p>

                <div className="space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold text-blue-800">Our Mission</h2>
                        <p className="text-gray-700 mt-1">
                            To empower individuals and families with secure, user-friendly, and accessible digital insurance solutions that protect what matters most.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-blue-800">Our Vision</h2>
                        <p className="text-gray-700 mt-1">
                            To build a world where everyone can thrive confidently, knowing they are protected by a transparent, technology-driven insurance platform.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-blue-800">Our Values</h2>
                        <p className="text-gray-700 mt-1">
                            We value transparency, security, customer empowerment, and constant innovation to deliver exceptional insurance experiences.
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default AboutUs;
