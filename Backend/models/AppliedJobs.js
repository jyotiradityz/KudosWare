import mongoose from "mongoose"

const AppliedJobSchema = new mongoose.Schema({
    job_id:{
        type:String,
        require:[true,"Job ID is Required"],
    },
    user_id:{
        type:String,
        require:[true,"User ID is Required"],
    },
    company:{
        type:String,
        require:[true,"Company is Required"],
    },
    title:{
        type:String,
        require:[true,"Title is Required"],
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
    },
    resume:{
        type:String,
        require:[true,"Resume is Required"],
    }
});
const AppliedJobs = mongoose.model("ApplicationModel",AppliedJobSchema)

export default AppliedJobs;