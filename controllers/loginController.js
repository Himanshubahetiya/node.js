const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const SECRET_KEY = 'Himanshu-secret-key-qjdndjnjksna';

const loginUser = async (req , res) => {
    const { email , password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            res.status(404).json({message: 'invalid email'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(404).json({message:'invalid password'});
        }       

        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({message: 'login in successfully', token});       

    }
    catch (error){
        res.status(500).json({message: error.message});
    }
}  

module.exports = {
    loginUser
}