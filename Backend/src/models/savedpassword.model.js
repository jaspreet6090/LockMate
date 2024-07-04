import mongoose from "mongoose";

const savePasswordSchema = new mongoose.Schema({
  username:{
    type : String,
    required : true
  },
  websiteUrl:{
    type : String,
    required : true
  },
  password:{
    type : String,
    required : true
  },
  user:{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  }
},{timestamps : true});



export const SavedPassword = mongoose.model("SavedPassword", savePasswordSchema);