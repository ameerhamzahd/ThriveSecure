import React, { useState } from "react";
import { motion } from "motion/react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import Pagination from "../../../../components/shared/Pagination/Pagination";
import PolicyForm from "./PolicyForm/PolicyForm";
import { Helmet } from "react-helmet-async";

const ManagePolicies = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const limit = 5;

    const { data: policies = [], isLoading } = useQuery({
        queryKey: ["policies", currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`policies?page=${currentPage}&limit=${limit}`);
            setTotalPages(res.data.totalPages);
            return res.data.policies;
        },
        keepPreviousData: true,
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this policy?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        });
        if (confirm.isConfirmed) {
            await axiosSecure.delete(`policies/${id}`);
            queryClient.invalidateQueries(["policies", currentPage]);
            Swal.fire("Deleted!", "Policy has been deleted.", "success");
        }
    };

    const openAddForm = () => {
        setSelectedPolicy(null);
        setIsFormOpen(true);
    };

    const openEditForm = async (policy) => {
        const confirm = await Swal.fire({
            title: "Edit Policy?",
            text: "Do you want to edit this policy?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, edit"
        });
        if (confirm.isConfirmed) {
            setSelectedPolicy(policy);
            setIsFormOpen(true);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <Helmet>
                <title>Dashboard | Manage Policies</title>
            </Helmet>
            
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl w-full bg-white shadow-lg rounded-2xl overflow-x-auto p-6"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-blue-800">Manage Policies</h2>
                    <button
                        onClick={openAddForm}
                        className="btn btn-sm btn-primary flex items-center gap-2"
                    >
                        <FaPlus /> Add New Policy
                    </button>
                </div>

                <table className="table w-full">
                    <thead className="bg-blue-50 sticky top-0">
                        <tr>
                            <th className="py-3">Title</th>
                            <th>Category</th>
                            <th>Min/Max Age</th>
                            <th>Coverage Range</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-gray-500">Loading policies...</td>
                            </tr>
                        ) : policies.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-gray-500">No policies found.</td>
                            </tr>
                        ) : (
                            policies.map(policy => (
                                <motion.tr
                                    key={policy._id}
                                    whileHover={{ scale: 1.01, backgroundColor: "#f9fafb" }}
                                    transition={{ duration: 0.2 }}
                                    className="border-b"
                                >
                                    <td className="py-3 font-medium text-gray-800">{policy.title}</td>
                                    <td className="text-sm text-gray-700">{policy.category}</td>
                                    <td className="text-sm text-gray-700">{policy.minAge}-{policy.maxAge}</td>
                                    <td className="text-sm text-gray-700">{policy.coverageRange}</td>
                                    <td className="flex items-center gap-2">
                                        <button
                                            onClick={() => openEditForm(policy)}
                                            className="btn btn-sm btn-info tooltip text-white"
                                            data-tip="Edit Policy"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(policy._id)}
                                            className="btn btn-sm btn-error tooltip text-white"
                                            data-tip="Delete Policy"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </motion.div>

            {/* Policy Add/Edit Modal */}
            {isFormOpen && (
                <PolicyForm
                    policy={selectedPolicy}
                    closeModal={() => setIsFormOpen(false)}
                    refetchKey={["policies", currentPage]}
                />
            )}
        </div>
    );
};

export default ManagePolicies;
