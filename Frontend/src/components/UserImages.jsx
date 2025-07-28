import React, { useEffect, useState } from 'react'
import PostPreview from './PostPreview';
import Siderbar from './Siderbar'
import { url } from '../constant/constant';
function UserImages() {
    const [posts, setPost] = useState([]);
    const getUserPosts = async () => {
        const response = await fetch(`${url}/api/getuserpost`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }, credentials: "include",
        });
        const json = await response.json();
        setPost(json.posts.reverse())
    }
    useEffect(() => {
        getUserPosts()
    }, [])
    return (
        <>
            <Siderbar />
            <h1 className=' text-[#f1f1f1] font-semibold text-xl md:text-center px-8 mt-20 md:hidden '>Your Post's</h1>
            <div className='mt-0 md:mt-0 h-screen w-full items-center md:w-[550px] border-[#e4e4e4] md:translate-x-[300px] flex flex-col gap-8 py-8 overflow-y-auto no-scrollbar '>
            {
                    posts.length === 0 ? <div className="w-full h-screen flex justify-center items-center">
                        <h1 className='text-white'>No Posts to display.</h1>
                    </div> : posts.map((post) => {
                        return <PostPreview key={post._id} post={post} dot={true} />
                    })
                }

            </div></>
    )
}

export default UserImages