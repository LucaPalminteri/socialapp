import Header from '../components/core/Header'
import Homepage from '../components/pages_components/Homepage'
import Footer from '../components/core/Footer'
import Head from 'next/head';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import jwt from "jsonwebtoken"; 
import { useEffect, useState } from 'react';
import Spinner from '../components/core/Spinner';

export default function Home({users,ideas,bulbs}) {

  const [ideasFoll, setideasFoll] = useState([""])

  useEffect(() => {
    getFollowByUser()
  }, [])
  
  const getFollowByUser = async () => {
    const {data} = await axios.get('/api/actions/follow-list')
    setideasFoll(data);
  }

  let array:number[] = []
  array = ideas.filter((idea:any,index:number)=> ideasFoll.some(userID => userID == idea.user_id))

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="home" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title={'HOMEPAGE'} showBackArrow={false} username={undefined}/>
      {
        array.length == 0 ?
        ideasFoll.length == 0 ?
        <Homepage users={users} ideas={array} bulbs={bulbs}/>
        :
        <Spinner />
        :
        <Homepage users={users} ideas={array} bulbs={bulbs}/>
      }
      <Footer activeNow='HOMEPAGE'/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const token = context.req.cookies.token;
  const activeUser = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_NAME);
  console.log(activeUser);

  const baseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const config = {
    headers:{
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      Authorization: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    }
  };
  
  const users = await axios.get(`${baseURL}/rest/v1/users?select=*&order=created_at`,config);
  const ideas = await axios.get(`${baseURL}/rest/v1/ideas?select=*&user_id=neq.${activeUser.user_id}&order=created_at`,config);
  const bulbs = await axios.get(`${baseURL}/rest/v1/ideas_bulbs?select=*&idea_author=neq.${activeUser.user_id}&order=created_at`,config);

  return {props: {users: users.data, ideas: ideas.data, bulbs: bulbs.data}}
}