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

export default function Footer({activeNow}) {

  const [user, setUser] = useState()

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const {data} = await axios.get('/api/profile')
    setUser(data.username)
  }
  

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
                <NotificationsNoneOutlinedIcon className='footer-icon' fontSize='large' /> 
            }
            </Link>
            <Link href={`/${user}`} >
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