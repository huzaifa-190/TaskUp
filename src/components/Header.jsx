import React from 'react'
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { MdDarkMode } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";

import useAuth from '../Hooks/useAuth';
export default function Header() {
  const {logOut,currentUser,loading} = useAuth()
  const navigate = useNavigate()
  
  const onSignOut =async ()=>{
    try{
      const user = await logOut();
      toast("User signed out successfully");
      navigate('/sign-in')
    }
    catch(error){
      toast.error("Error signing out: ", error);
    }
  
  }
  return (
    <div className="flex w-full h-24 px-4 sm:px-10">
    {/* Left Div in Header containing Logo */}
    <button
      className="flex items-center gap-1 btn"
      onClick={() => location.reload()}
    >
      <h1 className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 p-4 rounded-full bg-lightPurp text-white border-lightPurp border-2 sm:text-lg font-bold">
        Task
      </h1>
      <h1 className="text-md text-gray-700 sm:text-xl font-bold">Up</h1>
    </button>

    {/* Right Div in Header containing email and avatar */}
    <div className="flex flex-wrap-reverse ml-auto items-center justify-end px-4 gap-5 sm:gap-8">
      <h2 className="hidden sm:flex text-sm sm:text-xl font- text-gray-600">huzaifa190@gmail.com</h2>
      <button className="btn">
        <MdDarkMode size={28} title="dark mode" />
      </button>
      {currentUser &&

      <button className="btn" onClick={()=>onSignOut()}>
        <PiSignOutBold size={26}  />     
      </button>
}
      {/* <MdOutlineLightMode size={28} title="light mode" /> */}
    </div>
  </div>
  )
}
