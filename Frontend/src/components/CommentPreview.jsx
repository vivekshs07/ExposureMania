import React from 'react'

function CommentPreview({comment,username}) {
  return (
    <div>
        <div className='flex p-4 items-center gap-4 text-white'>
            <div className='flex flex-col'>
            <h1 className='text-sm font-semibold'>{username}</h1>
            <p className='text-sm font-thin'>{comment.content}</p>
            </div>
        </div>
    </div>
  )
}

export default CommentPreview