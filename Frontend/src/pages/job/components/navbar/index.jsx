import React, { useState } from 'react'
import { Logo, Title } from './export'
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { useAppStore } from '@/store';
import render from "image-render";
import { HOST } from '@/utils/constant';

const Navbar = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const image = `${HOST}/${userInfo.image}`
  return (
    <div className='flex relative w-full bg-black border-b-2 border-gray-700'>
      <div className='w-[650px] flex items-center pb-4 '>
        <Logo />
      </div>
      <div className='flex justify-end items-center w-full '>

          <div className="pr-10 ">
            <Title text='Internships' className='text-white' />
          </div>
          <div className="pr-10 ">
            <Title text='Full time Jobs' className='text-white' />
          </div>
          <div className="pr-10 ">
            <Title text='Update Resume' className='text-white' />
          </div>
          <div className="pr-10 ">
            <Title text='Career Advice' className='text-white' />
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
