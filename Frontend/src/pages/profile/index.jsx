import { FaUpload } from "react-icons/fa"; 
import { useAppStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import apiClient from "@/lib/api-client";
import { ADD_PROFILE_IMAGE_ROUTE, HOST, REMOVE_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_ROUTE, UPLOAD_RESUME_ROUTE } from "@/utils/constant";
import render from "image-render";

const Profile = () => {
  const navigate = useNavigate();

  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hoverd, setHoverd] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [resume, setResume] = useState(null);

  const fileInput = useRef(null);
  const resumeInput = useRef(null);   
  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    } 
    if (userInfo.image) {
      setImage(`${HOST}/${userInfo.image}`);
    }
    if (userInfo.resume) {
      setResume(`Resume.pdf`);
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName) {
      toast.error("First Name is required");
      return false;
    }
    if (!lastName) {
      toast.error("Last Name is required");
      return false;
    }
    return true;
  };

  const saveChange = async () => {
    if (validateProfile()) {
      try {
        const res = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, color: selectedColor },
          { withCredentials: true }
        );
        if (res.status === 200 || res.data) {
          setUserInfo({ ...res.data });
          toast.success("Profile Updated Successfully");
          navigate("/chat");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleBack = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Setup the profile first");
    }
  };

  const handFileInputClick = () => {
    fileInput.current.click();
  };

  const handleResumeInputClick = () => {
    resumeInput.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);
      const res = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, {
        withCredentials: true,
      });
      if (res.status === 200 || res.data) {
        setUserInfo({ ...userInfo, image: res.data.image });
        toast.success("Profile Image Updated Successfully");
      }
      const reader = new FileReader();
      render.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const formData = new FormData();
      formData.append("resume", file);
      const res = await apiClient.post(UPLOAD_RESUME_ROUTE, formData, {
        withCredentials: true,
      });
      toast.success("Resume Uploaded Successfully");
      if (res.status === 200 || res.data) {
        setUserInfo({ ...userInfo, resume: res.data.resume });
      }
    } else {
      toast.error("Only .pdf files are allowed");
    }
  };

  const handleDeleteImage = async () => {
    try {
      const res = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setUserInfo({ ...userInfo, image: null });
        toast.success("Profile Image Removed Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#1b1f20] h-[100vh] flex items-center justify-center flex-col gap-10 ">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max ">
        <div onClick={handleBack}>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex  items-center justify-center"
            onMouseEnter={() => setHoverd(true)}
            onMouseLeave={() => setHoverd(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden ">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedColor
                  )} `}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>

            {hoverd && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full"
                onClick={image ? handleDeleteImage : handFileInputClick}
              >
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer " />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer " />
                )}
              </div>
            )}

            <input
              type="file"
              ref={fileInput}
              className="hidden"
              onChange={handleImageChange}
              name="profile-image"
              accept=".png, .jpg, .jpeg, .svg, .webp"
            />
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center ">
          <div className="w-full">
              <Button
                className="w-full p-6 bg-[#2c2e3b] text-[#b7b7b7] border-none rounded-lg flex items-center"
                onClick={handleResumeInputClick}
              >
                <FaUpload className="mr-1"/>
                {resume ? resume : "Upload Resume"}
                <input
                  type="file"
                  ref={resumeInput}
                  className="hidden"
                  onChange={handleResumeChange}
                  accept=".pdf"
                />
              </Button>
            </div>
            <div className="w-full">
              <Input
                placeholder="Email"
                disabled
                type="email"
                value={userInfo.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="First Name"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Last Name"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            
            <div className="w-full flex gap-5 ">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 
                    ${selectedColor === index
                      ? "outline outline-white/50 outline-10"
                      : ""
                    } 
                    `}
                  onClick={() => setSelectedColor(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300 "
            onClick={saveChange}
          >
            Save Changes
          </Button>
        </div>
      </div>
      <Toaster position="bottom-center" richColors />
    </div>
  );
};

export default Profile;
