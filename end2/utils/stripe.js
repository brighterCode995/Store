const Stripe = require('stripe');
const stripe = Stripe('your_test_secret_key'); // Replace with your Stripe test key

module.exports = stripe;
