import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
function ProfilePreview({ data, isfollowed, follow, unfollow, send }) {
  const [username, setUsername] = useState('')
  useEffect(() => {
    setUsername(data?.username)
  }, [])
  return (
    <div>
      {<div className='flex p-4 items-center gap-4 '>
        <img src={data?.profilePicture} alt="profile" className='w-12 h-12 rounded-full' />
        <div className='flex flex-col'>
          <Link to={`/anotherUserProfile/${username}`}><h1 className='capitalize text-md w-14 font-thin cursor-pointer text-white'>{data?.name}</h1></Link>
        </div>
        {send ? <button className="w-32 h-10 bg-[#0F66D9] hover:bg-[#0f67d9e7] px-5 text-white font-semibold rounded" >
          Message
        </button> : <div>
          {isfollowed || data?.isfollowed ? <button className="w-32 h-10 bg-[#e6e6e6e7] hover:bg-[#e7e7e7] px-3 text-gray-500 font-semibold rounded" onClick={() => unfollow(data?._id)}>
            Unfollow
          </button> : <button className="w-32 h-10 bg-[#0F66D9] hover:bg-[#0f67d9e7] px-5 text-white font-semibold rounded" onClick={() => follow(data?._id)}>
            Follow
          </button>}</div>}
      </div>}
    </div>
  )
}
export default ProfilePreview