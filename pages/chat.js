import Header from '../components/core/Header'
import Chat from '../components/pages_components/Chat'
import axios from 'axios';
import jwt from "jsonwebtoken"; 

export default function chat({users, activeUser}) {
  return (
    <div>
        <Header username={activeUser.username} showBackArrow={true} />
        <Chat users={users} activeUser={activeUser}/>
    </div>
  )
}

export async function getServerSideProps(context) {
    const token = context.req.cookies.token;
    const activeUser = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_NAME);

    const baseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const config = {
      headers:{
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      }
    };
    const users = await axios.get(`${baseURL}/rest/v1/user?select=*&order=created_at`,config);
  
    return {props: {users: users.data, activeUser}}
  }