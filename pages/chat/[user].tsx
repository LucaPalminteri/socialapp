import Header from '../../components/core/Header'
import { useRouter } from 'next/router'
import ChatView from '../../components/core/ChatView'
import jwt from "jsonwebtoken"; 
import axios from 'axios';
import { GetServerSideProps } from 'next';

function User({userActive, activeUser}) {
  const router = useRouter()
  const {user} = router.query

  return (
    <div>
        <Header username={user} showBackArrow={true} title={'chat'}/>
        <ChatView user={userActive} activeUser={activeUser}/>
    </div>
  )
}

export default User

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.token;

  const chatUser = context.query.user;
  
  const activeUser = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_NAME);

  const baseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const config = {
    headers:{
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      Authorization: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    }
  };
  const user = await axios.get(`${baseURL}/rest/v1/user?select=*&username=eq.${chatUser}`,config);

  return {props: {userActive: user.data[0], activeUser}}
}