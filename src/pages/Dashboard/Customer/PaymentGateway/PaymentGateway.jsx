import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentGatewayForm from "./PaymentGatewayForm/PaymentGatewayForm";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentGateway = () => {
    return (
        <div>
            <Helmet>
                <title>Dashboard | Payment Gateway</title>
            </Helmet>

            <Elements stripe={stripePromise}>
                <PaymentGatewayForm></PaymentGatewayForm>
            </Elements>
        </div>
    );
};

export default PaymentGateway;

