import React, { useState } from 'react';
import { motion } from "motion/react";
import { FaUser, FaEnvelope, FaEye, FaUserCheck, FaTimesCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const ManageApplications = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedApp, setSelectedApp] = useState(null);

    const { data: applications = [], refetch, isLoading } = useQuery({
        queryKey: ["applications"],
        queryFn: async () => {
            const res = await axiosSecure.get("/api/admin/applications");
            return res.data;
        },
    });

    const handleReject = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This will reject the application.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Reject"
        });
        if (confirm.isConfirmed) {
            await axiosSecure.patch(`/api/admin/applications/${id}/reject`);
            refetch();
            Swal.fire("Rejected!", "The application has been rejected.", "success");
        }
    };

    const handleAssignAgent = async (id, agentEmail) => {
        await axiosSecure.patch(`/api/admin/applications/${id}/assign`, { agentEmail });
        refetch();
        Swal.fire("Assigned!", "Agent has been assigned successfully.", "success");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 pt-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl w-full bg-white shadow-lg rounded-2xl overflow-x-auto p-6 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Manage Applications</h2>

                <table className="table w-full">
                    <thead className="bg-blue-50 sticky top-0 z-10">
                        <tr>
                            <th className="py-3">Applicant</th>
                            <th>Policy</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Assign Agent</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500">Loading applications...</td>
                            </tr>
                        ) : applications.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500"> No applications found.</td>
                            </tr>
                        ) : (
                            applications.map((app) => (
                                <motion.tr
                                    key={app._id}
                                    whileHover={{ scale: 1.01, backgroundColor: "#f9fafb" }}
                                    transition={{ duration: 0.2 }}
                                    className="border-b"
                                >
                                    <td className="py-3">
                                        <div className="flex flex-col">
                                            <span className="flex items-center gap-2 text-sm text-gray-800">
                                                <FaUser className="text-blue-600" /> {app.applicantName}
                                            </span>
                                            <span className="flex items-center gap-2 text-xs text-gray-500">
                                                <FaEnvelope className="text-blue-400" /> {app.applicantEmail}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="text-sm">{app.policyName}</td>
                                    <td className="text-sm">{new Date(app.applicationDate).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`badge 
                                            ${app.status === "Pending" && "badge-warning"} 
                                            ${app.status === "Approved" && "badge-success"} 
                                            ${app.status === "Rejected" && "badge-error"} 
                                        `}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td>
                                        <select
                                            className="select select-bordered select-sm"
                                            onChange={(e) => handleAssignAgent(app._id, e.target.value)}
                                            defaultValue=""
                                        >
                                            <option disabled value="">Assign Agent</option>
                                            <option value="agent1@thrive.com">Agent 1</option>
                                            <option value="agent2@thrive.com">Agent 2</option>
                                            <option value="agent3@thrive.com">Agent 3</option>
                                        </select>
                                    </td>
                                    <td className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleReject(app._id)}
                                            className="btn btn-sm btn-error text-white tooltip"
                                            data-tip="Reject"
                                        >
                                            <FaTimesCircle />
                                        </button>
                                        <label
                                            htmlFor="app-details-modal"
                                            onClick={() => setSelectedApp(app)}
                                            className="btn btn-sm btn-info text-white tooltip cursor-pointer"
                                            data-tip="View Details"
                                        >
                                            <FaEye />
                                        </label>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </motion.div>

            {/* DaisyUI Modal for Viewing Details */}
            <input type="checkbox" id="app-details-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-md">
                    <h3 className="font-bold text-lg mb-2">Application Details</h3>
                    {selectedApp ? (
                        <div className="space-y-1 text-sm text-gray-700">
                            <p><strong>Name:</strong> {selectedApp.applicantName}</p>
                            <p><strong>Email:</strong> {selectedApp.applicantEmail}</p>
                            <p><strong>Policy:</strong> {selectedApp.policyName}</p>
                            <p><strong>Status:</strong> {selectedApp.status}</p>
                            <p><strong>Submitted:</strong> {new Date(selectedApp.applicationDate).toLocaleString()}</p>
                            <p><strong>Details:</strong> {selectedApp.details || "N/A"}</p>
                        </div>
                    ) : (
                        <p className="text-gray-500">No details to show.</p>
                    )}
                    <div className="modal-action">
                        <label htmlFor="app-details-modal" className="btn btn-primary">Close</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageApplications;
