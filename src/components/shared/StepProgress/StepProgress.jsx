import React from "react";
import { motion } from "motion/react";
import { FaCheck } from "react-icons/fa";

const steps = [
    { id: 1, label: "Quote" },
    { id: 2, label: "Application" },
    { id: 3, label: "Payment" },
];

const StepProgress = ({ currentStep }) => {
    return (
        <div className="flex items-center justify-center w-full max-w-2xl mx-auto pt-8">
            {steps.map((step, index) => {
                const isCompleted = step.id < currentStep;
                const isCurrent = step.id === currentStep;
                const isLast = index === steps.length - 1;

                return (
                    <div key={step.id} className="flex items-center">
                        {/* Step Circle and Label */}
                        <div className="flex flex-col items-center">
                            <div
                                className={`
                                    w-10 h-10 rounded-full flex items-center justify-center
                                    border-2 text-lg font-semibold
                                    ${isCompleted ? "bg-accent text-white border-accent shadow" :
                                        isCurrent ? "bg-blue-600 text-white border-blue-600 shadow" :
                                            "bg-white text-gray-400 border-gray-300"}
                                `}
                            >
                                {isCompleted ? <FaCheck className="text-base" /> : step.id}
                            </div>
                            <span className={`mt-2 text-sm font-medium ${isCurrent ? "text-blue-700" : "text-gray-600"}`}>
                                {step.label}
                            </span>
                        </div>

                        {/* Connector Line */}
                        {!isLast && (
                            <motion.div
                                className="h-1 bg-gray-300 mx-4"
                                initial={{ width: 0 }}
                                animate={{ width: 50 }}
                                transition={{ duration: 0.5 }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default StepProgress;
