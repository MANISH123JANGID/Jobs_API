const User= require('../models/User')
const mongoose=require('mongoose');
const bcrypt= require('bcryptjs')
const jwt =require('jsonwebtoken')
const login= async (req, res) =>{
    const{email,password}=req.body
    console.log(req.body)
    if(!email || !password){
        res.status(400).json({message:"Please provide email and password"})
    }
    const user=await User.findOne({email})
    if(!user){
        res.status(404).json({message:"USER NOT FOUND!"})
    }
    const isPasswordCorrect= await user.checkPassword(password)
    if(!isPasswordCorrect){
        res.status(401).json({message:"PASSWORD IS NOT CORRECT"})
    }
    const token = user.createJWT();
    res.status(200).json({message:"logged in succesfully", token})
}
const register= async (req,res) => {
   const user = await User.create({...req.body})
    // to cerate a token we use a method called sign and qwe pASS three arguments to the method call
    // first we pass the id and the username using {id:user._id, name: user.name} 
    // second we pass tje secret key to sign the token 
    // third we pass the options for the token 
    const token=user.createJWT()
    console.log(token)
    res.status(201).json({message:"user created succesfully",token})
}

module.exports={login,register}
