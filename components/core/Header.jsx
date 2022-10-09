import { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from 'next/link';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


export default function Header({title,username}) {

  const [isButtonToggled,setIsButtonToggled] = useState(false)

  const style = {marginRight: '10px'}
  const goBack = () =>{
    setIsButtonToggled(prev => !prev)
    window.history.back();
  }
  return (
    <div className='header'>
      <div onClick={goBack} className={isButtonToggled ? 'animation-btn' : 'normal-btn'}>
          <ArrowBackIosNewIcon />
        </div>
      {
        title == 'PROFILE' ? 
        <>
        
        <h3>{username}</h3>
        <Link href='/settings'>
          <SettingsIcon fontSize='medium' style={style}/> 
        </Link> 
        </>
        :
        title == 'HOMEPAGE' ? 
        <>
        <div>{' '}</div>
        <ChatBubbleOutlineOutlinedIcon onClick={() => alert('Chat is cooming soon...')}  fontSize='medium' style={style}/>
        </>
        :
        title == 'CREATE' ? 
        <>
        <div>{' '}</div>
        < SearchOutlinedIcon fontSize='large' style={style}/>
        </>
        :
        <h2>{title}</h2>
      }
    </div>
  )
}