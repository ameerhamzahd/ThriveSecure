import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import faqLottie from "../../assets/faq.json"
import Lottie from "lottie-react";

const faqData = [
    {
        question: "What is ThriveSecure?",
        answer: "ThriveSecure is a modern digital insurance platform providing user-friendly, secure, and transparent life and health insurance solutions tailored to your needs."
    },
    {
        question: "How does ThriveSecure protect my data?",
        answer: "We use end-to-end encryption, secure payment processing via Stripe, and Firebase authentication to ensure your personal and payment data remains safe and confidential."
    },
    {
        question: "Can I cancel my insurance plan anytime?",
        answer: "Yes, you can manage or cancel your policy anytime directly through your ThriveSecure dashboard without hidden fees."
    },
    {
        question: "How can I claim my insurance benefits?",
        answer: "Simply navigate to your policy, click 'Claim', upload required documents, and our system will guide you step-by-step. Our claims team will review and notify you within 3 business days."
    },
    {
        question: "Is ThriveSecure available globally?",
        answer: "Currently, ThriveSecure primarily serves customers within Bangladesh but is actively expanding to support secure insurance services globally."
    },
    {
        question: "What payment methods are accepted on ThriveSecure?",
        answer: "We accept all major debit and credit cards securely processed via Stripe. You can also use mobile banking methods compatible with your region for seamless transactions."
    },
    {
        question: "Does ThriveSecure offer family insurance plans?",
        answer: "Yes, ThriveSecure provides comprehensive family insurance plans allowing you to add multiple family members under a single policy for simplified management and cost-effectiveness."
    },
    {
        question: "How do I update my personal information on ThriveSecure?",
        answer: "Log in to your dashboard, navigate to 'Profile Settings', and update your information such as phone number, address, or beneficiaries easily at any time."
    },
    {
        question: "Is there customer support available if I face issues?",
        answer: "Absolutely. ThriveSecure offers responsive customer support via live chat, email, and our contact form, ensuring you get assistance with claims, policy details, and account issues promptly."
    },
    {
        question: "How secure are my transactions on ThriveSecure?",
        answer: "All transactions are protected using advanced SSL encryption and handled by Stripe’s PCI-compliant secure payment gateway, ensuring your financial information remains safe during every transaction."
    },    
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(prev => prev === index ? null : index);
    };

    return (
        <section className="max-w-11/12 mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 pt-30 pb-15 lg:px-0">
            <div>
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
                        Frequently Asked{" "}
                        <span className="bg-gradient-to-r from-blue-800 to-accent bg-clip-text text-transparent">Questions</span>
                    </motion.h2>
                    <motion.p
                        className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Experience the future of life insurance with our comprehensive digital platform designed for your
                        convenience and peace of mind.
                    </motion.p>
                </motion.div>
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-blue-100 rounded-xl overflow-hidden bg-white shadow-sm"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="flex items-center justify-between w-full px-6 py-4 text-left text-blue-900 font-medium focus:outline-none"
                            >
                                <span>{faq.question}</span>
                                {activeIndex === index ? (
                                    <FaChevronUp className="text-blue-500" />
                                ) : (
                                    <FaChevronDown className="text-blue-500" />
                                )}
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-6 pb-4 text-gray-700"
                                    >
                                        <p>{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lottie Animation */}
            <div className="hidden w-full lg:flex justify-center items-center"
                >
                    <Lottie
                        style={{ width: "600px" }}
                        animationData={faqLottie}
                        loop
                    />
                </div>
        </section>
    );
};

export default FAQ;