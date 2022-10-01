import React from 'react'
import Link from 'next/link'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

function Footer({activeNow}) {

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
            <Link href={'/create'}>
              {
                activeNow == 'CREATE' ?
                <div className='line-icon'><AddCircleOutlinedIcon className='footer-icon active' fontSize='large' /></div> :
                <AddCircleOutlineOutlinedIcon className='footer-icon' fontSize='large' /> 
              }
            </Link>
            <Link href={'/profile'}>
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

export default Footer