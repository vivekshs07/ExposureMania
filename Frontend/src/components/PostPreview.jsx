import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DotMenu from './DotMenu'
import { url } from '../constant/constant'

function PostPreview({ post,dot }) {
    const [likes, setLikes] = useState(false)
    const {id}=useParams()
    const [ids,setid]=useState()
    const like = async () => {
        const response = await fetch(`${url}/api/like/${post._id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }, credentials: "include",
        });
        setLikes(true)
    }
    const dislike = async () => {
        const response = await fetch(`${url}/api/dislike/${post._id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }, credentials: "include",
        });
        setLikes(false)
    }
    const getUserlikes = useCallback(
        async () => {
            const response = await fetch(`${url}/api/getuserlikes/${post._id || id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }, credentials: "include",
            });
            const json = await response.json();
            setLikes(json.status)
        },
        [likes])
    useEffect(() => {
        getUserlikes()
    }, [likes])
    const path = post?.path ?? ""
    var date = new Date(post.timestamp)
    return (
        <div className='w-[90vw] md:w-[30vw] h-fit border-[1px] border-[#424243] rounded-md px-4 bg-[#222326]'>
            <div className='flex justify-between items-center h-[80px]'>
                <div className='flex justify-center items-center gap-4'>
                    <img src={post?.user?.profilePicture} alt="profile" className='w-12 h-12 rounded-full' />
                    <h1 className='text-xl font-thin capitalize text-white'>{post?.user?.name}</h1>
                </div>
                <h1 className='text-white'>{date.toLocaleString('en-GB', {day:'numeric', month: 'short'})}</h1>
            </div>
            {path.length != 0 &&
                <img src={post.path} alt="" className='object-cover  w-[100%] h-[390px] rounded ' />}
            <div className="h-[100px] flex gap-4 flex-col my-1">
                <h1 className=' p-1 text-white'>{post?.caption}</h1>
                <div className="flex justify-between ">
                    {likes ? <i className="ri-thumb-up-fill text-[#0F66D9] text-2xl" onClick={dislike}></i> : <i className="ri-thumb-up-line  text-white text-2xl" onClick={like}></i>}
                    <Link to={`/comments/${post._id}`}><i className="ri-chat-3-line text-2xl text-white"></i></Link>
                    {dot && <div onClick={()=>{setid(post._id)}}><DotMenu id={ids}/></div>}
                </div>
            </div>
        </div>
    )
}
export default PostPreview