// DotMenu.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { url } from '../constant/constant';

const DotMenu = ({ id, path, caption }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleDelete = async () => {
    const response = await fetch(`${url}/api/deletepost/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }, credentials: "include",
    });
    setMenuVisible(false);
  };

  const handleEdit = () => {
    setMenuVisible(false);
    navigate(`/editpost/${id}`);
  };

  return (
    <div className="relative inline-block ">
      <div
        className="cursor-pointer w-6 h-6 flex items-center justify-center gap-1"
        onClick={handleToggleMenu}
      >
        <span className="block h-1 w-1 rounded-full bg-gray-700"></span>
        <span className="block h-1 w-1 rounded-full bg-gray-700 my-1"></span>
        <span className="block h-1 w-1 rounded-full bg-gray-700"></span>
      </div>
      {menuVisible && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-300 shadow-md">
          <div className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={handleEdit}>
            Edit
          </div>
          <div className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={handleDelete}>
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default DotMenu;
