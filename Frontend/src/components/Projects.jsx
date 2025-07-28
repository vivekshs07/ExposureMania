import React, { useEffect, useState,useContext} from 'react'
import Siderbar from './Siderbar'
import Message from './Message'
import { url } from '../constant/constant'
import UserContext from '../context/UserContext'


function Projects() {
    const [following, setFollowing] = useState([])
    const { user,getUser } = useContext(UserContext);
    const getfollowing = async () => {
        const response = await fetch(`${url}/api/getfollowing`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }, credentials: "include",
        });
        const json = await response.json();
        setFollowing(json.following)
    }
    useEffect(() => {
        getfollowing()
        getUser();
    }, [])
    return (
        <>
            <Siderbar />
            <div className='w-full md:translate-x-[300px]'>
                <div className="md:px-4 px-8 py-3 font-semibold text-xl  text-white">Chats</div>
                <div className='flex gap-20 w-full md:h-[88vh]'>
                    {
                        following.length === 0 ? <div className="md:w-[70%] w-full  flex justify-center items-center">
                            <h1 className='text-white'>Make Friends to Chat.</h1>
                        </div> : <div className="w-full flex flex-col overflow-y-auto no-scrollbar md:w-[25%]">
                            <div className="md:bg-[#222326] rounded flex-col flex items-start px-4 h-full">
                                <div>{following.map((data) => {
                                    return <Message data={data.following} key={data._id} isfollowed={true} />
                                })}</div>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}

export default Projects