const asyncHandler = require('express-async-handler')
const Users = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = asyncHandler(async(req, res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await Users.findOne({email});
    if(userAvailable){
        res.status(400)
        throw new Error("User already registered!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
        username,
        email,
        password: hashedPassword
    })
    console.log("User created successfully!");
    if(user){
       res.status(201).json({user_id: user._id, email: user.email});
    }
    else{
        res.status(400)
        throw new Error("User data is not valid");
    }
});

const loginUser = asyncHandler(async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandatory!");
    }
    const user = await Users.findOne({email});
    const valid = await bcrypt.compare(password, user.password);
    if(user && valid){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user._id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "20m"})
        res.status(200).json({accessToken})
    }else {
        res.status(401)
        throw new Error("Access Denied!");
    }
});

const currentUser = asyncHandler(async(req, res)=>{
    res.status(200).json(req.user);
})

module.exports = {registerUser, loginUser, currentUser}