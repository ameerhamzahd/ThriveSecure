import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    FaFilter, FaCalendarAlt, FaDollarSign, FaUser, FaFileInvoiceDollar
} from "react-icons/fa";
import { motion } from "motion/react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import Pagination from "../../../../components/shared/Pagination/Pagination";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import CountUp from "react-countup";

const ManageTransactions = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        user: "",
        policy: ""
    });
    const limit = 5;

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const { data: transactions = [], refetch, isLoading } = useQuery({
        queryKey: ["transactions", currentPage, filters],
        queryFn: async () => {
            const params = new URLSearchParams({
                page: currentPage,
                limit,
                ...(filters.startDate && { startDate: filters.startDate }),
                ...(filters.endDate && { endDate: filters.endDate }),
                ...(filters.user && { user: filters.user }),
                ...(filters.policy && { policy: filters.policy }),
            });
            const res = await axiosSecure.get(`/transactions?${params.toString()}`);
            setTotalPages(res.data.totalPages);
            return res.data.transactions;
        },
        keepPreviousData: true,
    });

    const { data: summary = {}, isLoading: isSummaryLoading } = useQuery({
        queryKey: ["transactions-summary"],
        queryFn: async () => {
            const res = await axiosSecure.get("/transactions/summary");
            return res.data;
        },
        staleTime: 5 * 60 * 1000 // cache for 5 minutes
    });

    const earningsData = transactions.map((txn) => ({
        date: new Date(txn.date).toLocaleDateString(),
        amount: txn.amount,
    }));

    return (
        <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl w-full bg-white shadow-lg rounded-2xl p-6 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Manage Transactions</h2>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-7xl">
                    {/* Total Income */}
                    <div className="relative rounded-2xl p-6 bg-gradient-to-tr from-blue-100 to-blue-50 shadow-lg border border-blue-200 hover:shadow-2xl transition-all duration-300">
                        <p className="text-blue-700 font-medium mb-1">Total Income</p>
                        <h2 className="text-3xl font-bold text-blue-900">
                            {isSummaryLoading ? "Loading..." : (
                                <>$
                                    <CountUp
                                        end={summary.totalIncome || 0}
                                        duration={1.5}
                                        separator=","
                                        decimals={2}
                                        decimal="."
                                    />
                                </>
                            )}
                        </h2>
                        <p className="text-xs text-blue-600 mt-1">From all policy sales</p>
                    </div>

                    {/* Successful Transactions */}
                    <div className="relative rounded-2xl p-6 bg-gradient-to-tr from-green-100 to-green-50 shadow-lg border border-green-200 hover:shadow-2xl transition-all duration-300">
                        <p className="text-green-700 font-medium mb-1">Successful Transactions</p>
                        <h2 className="text-3xl font-bold text-green-900">
                            {isSummaryLoading ? "Loading..." : (
                                <CountUp
                                    end={summary.successRate || 0}
                                    duration={1.5}
                                    suffix="%"
                                />
                            )}
                        </h2>
                        <p className="text-xs text-green-600 mt-1">Last 30 days</p>
                    </div>

                    {/* Failed Transactions */}
                    <div className="relative rounded-2xl p-6 bg-gradient-to-tr from-red-100 to-red-50 shadow-lg border border-red-200 hover:shadow-2xl transition-all duration-300">
                        <p className="text-red-700 font-medium mb-1">Failed Transactions</p>
                        <h2 className="text-3xl font-bold text-red-900">
                            {isSummaryLoading ? "Loading..." : (
                                <CountUp
                                    end={summary.failRate || 0}
                                    duration={1.5}
                                    suffix="%"
                                />
                            )}
                        </h2>
                        <p className="text-xs text-red-600 mt-1">Last 30 days</p>
                    </div>
                </div>

                {/* Earnings Graph */}
                <div className="mt-4 w-full h-96">
                    <h3 className="text-lg font-semibold mb-4 text-center text-blue-800">Total Earnings Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={earningsData}>
                            <CartesianGrid stroke="#e2e8f0" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Filter Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 mb-4">
                    <div className="flex flex-col">
                        <label className="text-sm mb-1 text-gray-700 flex items-center gap-1"><FaCalendarAlt /> Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={filters.startDate}
                            onChange={handleFilterChange}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm mb-1 text-gray-700 flex items-center gap-1"><FaCalendarAlt /> End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={filters.endDate}
                            onChange={handleFilterChange}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm mb-1 text-gray-700 flex items-center gap-1"><FaUser /> User Email</label>
                        <input
                            type="text"
                            name="user"
                            value={filters.user}
                            onChange={handleFilterChange}
                            className="input input-bordered w-full"
                            placeholder="Filter by User Email"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm mb-1 text-gray-700 flex items-center gap-1"><FaFileInvoiceDollar /> Policy Name</label>
                        <input
                            type="text"
                            name="policy"
                            value={filters.policy}
                            onChange={handleFilterChange}
                            className="input input-bordered w-full"
                            placeholder="Filter by Policy Name"
                        />
                    </div>
                </div>

                <button
                    onClick={() => {
                        setCurrentPage(1);
                        refetch();
                        Swal.fire("Filters Applied", "Transactions filtered successfully.", "success");
                    }}
                    className="btn btn-sm btn-accent mb-6 flex items-center gap-2 mx-auto"
                >
                    <FaFilter /> Apply Filters
                </button>

                {/* Transaction Table */}
                <table className="table w-full">
                    <thead className="bg-blue-50 sticky top-0">
                        <tr>
                            <th>Transaction ID</th>
                            <th>User Email</th>
                            <th>Policy Name</th>
                            <th>Paid Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500">Loading transactions...</td>
                            </tr>
                        ) : transactions.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500">No transactions found.</td>
                            </tr>
                        ) : (
                            transactions.map((txn) => (
                                <tr key={txn._id} className="border-b hover:bg-blue-50">
                                    <td className="text-xs break-all">{txn.transactionId}</td>
                                    <td className="text-sm">{txn.userEmail}</td>
                                    <td className="text-sm">{txn.policyName}</td>
                                    <td className="text-sm text-green-600 font-semibold flex items-center gap-1">
                                        <FaDollarSign />{txn.amount}
                                    </td>
                                    <td className="text-sm">{new Date(txn.date).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${txn.status === "Success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                            {txn.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </motion.div>
        </div>
    );
};

export default ManageTransactions;
