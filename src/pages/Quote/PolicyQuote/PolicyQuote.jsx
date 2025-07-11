import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { motion } from "motion/react";
import Lottie from 'lottie-react';
import quoteLottie from "../../../assets/quote.json";
import StepProgress from '../../../components/shared/StepProgress/StepProgress';
import Loader from '../../../components/shared/Loader/Loader';
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios/useAxios";

const PolicyQuote = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    const { data: policy, isLoading, isError } = useQuery({
        queryKey: ["policy", id],
        queryFn: async () => {
            const res = await axiosInstance.get(`policies/${id}`);
            return res.data;
        },
    });

    const { register, handleSubmit, formState: { errors } } = useForm();

    const calculatePremium = ({ age, gender, coverage, duration, smoker }) => {
        let base = policy.basePremiumRate || 500; // base monthly

        // Age factor: increases 1% per year over 25
        const ageFactor = age > 25 ? (age - 25) * 0.01 : 0;

        // Smoker surcharge: 20% more
        const smokerFactor = smoker === 'yes' ? 0.2 : 0;

        // Gender factor: 5% more for male (if business logic requires)
        const genderFactor = gender === 'male' ? 0.05 : 0;

        // Coverage multiplier: premium increases proportionally to coverage amount
        const coverageMultiplier = coverage / 100000; // e.g., $100,000 => 1x, $200,000 => 2x

        // Duration multiplier: longer terms slightly increase premium (0.5% per year)
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

    if (isLoading) return <Loader />;
    if (isError) return <div className="min-h-screen flex justify-center items-center"><p className="text-red-600">Failed to load policy data.</p></div>;

    /** Extract min/max values safely */
    const [coverageMin, coverageMax] = policy.coverageRange
        ? policy.coverageRange.match(/\d+/g)?.map(Number) || [10000, 1000000]
        : [50000, 1000000];

    const [durationMin, durationMax] = policy.durationOptions
        ? policy.durationOptions.match(/\d+/g)?.map(Number) || [5, 50]
        : [5, 40];

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 pt-28">
            <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-10 justify-items-center">
                {/* QuoteEstimator Form */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg"
                >
                    <h1 className="text-2xl font-bold text-center mb-4">Get Your Free Quote for <p className='text-blue-800'>{policy.title}</p></h1>
                    <p className="text-gray-600 text-center mb-6">Estimate your premium easily before applying</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Age</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                {...register("age", { required: true, min: policy.minAge, max: policy.maxAge })}
                            />
                            {errors.age && <span className="text-red-500 text-sm">Valid age: {policy.minAge}-{policy.maxAge}.</span>}
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
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                {...register("coverage", { required: true, min: coverageMin, max: coverageMax })}
                                placeholder={`E.g., ${policy.coverageRange}`}
                            />
                            {errors.coverage && <span className="text-red-500 text-sm">Valid coverage: ${coverageMin.toLocaleString()} - ${coverageMax.toLocaleString()}.</span>}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Duration (Years)</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                {...register("duration", { required: true, min: durationMin, max: durationMax })}
                                placeholder={`E.g., ${policy.durationOptions}`}
                            />
                            {errors.duration && <span className="text-red-500 text-sm">Valid duration: {durationMin}-{durationMax} years.</span>}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Do you smoke?</label>
                            <select className="select select-bordered w-full" {...register("smoker", { required: true })}>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>
                        <button type="submit" className="btn bg-blue-800 text-white w-full hover:opacity-90">Estimate Premium</button>
                        <button type="button" onClick={() => navigate(`/application/${policy._id}`)} className="btn btn-outline btn-accent w-full mt-2">Apply for Policy</button>

                        <StepProgress currentStep={1} />
                    </form>
                </motion.div>

                {/* Lottie Animation */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="hidden lg:flex items-center justify-center"
                >
                    <Lottie style={{ width: "400px" }} animationData={quoteLottie} loop />
                </motion.div>
            </div>
        </div>
    );
};

export default PolicyQuote;
