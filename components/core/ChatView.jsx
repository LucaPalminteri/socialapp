import SendIcon from '@mui/icons-material/Send';
import { supabase } from '../../utils/supabaseClient';
import { useState,useEffect,useRef } from 'react';
import React from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {message, chat, user} from '../../helpers/types'

function ChatView({user, activeUser}) {
  const [messages, setMessages] = useState([])
  const inputMessage = useRef()

  
  useEffect(()=> {
    getMessages()
  },[])

  const getMessages = async () => {
    try {
      const { data, error } = await supabase.from('messages').select().in(`user_id_sender`,[`${activeUser.user_id}`,`${user.user_id}`]).in(`user_id_reciever`,[`${activeUser.user_id}`,`${user.user_id}`])
      if (error) throw error
      setMessages(data)
      if(window.location.href.includes('/chat/')){
        window.scrollTo({
          top: document.body.scrollHeight,
          left: 0,
          behavior: 'smooth'
        });
      }
      
    } catch(error) {
      alert(error)
    }
  }


  supabase
  .channel('*')
  .on('postgres_changes', { event: '*', schema: '*' }, payload => {
    if(window.location.href.includes('/chat/')){
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }
    setMessages(prev => prev.concat(payload.new))
    
  })
  .subscribe()

  const sendNotification = async () => {
    try {
      const {data,error} = await supabase.from('notifications')
      .insert([{
        to_user: user.user_id,
        type: 'message',
        from_user: activeUser.user_id,
        seen: false,
        created_at: new Date()
      }],{upsert: false})

      if (error) throw error
    }catch(error) {
      console.error(error);
      alert(error)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    const message = inputMessage.current.value
    console.log(message.length);
    //return;
    if (message.trim() == "") return;
    // set all last message to false
    // try {
    //   const {data,error} = await supabase
    //   .from('messages')
    //   .update({
    //     last_message: false
    //   })
    //   .eq('user_id_sender',activeUser.user_id)
    //   .eq('user_id_reciever',user.user_id)

    //   if (error) throw error
    // }catch(error) {
    //   console.error(error);
    //   alert(error)
    // }

    // insert new message with the last message in true
    try {
      const {data,error} = await supabase
      .from('messages')
      .insert([{
        user_id_sender: activeUser.user_id,
        user_id_reciever: user.user_id,
        message,
        created_at: new Date(),
        last_message: true
      }],{upsert: false})

      inputMessage.current.value = ''
      sendNotification()

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
      <p>{message.message}<div className='msg-time'>{message.created_at.slice(11,16)}</div></p>
    </div>
  )
  })
  


  return (
    <div className='chat-view'>
      <button className='btn-deleteChat' onClick={(e) => handeDeleteChat(e)}>
        <DeleteOutlineIcon />
      </button>
        <div className='chat-body'>{arrayMessages}</div>
        <form onSubmit={(e) => handleSendMessage(e)}>
          <div id='go' className='chat-input-container'>
            <input autoFocus ref={inputMessage} type='text' placeholder='Message...' />
            <button type='submit'><SendIcon/></button>
          </div>
        </form>
    </div>
  )
}

export default ChatView