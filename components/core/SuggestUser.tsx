import Link from "next/link"
import Avatar from "./Avatar"
import React from 'react'
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

export default function SuggestUser({user, size}) {

  return (
    <div>
        <Link href={`/${user.username}`} >
        <div className='suggestion-item'>
            <Avatar
            url={user.avatar_url}
            size={size}
            />
            <h4>{user.username}</h4>
            <div className="user-info">
              <p>{user.ideas}<LightbulbOutlinedIcon fontSize="small"/></p>
              <p>{user.followers}<PeopleOutlineOutlinedIcon fontSize="small"/></p>
            </div>
        </div>
        </Link>
    </div>
  )
}