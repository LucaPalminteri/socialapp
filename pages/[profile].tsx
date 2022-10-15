import Profile from '../components/pages_components/Profile';
import Header from '../components/core/Header';
import axios from 'axios';
import Footer from '../components/core/Footer';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import jwt from "jsonwebtoken"; 


export default function Post({user, ideas, follows, followers}) {

  return (
    <div>
        <Head>  
          <title>{user.fullname}</title>
          <meta name="login" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header title={'PROFILE'} username={user.username} showBackArrow={true}/>
        <Profile user={user} ideas={ideas} follows={follows} followers={followers}/>
        <Footer activeNow={'PROFILE'}/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.token;
  const activeUser = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_NAME);

  const currentUser = context.query.profile

  if (currentUser == 'undefined') return {redirect: {permanent: false, destination: `/${activeUser.username}`}}

  const baseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const config = {
    headers:{
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      Authorization: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    }
  };
  const user = await axios.get(`${baseURL}/rest/v1/users?select=*&username=eq.${currentUser}`,config);
  const userId = await user.data[0].user_id
  const ideas = await axios.get(`${baseURL}/rest/v1/ideas?select=*&user_id=eq.${userId}`,config);
  const follows = await axios.get(`${baseURL}/rest/v1/user_follows?select=*&user_id=eq.${userId}`,config);
  const followers = await axios.get(`${baseURL}/rest/v1/user_follows?select=*&follow_user_id=eq.${userId}`,config);
  
  const data = {user: {...user.data[0], password: null}, ideas: ideas.data, follows: follows.data, followers: followers.data};

  return {props: data}
}