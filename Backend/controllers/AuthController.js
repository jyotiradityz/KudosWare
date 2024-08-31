import pkg from "jsonwebtoken";
const { sign } = pkg;
import jobUser from "../models/UserModel.js";
import { response } from "express";
import { compare } from "bcrypt";
import { renameSync, unlinkSync} from "fs";
import jobModel from "../models/JobModel.js";
import AppliedJobs from "../models/AppliedJobs.js";
// import jobUser from './../models/UserModel';
const maxAge = 3 * 24 * 60 * 60 * 1000;
 
const createToken = (email, userID) => {
    return sign({ email, userID }, process.env.JWT_KEY, { expiresIn: maxAge });
}

export const signUp = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and Password are required")
        }
        const user = await jobUser.create({ email, password });

        res.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None"
        });

        return res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                password: user.password,
                profileSetup: user.profileSetup
            },

        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

export const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and Password are required")
        }
        
        const user = await jobUser.findOne({ email });

        if (!user) {
            return res.status(400).send("jobUser Not Found!");
        }
        const auth = await compare(password, user.password);

        if (!auth) {
            return res.status(400).send("Password Is Incorrect");
        }

        res.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None"
        });

        return res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                password: user.password, 
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color,
                resume: user.resume

            },

        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

export const getUserInfo = async (req, res, next) => {
    try {
        // console.log(req.userId);
        const userData = await jobUser.findById(req.userId);
        if (!userData) {
            return res.status(404).send("jobUser Not Found");
        }

        return res.status(200).json({

            id: userData.id,
            email: userData.email,
            password: userData.password,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
            resume: userData.resume

        })

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

export const updateProfile = async (req, res, next) => {
    try {
        const { userId } = req;
        const { firstName, lastName, color } = req.body;
        if (!firstName || !lastName) {
            return res.status(400).send("All are required");
        }
        const check = await jobUser.findById(userId);
        const userData = await jobUser.findByIdAndUpdate(userId, {
            firstName, lastName, color, profileSetup: true
        }, { new: true, runValidators: true })

        return res.status(200).json({
            id: userData.id,
            email: userData.email,
            password: userData.password,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
            resume: userData.resume
        })

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

export const addProfileImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send("Image is required");
        } 

        const date = Date.now();
        let fileName = `uploads/profiles/${date}${req.file.originalname}`;

        renameSync(req.file.path, fileName);

        const updateUser = await jobUser.findByIdAndUpdate(req.userId, {
            image: fileName
        }, { new: true, runValidators: true });

        return res.status(200).json({
            image: updateUser.image,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

export const uploadResume = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send("Resume is required");
        } 

        const date = Date.now();
        let fileName = `uploads/resumes/${date}${req.file.originalname}`;

        renameSync(req.file.path, fileName);

        const updateUser = await jobUser.findByIdAndUpdate(req.userId, {
            resume: fileName
        }, { new: true, runValidators: true });

        return res.status(200).json({
            resume: updateUser.resume,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}


export const removeProfileImage = async (req, res, next) => {
    try {
        const { userId } = req;
        const user = await jobUser.findById(userId); 
        if(!user){
            return res.status(404).send('jobUser Not Found');
        }
        if(user.image){
            unlinkSync(user.image);
        }
        user.image = null;
        await user.save();

        return res.status(200).json({
            messege: 'Profile Image Removed Successfully'
        })

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

export const getAllJobs = async (req, res, next) => {
    try {
        const jobs = await jobModel.find().sort({ date: -1 });
        return res.status(200).json(jobs);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

export const postSingleJob = async (req, res, next) => {
    try {
        const { title, company, location, salary, description, image } = req.body;
        if (!title || !company || !location || !salary || !description || !image) {
            return res.status(400).send("All Fields are required");
        }
        const job = await jobModel.create({
            title, company, location, salary, description, image,
        });

        return res.status(201).json(job);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
} 

