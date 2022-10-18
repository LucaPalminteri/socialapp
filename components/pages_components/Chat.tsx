import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Avatar from '../core/Avatar';
import Image from 'next/image';
import Spinner from '../core/Spinner';
import {supabase} from '../../utils/supabaseClient'
import ChatUserList from '../core/ChatUserList'

export default function Chat({users, activeUser, chats}) {  



  const [ready, setIsReady] = useState(false)

  useEffect(() => {
    
  setTimeout(() => {
    setIsReady(true)
  }, 2000);
  }, [])
  
  const getLastMessage = async (id_sen, id_rec) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select()
        .or(`and(user_id_sender.eq.${id_sen},user_id_reciever.eq.${id_rec}),and(user_id_sender.eq.${id_rec},user_id_reciever.eq.${id_sen})`)
        .order('id',{ascending:false})
        .limit(1)

        if(error) throw error
        return data[0].message
    } catch(error) {
      console.error(error)
    }
  }
  
  let aux = []
  const arrChats = chats.map((chat,index) => {
    aux.push(chat.user_id_reciever)
    if(chat.username == activeUser.username) {
      if(aux.some(id => id == chat.user_id_sender)) return ;
      [chat] = users.filter(user => user.user_id == chat.user_id_sender)
    }

    return <ChatUserList key={index} chat={chat}/>
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