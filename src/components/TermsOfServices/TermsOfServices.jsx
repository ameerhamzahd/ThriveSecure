import React from "react";
import { motion } from "motion/react";
import termsofservicesLottie from "../../assets/termsofservices.json"
import Lottie from "lottie-react";

const TermsOfService = () => {
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
                        Terms of <span className="bg-gradient-to-r from-blue-800 to-accent bg-clip-text text-transparent">Service</span>
                    </h1>
                    <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                        Please read these terms carefully before using ThriveSecure.
                    </p>
                </motion.div>

                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">1. Acceptance of Terms</h2>
                        <p className="mt-2 text-gray-700">
                            By accessing or using ThriveSecure, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part, you must discontinue using our services immediately.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">2. Services Provided</h2>
                        <p className="mt-2 text-gray-700">
                            ThriveSecure offers digital insurance services, including policy management, claims processing, and user support. We may modify or discontinue services with or without notice to improve the user experience.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">3. User Responsibilities</h2>
                        <p className="mt-2 text-gray-700">
                            You are responsible for maintaining the confidentiality of your account credentials and ensuring that all activities conducted under your account comply with applicable laws and these terms.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">4. Payment and Refund Policy</h2>
                        <p className="mt-2 text-gray-700">
                            Payments are securely processed through Stripe. Premiums are due as per your policy agreement. Refunds, if applicable, will be processed according to our refund guidelines provided within your policy documentation.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">5. Privacy and Data Security</h2>
                        <p className="mt-2 text-gray-700">
                            ThriveSecure values your privacy. We use secure encryption, Firebase Authentication, and adhere to strict data protection policies to keep your information safe. Please review our Privacy Policy for further details.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">6. Limitation of Liability</h2>
                        <p className="mt-2 text-gray-700">
                            ThriveSecure will not be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use our services. We provide our services on an “as is” basis.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-blue-800">7. Changes to Terms</h2>
                        <p className="mt-2 text-gray-700">
                            We may update these Terms of Service periodically to reflect changes in our practices or applicable laws. We will notify you of significant changes through email or platform notifications.
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
                            If you have any questions regarding these Terms, please contact us at{" "}
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
                        animationData={termsofservicesLottie}
                        loop
                    />
                </div>
        </section>
    );
};

export default TermsOfService;
