import SendIcon from '@mui/icons-material/Send';
import { supabase } from '../../utils/supabaseClient';
import { useState,useEffect,useRef } from 'react';
import axios from 'axios';

function ChatView({user, activeUser}) {

  const [messages, setMessages] = useState([])
  const inputMessage = useRef()

  useEffect(()=> {
    getMessages()
    console.log(document.body.scrollHeight);
  },[])

  const getMessages = async () => {
    try {
      const { data, error } = await supabase.from('messages').select()

      if (error) throw error
      setMessages(data)
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    } catch(error) {
      alert(error)
    }
  }


  supabase
  .channel('*')
  .on('postgres_changes', { event: '*', schema: '*' }, payload => {
    setMessages(prev => prev.concat({message:payload.new.message,user_id_sender:activeUser.user_id }))
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

      window.scrollTo({
        top: document.body.scrollHeight + 1000,
        left: 0,
        behavior: 'smooth'
      });

      if (error) throw error
    }catch(error) {
      console.log(error);
      alert(error)
    }

  }

  const arrayMessages = messages.map((message,index) => {
  return (
    <div key={index} className={message.user_id_sender != activeUser.user_id ? "msg reciever" : "msg sender" }>
      <p>{message.message}</p>
    </div>
  )
  })
  


  return (
    <div className='chat-view'>
        <div>{arrayMessages}</div>
        <footer>
          <div className='chat-input-container'>
            <input autoFocus ref={inputMessage} type='text' placeholder='Message...' />
            <button onClick={handleSendMessage}><SendIcon/></button>
          </div>
        </footer>
    </div>
  )
}

export default ChatView