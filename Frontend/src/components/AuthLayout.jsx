import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'



export default function Protected({ children, authentication = true }) {
    const context =useContext(UserContext)
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = context.login
    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/')
        }
        else if (!authentication && authStatus !== authentication) {
            navigate('/feed')
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

    return loader ? <div className="flex items-center justify-center font-semibold "><h1>Loading...</h1></div> : <>{children}</>
}

