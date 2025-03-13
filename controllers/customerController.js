
const Customer = require('../models/Customer');

const getcustomer = async (req , res) => {
    try{
        const customers = await Customer.find();
        res.status(200).json(customers);
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
}

const showCustomer = async (req , res) => {
    debugger;
    const { id } = req.params;
    try {
        const customer = await Customer.findById(id , req.body , {new:true})
        res.status(200).json(customer);
    }
    catch (error)
    {
        res.status(500).json({message: error.message});
    }
}

const createCustomer = async (req , res) => {
    const {name, email, phone_number} = req.body;

    if(!name || !email || !phone_number){
        return res.status(500).json({message: 'provide all datas'});
    }
    try{
        const customers = await Customer.create({ name, email, phone_number});
        res.status(201).json(customers);        
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
}

const updateCustomer = async (req , res) => {
    const { id } = req.params;

    try{    
        const customer = await Customer.findByIdAndUpdate(id , req.body, {new: true});
        if (!customer) {
            return res.status(404).json({message:"customer not found"});
        }
        res.status(200).json(customer);
    }
    catch (error){
        res.status(500).json({message:error.message});
    } 
}

module.exports ={ 
    getcustomer,
    showCustomer,
    createCustomer,
    updateCustomer
}