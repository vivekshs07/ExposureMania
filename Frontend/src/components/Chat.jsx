import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Siderbar from './Siderbar'
import { useParams } from 'react-router-dom'
import MessagePreview from './MessagePreview'
import { io } from 'socket.io-client'
import UserContext from '../context/UserContext'
import { url } from '../constant/constant'
import ScrollToBottom from 'react-scroll-to-bottom';



function Chat() {
    const [message, setMessage] = useState([]);
    const [text, setText] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user,getUser } = useContext(UserContext);
    const { username, id } = useParams();
    const [messageSent, setMessageSent] = useState(false);


    useEffect(() => {
        getUser();
        const socket = io(url, { autoConnect: false });

        const handleOnlineUsers = (users) => {
            setOnlineUsers(users);
        };

        const handleNewMessage = ({ newMessage,}) => {
            if(newMessage.sender === id || newMessage.receiver === id){
                setMessage((prevMessage) => [...prevMessage, newMessage]); 
            }
        };

        socket.connect();
        socket.emit('join', user?._id);
        socket.on('onlineUsers', handleOnlineUsers);
        socket.on('private message', handleNewMessage);

        return () => {
            // socket.emit('disconnect');
            socket.off('onlineUsers', handleOnlineUsers);
            socket.off('private message', handleNewMessage);
            socket.disconnect();
        };
    }, [id, user?._id]);

    const getMessage = useCallback(async () => {
        try {
            const response = await fetch(`${url}/api/getmessages/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await response.json();
            setMessage(data.messages);
        } catch (error) {
            console.error("Error fetching messages:", error);

        }
    }, [id]);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${url}/api/sendmessage/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ message: text })
            });
            setText('');
            setMessageSent(prevState => !prevState);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };
    useEffect(() => {
        getMessage();
    }, [messageSent]);
    
    return (
        <>
            <Siderbar />
            <ScrollToBottom className='w-full h-screen md:translate-x-[300px] py-2'>
                <div className={`md:w-[37%] overflow-y-auto no-scrollbar h-fit  md:bg-[#222326] relative rounded`}>
                    <h1 className='hidden md:block text-md font-thin w-full bg-[#222326] z-[1] md:w-[36%] cursor-pointer capitalize fixed top-30 left-0 right-0 p-4 text-white'>{username}<span className='px-2 text-green-400'>{onlineUsers.includes(id) && "online"}</span></h1>
                    <div className=''>
                        {message.length === 0 ? <div className='flex justify-center items-center h-[50vh]'>
                            <h1 className='text-white'>No Messages</h1>
                        </div> :
                            <div className='flex flex-col mt-20 gap-4'>
                                {message?.map((msg, index) => {
                                    return <MessagePreview key={index} message={msg} />
                                }
                                )}
                            </div>
                        }
                    </div>
                    <form onSubmit={sendMessage} className=" rounded justify-between px-4 items-center  h-20 flex w-full md:bg-[#222326]  z-[1]">
                        <input type="text" value={text} onChange={handleChange} className='bg-transparent border-[1px] border-[#0F66D9] text-white w-[250px] md:w-[380px] h-10 p-1 rounded outline-none focus:border-[#0f67d9e7]' placeholder='Write Message.' />
                        <input type='submit' className="w-32 h-10 text-center   bg-[#0F66D9] hover:bg-[#0f67d9e7]  text-white font-semibold rounded" value={"Send"} />
                    </form>
                    <h1 className='md:hidden  text-md font-thin w-full  cursor-pointer capitalize  p-4 text-white'>Chat with {username}<span className='px-2 text-green-400'>{onlineUsers.includes(id) && "online"}</span></h1>
                </div>
            </ScrollToBottom>
        </>
    )
}

export default Chat