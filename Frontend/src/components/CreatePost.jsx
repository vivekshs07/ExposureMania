import React, { useContext, useState } from 'react'
import Sidebar from './Siderbar'
import UserContext from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { url } from '../constant/constant'


function CreatePost() {
  const navigate = useNavigate()
  const context = useContext(UserContext)
  const { user } = context
  const [write, setWrite] = useState("What's on your mind ?")
  const [path, setPath] = useState("")
  const [file, setImage] = useState("");
  if (write.length == 0) setWrite("What's on your mind ?");
  const onchange = (e) => {
    setWrite(e.target.value)
  }
  const handlePath = (e) => {
    e.preventDefault()
    setPath(URL.createObjectURL(e.target.files[0]));
    setImage(...file, e.target.files[0]);
  }
  
  const upload = async (e) => {
    try {
      e.preventDefault();
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('caption', write);
  
    const uploadPromise = async () => {
      const response = await fetch(`${url}/api/posts`, {
        method: "POST",
        credentials: "include",
        body: formData
      });
      const json = await response.json();
      if (json.success) {
        navigate('/feed');
      } else {
        throw new Error('Failed to upload post');
      }
    };
  
    toast.promise(uploadPromise(), {
      loading: 'Uploading post...',
      success:'Post Uploaded Successfully',
      error: (error) => {
        toast.error(error.message); // Display error toast
      },
    });
    } catch (error) {
      toast.error('Something went wrong')
    }
    
  };
  
  return (
    <>
      <Sidebar />
      <div className='md:translate-x-[300px] w-full md:h-screen pt-8 flex justify-center'>
        <div className="w-[380px] h-fit  bg-[#222326] border-[1px] border-[#424243] rounded-md">
          <div className="w-full h-[50px]">
            <div className='flex justify-start gap-4 items-center px-4 py-1  border-b-[1px] border-[#424243]'>
              <img src={user?.profilePicture}  alt="profile" className='w-10 h-10 rounded-full' />
              <h1 className='text-xl font-thin capitalize text-white'>{user?.name}</h1>
            </div>
          </div>
          <div className="w-full h-[300px] p-4 py-2 flex  flex-col gap-2 overflow-y-auto no-scrollbar">
            {path.length == 0 ? <div></div> : <img src={path} alt="profile" className='object-center w-[100%] h-[250px] rounded' />}
            <h1 className='text-white'>{write}</h1>
          </div>
          <div className="w-full h-[100px]  py-1 flex flex-col justify-center items-center gap-1 border-t-[1px] border-[#424243]">
            <div className='flex justify-around items-center gap-2'>
              <input type="text" className='bg-transparent border-[1px] text-white border-[#0F66D9] w-[300px] p-1 rounded outline-none focus:border-[#0f67d9e7]' onChange={onchange} placeholder='Write something.' />
              <input type="file" name="file" id="input-file" className='hidden' onChange={handlePath} />
              <label htmlFor="input-file"><i className="ri-image-add-line text-[#0F66D9] font-normal text-4xl cursor-pointer">
              </i></label>
            </div>
            <button className="w-[90%] h-10 bg-[#0F66D9] hover:bg-[#0f67d9e7] text-white font-semibold rounded" onClick={upload}>
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePost