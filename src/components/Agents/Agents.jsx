import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { FaEnvelope, FaCalendarAlt, FaUserShield } from "react-icons/fa";
import Loader from "../../components/shared/Loader/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";

const Agents = () => {
    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["featuredAgents"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users", {
                params: { role: "agent", limit: 3 },
            });
            return res.data.users;
        },
    });

    return (
        <section className="py-15 lg:py-20 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                        Meet Our{" "}
                        <span className="bg-gradient-to-r from-blue-800 to-accent bg-clip-text text-transparent">
                            Agents
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Dedicated professionals guiding you toward a secure future.
                    </p>
                </motion.div>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader />
                    </div>
                ) : data.length === 0 ? (
                    <p className="text-center text-gray-500">No agents found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.map((agent) => (
                            <motion.div
                                key={agent._id}
                                whileHover={{ y: -5, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 160, damping: 14 }}
                                className="group bg-white rounded-3xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden relative"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={agent.photoURL || "https://via.placeholder.com/400x300?text=Agent"}
                                        alt={agent.name}
                                        className="w-full h-72 object-cover object-top transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl"></div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-semibold text-blue-800 mb-1 text-center">{agent.name}</h3>
                                    <p className="text-center text-sm text-gray-500 mb-4 italic">
                                        ThriveSecure Agent
                                    </p>
                                    <div className="flex flex-col gap-2 mt-auto text-sm text-gray-600">
                                        <div className="flex items-center gap-2 justify-center">
                                            <FaEnvelope className="text-blue-800" />
                                            {agent.email}
                                        </div>
                                        <div className="flex items-center gap-2 justify-center">
                                            <FaUserShield className="text-blue-800" />
                                            Role: {agent.role}
                                        </div>
                                        <div className="flex items-center gap-2 justify-center">
                                            <FaCalendarAlt className="text-blue-800" />
                                            Joined: {new Date(agent.createdAt).toLocaleDateString(undefined, {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Agents;
