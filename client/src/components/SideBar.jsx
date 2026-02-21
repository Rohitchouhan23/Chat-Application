import React,{useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import favicon from "../assets/favicon.png";
import Menulogo from '../assets/Menulogo.png';
import { assets } from '../assets/Dumy.js';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

function SideBar() {
    const {getUsers,users,selectedUser,setSelectedUser,unseenMessages,setUnseenMessages}=useContext(ChatContext)
    const {logout,onlineUsers}=useContext(AuthContext);

    const [input,setInput]=useState("")

    const navigate = useNavigate();

    const filteredUsers = input
        ? users.filter((user) =>
            user?.fullName?.toLowerCase().includes(input.toLowerCase())
        )
        : users;

    useEffect(()=>{
        getUsers();
    },[onlineUsers])

  return (
    <div className={`bg-[#8185b2]/10 h-full px-2 rounded-xl overflow-y-auto text-white ${selectedUser ? 'max-md:hidden' : ''}`}>
        <div className=''>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <img src={favicon} alt="logo" className='h-8 w-8 object-contain' />
                    <span className='text-lg font-semibold tracking-wide text-white'>
                    NexTalk
                    </span>
                </div>
                <div className='relative py-2 group'>
                    <img src={Menulogo} alt="logo" className='max-h-10 cursor-pointer'/>
                    <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142]
                    border border-gray-600 text-gray-100 hidden group-hover:block'>
                        <p onClick={()=>navigate('/profile')} className='cursor-pointer text-sm'>Edit Profile</p>
                        <hr className=' my-2 border-t border-gray-500'/>
                        <p onClick={()=>logout()}className='cursor-pointer text-sm'>Logout</p>
                    </div>
                </div>
            </div>
            <div className='bg-[#282142] rounded-full flex items-center gap-2 py-1 px-4 mt-5'>
                <input onChange={(e)=>setInput(e.target.value)} type="text" className='bg-transparent border-none outline-none text-white  text-lg placeholder-[#c8c8c8] flex-1 '
                 placeholder='Search User...'/>
            </div>
        </div>
        <div className='flex flex-col pt-2'>
            {filteredUsers.map((user,index)=>(
                <div onClick={()=>{setSelectedUser(user); setUnseenMessages(prev=>({...prev,[user._id]:0}))}}
                key={index}
                className={`relative flex items-center gap-2 pl-4 p-2 pt-4 rounded cursor-pointer max-sm:text-sm ${selectedUser ?._id === user._id && 'bg-[#282142]/50'}`}>
                    <img
                        src={user?.profilePic || assets.avatar_icon}
                        alt=""
                        className={`aspect-square object-cover rounded-full transition-all duration-200 
                        ${input ? "w-8 h-8" : "w-12 h-12"}`}
                    />
                    <div className='flex flex-col leading-5'>
                        <p>{user.fullName}</p>
                        {
                            onlineUsers.includes(user._id)
                            ? <span className='text-green-400 text-xs'>online</span>
                            : <span className='text-neutral-400 text-xs'>offline</span>
                        }
                        {unseenMessages[user._id] >0 && <p className='
                        absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>{unseenMessages[user._id]}</p>}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SideBar