import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Link from 'next/link';
import React from 'react'

export default function Chat({users, activeUser}) {
  return (
    <div className="chat">
      <div className='chat-search-container'>
        <input type='text' placeholder='Search someone to chat...' />
        <button><SearchOutlinedIcon fontSize='small'/></button>
      </div>

      <Link href={'/chat/luca_palmi'}>
        <p>Chat to @luca_palmi</p>
      </Link>
      <hr />
      <Link href={'/chat/luca_clon'}>
        <p>Chat to @luca_clon</p>
      </Link>
    </div>
  )
}