import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUserShield, FaUserSlash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Pagination from "../../../../components/shared/Pagination/Pagination";
import { motion } from "motion/react";

const ManageAgents = () => {
    const [activeTab, setActiveTab] = useState("pending");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const limit = 5;

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["agents", activeTab, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`agents?status=${activeTab}&page=${currentPage}&limit=${limit}`);
            setTotalPages(res.data.totalPages);
            return res.data.users;
        },
        keepPreviousData: true,
    });

    const handleApprove = async (user) => {
        const confirm = await Swal.fire({
            title: "Approve as Agent?",
            text: `Are you sure you want to approve ${user.name} as an agent?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#dc2626",
            confirmButtonText: "Yes, Approve"
        });
        if (confirm.isConfirmed) {
            await axiosSecure.patch(`users/${user._id}/approve-agent`);
            queryClient.invalidateQueries(["agents"]);
            Swal.fire("Approved!", `${user.name} is now an agent.`, "success");
        }
    };

    const handleReject = async (user) => {
        const confirm = await Swal.fire({
            title: "Reject Application?",
            text: `Are you sure you want to reject ${user.name}'s agent request?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Reject"
        });
        if (confirm.isConfirmed) {
            await axiosSecure.patch(`users/${user._id}/reject-agent`);
            queryClient.invalidateQueries(["agents"]);
            Swal.fire("Rejected!", `Agent application rejected for ${user.name}.`, "success");
        }
    };

    const handleDemote = async (user) => {
        const confirm = await Swal.fire({
            title: "Demote Agent?",
            text: `Are you sure you want to demote ${user.name} to a customer?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Demote"
        });
        if (confirm.isConfirmed) {
            await axiosSecure.patch(`users/${user._id}/demote-agent`);
            queryClient.invalidateQueries(["agents"]);
            Swal.fire("Demoted!", `${user.name} has been demoted to customer.`, "success");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl w-full bg-white rounded-2xl shadow-xl p-6"
            >
                <h2 className="text-2xl font-bold text-blue-800 text-center mb-6">Manage Agents</h2>

                {/* Tab System */}
                <div className="flex justify-center gap-4 mb-6">
                    <button
                        onClick={() => { setActiveTab("pending"); setCurrentPage(1); }}
                        className={`px-4 py-2 rounded-full ${activeTab === "pending" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                    >Pending Applications</button>
                    <button
                        onClick={() => { setActiveTab("approved"); setCurrentPage(1); }}
                        className={`px-4 py-2 rounded-full ${activeTab === "approved" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                    >All Current Agents</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-blue-50">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-10 text-gray-500">Loading...</td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-10 text-gray-500">No data available.</td>
                                </tr>
                            ) : (
                                users.map(user => (
                                    <motion.tr
                                        key={user._id}
                                        whileHover={{ scale: 1.01, backgroundColor: "#f9fafb" }}
                                        transition={{ duration: 0.2 }}
                                        className="border-b"
                                    >
                                        <td className="py-3 font-medium text-gray-800">{user.name}</td>
                                        <td className="text-sm text-gray-700">{user.email}</td>
                                        <td className="text-sm text-gray-700 capitalize">{user.role}</td>
                                        <td className="flex gap-2 items-center">
                                            {activeTab === "pending" ? (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(user)}
                                                        className="btn btn-sm btn-success flex items-center gap-1"
                                                    ><FaCheckCircle /> Approve</button>
                                                    <button
                                                        onClick={() => handleReject(user)}
                                                        className="btn btn-sm btn-error flex items-center gap-1"
                                                    ><FaTimesCircle /> Reject</button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => handleDemote(user)}
                                                    className="btn btn-sm btn-warning flex items-center gap-1"
                                                ><FaUserSlash /> Demote</button>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </motion.div>
        </div>
    );
};

export default ManageAgents;