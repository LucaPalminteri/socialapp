import React from 'react'
import Avatar from './Avatar'
import Link from 'next/link'

function NotificationList({notif,i}) {
      
  return (
    <div className={'notification-item ' + notif.type + (i % 2 ==0 ? ' odd' : ' even')}>
        
        <Avatar url={notif.avatar_url} size={40}/>
        {
            notif.type == 'message' ? 
            <Link href={`chat/${notif.username}`}>
                <p><span>{notif.username}</span> sent you a message.</p>
            </Link>
            :
            notif.type == 'follow' ? 
            <Link href={`${notif.username}`}>
                <p><span>{notif.username}</span> started following you.</p>
            </Link>
            :
            ""
        }
    </div>
  )
}

export default NotificationList