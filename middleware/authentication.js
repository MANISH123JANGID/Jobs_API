const User= require('../models/User')
const jwt= require('jsonwebtoken')
const auth= async (req, res,next)=>{
    const authHeader= req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401).json({message: 'Unauthorised to access this route'})
    }
    const token = authHeader.split(' ')[1]
    try{
        const payload = jwt.verify(token,process.env.JWT)
        console.log(payload)
        // one more way to attach user object to the request is following
        // const user = User.findById(payload.id).select(-password);
        // req.user= user
        req.user={userID: payload.id, name: payload.name}
        next()
    }catch(error){
        res.status(401).json({message:"Unauthorized to access this route"})
    }
}
module.exports= auth