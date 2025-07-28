import React from 'react'
function Image({data}) {
    return (
        <div className="w-[100px] h-[100px] border-[1px]  border-[#ffffff] overflow-hidden ">
            <img src={data.path} className='w-full h-full object-cover' alt="" />
        </div>
    )
}

export default Image