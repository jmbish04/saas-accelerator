"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutSession = void 0;
const stripe_1 = require("../lib/stripe");
const PLANS = {
    basic: {
        id: process.env.STRIPE_BASIC_PRICE_ID,
        unit_amount: 999,
    },
    pro: {
        id: process.env.STRIPE_PRO_PRICE_ID,
        unit_amount: 2999,
    },
    enterprise: {
        id: process.env.STRIPE_ENTERPRISE_PRICE_ID,
        unit_amount: 9999,
    },
};
const createCheckoutSession = async (userId, planId, successUrl, cancelUrl) => {
    return stripe_1.stripe.checkout.sessions.create({
        customer_email: user.email,
        payment_method_types: ["card"],
        line_items: [{
                price: PLANS[planId].id,
                quantity: 1,
            }],
        mode: "subscription",
        success_url: successUrl,
        cancel_url: cancelUrl,
        client_reference_id: userId,
        subscription_data: {
            metadata: { userId },
        },
    });
};
exports.createCheckoutSession = createCheckoutSession;
