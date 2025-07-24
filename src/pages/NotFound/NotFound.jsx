import Lottie from 'lottie-react';
import React from 'react';
import errorLottie from "../../assets/Error 404 Page.json";
import { Link } from 'react-router';
import { IoChevronBackOutline } from "react-icons/io5";

const NotFound = () => {
    return (
        <div className='flex flex-col gap-3 justify-center items-center min-h-screen text-center lg:gap-6'>
            {/* Lottie Animation */}
            <div className="w-full lg:flex justify-center items-center"
            >
                <Lottie
                    style={{ maxWidth: "500px" }}
                    animationData={errorLottie}
                    loop
                />
            </div>

            <div className='space-y-3'>
                <h1 className='text-3xl font-extrabold text-blue-800 lg:text-5xl'>404 - Page Not Found</h1>
                <p className='font-medium'>Oops! The page you're looking for doesn't exist.</p>

                <Link to="/"><button className="rounded-full transition-all duration-300 btn btn-accent btn-outline"><IoChevronBackOutline size={20} />Go Back Home</button></Link>
            </div>
        </div>
    );
};

export default NotFound;