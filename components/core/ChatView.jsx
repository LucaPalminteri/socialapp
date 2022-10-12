import SendIcon from '@mui/icons-material/Send';
import { supabase } from '../../utils/supabaseClient';
import { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import React from 'react'

function ChatView({user, activeUser}) {

  const [messages, setMessages] = useState([])
  const inputMessage = useRef()

  useEffect(()=> {
    getMessages()
    
  },[])

  const getMessages = async () => {
    try {
      const { data, error } = await supabase.from('messages').select()

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
    setMessages(prev => prev.concat({message:payload.new.message,user_id_sender:activeUser.user_id,user_id_reciever: user.user_id}))
  })
  .subscribe()

  const handleSendMessage = async () => {
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

  const arrayMessages = messages.map((message,index) => {

  return (
    <div key={index} className={message.user_id_sender == activeUser.user_id ?  "msg sender" : message.user_id_reciever == activeUser.user_id ? "msg reciever" : ""}>
      <p>{message.message}</p>
    </div>
  )
  })
  


  return (
    <div className='chat-view'>
        <div>{arrayMessages}</div>
        <footer>
          <div id='go' className='chat-input-container'>
            <input autoFocus ref={inputMessage} type='text' placeholder='Message...' />
            <button onClick={handleSendMessage}><SendIcon/></button>
          </div>
        </footer>
    </div>
  )
}

export default ChatView