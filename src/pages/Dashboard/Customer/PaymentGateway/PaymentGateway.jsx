import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentGatewayForm from "./PaymentGatewayForm/PaymentGatewayForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentGateway = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <PaymentGatewayForm></PaymentGatewayForm>
            </Elements>
        </div>
    );
};

export default PaymentGateway;

