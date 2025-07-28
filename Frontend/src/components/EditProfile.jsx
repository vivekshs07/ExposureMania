import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './Siderbar'
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { url } from '../constant/constant';
function EditProfile() {
    const navigate = useNavigate()
    const context = useContext(UserContext)
    const { user } = context
    const [info, setName] = useState({ name: user?.name, bio: user?.bio })
    const handleChnage = (e) => {
        setName({ ...info, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, bio } = info
        const response = await fetch(`${url}/api/editprofile`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, bio }),
        })
        const json = await response.json()
        if (json.success) {
            navigate("/profile")
        }
    }
    return (
        <>
            <Sidebar />
            <div className="w-full md:h-screen md:translate-x-[257px] md:bg-[#222326] py-8 px-10">
                <h1 className='font-semibold text-[#ffffff] text-xl'>Edit Profile</h1>
                <div className="md:w-[50%]">
                    <form action="" className='flex flex-col gap-4 mt-4'>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className='text-[#ffffff]'>Name</label>
                            <input type="text" name='name' value={info?.name} onChange={handleChnage} className='bg-[#3A3B3C] text-[#ffffff] px-4 py-2 rounded' />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className='text-[#ffffff]'>Bio</label>
                            <textarea value={info?.bio} name="bio" onChange={handleChnage} id="" cols="30" rows="10" className='bg-[#3A3B3C] text-[#ffffff] px-4 py-2 rounded'></textarea>
                        </div>
                        <button className='bg-[#0F66D9] text-[#ffffff] w-[20%] px-4 py-2 rounded' onClick={handleSubmit}>Save</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditProfile