import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import quoteLottie from "../../assets/quote.json"
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
        return base;
    };

    const onSubmit = (data) => {
        const premium = calculatePremium({
            age: parseInt(data.age),
            gender: data.gender,
            coverage: parseInt(data.coverage),
            duration: parseInt(data.duration),
            smoker: data.smoker
        });
        toast.info(`Estimated Premium: ৳${premium}/month`, { position: "top-center" });
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 pt-30">
            <div className="w-full max-w-11/12 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 justify-items-center">
                {/* Left: QuoteEstimator Form */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
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
                            <label className="block mb-1 font-medium">Coverage Amount (৳)</label>
                            <input type="number" className="input input-bordered w-full" {...register("coverage", { required: true, min: 50000 })} />
                            {errors.coverage && <span className="text-red-500 text-sm">Minimum coverage is ৳50,000.</span>}
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
                        <button type="submit" className="btn bg-blue-800 text-white w-full hover:bg-blue-700">Estimate Premium</button>
                        <button type="button" onClick={() => navigate('/apply-policy')} className="btn btn-outline btn-accent w-full mt-2">Apply for Policy</button>
                    </form>
                </motion.div>

                {/* Right: Lottie Animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full flex justify-center items-center"
                >
                    <Lottie
                        style={{ width: "600px" }}
                        animationData={quoteLottie}
                        loop
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default Quote;