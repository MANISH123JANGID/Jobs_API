const job= require('../models/Job')
const CustomAPIerror= require('../errors/custom-api')
const {CustomAPIError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError}= require('../errors/index')
const getAlljobs= async(req,res)=>{
   const allJobs=await job.find({createdBy: req.user.userID})
   if(!allJobs){
       throw new BadRequestError('Please make a valid request')
   }
   res.status(200).json({message:"All jobs are here",allJobs, count: allJobs.length})
}
const getAjob= async(req,res)=>{
    const id = req.params.id
    const onejob= await job.find({_id:id});
    if(!onejob){
        return res.status(404).json({message:"Job not found!"})
    }
    res.status(200).json({message:"Here is the job",onejob})
}
const updateJob= async(req,res)=>{
    const {
        body:{company,position},
        user:{userID},
        params:{id:jobID}
    }= req
    if(!company || !position){
        throw new BadRequestError('Please provide the credentials for updation'); 
    }
    const updateJob= await job.findByIdAndUpdate({_id:jobID},req.body,{new:true,runValidators:true})
    if (!updateJob){
        return res.status(404).json({message:"job not found!"})
    }
    res.status(200).json({
        message:"Job updated successfully",
        updated: updateJob
    })
}
const deleteJob= async(req,res)=>{
    const id= req.params.id
    console.log(id)
    const deleted=await job.deleteOne({_id:id})
    if(!deleted){
       return res.status(404).json({message:"Job not found!"})
    }
    res.status(200).json({message:"Job deleted successfully"})
}
const createJob= async(req,res)=>{
    const {company, position, status}= req.body
    const createdBy= req.user.userID
    const newJob= new job({company, position, status,createdBy})
    const isNewjobcreated=await newJob.save();
    if(!isNewjobcreated){
        return res.status(400).json({message:'error in creating new job'})
    }
    res.status(201).json({message:"New Job Created successfully", isNewjobcreated})
}

module.exports={
    getAlljobs,
    getAjob,
    updateJob,
    deleteJob,
    createJob
}

