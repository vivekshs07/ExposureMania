import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";

import toast from "react-hot-toast";
import { url } from "../constant/constant";

const UserState = (props) => {
    const [login, setLogin] = useState(localStorage.getItem("auth") ? true : false)
    const [posts, setPost] = useState([])
    const [user, setUser] = useState()
    const [userImage, setImage] = useState([])
    const getUser = async () => {
        const response = await fetch(`${url}/api/getuser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }, credentials: "include",
        });
        const json = await response.json();
        setUser(json.user[0])
        setImage(json.posts)
    }
    const logout = async () => {
        const response = await fetch(`${url}/api/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, credentials: "include",
        });
    }
    const getPosts = async () => {
        try {
            const response = await fetch(`${url}/api/getposts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }, credentials: "include",
            });
            const json = await response.json();
            setPost(json.posts.reverse())
        } catch (error) {
            toast.error('Something went wrong')
        }
    }
    return (
        <UserContext.Provider value={{ login, setLogin, getUser, getPosts, logout, posts, user, userImage }}>
            {props.children}
        </UserContext.Provider>
    );
}
export default UserState
