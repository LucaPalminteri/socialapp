import Link from 'next/link'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';

export default function Footer({activeNow}) {

  const [user, setUser] = useState({user_id:"",username:""})
  const [showNotif, setShowNotif] = useState(false)

  useEffect(() => {
    getUser()
  }, [])

  supabase
  .channel('*')
  .on('postgres_changes', { event: '*', schema: '*' }, payload => {
    getNotifications()
    console.log(payload.new.user_id_reciever == user.user_id)
  })
  .subscribe()

  const getUser = async () => {
    const {data} = await axios.get('/api/profile')
    setUser(data)
  }

  const getNotifications = async () => {
    try {
      const {data,error} = await supabase
      .from("notifications")
      .select()
      .eq("to_user",user?.user_id)
      .is("seen",null)

      if(data?.length > 0) setShowNotif(true)
    } catch (error) {
      console.error(error)
    }
  }
  if(user.user_id != "")getNotifications()

  return (
    <div className='footer'>
        <nav>
            <Link href={'/homepage'}>
              {
                activeNow == 'HOMEPAGE' ?
                <div className='line-icon'><HomeRoundedIcon className='footer-icon active' fontSize='large'  /></div> :
                <HomeOutlinedIcon className='footer-icon' fontSize='large' /> 
              }
            </Link>
            <Link href={`/search`}>
            {
                activeNow == 'SEARCH' ?
                <div className='line-icon'><SearchOutlinedIcon className='footer-icon active' fontSize='large' /></div> :
                <SearchOutlinedIcon className='footer-icon' fontSize='large' /> 
            }
            </Link>
            <Link href={'/create'}>
              {
                activeNow == 'CREATE' ?
                <div className='line-icon'><AddCircleOutlinedIcon className='footer-icon active' fontSize='large' /></div> :
                <AddCircleOutlineOutlinedIcon className='footer-icon' fontSize='large' /> 
              }
            </Link>
            <Link href={`/notifications`}>
            {
                activeNow == 'NOTIFICATIONS' ?
                <div className='line-icon'><NotificationsIcon className='footer-icon active' fontSize='large' /></div> :
                <div className='notification-icon-container'><NotificationsNoneOutlinedIcon className='footer-icon' fontSize='large' /><div className={showNotif ? 'notification-circle' : ''}></div></div>
            }
            </Link>
            <Link href={`/${user?.username}`} > 
            {
                activeNow == 'PROFILE' ?
                <div className='line-icon'><AccountCircleRoundedIcon className='footer-icon active' fontSize='large' /></div> :
                <AccountCircleOutlinedIcon className='footer-icon' fontSize='large' /> 
            }
            </Link>
            
        </nav>
    </div>
  )
}