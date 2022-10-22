import React from 'react'
import Avatar from '../core/Avatar'
import Link from 'next/link'

function ChatUserList({chat,lastMsg}) {
    
    return (
     <div className='chat-item'>
      <Link href={`/chat/${chat?.username}`}>
        <div className='info-chat'>
          <Avatar url={chat.avatar_url} size={50} />
          <div>
            <p>{chat.username}</p>
            <p>{lastMsg.length > 50 ? lastMsg.slice(0,50)+"..." : lastMsg}</p>
          </div>
        </div>
      </Link>
     </div> 
    )
}

export default ChatUserList