import React from 'react';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { motion } from "motion/react";
import quoteLottie from "../../assets/quote.json";
import Lottie from 'lottie-react';
import { Helmet } from 'react-helmet-async';

const Quote = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const calculatePremium = ({ age, gender, coverage, duration, smoker }) => {
        let base = 500; // base monthly

        const ageFactor = age > 25 ? (age - 25) * 0.01 : 0;
        const smokerFactor = smoker === 'yes' ? 0.2 : 0;
        const genderFactor = gender === 'male' ? 0.05 : 0;
        const coverageMultiplier = coverage / 100000;
        const durationFactor = duration * 0.005;

        const totalMultiplier = 1 + ageFactor + smokerFactor + genderFactor + durationFactor;
        const premium = base * coverageMultiplier * totalMultiplier;

        return Math.round(premium);
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
            <Helmet>
                <title>ThriveSecure | Quote</title>
            </Helmet>
            
            <div className="w-full max-w-11/12 grid lg:grid-cols-2 gap-10 justify-items-center">
                {/* QuoteEstimator Form */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg"
                >
                    <h1 className="text-2xl font-bold text-center mb-4">Get Your Free Life Insurance Quote</h1>
                    <p className="text-gray-600 text-center mb-6">Estimate your premium easily before applying</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Age</label>
                            <input
                                type="number"
                                placeholder="Enter your age (18-80)"
                                className="input input-bordered w-full"
                                {...register("age", { required: true, min: 18, max: 80 })}
                            />
                            {errors.age && <span className="text-red-500 text-sm">Please enter a valid age (18-80).</span>}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Gender</label>
                            <select
                                className="select select-bordered w-full"
                                defaultValue=""
                                {...register("gender", { required: true })}
                            >
                                <option value="" disabled>Select your gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Coverage Amount ($)</label>
                            <input
                                type="number"
                                placeholder="E.g., 50000, 75000, 100000"
                                className="input input-bordered w-full"
                                {...register("coverage", { required: true, min: 10000 })}
                            />
                            {errors.coverage && <span className="text-red-500 text-sm">Minimum coverage is $10,000.</span>}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Duration (Years)</label>
                            <input
                                type="number"
                                placeholder="Enter duration (5-50 years)"
                                className="input input-bordered w-full"
                                {...register("duration", { required: true, min: 5, max: 50 })}
                            />
                            {errors.duration && <span className="text-red-500 text-sm">Duration must be between 5-50 years.</span>}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Do you smoke?</label>
                            <select
                                className="select select-bordered w-full"
                                defaultValue=""
                                {...register("smoker", { required: true })}
                            >
                                <option value="" disabled>Select an option</option>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>
                        <button type="submit" className="btn bg-blue-800 text-white w-full hover:opacity-80">
                            Estimate Premium
                        </button>
                    </form>
                </motion.div>

                {/* Right: Lottie Animation */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="hidden lg:flex items-center justify-center"
                >
                    <Lottie style={{ width: "600px" }} animationData={quoteLottie} loop />
                </motion.div>
            </div>
        </div>
    );
};

export default Quote;
