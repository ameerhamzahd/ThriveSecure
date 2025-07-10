import React from 'react';
import useUserRole from '../../hooks/useUserRole/useUserRole';
import { Link, NavLink, Outlet } from 'react-router';
import {
    MdHome,
    MdPerson,
    MdAssignment,
    MdPayment,
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
import userAvatar from "../../assets/user.png"
import useAuth from '../../hooks/useAuth/useAuth';

const DashboardLayout = () => {
    const { user } = useAuth()
    const { role, isLoading } = useUserRole();

    const navLinkStyle = ({ isActive }) =>
        `hover:transition-all hover:duration-300 hover:bg-accent ${isActive ? 'text-blue-800 font-bold' : ''
        }`;

    const links = <>
        <li>
            <NavLink to="/" className={navLinkStyle}>
                <MdHome className="inline mr-2" /> Home
            </NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/profile" className={navLinkStyle}>
                <MdPerson className="inline mr-2" /> Profile
            </NavLink>
        </li>
        {/* customer links */}
        {!isLoading && role === "customer" && (
            <>
                <li>
                    <NavLink to="/dashboard/my-policies" className={navLinkStyle}>
                        <MdAssignment className="inline mr-2" /> My Policies
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/payment-status" className={navLinkStyle}>
                        <MdPayment className="inline mr-2" /> Payment History
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/claim-request" className={navLinkStyle}>
                        <MdRequestQuote className="inline mr-2" /> Claim Request Form
                    </NavLink>
                </li>
            </>
        )}

        {/* agent links */}
        {!isLoading && role === "agent" && (
            <>
                <li>
                    <NavLink to="/dashboard/assigned-customers" className={navLinkStyle}>
                        <MdGroup className="inline mr-2" /> Assigned Customers
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/manage-blogs" className={navLinkStyle}>
                        <MdEditNote className="inline mr-2" /> Manage Blogs
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/blog-posts" className={navLinkStyle}>
                        <MdArticle className="inline mr-2" /> Blog Posts
                    </NavLink>
                </li>
            </>
        )}

        {/* admin links */}
        {!isLoading && role === "admin" && (
            <>
                <li>
                    <NavLink to="/dashboard/manage-applications" className={navLinkStyle}>
                        <MdDescription className="inline mr-2" /> Manage Applications
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/manage-users" className={navLinkStyle}>
                        <MdPeople className="inline mr-2" /> Manage Users
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/manage-policies" className={navLinkStyle}>
                        <MdPolicy className="inline mr-2" /> Manage Policies
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/manage-transactions" className={navLinkStyle}>
                        <MdSwapHoriz className="inline mr-2" /> Manage Transactions
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/manage-agents" className={navLinkStyle}>
                        <MdSupervisorAccount className="inline mr-2" /> Manage Agents
                    </NavLink>
                </li>
            </>
        )}
    </>

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
                    <div className="mx-2 flex-1 px-2 text-lg font-bold">Dashboard</div>
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
                    <div className="flex items-center gap-2">
                        <Link to="/" className='flex items-center text-lg font-bold'>
                            <img className="w-10 h-10" src={logo} alt="Logo" />
                            ThriveSecure
                        </Link>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold bg-teal-100 text-blue-800 uppercase`}
                        >
                            {role}
                        </span>
                    </div>
                    {links}
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;