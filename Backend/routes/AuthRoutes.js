import { Router } from "express";
import { signUp, login, getUserInfo, updateProfile, addProfileImage, removeProfileImage, uploadResume, getAllJobs, postSingleJob } from "../controllers/AuthController.js";
import { verifyToken } from './../middlewares/AuthMiddleware.js';
import multer from 'multer';
import { addCandidate } from './../controllers/ApplicationController.js';

  
const authRoutes = Router();
const uploadImage = multer({ dest: 'uploads/profiles/' });
const multUploadResume = multer({ dest: 'uploads/resumes/' });

authRoutes.post("/signup",signUp) 
authRoutes.post("/login",login)
authRoutes.get("/user-info",verifyToken,getUserInfo)
authRoutes.post("/update-profile",verifyToken,updateProfile)
authRoutes.post("/add-profile-image",verifyToken,uploadImage.single("profile-image"),addProfileImage)
authRoutes.post("/upload-resume",verifyToken,multUploadResume.single("resume"),uploadResume)
authRoutes.post("/add-candidate",verifyToken,addCandidate)


authRoutes.delete('/remove-profile-image', verifyToken, removeProfileImage);

authRoutes.get('/get-all-jobs',getAllJobs)
authRoutes.post('/post-a-job',postSingleJob)



export default authRoutes;