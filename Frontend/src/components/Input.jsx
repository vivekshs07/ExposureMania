import React, { forwardRef, useState } from 'react'
const Input = forwardRef(({ type, placeholder, name, ...props }, ref) => {
  const [user, setUser] = useState({ username: '', password: '' })
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    
      <input
        type={type}
        className="bg-transparent border-[1px] border-[#A9D356] w-[300px] p-1 rounded outline-none focus:border-[#8BC765]"
        name={{ name }} placeholder={placeholder} ref={ref} {...props} onChange={handleChange}
      />
  )
})

export default Input