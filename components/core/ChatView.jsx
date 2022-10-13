import SendIcon from '@mui/icons-material/Send';
import { supabase } from '../../utils/supabaseClient';
import { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import React from 'react'
import Avatar from './ChangeAvatar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function ChatView({user, activeUser}) {
  const [messages, setMessages] = useState([])
  const inputMessage = useRef()

  useEffect(()=> {
    getMessages()
  },[])
//.eq('user_id_sender',activeUser.user_id).eq('user_id_reciever',user.user_id)
  const getMessages = async () => {
    try {
      const { data, error } = await supabase.from('messages').select().in(`user_id_sender`,[`${activeUser.user_id}`,`${user.user_id}`]).in(`user_id_reciever`,[`${activeUser.user_id}`,`${user.user_id}`])
      if (error) throw error
      setMessages(data)
      
    } catch(error) {
      alert(error)
    }
  }


  supabase
  .channel('*')
  .on('postgres_changes', { event: '*', schema: '*' }, payload => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
    setMessages(prev => prev.concat(payload.new))
  })
  .subscribe()

  const handleSendMessage = async (e) => {
    e.preventDefault()
    const message = inputMessage.current.value
    if (message.trim() == "") return;
    try {
      const {data,error} = await supabase.from('messages')
      .insert([{
        user_id_sender: activeUser.user_id,
        user_id_reciever: user.user_id,
        message,
        created_at: new Date()
      }],{upsert: false})

      inputMessage.current.value = ''

      if (error) throw error
    }catch(error) {
      console.error(error);
      alert(error)
    }

  }

  const handeDeleteChat = async() => {
    if(confirm('This chat will be deleted permanently for both users, are you sure you want to continue?') == false) return;
    try {
    const { error } = await supabase
    .from('messages')
    .delete()
    .in(`user_id_sender`,[`${activeUser.user_id}`,`${user.user_id}`]).in(`user_id_reciever`,[`${activeUser.user_id}`,`${user.user_id}`])
    if (error) throw error
    location.reload()
    } catch(error) {
      alert(error)
    }
  }

  const arrayMessages = messages.map((message,index) => {
  return (
    <div key={index} className={message.user_id_sender == activeUser.user_id ?  "msg sender" : "msg reciever" }>
      <p>{message.message}</p>
    </div>
  )
  })
  


  return (
    <div className='chat-view'>
      <button className='btn-deleteChat' onClick={handeDeleteChat}>
        <DeleteOutlineIcon />
      </button>
        <div className='chat-body'>{arrayMessages}</div>
        <form onSubmit={handleSendMessage}>
          <div id='go' className='chat-input-container'>
            <input autoFocus ref={inputMessage} type='text' placeholder='Message...' />
            <button type='submit'><SendIcon/></button>
          </div>
        </form>
    </div>
  )
}

export default ChatView