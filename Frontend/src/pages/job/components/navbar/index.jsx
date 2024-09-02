import React, { useState } from 'react'
import { Logo, Title } from './export'
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { useAppStore } from '@/store';
import render from "image-render";
import { HOST } from '@/utils/constant';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Navbar = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const image = `${HOST}/${userInfo.image}`
  const nav = useNavigate();
  const handleNav=()=>{
    nav('/appliedjob')
  }
  return (
    <div className='flex relative w-full bg-black border-b-2 border-gray-700'>
      <div className='w-[650px] flex items-center pb-4 '>
        <Logo />
      </div>
      <div className='flex justify-end items-center w-full '>

          <div className="pr-10 ">
            <Button text='' className='text-white'  onClick={()=>{toast.error('Not Impleteted this part')}}>Internships</Button>
          </div>
          <div className="pr-10 ">
            <Button text='Full time Jobs' className='text-white' >Full time Jobs</Button>
          </div>
          <div className="pr-10 ">
            <Button text='Update Resume' className='text-white' >Update Resume</Button>
          </div>
          <div className="pr-10 " >
            <Button text='Applied Job' className='text-white' onClick={handleNav} >Applied Job</Button>
          </div>
        </div>
        <div className='my-5'>
          <div className="pr-10 ">
            <Avatar>
              <AvatarImage src={image} alt="Profile Image" />
              <AvatarFallback className='text-black bg-white'>JP</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
  )
}

export default Navbar;
