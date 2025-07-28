import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'


function MessagePreview({ message }) {
    const [checkSender,setCheck] = useState()
    const context = useContext(UserContext)
    const { user } = context
    useEffect(()=>{
        setCheck(user._id===message.sender)
    },[message])
    return (
        <div className={`w-full flex ${user._id===message.sender && "justify-end"}`}>
        <div className={`w-fit mx-4 p-2 text-white rounded-md ${checkSender && "bg-[#0F66D9]"}`}>{message.message}</div>
        </div>
    )
}

export default MessagePreview