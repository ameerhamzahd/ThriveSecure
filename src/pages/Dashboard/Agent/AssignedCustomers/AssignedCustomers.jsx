import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import Pagination from "../../../../components/shared/Pagination/Pagination";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth/useAuth";
import { Helmet } from "react-helmet-async";

const AssignedCustomers = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const limit = 5;

    const { data: assignedCustomers = [], isLoading } = useQuery({
        queryKey: ["assignedCustomers", currentPage, user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get("/applications", {
                params: {
                    assignedAgent: user?.email, // agent's email
                    page: currentPage,
                    limit: limit,
                }
            });
            setTotalPages(res.data.totalPages || 1);
            return res.data.applications || [];
        },
        keepPreviousData: true,
        enabled: !!user?.email,
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ _id, newStatus, policyId }) => {
            // Update application agentAssignStatus
            const res = await axiosSecure.patch(`applications/${_id}/agentAssignStatus`, {
                agentAssignStatus: newStatus
            });

            // If approved, increment purchase count in policies collection
            if (newStatus === "Approved") {
                await axiosSecure.patch(`policies/${policyId}/increment-purchase`);
            }

            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Success", "Application status updated.", "success");
            queryClient.invalidateQueries(["assignedCustomers"]);
        },
        onError: (error) => {
            Swal.fire("Error", "Failed to update application status.", "error");
        }
    });


    const handleStatusChange = (_id, newStatus, policyId) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Change status to ${newStatus}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, update it",
        }).then((result) => {
            if (result.isConfirmed) {
                updateStatusMutation.mutate({ _id, newStatus, policyId });
            }
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <Helmet>
                <title>Dashboard | Assigned Customers</title>
            </Helmet>
            
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl w-full bg-white shadow-lg rounded-2xl overflow-x-auto p-6"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Assigned Customers</h2>

                <table className="table w-full">
                    <thead className="bg-blue-50 sticky top-0">
                        <tr>
                            <th>Customer Name</th>
                            <th>Email</th>
                            <th>Interested Policies</th>
                            <th>Application Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan="5" className="text-center py-10 text-gray-500">Loading customers...</td></tr>
                        ) : assignedCustomers.length === 0 ? (
                            <tr><td colSpan="5" className="text-center py-10 text-gray-500">No assigned customers found.</td></tr>
                        ) : (
                            assignedCustomers.map((customer) => (
                                <motion.tr key={customer._id} whileHover={{ scale: 1.01, backgroundColor: "#f9fafb" }} transition={{ duration: 0.2 }} className="border-b">
                                    <td className="py-3 text-sm">{customer.applicantName}</td>
                                    <td className="py-3 text-sm">{customer.email}</td>
                                    <td className="py-3 text-sm">{customer.policyDetails.title}</td>
                                    <td className="py-3">
                                        <select
                                            className="select select-bordered select-sm w-full max-w-xs"
                                            value={customer.agentAssignStatus || "Pending"}
                                            onChange={(e) =>
                                                handleStatusChange(customer._id, e.target.value, customer.policyId)
                                            }
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </td>
                                    <td className="py-3">
                                        <button
                                            onClick={() => {
                                                setSelectedCustomer(customer);
                                                document.getElementById("details_modal").showModal();
                                            }}
                                            className="btn btn-sm btn-outline btn-primary flex items-center gap-1"
                                        >
                                            <FaEye /> View Details
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>

                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </motion.div>

            {/* View Details Modal */}
            <dialog id="details_modal" className="modal">
                <div className="modal-box max-w-md">
                    <h3 className="font-bold text-lg mb-4 text-blue-800">
                        Customer Profile: {selectedCustomer?.applicantName}
                    </h3>
                    <div className="space-y-2 text-sm">
                        <p><strong>Name:</strong> {selectedCustomer?.applicantName}</p>
                        <p><strong>Email:</strong> {selectedCustomer?.email}</p>
                        <p><strong>Interested Policy:</strong> {selectedCustomer?.policyDetails.title}</p>
                        <p><strong>Status:</strong> {selectedCustomer?.adminAssignStatus}</p>
                        <p><strong>Submitted:</strong> {new Date(selectedCustomer?.createdAt).toLocaleString()}</p>
                        <p><strong>Details:</strong> {selectedCustomer?.policyDetails.description}</p>
                    </div>
                    <div className="modal-action">
                        <form method="dialog" className="w-full">
                            <button className="btn btn-outline w-full">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignedCustomers;
