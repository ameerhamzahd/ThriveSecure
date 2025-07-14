import React from 'react';
import useAuth from '../../../hooks/useAuth/useAuth'
import { toast, Bounce } from 'react-toastify';
import { Link, NavLink } from 'react-router';
import logo from '../../../assets/logo.png'
import { TbLogin2, TbLogout2 } from 'react-icons/tb';
import userAvatar from '../../../assets/user.png'

const Navbar = () => {

    const { user, logoutUser } = useAuth();

    const navLinkStyle = ({ isActive }) =>
        `hover:transition-all hover:duration-300 hover:text-accent font-bold ${isActive ? 'text-accent' : ''
        }`;

    const links = <>
        <li><NavLink to="/" className={navLinkStyle}>Home</NavLink></li>
        <li><NavLink to="/all-policies" className={navLinkStyle}>All Policies</NavLink></li>
        <li><NavLink to="/articles" className={navLinkStyle}>Articles</NavLink></li>
        <li><NavLink to="/faqs" className={navLinkStyle}>FAQs</NavLink></li>
        {
            user && <li><NavLink to="/dashboard" className={navLinkStyle}>Dashboard</NavLink></li>
        }
    </>;

    const handleLogout = () => {
        logoutUser()
            .then(() => {
                toast.error(`Logged Out Successfully.`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })
            .catch((error) => {
                alert(error.message)
            });
    };

    return (
        <div>
            <div>
                <div className='flex fixed top-0 z-50 justify-center w-full'>
                    <nav className="navbar max-w-11/12 mx-auto bg-white rounded-full my-5 shadow-sm px-4">
                        <div className="navbar-start">
                            <div className="dropdown relative">
                                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                    </svg>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-white rounded-box w-52 space-y-1">
                                    {links}
                                </ul>
                            </div>

                            <Link to="/" className="text-xl font-bold flex items-center gap-2">
                                <img className="w-10 h-10" src={logo} alt="Logo" />
                                <p className='hidden md:flex'>ThriveSecure</p>
                            </Link>
                        </div>

                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu-horizontal px-1 gap-5">
                                {links}
                            </ul>
                        </div>

                        <div className="navbar-end">
                            {
                                user ? (<>
                                    {/* {
                                    <input type="checkbox"
                                        onChange={handleToggleTheme}
                                        checked={theme === "dark"}
                                        className="toggle theme-controller" />
                                } */}

                                    <div className="relative px-2">
                                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                            <div className="w-10 rounded-full ring ring-blue-800 ring-offset-base-100 ring-offset-2">
                                                <Link to="/dashboard/profile">
                                                <img src={user?.photoURL || userAvatar} alt="User Avatar" />
                                                </Link>
                                            </div>
                                        </label>
                                    </div>
                                    <div className='gap-3 justify-center items-center px-2 md:flex'>
                                        <Link onClick={handleLogout} className="flex gap-2 items-center px-6 bg-transparent btn hover:border-blue-800">
                                        <TbLogout2 size={20} />Logout
                                        </Link>
                                    </div>
                                </>
                                ) : (
                                    <div className='flex justify-center items-center'>
                                        {/* {
                                        <input type="checkbox"
                                            onChange={handleToggleTheme}
                                            checked={theme === "dark"}
                                            className="toggle theme-controller" />
                                    } */}

                                        <div className='gap-3 justify-center items-center px-2 md:flex'>
                                            <Link to="/login" className="flex gap-2 items-center px-6 bg-transparent btn hover:border-blue-800">
                                                <TbLogin2 size={20} /> Login
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Navbar;