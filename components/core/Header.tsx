import { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from 'next/link';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Avatar from './Avatar'
import React from 'react'

export default function Header({ title, username, showBackArrow }) {

  const [isButtonToggled,setIsButtonToggled] = useState(false)

  const goBack = () =>{
    setIsButtonToggled(prev => !prev)
    window.history.back();
  }
  return (
    <div className='header'>
      {showBackArrow ? <div onClick={goBack} className={isButtonToggled ? 'header-left-icon animation-btn' : 'header-left-icon normal-btn'}>
        <ArrowBackIosNewIcon />
      </div> : <></>}
      
      { title === 'chat' ?
        <div className='header-title chat-title'>
          <Avatar size={35} url={username.slice(username.indexOf(' ')+1 == 'null' ? 'user.jpg' : username.indexOf(' ')+1)}/>
          <h3 className='header-medium-icon'>{username.slice(0,username.indexOf(' '))}</h3>
        </div>
        :
          <h3 className='header-medium-icon'>{username}</h3>
      }

      {
        title == 'PROFILE' ? 
        <Link href='/settings'>
          <SettingsIcon fontSize='medium' className='header-right-icon' /> 
        </Link> 
        :
        title == 'HOMEPAGE' ? 
        <Link href={'/chat'}>
          <ChatBubbleOutlineOutlinedIcon fontSize='medium' className='header-right-icon' />
        </Link>
        :
        // title == 'CREATE' ? 
        // <SearchOutlinedIcon fontSize='large' className='header-right-icon' />
        // :
        <></>
      }
    </div>
  )
}