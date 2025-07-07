import React from 'react';
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { motion } from "motion/react"
import {
    FaCalculator,
    FaUserTie,
    FaLaptop,
    FaShieldAlt,
    FaChartLine,
    FaTachometerAlt,
    FaArrowRight,
    FaCheck,
} from "react-icons/fa"

const benefits = [
    {
        id: 1,
        icon: FaCalculator,
        title: "Instant Quote Calculation",
        description: "Get personalized life insurance quotes in seconds with our advanced calculator.",
        features: ["Real-time pricing", "Multiple plan options", "No hidden fees"],
        color: "from-blue-800 to-accent",
    },
    {
        id: 2,
        icon: FaUserTie,
        title: "Expert Agent Support",
        description: "Connect with certified insurance professionals for personalized guidance.",
        features: ["24/7 availability", "Licensed experts", "Free consultations"],
        color: "from-blue-800 to-accent",
    },
    {
        id: 3,
        icon: FaLaptop,
        title: "100% Online Application",
        description: "Complete your entire application process from the comfort of your home.",
        features: ["Paperless process", "Digital signatures", "Instant approval"],
        color: "from-blue-800 to-accent",
    },
    {
        id: 4,
        icon: FaShieldAlt,
        title: "Secure Online Payments",
        description: "Bank-level security ensures your financial information stays protected.",
        features: ["256-bit encryption", "PCI compliance", "Multiple payment options"],
        color: "from-blue-800 to-accent",
    },
    {
        id: 5,
        icon: FaChartLine,
        title: "Real-Time Claim Tracking",
        description: "Monitor your claims status and get updates throughout the process.",
        features: ["Live updates", "Document upload", "Status notifications"],
        color: "from-blue-800 to-accent",
    },
    {
        id: 6,
        icon: FaTachometerAlt,
        title: "Personalized Dashboard",
        description: "Access all your policy information and manage your account in one place.",
        features: ["Policy overview", "Payment history", "Document storage"],
        color: "from-blue-800 to-accent",
    },
]

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 425 },
        items: 2,
        slidesToSlide: 1,
    },
    mobile: {
        breakpoint: { max: 425, min: 0 },
        items: 1,
        slidesToSlide: 1,
    },
}

const BenefitsSection = () => {
    return (
        <section className="pt-16 lg:pt-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute top-20 left-10 w-32 h-32 bg-blue-800/5 rounded-full blur-xl"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-800/3 to-accent/3 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-11/12 mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.h2
                        className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Benefits of{" "}
                        <span className="bg-gradient-to-r from-blue-800 to-accent bg-clip-text text-transparent">LifeSure</span>
                    </motion.h2>
                    <motion.p
                        className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Experience the future of life insurance with our comprehensive digital platform designed for your
                        convenience and peace of mind.
                    </motion.p>
                </motion.div>

                {/* Benefits Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    <Carousel
                        responsive={responsive}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={4000}
                        keyBoardControl={true}
                        customTransition="transform 300ms ease-in-out"
                        transitionDuration={300}
                        className='py-12 lg:py-16'
                        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                        arrows={true}
                        showDots={true}
                        renderDotsOutside={true}
                    >
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.id}
                                className="px-4 h-full"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <motion.div
                                    className="group relative bg-white rounded-2xl shadow-lg  transition-all duration-500 overflow-hidden h-full"
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Gradient Background */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                                    ></div>

                                    {/* Card Content */}
                                    <div className="relative p-8">
                                        {/* Icon */}
                                        <motion.div
                                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                                            whileHover={{ rotate: 5 }}
                                        >
                                            <benefit.icon className="w-8 h-8 text-white" />
                                        </motion.div>

                                        {/* Title */}
                                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-800 transition-colors duration-300">
                                            {benefit.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-600 mb-6 leading-relaxed">{benefit.description}</p>

                                        {/* Features List */}
                                        <ul className="space-y-3 mb-6">
                                            {benefit.features.map((feature, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    className="flex items-center text-sm text-gray-700"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                                    viewport={{ once: true }}
                                                >
                                                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                                                        <FaCheck className="w-3 h-3 text-green-600" />
                                                    </div>
                                                    {feature}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Decorative Elements */}
                                    <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-xl"></div>
                                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-lg"></div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </Carousel>
                </motion.div>
            </div>
        </section>
    );
};

export default BenefitsSection;