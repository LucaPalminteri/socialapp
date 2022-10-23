import React from 'react'
import Avatar from '../core/Avatar'
import Link from 'next/link'

function ChatUserList({chat,lastMsg}) {

  let timeLastMsg = "";
    let currentDate = new Date();
    let lastMsgDate = new Date(lastMsg.created_at)

    var difference= Math.abs(currentDate - lastMsgDate) - (1000 * 60 * 60 * 3);
    // milliseconds - seconds - minutes - hours 
    const diffDays = Math.ceil(difference / (1000 * 60 * 60 * 24)); 
    const diffHours = Math.ceil(difference / (1000 * 60 * 60)); 
    const diffMinutes = Math.ceil(difference / (1000 * 60));
    const diffSeconds = Math.ceil(difference / (1000));

    
    console.log("");
    console.log(chat.username);
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

    console.log(timeLastMsg);


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