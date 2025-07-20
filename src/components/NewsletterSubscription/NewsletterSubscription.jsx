import { useForm } from "react-hook-form";
import { motion } from "motion/react"
import { useState } from "react";
import { FaEnvelope, FaUser, FaArrowRight, FaCheck, FaBell } from "react-icons/fa";
import useAxios from "../../hooks/useAxios/useAxios";

const NewsletterSubscription = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const axiosInstance = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError("");
    try {
      const subscriptionData = {
        name: data.name,
        email: data.email,
        subscribedAt: new Date().toISOString(),
      };

      const res = await axiosInstance.post("newsletter-subscriptions", subscriptionData);

      if (res.data.insertedId || res.data.success) {
        setIsSuccess(true);
        reset();
      } else {
        setError("Subscription failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pb-15 lg:pb-20 bg-white relative overflow-hidden">
      {/* Background Animated Grid Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {[...Array(48)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-blue-800/10 rounded-sm"
                animate={{ opacity: [0.05, 0.2, 0.05] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl lg:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Stay Informed with{" "}
              <span className="bg-gradient-to-r from-blue-800 to-accent bg-clip-text text-transparent">ThriveSecure</span>
            </motion.h2>

            <motion.p
              className="text-lg lg:text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Get the latest updates on life insurance trends, policy changes, and exclusive offers delivered straight to your inbox.
            </motion.p>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 backdrop-blur-lg rounded-3xl p-8 lg:p-10 border border-white/20">
              {!isSuccess ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block  font-medium mb-2">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ">
                        <FaUser className="w-5 h-5 text-accent" />
                      </div>
                      <motion.input
                        type="text"
                        id="name"
                        {...register("name", {
                          required: "Name is required",
                          minLength: { value: 2, message: "Name must be at least 2 characters" },
                        })}
                        className="w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                        placeholder="Enter your full name"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                    {errors.name && <p className="mt-2 text-accent text-sm">{errors.name.message}</p>}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block  font-medium mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaEnvelope className="w-5 h-5 text-accent" />
                      </div>
                      <motion.input
                        type="email"
                        id="email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                        className="w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                        placeholder="Enter your email address"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                    {errors.email && <p className="mt-2 text-accent text-sm">{errors.email.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent/90  py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 hover:shadow-lg hover:scale-105 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe to Newsletter</span>
                        <FaArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                  {error && <p className="text-red-200 text-center">{error}</p>}
                  <p className="/70 text-sm text-center mt-2">We respect your privacy. Unsubscribe at any time.</p>
                </form>
              ) : (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
                    <FaCheck className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold  mb-4">Successfully Subscribed!</h3>
                  <p className="/80 mb-6">
                    Thank you for subscribing to our newsletter. You'll receive the latest updates and exclusive offers.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-accent hover:text-accent/80 font-medium transition-colors duration-300 cursor-pointer hover:underline"
                  >
                    Subscribe Another Email
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscription;
