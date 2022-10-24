import Header from '../components/core/Header'
import Chat from '../components/pages_components/Chat'
import axios from 'axios';
import jwt from "jsonwebtoken"; 
import { GetServerSideProps } from 'next';

export default function chat({users, activeUser, chats, messages}) {

  return (
    <div>
        <Header username={activeUser.username} showBackArrow={true} title={undefined}/>
        <Chat users={users} activeUser={activeUser} chats={chats} lastMessages={messages}/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.req.cookies.token;
    const activeUser = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_NAME);

    const baseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const config = {
      headers:{
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      }
    };

    const users = await axios.get(`${baseURL}/rest/v1/users?select=*&order=created_at&username=neq.${activeUser.username}`,config);
    const chats = await axios.get(`${baseURL}/rest/v1/user_messages?select=*&or=(user_id_sender.eq.${activeUser.user_id},user_id_reciever.eq.${activeUser.user_id})`,config);    
    const messages = await axios.get(`${baseURL}/rest/v1/messages?last_message=eq.true&or=(user_id_sender.eq.${activeUser.user_id},user_id_reciever.eq.${activeUser.user_id})`,config);    

    return {props: {users: users.data, activeUser,chats: chats.data, messages: messages.data}}
  }