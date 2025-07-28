import React, { useCallback, useEffect, useState } from 'react'
import ProfilePreview from './ProfilePreview'
import { url } from '../constant/constant'
function Suggestions() {
    const [user, setUser] = useState(null)
    const [isfollowed, setIsfollowed] = useState(false)
    const getUser = useCallback(
        async () => {
            const response = await fetch(`${url}/api/getAllUser`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }, credentials: "include",
            });
            const json = await response.json();
            setUser(json.user)
        },
        [user])

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
    useEffect(() => {
        getUser()
    }, [follow, isfollowed])
    const [show, setShow] = useState(false)
    return (
        <>
            <button onClick={() => setShow(!show)} className="w-32 mt-2  h-10 bg-[#0F66D9] absolute right-5 md:hidden hover:bg-[#0f67d9e7] px-5 text-white font-semibold rounded" >
                People's
            </button>
            <div className={`h-screen w-full md:w-80 md:border-l-[1px] border-[#e4e4e4] px-6 text-left fixed md:left-[78%] py-5 overflow-y-auto no-scrollbar bg-[#000000f6] ${show ? "left-0" : "left-[-100%]"} transition-all ease-in duration-500`}>
                <div className="flex justify-between md:justify-center mb-4">
                    <h1 className=' text-[#f1f1f1] font-semibold text-xl md:text-center px-4 '>People's</h1>
                    <h1 className='md:hidden text-[#f1f1f1] font-semibold text-xl md:text-center' onClick={() => setShow(!show)}>Close</h1>
                </div>
                <div className='flex items-start  gap-2 flex-col my-2'>
                    {user?.map((data) => {
                        return <ProfilePreview key={data._id} data={data} follow={follow} unfollow={unfollow} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Suggestions