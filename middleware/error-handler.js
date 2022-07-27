const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  /* I am creating a object customerror to handle the error of mongoose such as 
  validation error or the errors like the duplicate(mail) errors etc */
  // there are three types of errors in mongoose 1.Validation means that some field has been left blank 2.Duplicate error means that the field value is already present in the data and has a unique index 3. Casterror means the error which has come up because the object id that is passed in the params is not present in the database 
  let customerror={
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong Please Try again later!"
  } 
  if(err.code && err.code==11000){
    customerror.statusCode=400
    customerror.message='The email entered is already registered with us!'
  }
  if(err.name== 'ValidationError'){
    console.log(Object.values(err.errors))
    customerror.message= Object.values(err.errors).map((item)=>item.type).join(',')
    statusCode = 400
  }
  if(err.name== 'CastError'){
    customerror.message= `The object with the id: ${err.value} not found!`
    statusCode=404
  }
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(customerror.statusCode).json({message: customerror.message})
}

module.exports = errorHandlerMiddleware
