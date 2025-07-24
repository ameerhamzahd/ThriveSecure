import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";

const ContactUs = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    return (
        <section className="max-w-11/12 mx-auto px-4 lg:px-0 pb-15 pt-30 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Section */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
            >
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-900">
                    We're Here to Help
                </h1>
                <p className="text-lg text-gray-700">
                    Whether you have questions about your insurance policies, need assistance with claims, or want to learn more about how ThriveSecure protects your family, we are ready to support you.
                </p>
                <p className="text-lg text-gray-700">
                    Our team strives to respond promptly to every inquiry, ensuring your journey with ThriveSecure remains smooth and worry-free.
                </p>
                <p className="text-lg text-gray-700">
                    Let us know how we can assist you today.
                </p>
            </motion.div>

            {/* Contact Form */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white shadow-lg rounded-2xl p-8 lg:p-12 w-full"
            >
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
                    Get in <span className="bg-gradient-to-r from-blue-800 to-accent bg-clip-text text-transparent">Touch</span>
                </h2>
                <p className="text-gray-600 mb-8 text-center">
                    Fill out the form, and our team will get back to you promptly.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            type="text"
                            placeholder="Your full name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                            })}
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Message</label>
                        <textarea
                            {...register("message", { required: "Message is required" })}
                            rows="4"
                            placeholder="How can we assist you?"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-blue-800 text-white font-semibold hover:opacity-90 transition"
                    >
                        Send Message
                    </button>
                </form>
            </motion.div>
        </section>
    );
};

export default ContactUs;
