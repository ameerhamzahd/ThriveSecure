import React from "react";
import { motion } from "motion/react";
import privacypolicyLottie from "../../assets/privacypolicy.json"
import Lottie from "lottie-react";

const PrivacyPolicy = () => {
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
                        Privacy <span className="bg-gradient-to-r from-blue-800 to-accent bg-clip-text text-transparent">Policy</span>
                    </h1>
                    <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                        Your privacy is important to us. Please read this policy carefully to understand how we handle your data.
                    </p>
                </motion.div>

                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">1. Information We Collect</h2>
                        <p className="mt-2 text-gray-700">
                            ThriveSecure collects personal information you provide during registration, such as your name, email, phone number, and payment information. We also collect usage data to improve our services.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">2. How We Use Your Information</h2>
                        <p className="mt-2 text-gray-700">
                            We use your information to process insurance applications, manage policies, provide customer support, process secure payments via Stripe, and communicate important updates about your policies.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">3. Data Security</h2>
                        <p className="mt-2 text-gray-700">
                            We implement strong security measures including SSL encryption, secure Firebase Authentication, and Stripe's secure payment processing to protect your data from unauthorized access or disclosure.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">4. Cookies and Tracking</h2>
                        <p className="mt-2 text-gray-700">
                            ThriveSecure uses cookies and similar technologies to enhance your user experience and analyze usage patterns to improve our services. You can manage cookie preferences through your browser settings.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">5. Sharing of Information</h2>
                        <p className="mt-2 text-gray-700">
                            We do not sell your personal data. We may share your information with trusted third parties (like Stripe and Firebase) to facilitate our services while ensuring your data remains protected under confidentiality agreements.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">6. Your Rights</h2>
                        <p className="mt-2 text-gray-700">
                            You can request to access, correct, or delete your personal data at any time. Contact us at <a href="mailto:support@thrivesecure.org" className="text-blue-600 underline">support@thrivesecure.org</a> to manage your data.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">7. Changes to This Policy</h2>
                        <p className="mt-2 text-gray-700">
                            ThriveSecure may update this Privacy Policy periodically. We will notify you of any significant changes through our platform or via email.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">8. Contact Us</h2>
                        <p className="mt-2 text-gray-700">
                            For any questions regarding our Privacy Policy, please reach out to us at{" "}
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
                        animationData={privacypolicyLottie}
                        loop
                    />
                </div>
        </section>
    );
};

export default PrivacyPolicy;
