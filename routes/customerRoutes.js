const express = require('express');
const { getcustomer, showCustomer, createCustomer, updateCustomer } = require('../controllers/customerController');

const router = express.Router();
router.get('/', getcustomer);
router.get('/:id', showCustomer);
router.post('/',createCustomer);
router.put('/:id', updateCustomer);

module.exports = router;
