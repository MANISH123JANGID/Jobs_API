const mongoose = require('mongoose')
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'NAME IS REQUIRED'],
        minLength:2
    },
    email: {
        type:String,
        required:[true,'EMAIL IS REQUIRED'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Please Provide valid email'
        ],
        unique:true
    },
    password: {
        // they all are validators
        type:String,
        required:[true,'PASSWORD IS REQUIRED'],
    }
},{
    timestamp:true
})
userSchema.pre('save',async function(next){
    const salt= await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password,salt)
    next()
})
// THE METHODS ARE ATTACHED WITH THE SCHEMA AND NOT THE 
userSchema.methods.createJWT= function () {
    return jwt.sign({id:this._id,name:this.name},process.env.JWT,{expiresIn:"5h"})
}
userSchema.methods.checkPassword=async function(userPassword){
    const isMatch= bcrypt.compare(userPassword,this.password)
    return isMatch
}

module.exports= mongoose.model('User',userSchema)
