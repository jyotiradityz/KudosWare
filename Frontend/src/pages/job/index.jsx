import { useAppStore } from "@/store"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "./components/navbar";
import Jobs from "./components/jobs";


const Job = () => {
  const {userInfo} =useAppStore();
  const navigate = useNavigate()
  useEffect(()=>{
    if(!userInfo.profileSetup){
      toast('Setup Profile First')
      navigate('/profile')
    }

  },[userInfo, navigate])
  return (
    <div className="h-[100vh] text-white bg-black overflow-hidden">
      <Navbar />
      <Jobs />
    </div>
  )
}

export default Job
