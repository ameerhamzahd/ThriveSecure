import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxios from "../../../../hooks/useAxios/useAxios";
import { motion } from "motion/react";
import { FaCreditCard, FaLock, FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth/useAuth";
import StepProgress from "../../../../components/shared/StepProgress/StepProgress";

const PaymentGatewayForm = ({ price, policyId, policyName }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxios();
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            // 1️⃣ Create Payment Intent
            const { data } = await axiosSecure.post("/api/payment/create-payment-intent", {
                amount: price * 100,
                currency: "usd",
            });

            const clientSecret = data.clientSecret;

            // 2️⃣ Confirm Payment
            const card = elements.getElement(CardElement);
            const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: user?.displayName || "Customer",
                        email: user?.email || "Not Provided",
                    },
                },
            });

            if (stripeError) {
                setError(stripeError.message);
            } else if (paymentIntent.status === "succeeded") {
                setSuccess("Payment successful! Thank you.");

                // 3️⃣ Update DB, confirm transaction, activate policy
                await axiosSecure.post("/api/payment/confirm-payment", {
                    paymentIntentId: paymentIntent.id,
                    amount: paymentIntent.amount,
                    currency: paymentIntent.currency,
                    userEmail: user?.email,
                    policyId: policyId,
                    status: "paid",
                });
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl border border-blue-100 space-y-5"
            >
                <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2 text-blue-800">
                    <FaCreditCard /> Secure Payment
                </h2>
                <p className="text-center text-gray-600 mb-4">
                    Complete your premium payment of <span className="font-semibold text-blue-700">${price}</span> to activate your policy.
                </p>

                {/* Policy Name (read-only) */}
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 p-3">
                    <FaShieldAlt className="text-blue-700" />
                    <input
                        type="text"
                        value={policyName}
                        readOnly
                        className="bg-transparent outline-none w-full text-gray-700 font-medium"
                    />
                </div>

                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                    <CardElement
                        className="p-2"
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#1f2937",
                                    "::placeholder": { color: "#9ca3af" },
                                },
                                invalid: { color: "#ef4444" },
                            },
                        }}
                    />
                </div>

                <motion.button
                    type="submit"
                    disabled={!stripe || loading}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2
                        ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-800 hover:bg-blue-700 text-white shadow hover:shadow-lg"}
                    `}
                >
                    {loading ? (
                        <>
                            <motion.div
                                className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"
                            />
                            Processing...
                        </>
                    ) : (
                        <>
                            <FaLock /> Pay ${price}
                        </>
                    )}
                </motion.button>

                {error && (
                    <motion.p
                        className="text-red-500 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {error}
                    </motion.p>
                )}
                {success && (
                    <motion.p
                        className="text-green-600 font-medium text-center flex items-center justify-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <FaCheckCircle /> {success}
                    </motion.p>
                )}

                <p className="text-xs text-center text-gray-400">Your payment is securely processed via Stripe.</p>
            </motion.form>

            <StepProgress currentStep={3} />
        </div>
    );
};

export default PaymentGatewayForm;
