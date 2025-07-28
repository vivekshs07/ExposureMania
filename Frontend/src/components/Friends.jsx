import React, { useState, useCallback } from 'react'
import Siderbar from './Siderbar'
import ProfilePreview from './ProfilePreview'
import { useEffect } from 'react';
import { url } from '../constant/constant';


function Friends() {
    const [follower, setFollower] = useState([])
    const [following, setFollowing] = useState([])
    const [isfollowed, setIsfollowed] = useState(false)
    const follow = useCallback(
        async (id) => {
            const response = await fetch(`${url}/api/following/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, credentials: "include",
            });
            setIsfollowed(isfollowed => !isfollowed)
        }, []
    )
    const unfollow = useCallback(async (id) => {
        const response = await fetch(`${url}/api/unfollow/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }, credentials: "include",
        });
        setIsfollowed(isfollowed => !isfollowed)
    }, [])
    const getfollowers = async () => {
        const response = await fetch(`${url}/api/getfollowers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }, credentials: "include",
        });
        const json = await response.json();
        setFollower(json.followers)
    }
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
        getfollowers()
        getfollowing()
    }, [isfollowed])

    return (
        <>
            <Siderbar />
            <div className='w-full  h-screen p-4 md:translate-x-[300px] flex flex-col md:flex-row gap-4'>
                <div className="md:w-[35%] w-full md:h-full h-[40%] bg-[#222326] rounded">
                    <div className="px-4 py-3 text-white">Following</div>
                    { following.length === 0 ?
                    <div className='flex justify-center items-center w-full h-[90%] text-white'>No Following</div>:
                    <div>
                        {following.map((data) => {
                        return <ProfilePreview data={data.following} key={data._id} isfollowed={true} follow={follow} unfollow={unfollow} />
                    })}
                    </div>
                }
                </div>
                <div className="md:w-[35%] w-full md:h-full h-[40%] bg-[#222326] rounded">
                    <div className="px-4 py-3 text-white">Followers</div>
                    { follower.length === 0 ?
                    <div className='flex justify-center items-center w-full h-[90%] text-white'>No Followers</div>:
                    <div>
                        {follower?.map((data) => {
                        return <ProfilePreview key={data._id} data={data.follower} follow={follow} unfollow={unfollow} />
                    })}
                    </div>
                }
                </div>
            </div></>
    )
}

export default Friends