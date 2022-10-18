import React from 'react'
import Avatar from '../core/Avatar'
import Link from 'next/link'

function ChatUserList({chat}) {
    
    return (
     <div className='chat-item'>
      <Link href={`/chat/${chat?.username}`}>
        <div className='info-chat'>
          <Avatar url={chat.avatar_url} size={50} />
          <div>
            <p>{chat.username}</p>
            <p>Last message</p>
          </div>
        </div>
      </Link>
     </div> 
    )
}

export default ChatUserList