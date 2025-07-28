import React, { useContext,useEffect } from 'react'
import Siderbar from './Siderbar'
import Suggestions from './Suggestions'
import Post from './Post'
import UserContext from '../context/UserContext'



function Feed() {
    const context = useContext(UserContext)
    const { getUser } = context
    useEffect(() => {
        getUser()
    }, [])
    return (
        <div className='overflow-x-hidden no-scrollbar'>
            <Siderbar />
            <Suggestions />
            <Post />
            {/* <Profile/> */}
            {/* <UserImages/> */}
            {/* <Friends/> */}
            {/* <Achieve/> */}
            {/* <Comments/> */}
        </div>
    )
}

export default Feed