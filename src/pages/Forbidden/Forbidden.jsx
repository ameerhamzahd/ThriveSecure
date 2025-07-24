import Lottie from 'lottie-react';
import React from 'react';
import forbiddenLottie from "../../assets/forbidden403.json";
import { Link } from 'react-router';
import { IoChevronBackOutline } from "react-icons/io5";
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
    return (
        <div className='flex flex-col gap-3 justify-center items-center min-h-screen text-center lg:gap-6'>
            <Helmet>
                <title>ThriveSecure | Forbidden</title>
            </Helmet>
            
            {/* Lottie Animation */}
            <div className="w-full flex justify-center items-center"
            >
                <Lottie
                    style={{ maxWidth: "500px" }}
                    animationData={forbiddenLottie}
                    loop
                />
            </div>

            <div className='space-y-3'>
                <h1 className='text-3xl font-extrabold text-blue-800 lg:text-5xl'>401 - Forbidden</h1>
                <p className='font-medium'>Sorry, you don't have permission to access this page.</p>

                <Link to="/"><button className="rounded-full transition-all duration-300 btn btn-accent btn-outline"><IoChevronBackOutline size={20} />Go Back Home</button></Link>
            </div>
        </div>
    );
};

export default NotFound;