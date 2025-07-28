import React, { useContext,useState } from 'react'
import { NavLink, Link, useNavigate } from "react-router-dom";
import UserContext from '../context/UserContext';
import toast from 'react-hot-toast';
function Siderbar() {
  const context = useContext(UserContext)
  const { logout } = context
  const navigate = useNavigate();
  const logoutUser = () => {
    logout()
    toast.success('Logout Successfully')
    localStorage.clear()
    navigate('/')
  }
  const [show, setShow] = useState(false)
  return(

  <>
    <div className="menu flex justify-between mx-8 py-6 z-[999] md:hidden">
      <Link to="/feed"><h1 className='text-3xl font-bold bg'>EXPOSURE<br />MANIA</h1></Link>
      <i className="ri-menu-line text-2xl text-white cursor-pointer" onClick={()=>setShow(!show)}></i>
    </div>
    <div className={`h-screen w-64 md:border-r-[1px] z-[10] top-1 border-[#e4e4e4] py-5 bg-[#000000f6] fixed ${show ?"left-0":"left-[-100%]"} transition-all ease-in duration-500 md:left-0`}>
      <Link to="/feed"><h1 className='text-3xl font-bold px-8  bg'>EXPOSURE<br />MANIA</h1></Link>
      <h1 className='font-extralight text-[#ffffff] px-9 my-8'>Menu</h1>
      <ul className='gap-4 flex flex-col my-8 font-normal text-lg px-9'>
        <NavLink to="/feed" className={({ isActive }) => `${isActive ? "text-[#0F66D9] " : "text-white"} `}><li>Home</li></NavLink>
        <NavLink to="/photos" className={({ isActive }) => `${isActive ? "text-[#0F66D9] " : "text-white"} `}><li>My Posts</li></NavLink>
        <NavLink to="/profile" className={({ isActive }) => `${isActive ? "text-[#0F66D9] " : "text-white"} `}><li>Profile</li></NavLink>
        <NavLink to="/friends" className={({ isActive }) => `${isActive ? "text-[#0F66D9] " : "text-white"} `}><li>Friends</li></NavLink>
        <NavLink to="/project" className={({ isActive }) => `${isActive ? "text-[#0F66D9] " : "text-white"} `}><li>Chat</li></NavLink>
      </ul>
      <div className="flex flex-col gap-8 px-9 py-4">
        <div className='flex justify-start items-center gap-4'>
          <i className="ri-edit-2-line text-[#0F66D9] text-2xl font-normal" ></i>
          <Link to="/createpost"><h1 className='text-white'>Make Post</h1></Link>
        </div>
        <div className='flex justify-start items-center gap-4'>
          <i className="ri-logout-circle-line  text-[#ffffff] text-2xl font-light"></i>
          <h1 className='text-white font-normal cursor-pointer' onClick={logoutUser}>Logout</h1>
        </div>
      </div>
    </div>
  </>
  )
}

export default Siderbar