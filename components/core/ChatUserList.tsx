import React from 'react'
import Avatar from './Avatar'
import Link from 'next/link'

function ChatUserList({chat,lastMsg}) {

  let timeLastMsg:string;
    let currentDate:Date = new Date();
    let lastMsgDate:Date = new Date(lastMsg.created_at)
    const funcDiff = (date:any, otherDate:any) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 3));

    let difference = funcDiff(currentDate,lastMsgDate)
    const diffDays = Math.ceil(difference / (1000 * 60 * 60 * 24)); 
    const diffHours = Math.ceil(difference / (1000 * 60 * 60)); 
    const diffMinutes = Math.ceil(difference / (1000 * 60));
    const diffSeconds = Math.ceil(difference / (1000));


    
    if (diffDays == 0) {
      timeLastMsg = "x days ago"

      if (diffHours == 0) {
        timeLastMsg = "x hours ago"

        if (diffMinutes == 0) {
          timeLastMsg = "x minutes ago"

          if (diffSeconds == 0) {
            timeLastMsg = "x seconds ago"
            
          } else if(diffSeconds != 0) {
            console.log("seconds of delay");
          }
        } else if(diffMinutes != 0) {
          console.log("minutes of delay");
        }
      } else if(diffHours != 0) {
        console.log("hours of delay");
      }
    } else if(diffDays != 0) {
      console.log("days of delay");
    }


    return (
     <div className='chat-item'>
      <Link href={`/chat/${chat?.username}`}>
        <div className='info-chat'>
          <Avatar url={chat.avatar_url} size={50} />
          <div>
            <p>{chat.username}</p>
            <p>{lastMsg.message.length > 25 ? lastMsg.message.slice(0,25)+"..." : lastMsg.message}<span> - {lastMsg.created_at.slice(11,16)}</span></p>
          </div>
        </div>
      </Link>
     </div> 
    )
}

export default ChatUserList