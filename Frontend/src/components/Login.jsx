import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import UserContext from '../context/UserContext'

import toast from 'react-hot-toast'
import { url } from '../constant/constant'


function Login() {
    const navigate = useNavigate();
    const context = useContext(UserContext)
    const { setLogin } = context
    const [user, setUser] = useState({ email: '', password: '' })
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const submit = async (e) => {
        try {
            e.preventDefault();
            const toastId = toast.loading('Login in...');
            const { password, email } = user;
            const response = await fetch(`${url}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password, email }),
                credentials: "include",
            });
            const json = await response.json();
            if (json.success) {
                toast.dismiss(toastId);
                localStorage.setItem('auth', true)
                toast.success('Login Success')
                setLogin(true)
                navigate("/feed");
            } else {
                toast.dismiss(toastId);
                toast.error('Invalid email or password')
            }
        } catch (error) {
            toast.error('Something went wrong')
        }
    }


    return (
        <>
            <div className='flex gap-14 mt-20  flex-col sm:flex-row sm:h-screen w-full sm:justify-between sm:gap-0 sm:mt-0 bg-[#000000f6] text-[#F2EDE0]'>
                <div className="flex  items-center flex-col w-full   sm:h-full sm:w-[50%] sm:flex sm:justify-center sm:items-center sm:flex-col">
                    <h1 className='text-6xl sm:text-8xl sm:font-bold sm:leading-none sm:tracking-tighter bg'>EXPOSURE<br className="" />MANIA</h1>
                    <h1 className='sm:font-normal sm:leading-none sm:tracking-tight '>DISCOVER.EXPOSE.EVOLVE</h1>
                </div>
                <div className='flex flex-col justify-center items-center sm:w-[50%]'>
                    <h1 className='font-semibold text-2xl sm:text-4xl bg h-12'>Login</h1>
                    <form onSubmit={submit} className="w-[300px] sm:w-[300px]">
                        <div className="mb-5">
                            <input type='email' placeholder='Email' name='email' className='bg-transparent border-[1px] border-[#F2EDE0] w-full sm:w-[300px] p-1 rounded outline-none focus:border-[#D5E2E5]' onChange={handleChange} />
                        </div>
                        <div className="mb-5">
                            <input type='password' placeholder='Password' name='password' className='bg-transparent border-[1px] border-[#F2EDE0] w-full sm:w-[300px] p-1 rounded outline-none focus:border-[#D5E2E5]' onChange={handleChange} />
                        </div>
                        <input type='submit' value='Login' className="block w-full bg-[#d5e2e5ef] hover:bg-[#D5E2E5] text-black cursor-pointer font-semibold p-3 rounded" />
                        <Link to="/signup" className="block mt-3 text-center text-[#d5e2e5]">Don't Have Account? <span className='text-[#d5e2e5]'>Signup</span></Link>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Login