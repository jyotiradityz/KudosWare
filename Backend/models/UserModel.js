import mongoose from "mongoose"
import { genSalt, hash } from "bcrypt";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:[true,"Email is Required"],
        unique:true,
    },
    password:{
        type:String,
        require:[true,"Password is Required"],
    },
    firstName:{
        type:String,
        require:false,
    },
    lastName:{
        type:String,
        require:false,
    },
    image:{
        type:String,
        require:false,
    },
    resume:{
        type:String,
        require:false,
    },
    color:{
        type:Number,
        require:false,
    },
    profileSetup:{
        type:Boolean,
        default:false
    },
});


userSchema.pre("save", async function (next) {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
});

const jobUser = mongoose.model("jobUser",userSchema)

export default jobUser;   