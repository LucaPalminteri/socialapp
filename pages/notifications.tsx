import React from 'react'
import Footer from '../components/core/Footer'
import Header from '../components/core/Header'
import axios from 'axios';
import { GetServerSideProps } from 'next';
import jwt from "jsonwebtoken"; 
import Notifications from '../components/pages_components/Notifications'

function NotificationsPage({notifications,currentUser}) {

  return (
    <div>
        <Header showBackArrow={true} title={undefined} username={"Notifications"}/>
        <Notifications notifications={notifications} currentUser={currentUser} />
        <Footer activeNow='NOTIFICATIONS'/>
    </div>
  )
}

export default NotificationsPage

export const getServerSideProps: GetServerSideProps = async (context) => {

  const token = context.req.cookies.token;
  const currentUser = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_NAME);
  console.log(currentUser);

  const baseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const config = {
    headers:{
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      Authorization: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    }
  };
  
  const notifications = await axios.get(`${baseURL}/rest/v1/user_notifications?select=*&to_user=eq.${currentUser.user_id}&order=created_at.desc`,config);

  return {props: {notifications: notifications.data, currentUser}}
}