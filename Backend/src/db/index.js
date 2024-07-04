import mongoose from "mongoose";

export const connectDB = async()=>{
 await mongoose.connect(`${process.env.MONGODB_URI}/LockMate`, {
})
  .then(() => {
    console.log(`\n MongoDB Connected`);
    // Continue with your code here
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  })};
