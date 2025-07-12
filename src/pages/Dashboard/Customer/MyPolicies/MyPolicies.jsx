import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { FaDownload, FaEye, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";
import { useForm } from "react-hook-form";
import Pagination from "../../../../components/shared/Pagination/Pagination";
import useAuth from "../../../../hooks/useAuth/useAuth";
import logo from "../../../../assets/logo.png";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";

const MyPolicies = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const { register, handleSubmit, reset, setValue, watch } = useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    const { data: policies = [], isLoading } = useQuery({
        queryKey: ["myPolicies", currentPage, user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`applications?page=${currentPage}&limit=${limit}&email=${user?.email}`);
            setTotalPages(res.data.totalPages);
            return res.data.applications;
        },
        keepPreviousData: true,
        enabled: !!user?.email,
    });

    const submitReview = useMutation({
        mutationFn: async (reviewData) => {
            const res = await axiosSecure.post("reviews", reviewData);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Success!", "Review submitted successfully.", "success");
            queryClient.invalidateQueries(["myPolicies"]);
            reset();
            document.getElementById("review_modal").close();
        },
        onError: () => {
            Swal.fire("Error!", "Failed to submit review.", "error");
        },
    });

    const handleReviewSubmit = (data) => {
        const reviewData = {
            policyId: selectedPolicy._id,
            userImage: selectedPolicy.photoURL,
            rating: data.rating,
            feedback: data.feedback,
            createdAt: new Date().toISOString(),
        };
        console.log(reviewData)
        submitReview.mutate(reviewData);
    };

    const handleStarClick = (value) => {
        setValue("rating", value);
    };

    const currentRating = watch("rating");

    const downloadPDF = (policy) => {
        const doc = new jsPDF();
        const logoImg = new Image();
        logoImg.src = logo;

        logoImg.onload = () => {
            doc.addImage(logoImg, "PNG", 85, 10, 40, 40);
            doc.setFontSize(20);
            doc.setTextColor("#1E3A8A");
            doc.setFont("helvetica", "bold");
            doc.text("ThriveSecure Life Insurance", 105, 60, { align: "center" });

            doc.setFontSize(16);
            doc.setFont("times new roman", "bold");
            doc.setTextColor("#111827");
            doc.text("Policy Certificate", 105, 72, { align: "center" });

            doc.setDrawColor(200);
            doc.line(20, 78, 190, 78);

            const details = [
                [`Policy Title:`, policy.policyDetails.title],
                [`Policyholder Name:`, policy.applicantName],
                [`Email:`, policy.email],
                [`Nominee Name:`, policy.nomineeName],
                [`Nominee Email:`, policy.nomineeEmail],
                [`Coverage:`, policy.policyDetails.coverageRange],
                [`Duration:`, policy.policyDetails.durationOptions],
                [`Premium:`, `$${policy.policyDetails.basePremiumRate}/month`],
                [`Status:`, policy.status],
                [`Issued On:`, new Date(policy.createdAt).toLocaleDateString()],
            ];

            let y = 90;
            doc.setFontSize(12);
            doc.setTextColor("#000");
            details.forEach(([label, value]) => {
                doc.text(`${label}`, 30, y);
                doc.text(`${value}`, 90, y);
                y += 10;
            });

            doc.setDrawColor(200);
            doc.line(20, 270, 190, 270);
            doc.setFontSize(10);
            doc.setTextColor("#6B7280");
            doc.text("Thank you for choosing ThriveSecure Life Insurance.", 105, 280, { align: "center" });

            doc.save(`${policy.policyDetails.title}_policy.pdf`);
        };
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl w-full bg-white shadow-lg rounded-2xl overflow-x-auto p-6"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">My Policies</h2>

                <table className="table w-full">
                    <thead className="bg-blue-50 sticky top-0">
                        <tr>
                            <th>Title</th>
                            <th>Coverage</th>
                            <th>Duration</th>
                            <th>Premium</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan="6" className="text-center py-10 text-gray-500">Loading policies...</td></tr>
                        ) : policies.length === 0 ? (
                            <tr><td colSpan="6" className="text-center py-10 text-gray-500">No policies found.</td></tr>
                        ) : (
                            policies.map((policy) => (
                                <motion.tr key={policy._id} whileHover={{ scale: 1.01, backgroundColor: "#f9fafb" }} transition={{ duration: 0.2 }} className="border-b">
                                    <td className="py-3 text-sm">{policy.policyDetails.title}</td>
                                    <td className="py-3 text-sm">{policy.policyDetails.coverageRange}</td>
                                    <td className="py-3 text-sm">{policy.policyDetails.durationOptions}</td>
                                    <td className="py-3 text-sm">${policy.policyDetails.basePremiumRate}</td>
                                    <td>
                                        <span className={`badge text-xs font-bold ${policy.status === "Pending" && "badge-warning"} ${policy.status === "Approved" && "badge-success"} ${policy.status === "Rejected" && "badge-error text-white"}`}>
                                            {policy.status}
                                        </span>
                                    </td>
                                    <td className="flex flex-wrap gap-2 py-2">
                                        <button onClick={() => setSelectedPolicy(policy) || document.getElementById("view_modal").showModal()} className="btn btn-sm btn-outline btn-primary flex items-center gap-1 tooltip" data-tip="View Details">
                                            <FaEye /> View
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (policy.paymentStatus === "Paid") {
                                                    setSelectedPolicy(policy);
                                                    document.getElementById("review_modal").showModal();
                                                }
                                            }}
                                            disabled={policy.paymentStatus !== "Paid"}
                                            className={`btn btn-sm flex items-center gap-1 tooltip ${policy.paymentStatus === "Paid"
                                                ? "btn-outline btn-accent"
                                                : "btn-disabled cursor-not-allowed"
                                                }`}
                                            data-tip="Give Review"
                                        >
                                            <FaStar /> Review
                                        </button>

                                        <button
                                            onClick={() => {
                                                if (policy.paymentStatus === "Paid") {
                                                    downloadPDF(policy);
                                                }
                                            }}
                                            disabled={policy.paymentStatus !== "Paid"}
                                            className={`btn btn-sm flex items-center gap-1 tooltip ${policy.paymentStatus === "Paid"
                                                ? "btn-success"
                                                : "btn-disabled cursor-not-allowed"
                                                }`}
                                            data-tip="Download Policy"
                                        >
                                            <FaDownload /> Download
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>

                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
            </motion.div>

            {/* Review Modal */}
            <dialog id="review_modal" className="modal">
                <div className="modal-box max-w-md">
                    <h3 className="font-bold text-lg mb-4 text-blue-800">
                        Submit Review for {selectedPolicy?.policyDetails?.title}
                    </h3>
                    <form onSubmit={handleSubmit(handleReviewSubmit)} className="space-y-3">
                        <div>
                            <label className="block mb-1 font-medium">Rating</label>
                            <div className="flex gap-2 text-5xl">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        onClick={() => handleStarClick(star)}
                                        className={`cursor-pointer transition transform hover:scale-125 ${currentRating >= star ? "text-yellow-500" : "text-gray-300"}`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <input type="hidden" {...register("rating", { required: true })} />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Feedback</label>
                            <textarea {...register("feedback", { required: true })} className="textarea textarea-bordered w-full" placeholder="Write your experience..."></textarea>
                        </div>
                        <div className="modal-action flex flex-col gap-2">
                            <button type="submit" className="btn bg-blue-700 text-white hover:bg-blue-800 w-full">Submit Review</button>
                            <button
                                type="button"
                                className="btn btn-outline w-full"
                                onClick={() => document.getElementById("review_modal").close()}
                            >
                                Cancel
                            </button>
                        </div>

                    </form>
                </div>
            </dialog>

            {/* View Details Modal */}
            <dialog id="view_modal" className="modal">
                <div className="modal-box max-w-md">
                    <h3 className="font-bold text-lg mb-4 text-blue-800">
                        Policy Details: {selectedPolicy?.policyDetails?.title}
                    </h3>
                    <div className="space-y-2 text-sm">
                        <p><strong>Coverage:</strong> ${selectedPolicy?.policyDetails?.coverageRange}</p>
                        <p><strong>Duration:</strong> {selectedPolicy?.policyDetails?.durationOptions}</p>
                        <p><strong>Premium:</strong> ${selectedPolicy?.policyDetails?.basePremiumRate}/month</p>
                        <p><strong>Status:</strong> {selectedPolicy?.status}</p>
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

export default MyPolicies;