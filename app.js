require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB= require('./db/connect')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const jobsRouter = require('./routes/jobs')
const authRouter= require('./routes/auth')
const auth= require('./middleware/authentication')
app.use(express.json());
// extra packages

// routes
app.use('/api/v1/jobs',auth,jobsRouter);
app.use('/api/v1/auth',authRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    const connected= await connectDB(process.env.MONGO_URI)
    if(!connected){
      throw new Error
    }
    if(connected) console.log("Connected")
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
