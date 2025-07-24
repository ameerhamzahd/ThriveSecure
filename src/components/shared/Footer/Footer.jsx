import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from "../../../assets/logo.png"
import useAuth from '../../../hooks/useAuth/useAuth';

const Footer = () => {

    const { user } = useAuth();

    const navLinkStyle = ({ isActive }) =>
        `hover:transition-all hover:duration-300 hover:font-bold ${isActive ? 'font-bold' : ''
        }`;

    const services = <>
        <li><NavLink to="/" className={navLinkStyle}>Home</NavLink></li>
        <li><NavLink to="/all-policies" className={navLinkStyle}>All Policies</NavLink></li>
        <li><NavLink to="/articles" className={navLinkStyle}>Articles</NavLink></li>
    </>;

    const articles = <>
        <li><NavLink to="/about-us" className={navLinkStyle}>About Us</NavLink></li>
        <li><NavLink to="/contact-us" className={navLinkStyle}>Contact Us</NavLink></li>
        <li><NavLink to="/faq" className={navLinkStyle}>FAQs</NavLink></li>
    </>;

    const legal = <>
        <li><NavLink to="/terms-of-services" className={navLinkStyle}>Terms of Service</NavLink></li>
        <li><NavLink to="/privacy-policy" className={navLinkStyle}>Privacy Policy</NavLink></li>
        <li><NavLink to="/cookie-policy" className={navLinkStyle}>Cookie Policy</NavLink></li>
    </>;

    return (
        <footer className="footer lg:footer-horizontal bg-gradient-to-br from-teal-200 via-teal-100 to-teal-50 backdrop-blur-lg text-base-content p-10 max-w-11/12 mx-auto mb-5 rounded-3xl mt-15 lg:mt-20">
            <aside>
                <Link to="/" className="text-xl font-bold flex items-center gap-2">
                    <img className="w-10 h-10" src={logo} alt="Logo" />ThriveSecure
                </Link>
                <p className='w-2/3'>Empowering secure futures with trusted agency since 2023</p>
            </aside>
            <nav>
                <h6 className="footer-title">Services</h6>
                <ul className='flex flex-col gap-2'>
                    {services}
                </ul>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <ul className='flex flex-col gap-2'>
                    {articles}
                </ul>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <ul className='flex flex-col gap-2'>
                    {legal}
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;