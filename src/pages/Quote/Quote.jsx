import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { motion } from "motion/react";
import quoteLottie from "../../assets/quote.json";
import Lottie from 'lottie-react';

const Quote = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const calculatePremium = ({ age, gender, coverage, duration, smoker }) => {
        let base = 500;
        base += age * 5;
        base += coverage / 10000 * 20;
        base += duration * 10;
        base += smoker === 'yes' ? 200 : 0;
        base += gender === 'male' ? 50 : 0;
        return Math.round(base); // returns monthly premium
    };

    const formatCurrency = (amount) => `$${amount.toLocaleString()}`;

    const onSubmit = (data) => {
        const monthly = calculatePremium({
            age: parseInt(data.age),
            gender: data.gender,
            coverage: parseInt(data.coverage),
            duration: parseInt(data.duration),
            smoker: data.smoker
        });

        const weekly = Math.round(monthly / 4);
        const yearly = Math.round(monthly * 12);

        Swal.fire({
            title: "Estimated Premiums",
            html: `
                <div class="text-lg">
                    <p><strong>Weekly:</strong> ${formatCurrency(weekly)}/week</p>
                    <p><strong>Monthly:</strong> ${formatCurrency(monthly)}/month</p>
                    <p><strong>Yearly:</strong> ${formatCurrency(yearly)}/year</p>
                </div>
                <p class="text-sm text-gray-500 mt-2">* Estimates may vary depending on additional factors during application.</p>
            `,
            icon: "info",
            confirmButtonText: "OK",
            confirmButtonColor: "#1e40af",
            background: "#ffffff"
        });
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 pt-28">
            <div className="w-full max-w-11/12 grid lg:grid-cols-2 gap-10 justify-items-center">

                {/* QuoteEstimator Form */}
                <div className="bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-lg"
                >
                    <h1 className="text-2xl font-bold text-center mb-4">Get Your Free Life Insurance Quote</h1>
                    <p className="text-gray-600 text-center mb-6">Estimate your premium easily before applying</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Age</label>
                            <input type="number" className="input input-bordered w-full" {...register("age", { required: true, min: 18, max: 80 })} />
                            {errors.age && <span className="text-red-500 text-sm">Please enter a valid age (18-80).</span>}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Gender</label>
                            <select className="select select-bordered w-full" {...register("gender", { required: true })}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Coverage Amount ($)</label>
                            <input type="number" className="input input-bordered w-full" {...register("coverage", { required: true, min: 50000 })} />
                            {errors.coverage && <span className="text-red-500 text-sm">Minimum coverage is $50,000.</span>}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Duration (Years)</label>
                            <input type="number" className="input input-bordered w-full" {...register("duration", { required: true, min: 5, max: 40 })} />
                            {errors.duration && <span className="text-red-500 text-sm">Duration must be between 5-40 years.</span>}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Do you smoke?</label>
                            <select className="select select-bordered w-full" {...register("smoker", { required: true })}>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>
                        <button type="submit" className="btn bg-blue-800 text-white w-full hover:opacity-80">Estimate Premium</button>
                        <button type="button" onClick={() => navigate('/application')} className="btn btn-outline btn-accent w-full mt-2">Apply for Policy</button>
                    </form>
                </div>

                {/* Lottie Animation */}
                <div className="hidden w-full lg:flex justify-center items-center"
                >
                    <Lottie
                        style={{ width: "600px" }}
                        animationData={quoteLottie}
                        loop
                    />
                </div>
            </div>
        </div>
    );
};

export default Quote;
