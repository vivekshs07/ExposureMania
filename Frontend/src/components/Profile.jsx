
import React, { useState, useEffect, useContext } from 'react';
import Image from './Image';
import Sidebar from './Siderbar';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { url } from '../constant/constant';

const Profile = () => {
    const [file, setImage] = useState("");
    const navigate = useNavigate();
    const context = useContext(UserContext)
    const [upload, setUpload] = useState(false)
    const [uploadCover, setUploadCover] = useState(false)
    const { getUser, user, userImage } = context


    const updateProfileImage = async () => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`${url}/api/uploadprofileimage`, {
            method: "PATCH",
            credentials: "include",
            body: formData
        });
        const json = await response.json();
        if (json.success) {
            setImage("")
            setUpload(false)
        }
    }

    const updateCoverImage = async () => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`${url}/api/updatecoverimage`, {
            method: "PATCH",
            credentials: "include",
            body: formData
        });
        const json = await response.json();
        if (json.success) {
            setImage("")
            setUploadCover(false)
        }
    }
    const handlePath = (e) => {
        e.preventDefault()
        setImage(...file, e.target.files[0]);
        confirm("Are you sure you want to update ?") && setUpload(true)
    }
    const handlePathCover = (e) => {
        e.preventDefault()
        setImage(...file, e.target.files[0]);
        confirm("Are you sure you want to update ?") && setUploadCover(true)
    }
    if (upload) {
        updateProfileImage()
    }
    if (uploadCover) {
        updateCoverImage()
    }
    useEffect(() => {
        getUser()
    }, [upload, uploadCover])
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
                            <input type="file" name="file" id="input-file1" className='hidden' onChange={handlePathCover} />
                            <label className='top-[6rem] md:top-[11rem] right-8 absolute' htmlFor="input-file1"><i className="ri-edit-2-line text-[#0F66D9] cursor-pointer text-2xl font-normal" ></i></label>
                        </div>
                        <div className='flex justify-center items-center relative'>
                            <img src={user?.profilePicture} alt="" className='w-[130px] h-[130px] rounded-full md:w-[150px] md:h-[150px]  border-[1px] border-[#e4e4e4] object-cover absolute -top-20 z-0' />
                            <input type="file" name="file" id="input-file" className='hidden' onChange={handlePath} />
                            <label className='top-[4rem] md:top-[4.5rem] absolute' htmlFor="input-file"><i className="ri-edit-2-line text-[#0F66D9] text-2xl font-normal cursor-pointer" ></i></label>
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
                            <Link to="/editprofile"><button className='bg-[#0F66D9] text-[#ffffff] px-4 py-2  rounded'>Edit Profile</button></Link>
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
};

export default Profile;

