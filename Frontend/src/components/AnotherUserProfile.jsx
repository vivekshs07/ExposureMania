import React from 'react'
import Sidebar from './Siderbar'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Image from './Image'
import { url } from '../constant/constant'

function AnotherUserProfile() {
    const { username } = useParams()
    const [user, setUser] = useState({})
    const [userImage, setImage] = useState([])
    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`${url}/api/getUserProfile/${username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }, credentials: "include",
            });
            const data = await response.json()
            setImage(data.posts)
            setUser(data.apiResponse[0])
        }
        getUser()
    }, [username])
    return (
        <>
        <Sidebar />
        <div className="w-full md:h-screen md:translate-x-[257px] md:bg-[#222326]">
        <div className="flex gap-0 flex-col md:flex-row ">
                <div className="hidden w-[30vw] h-[100vh]  md:flex justify-between rounded">
                    <div className="w-full px-4 py-2">
                        <div className="mt-4">
                            <h1 className='font-semibold text-[#ffffff] text-xl text-center'>Photos</h1>
                        </div>
                        {userImage.length === 0 ? <div className='flex justify-center items-center w-full h-[90vh] text-white'>No Photos</div> :
                            <div className=" my-8 flex flex-wrap">
                                {userImage.map((data) => {
                                    return <Image data={data} key={data._id} />
                                })}
                            </div>}
                    </div>
                </div>
                <div className="md:w-[51.5vw] w-full h-[55vh] md:h-[100vh] md:border-l-[1px]">
                    <div className='relative'>
                    <img src={user?.coverImage} alt="" className='object-cover h-[35vw] md:h-[15vw] w-full  border-b-[1px] border-[#e4e4e4] ' />
                    </div>
                    <div className='flex justify-center items-center relative'>
                    <img src={user?.profilePicture} alt="" className='rounded-full w-[150px] h-[150px]  border-[1px] border-[#e4e4e4] object-cover absolute -top-20 z-0' />
                    </div>
                    <div className='translate-y-28 flex justify-center flex-col items-center md:translate-y-32 gap-3 md:gap-2'>
                        <div className="flex justify-around  items-center  w-[60%] text-white  ">
                            <div className="flex items-center justify-center flex-col w-[30%]">
                                <h1>Posts</h1>
                                <h1 className='text-[#0F66D9]'>{user?.postCount ?? 0}</h1>
                            </div>
                            <div className="flex items-center justify-center flex-col w-[30%]">
                                <h1>Followers</h1>
                                <h1 className='text-[#0F66D9]'>{user?.followerCount ?? 0}</h1>
                            </div>
                            <div className="flex items-center justify-center flex-col w-[30%]">
                                <h1>Following</h1>
                                <h1 className='text-[#0F66D9]'>{user?.followingCount ?? 0}</h1>
                            </div>
                        </div>
                        <h1 className='text-white'>{user?.name}</h1>
                        <h1 className='text-white'>{user?.username}</h1>
                        <p className='text-white text-center text-sm w-[60%]'>{user?.bio}</p>
                    </div>
                </div>
                <div className="md:hidden w-full h-fit gap-4 flex rounded">
                        <div className="w-full px-4">
                            <div className="">
                                <h1 className='font-semibold text-[#ffffff] text-xl text-center'>Photos</h1>
                            </div>
                            {userImage.length === 0 ? <div className='flex justify-center items-center w-full h-[20vh] text-white'>No Photos</div> :
                                <div className=" my-8 flex flex-wrap">
                                    {userImage.map((data) => {
                                        return <Image data={data} key={data._id} />
                                    })}
                                </div>}
                        </div>
                    </div>
            </div>
        </div>
    </>
    )
}

export default AnotherUserProfile