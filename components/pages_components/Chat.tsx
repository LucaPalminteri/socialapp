import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Link from 'next/link';
import React from 'react'
import Avatar from '../core/Avatar';
import Image from 'next/image';
import Spinner from '../core/Spinner';


export default function Chat({users, activeUser, chats}) {  

  let aux = []
  const arrChats = chats.map((chat,index) => {
    aux.push(chat.user_id_reciever)
    if(chat.username == activeUser.username) {
      if(aux.some(id => id == chat.user_id_sender)) return ;
      [chat] = users.filter(user => user.user_id == chat.user_id_sender)
    }
    return (
     <div key={index} className='chat-item'>
      <Link href={`/chat/${chat?.username}`}>
        <div className='info-chat'>
          <Avatar url={chat.avatar_url} size={50} />
          <p>{chat.username}</p>
        </div>
      </Link>
     </div> 
    )
  })

  return (
    <div className="chat">
      <div className='chat-search-container'>
        <input type='text' placeholder='Search someone to chat...' />
        <button><SearchOutlinedIcon /></button>
      </div>
      {
        chats.length == 0 ?
        <div>
          <h3>Seems you don&apos;t have chats</h3>
          <Image src={'/chat.jpg'} width={350} height={350} alt=''/>
          <h2>Use the text input above to search friends to chat</h2>
        </div>
        :
        arrChats
      }
    </div>
  )
}