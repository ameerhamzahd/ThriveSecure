import React, { useState } from "react";
import { motion } from "motion/react";
import {
    FaUser, FaEnvelope, FaUserTag,
    FaArrowUp, FaArrowDown, FaTrash
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import Pagination from "../../../../components/shared/Pagination/Pagination";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ["users", currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`users?page=${currentPage}&limit=${limit}`);
            setTotalPages(res.data.totalPages);
            return res.data.users;
        },
        keepPreviousData: true,
    });

    const handleRoleChange = async (id, newRole) => {
        await axiosSecure.patch(`users/${id}/role`, { role: newRole });
        refetch();
        Swal.fire("Role Updated", `User role has been updated to ${newRole}.`, "success");
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Delete User?",
            text: "This will permanently remove the user.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Delete"
        });
        if (confirm.isConfirmed) {
            await axiosSecure.delete(`users/${id}`);
            refetch();
            Swal.fire("Deleted!", "User has been removed.", "success");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl w-full bg-white shadow-lg rounded-2xl overflow-x-auto p-6 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Manage Users</h2>

                <table className="table w-full">
                    <thead className="bg-blue-50 sticky top-0">
                        <tr>
                            <th className="py-3">User</th>
                            <th>Role</th>
                            <th>Registered</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="4" className="text-center py-10 text-gray-500">Loading users...</td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-10 text-gray-500">No users found.</td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <motion.tr
                                    key={user._id}
                                    whileHover={{ scale: 1.01, backgroundColor: "#f9fafb" }}
                                    transition={{ duration: 0.2 }}
                                    className="border-b"
                                >
                                    <td className="py-3">
                                        <div className="flex flex-col">
                                            <span className="flex items-center gap-2 text-sm text-gray-800">
                                                <FaUser className="text-blue-600" /> {user.name}
                                            </span>
                                            <span className="flex items-center gap-2 text-xs text-gray-500">
                                                <FaEnvelope className="text-blue-400" /> {user.email}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase 
                                            ${user.role === "customer" && "bg-neutral text-white"}
                                            ${user.role === "agent" && "bg-info"}
                                            ${user.role === "admin" && "bg-success"}
                                        `}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="text-sm">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="flex items-center gap-2">
                                        <select
                                            className="select select-sm select-bordered text-sm"
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        >
                                            <option disabled>Change Role</option>
                                            <option value="customer">Customer</option>
                                            <option value="agent">Agent</option>
                                            <option value="admin">Admin</option>
                                        </select>

                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="btn btn-sm btn-error tooltip text-white"
                                            data-tip="Delete User"
                                        >
                                            <FaTrash />
                                        </button>

                                        <label
                                            htmlFor="user-details-modal"
                                            onClick={() => setSelectedUser(user)}
                                            className="btn btn-sm btn-info tooltip text-white cursor-pointer"
                                            data-tip="View Details"
                                        >
                                            <FaUserTag />
                                        </label>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </motion.div>

            {/* DaisyUI Modal for Viewing User Details */}
            <input type="checkbox" id="user-details-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-md">
                    <h3 className="font-bold text-lg mb-2">User Details</h3>
                    {selectedUser ? (
                        <div className="space-y-1 text-sm text-gray-700">
                            <p><strong>Name:</strong> {selectedUser.name}</p>
                            <p><strong>Email:</strong> {selectedUser.email}</p>
                            <p><strong>Role:</strong> {selectedUser.role}</p>
                            <p><strong>Registered:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
                        </div>
                    ) : (
                        <p className="text-gray-500">No details to show.</p>
                    )}
                    <div className="modal-action">
                        <label htmlFor="user-details-modal" className="btn btn-primary">Close</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
