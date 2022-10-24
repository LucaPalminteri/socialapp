import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import React, { useState } from 'react'
import Image from 'next/image';
import ChatUserList from '../core/ChatUserList'
import {message, chat, user} from '../../helpers/types'

export default function Chat({users, activeUser, chats, lastMessages}) {  

  const [searchUser, setSearchUser] = useState("")
  
  let aux:Array<number> = []
  const arrChats:Array<JSX.Element> = chats.map((chat:chat,index:number) => {

    let lastMsg:message
    lastMessages.map((msg:message) => {
      if(
        (chat.user_id_sender == msg.user_id_sender || chat.user_id_sender == msg.user_id_reciever) 
        && 
        (chat.user_id_reciever == msg.user_id_reciever || chat.user_id_reciever == msg.user_id_sender)
        ) lastMsg = msg
    })

    aux.push(chat.user_id_reciever)
    if(chat.username == activeUser.username) {
      if(aux.some((id:number) => id == chat.user_id_sender)) return ;
      [chat] = users.filter((user:user) => user.user_id == chat.user_id_sender)
    }

    return <ChatUserList key={index} chat={chat} lastMsg={lastMsg}/>
  })

  let usersFilter:Array<user> = users.filter((user:user) => user.username.includes(searchUser))
  if(searchUser == "") usersFilter = []
  const arrayUsersFilter:Array<JSX.Element> = usersFilter.map((user:user,index:number) => <ChatUserList key={index} chat={user} lastMsg={{message: '',created_at: ''}}/>).slice(0,5)

  const inputHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value.toLowerCase());
  }
  
  return (
    <div className="chat">
      <div className='chat-search-container'>
        <input type='text' placeholder='Search someone to chat...' onChange={(e)=> inputHandler(e)} />
        <button><SearchOutlinedIcon /></button>
      </div>
      {arrayUsersFilter.length != 0 && <div className='search-chat'>
        {arrayUsersFilter}
      </div>}
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