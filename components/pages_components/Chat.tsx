import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Link from 'next/link';
import React from 'react'
import SuggestUser from '../core/SuggestUser';
import Avatar from '../core/Avatar';
import Image from 'next/image';


export default function Chat({users, activeUser}) {

  const arrayChats = users.map((user:any,index:number) => {
    return (
     <div key={index} >
      <Link href={`/chat/${user?.username}`}><div style={{display: 'flex', alignItems: 'center', marginLeft: '20%',padding: '10px 0'}}><Avatar url={user.avatar_url} size={40} />{user.username}</div></Link>
     </div> 
    )
  })

  return (
    <div className="chat">
      <div className='chat-search-container'>
        <input type='text' placeholder='Search someone to chat...' />
        <button><SearchOutlinedIcon fontSize='small'/></button>
      </div>
      <Image src={'/chat.jpg'} width={300} height={300} alt=''/>
      {arrayChats}
    </div>
  )
}