import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Message({ data }) {
    const [username, setUsername] = useState('')
    useEffect(() => {
        setUsername(data?.username)
    }, [])
    const id = data?._id
  
    return (
            <div className='flex p-4 items-center gap-4'>
                <img src={data?.profilePicture} alt="profile" className='w-12 h-12 rounded-full' />
                <div className='flex flex-col'>
                    <Link to={`/anotherUserProfile/${username}`}><h1 className='text-md w-20 font-thin capitalize cursor-pointer text-white'>{data?.name}</h1></Link>
                </div>
                <Link to={`/chat/${data?.name}/${id}`}><button className="w-32 h-10 bg-[#0F66D9] hover:bg-[#0f67d9e7]  text-white font-semibold rounded" >
                    Message
                </button></Link>
            </div>
    )
}
export default Message