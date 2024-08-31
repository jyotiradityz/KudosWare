import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        require:[true,"Title is Required"],
    },
    company:{
        type:String,
        require:[true,"Company is Required"],
    },
    location:{
        type:String,
        require:[true,"Location is Required"],
    },
    salary:{
        type:Number,
        require:[true,"Salary is Required"],
    },
    description:{
        type:String,
        require:[true,"Description is Required"],
    },
    date:{
        type:Date,
        default:Date.now
    },
    image:{
        type:String,
        default:null
    }
});

const jobModel = mongoose.model("jobModel",jobSchema)

export default jobModel;