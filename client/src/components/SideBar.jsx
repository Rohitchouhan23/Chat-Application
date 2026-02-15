import React from 'react'
import { useNavigate } from 'react-router-dom'
import favicon from "../assets/favicon.png";
import Menulogo from '../assets/menulogo.png';
import { userDummyData, assets } from '../assets/Dumy';

function SideBar({selectUser,setSelectUser}) {
    const navigate = useNavigate();
  return (
    <div className={`bg-[#8185b2]/10 h-full px-2 rounded-xl overflow-y-scroll text-white ${selectUser ? 'max-md:hidden' : ''}`}>
        <div className=''>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <img src={favicon} alt="logo" className='h-8 w-8 object-contain' />
                    <span className='text-lg font-semibold tracking-wide text-white'>
                    QuickChat
                    </span>
                </div>
                <div className='relative py-2 group'>
                    <img src={Menulogo} alt="logo" className='max-h-10 cursor-pointer'/>
                    <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142]
                    border border-gray-600 text-gray-100 hidden group-hover:block'>
                        <p onClick={()=>navigate('/profile')} className='cursor-pointer text-sm'>Edit Profile</p>
                        <hr className=' my-2 border-t border-gray-500'/>
                        <p className='cursor-pointer text-sm'>Lagout</p>
                    </div>
                </div>
            </div>
            <div className='bg-[#282142] rounded-full flex items-center gap-2 py-1 px-4 mt-5'>
                <input type="text" className='bg-transparent border-none outline-none text-white  text-lg placeholder-[#c8c8c8] flex-1 ' placeholder='Search User...'/>
            </div>
        </div>
        <div className='flex flex-col pt-2'>
            {userDummyData.map((user,index)=>(
                <div onClick={()=>{setSelectUser(user)}}
                key={index}
                className={`relative flex items-center gap-2 pl-4 p-2 pt-4 rounded cursor-pointer max-sm:text-sm ${selectUser ?._id === user._id && 'bg-[#282142]/50'}`}>
                    <img src={user?.profilePic || assets.avatar_icon} alt=""
                     className='w-[35px] aspect-[1/1] rounded-full'/>
                     <div className='flex flex-col leading-5'>
                        <p>{user.fullname}</p>
                        {
                            index < 3
                            ? <span className='text-green-400 text-xs'>online</span>
                            : <span className='text-neutral-400 text-xs'>offline</span>
                        }
                        {index > 2 && <p className='
                        absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>{index}</p>}
                     </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SideBar