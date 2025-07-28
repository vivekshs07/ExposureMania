import React from 'react'
import PostPreview from './PostPreview'
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
function Post() {
  const context = useContext(UserContext)
  const { getPosts,posts, likes } = context
  // const [posts, setPost] = useState([])
  useEffect(() => {
    // getPosts().then((data) => {
    //   setPost(data.posts)
    // })
    getPosts()
  }, [])
  return (
    <div className='mt-20 md:mt-0 h-fit md:h-screen w-full items-center md:w-[550px] border-[#e4e4e4] md:translate-x-[300px] flex flex-col gap-8 py-8 overflow-y-auto no-scrollbar '>
      {
        posts.length === 0 ? <div className="w-full h-screen flex justify-center items-center">
          <h1 className='text-white'>No Posts to display.</h1>
        </div> : posts.map((post) => {
          return  <PostPreview key={post._id} post={post} />
        })
      }
    </div>
  )
}

export default Post