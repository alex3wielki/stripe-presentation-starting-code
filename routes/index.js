var express = require('express');
var router = express.Router();
/* GET home page. */
router.route('/')
// https://youtu.be/aZVZ5Z-ZcXs
    .get((req, res, next) => res.render('index', {title: 'Subscribe Us Now!'}))
    .post((req, res, next) => {
        // Grab the amount from the view and pass it on. Render total.
        var amount = req.body.amount;
        res.render('total', {
            title: 'Payment summary',
            message: 'Provide us with your detail to finish the transaction',
            amount: amount
        })
    });

// https://stripe.com/docs/api/node#create_charge
router.route('/pay')
    .post((req, res, next) => {
        var stripe = require('stripe')('sk_test_kI2oma4RiPDYCH8WeZSoRIlN');
        // key = "sk_test_BQokikJOvBiI2HlWgH4olfQ2"
        // Create a new chargeS, put in the amount, currency, source: 'tok_visa', description.
        // Console.log the responses, redirect to history and if error => render error
        stripe.charges.create({
            amount: req.body.amount,
            currency: 'cad',
            source: 'tok_visa',
            description: 'You paid for our subscription',
        }).then(charge => {
            console.log(charge);
            res.render('paid', {title: 'Thank you for your payment'});
        }).catch(e => console.log(e));
    });

// https://stripe.com/docs/api/node#list_charges
router.route('/history')
    .get((req, res, next) => {
        var stripe = require('stripe')('sk_test_kI2oma4RiPDYCH8WeZSoRIlN');
        // Create a stripe object with the key = "sk_test_BQokikJOvBiI2HlWgH4olfQ2"
        // List the chargeS, then console log them and the error. (then, catch)
        stripe.charges.list({limit: 3}).then(resp => console.log(resp)).catch(e => console.log(e));
        // Can limit.
    });
module.exports = router;