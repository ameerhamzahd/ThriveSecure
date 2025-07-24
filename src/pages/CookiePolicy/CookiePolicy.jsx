import React from "react";
import { motion } from "motion/react";
import cookiepolicyLottie from "../../assets/cookiepolicy.json"
import Lottie from "lottie-react";

const CookiePolicy = () => {
    return (
        <section className="max-w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 px-4 lg:px-0 pb-15 pt-30 text-gray-800">
            <div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl lg:text-5xl font-bold text-gray-900">
                        Cookie <span className="bg-gradient-to-r from-blue-800 to-accent bg-clip-text text-transparent">Policy</span>
                    </h1>
                    <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                        This Cookie Policy explains how ThriveSecure uses cookies and similar technologies to improve your experience.
                    </p>
                </motion.div>

                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">1. What Are Cookies?</h2>
                        <p className="mt-2 text-gray-700">
                            Cookies are small text files stored on your device when you visit websites. They help us enhance your user experience, analyze site usage, and deliver personalized content.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">2. Types of Cookies We Use</h2>
                        <p className="mt-2 text-gray-700">
                            ThriveSecure uses essential cookies for platform functionality, performance cookies for analyzing site traffic, and preference cookies to remember your settings for a personalized experience.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">3. How We Use Cookies</h2>
                        <p className="mt-2 text-gray-700">
                            We use cookies to keep you logged in, remember your preferences, enhance security, process payments securely through Stripe, and analyze user interactions to improve our services.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">4. Managing Cookies</h2>
                        <p className="mt-2 text-gray-700">
                            You can manage or disable cookies through your browser settings. However, disabling cookies may impact the functionality of some features on ThriveSecure.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">5. Third-Party Cookies</h2>
                        <p className="mt-2 text-gray-700">
                            We may use third-party services, such as Google Analytics, to understand how users interact with ThriveSecure. These services may use cookies to collect usage data in accordance with their privacy policies.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">6. Changes to This Policy</h2>
                        <p className="mt-2 text-gray-700">
                            We may update our Cookie Policy to reflect changes in our practices or legal requirements. We will notify you of significant changes through our platform or via email.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">7. Contact Us</h2>
                        <p className="mt-2 text-gray-700">
                            If you have questions regarding this Cookie Policy, please contact us at{" "}
                            <a href="mailto:support@thrivesecure.org" className="text-blue-600 underline">support@thrivesecure.org</a>.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Lottie Animation */}
            <div className="hidden w-full lg:flex justify-center items-center"
            >
                <Lottie
                    style={{ width: "600px" }}
                    animationData={cookiepolicyLottie}
                    loop
                />
            </div>
        </section>
    );
};

export default CookiePolicy;
