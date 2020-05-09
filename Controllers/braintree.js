const User = require("../Models/UserModel");
const braintree = require("braintree");
require("dotenv").config();

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

exports.generateToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonce = req.body.paymentMethodNonce;
  let amount = req.body.amount;

  let transaction = gateway.transaction.sale({
    amount:amount,
    paymentMethodNonce:nonce,
    options:{
      submitForSettlement:true
    }
  }, (error, result) => {
    if(error){
      res.status(500).json(error);
    }else{
      res.json(result);
    }
  })
}