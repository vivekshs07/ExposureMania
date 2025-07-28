import React, { useContext, useEffect, useState } from 'react'
import Siderbar from './Siderbar'
import PostPreview from './PostPreview'
import Input from './Input'
import CommentPreview from './CommentPreview'
import UserContext from '../context/UserContext'
import { useParams } from 'react-router-dom'
import { url } from '../constant/constant'


function Comments() {
  const context = useContext(UserContext)
  const [Comment, setComment] = useState([])
  const [comments, setComments] = useState([])
  const [content, setWrite] = useState('')
  const { id } = useParams()
  const { posts } = context
  const getcomments = async () => {
    const response = await fetch(`${url}/api/getcomments/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }, credentials: "include",
    });
    const json = await response.json();
    setComment(json.post)
    setComments(json.post.comments.reverse())
  }
  const comment = async () => {
    const response = await fetch(`${url}/api/comment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, credentials: "include",
      body: JSON.stringify({content})
    });
    setWrite('')
  }
  const onchange = (e) => {
    setWrite(e.target.value)
  }
  useEffect(() => {
    getcomments()
  }, [content])
  return (
    <>
      <Siderbar />
      <div className='w-full h-screen md:h-screen p-4 md:translate-x-[300px] flex gap-4 flex-col md:flex-row'>
        <PostPreview post={Comment} />
        <div className='flex flex-col'>
        <div className=' relative md:w-96 border-[1px] border-[#424243] text-left py-5 md:bg-[#222326] rounded md:h-[60vh] overflow-y-auto no-scrollbar h-[25vh] '>
          <h1 className='font-semibold text-[#ffffff] text-xl text-center'>Comments</h1>
          {comments.length > 0 ? <div className="px-6">
            {comments?.map((data) => {
              return <CommentPreview key={data._id} comment={data} username={data?.user?.name} />
            })}
          </div> : <div className=' mt-4 flex justify-center items-center w-full h-full'><h1 className='text-[#ffffff]'>No Comments</h1></div>}
        </div>
        <div className=" rounded justify-center  md:bottom-24 my-8 md:my-0 h-36  flex flex-col gap-4 w-96 md:z-20">
            <input type="text" className='bg-transparent border-[1px] border-[#0F66D9] text-white w-[300px] p-1 rounded outline-none focus:border-[#0f67d9e7]' onChange={onchange} placeholder='Write comment.' />
            <button onClick={comment} className="w-32 h-10  bg-[#0F66D9] hover:bg-[#0f67d9e7]  text-white font-semibold rounded">
              Comment
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Comments