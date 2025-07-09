import React from 'react';
import useUserRole from '../../hooks/useUserRole/useUserRole';
import { Link, NavLink, Outlet } from 'react-router';
import {
    MdHome,
    MdPerson,
    MdAssignment,
    MdPayment,
    MdAttachMoney,
    MdRequestQuote,
    MdGroup,
    MdEditNote,
    MdArticle,
    MdDescription,
    MdPeople,
    MdPolicy,
    MdSwapHoriz,
    MdSupervisorAccount
} from "react-icons/md";
import logo from "../../assets/logo.png"

const DashboardLayout = () => {
    const { role, isLoading } = useUserRole();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <div className="navbar bg-base-300 w-full  lg:hidden">
                    <div className="flex-none lg:hidden">
                        <label
                            htmlFor="my-drawer-2"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 text-xl font-bold">Dashboard</div>
                </div>
                {/* Page content here */}
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <Link to="/" className="text-xl font-bold flex items-center gap-2">
                        <img className="w-10 h-10" src={logo} alt="Logo" />
                        ThriveSecure
                    </Link>
                    <li>
                        <NavLink to="/">
                            <MdHome className="inline mr-2" /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/profile">
                            <MdPerson className="inline mr-2" /> Profile
                        </NavLink>
                    </li>
                    {/* customer links */}
                    {!isLoading && role === "customer" && (
                        <>
                            <li>
                                <NavLink to="/dashboard/my-policies">
                                    <MdAssignment className="inline mr-2" /> My Policies
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/payment-status">
                                    <MdPayment className="inline mr-2" /> Payment Status
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/payments">
                                    <MdAttachMoney className="inline mr-2" /> Payments
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/claim-request">
                                    <MdRequestQuote className="inline mr-2" /> Claim Request Form
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* agent links */}
                    {!isLoading && role === "agent" && (
                        <>
                            <li>
                                <NavLink to="/dashboard/assigned-customers">
                                    <MdGroup className="inline mr-2" /> Assigned Customers
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-blogs">
                                    <MdEditNote className="inline mr-2" /> Manage Blogs
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/blog-posts">
                                    <MdArticle className="inline mr-2" /> Blog Posts
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* admin links */}
                    {!isLoading && role === "admin" && (
                        <>
                            <li>
                                <NavLink to="/dashboard/manage-applications">
                                    <MdDescription className="inline mr-2" /> Manage Applications
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-blogs">
                                    <MdEditNote className="inline mr-2" /> Manage Blogs
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-users">
                                    <MdPeople className="inline mr-2" /> Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-policies">
                                    <MdPolicy className="inline mr-2" /> Manage Policies
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-transactions">
                                    <MdSwapHoriz className="inline mr-2" /> Manage Transactions
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-agents">
                                    <MdSupervisorAccount className="inline mr-2" /> Manage Agents
                                </NavLink>
                            </li>
                        </>
                    )}

                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;