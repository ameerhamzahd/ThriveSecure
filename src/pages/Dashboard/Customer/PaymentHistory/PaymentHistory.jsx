import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "motion/react";
import { FaCreditCard, FaCheckCircle, FaClock } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";

const ProfileHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: policies = [], isLoading } = useQuery({
        queryKey: ["approvedPolicies", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`applications?email=${user?.email}&agentAssignStatus=Approved`);
            return res.data.applications;
        },
        enabled: !!user?.email,
    });

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl w-full bg-white shadow-lg rounded-2xl overflow-x-auto p-6"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Payment History</h2>

                <table className="table w-full">
                    <thead className="bg-blue-50 sticky top-0">
                        <tr>
                            <th>Title</th>
                            <th>Premium</th>
                            <th>Frequency</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-gray-500">
                                    Loading policies...
                                </td>
                            </tr>
                        ) : policies.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-gray-500">
                                    No approved policies found.
                                </td>
                            </tr>
                        ) : (
                            policies.map((policy) => (
                                <motion.tr
                                    key={policy._id}
                                    whileHover={{ scale: 1.01, backgroundColor: "#f9fafb" }}
                                    transition={{ duration: 0.2 }}
                                    className="border-b"
                                >
                                    <td className="py-3 text-sm flex items-center gap-2">
                                        <FaCreditCard className="text-blue-500" /> {policy.policyDetails.title}
                                    </td>
                                    <td className="py-3 text-sm">${policy.policyDetails.basePremiumRate}</td>
                                    <td className="py-3 text-sm">{policy.paymentFrequency || "Monthly"}</td>
                                    <td>
                                        <span
                                            className={`badge text-xs font-bold
                                            ${policy.paymentStatus === "due" && "badge-warning"}
                                            ${policy.paymentStatus === "paid" && "badge-success"}
                                        `}
                                        >
                                            {policy.paymentStatus === "paid" ? (
                                                <span className="flex items-center gap-1 uppercase"><FaCheckCircle /> paid</span>
                                            ) : (
                                                <span className="flex items-center gap-1 uppercase"><FaClock /> due</span>
                                            )}
                                        </span>
                                    </td>
                                    <td className="py-2">
                                        {policy.paymentStatus === "due" && policy.agentAssignStatus === "Approved" ? (
                                            <Link
                                                to={`/dashboard/payment/${policy._id}`}
                                                className="btn btn-sm btn-primary tooltip"
                                                data-tip="Pay Now"
                                            >
                                                Pay Now
                                            </Link>
                                        ) : (
                                            <button
                                                disabled
                                                className="btn btn-sm btn-success opacity-70 cursor-not-allowed uppercase"
                                            >
                                                paid
                                            </button>
                                        )}
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
};

export default ProfileHistory;
