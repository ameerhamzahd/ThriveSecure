import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import Pagination from "../../../../components/shared/Pagination/Pagination";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";

const PolicyClearance = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedClaim, setSelectedClaim] = useState(null);
    const limit = 5;

    // Fetch claims with pagination
    const { data: claims = [], isLoading } = useQuery({
        queryKey: ["allClaims", currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get("/claims", {
                params: { page: currentPage, limit }
            });
            setTotalPages(res.data.totalPages || 1);
            return res.data.claims || res.data;
        },
        keepPreviousData: true,
    });

    // Mutation to update claim status
    const updateStatusMutation = useMutation({
        mutationFn: async ({ id, status }) => {
            const res = await axiosSecure.patch(`/claims/${id}/status`, { status });
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Updated!", "Claim status updated successfully.", "success");
            queryClient.invalidateQueries(["allClaims"]);
        },
        onError: () => {
            Swal.fire("Error", "Failed to update claim status.", "error");
        },
    });

    const handleStatusChange = (id, status) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Change status to ${status}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, update it!"
        }).then(result => {
            if (result.isConfirmed) {
                updateStatusMutation.mutate({ id, status });
            }
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl w-full bg-white shadow-lg rounded-2xl overflow-x-auto p-6"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Policy Clearance</h2>
                <table className="table w-full">
                    <thead className="bg-blue-50 sticky top-0">
                        <tr>
                            <th>#</th>
                            <th>Policy Name</th>
                            <th>Claimed By</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-gray-500">Loading claims...</td>
                            </tr>
                        ) : claims.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-gray-500">No claims available for review.</td>
                            </tr>
                        ) : (
                            claims.map((claim, index) => (
                                <motion.tr
                                    key={claim._id}
                                    whileHover={{ scale: 1.01, backgroundColor: "#f9fafb" }}
                                    transition={{ duration: 0.2 }}
                                    className="border-b"
                                >
                                    <td className="py-3">{(currentPage - 1) * limit + index + 1}</td>
                                    <td className="py-3">{claim.policyName}</td>
                                    <td className="py-3">{claim.email}</td>
                                    <td className="py-3">
                                        <span className={`badge text-xs font-bold
                                            ${claim.status === "Approved" ? "badge-success" :
                                                claim.status === "Rejected" ? "badge-error" :
                                                    "badge-warning"}`}>
                                            {claim.status}
                                        </span>
                                    </td>
                                    <td className="py-3">
                                        <div className="flex gap-1">
                                        <select
                                                className="select select-bordered select-sm w-full"
                                                value={claim.status}
                                                onChange={(e) => handleStatusChange(claim._id, e.target.value)}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Approved">Approved</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                            <button
                                                onClick={() => {
                                                    setSelectedClaim(claim);
                                                    document.getElementById("claim_modal").showModal();
                                                }}
                                                className="btn btn-sm btn-outline btn-primary flex items-center gap-1"
                                            >
                                                <FaEye /> View
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </motion.div>

            {/* Modal for claim details */}
            <dialog id="claim_modal" className="modal">
                <div className="modal-box max-w-md">
                    {selectedClaim && (
                        <>
                            <h3 className="font-bold text-lg mb-3 text-blue-800">Claim Details: {selectedClaim.policyName}</h3>
                            <div className="text-sm space-y-1">
                                <p><strong>Claimed By:</strong> {selectedClaim.email}</p>
                                <p><strong>Reason:</strong> {selectedClaim.reason}</p>
                                <p><strong>Status:</strong> {selectedClaim.status}</p>
                                {selectedClaim.document && (
                                    <img
                                        src={selectedClaim.document}
                                        alt="Claim Document"
                                        className="mt-3 rounded shadow max-h-64 w-full object-contain"
                                    />
                                )}
                            </div>
                            <div className="modal-action">
                                <form method="dialog" className="w-full">
                                    <button
                                        className="btn btn-outline w-full"
                                        onClick={() => {
                                            document.getElementById("claim_modal").close();
                                            setSelectedClaim(null);
                                        }}                                        
                                    >
                                        Close
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default PolicyClearance;
