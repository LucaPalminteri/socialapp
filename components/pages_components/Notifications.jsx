import React from 'react'
import NotificationList from "../core/NotificationList"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { supabase } from '../../utils/supabaseClient';
import {useEffect} from "next"


function Notifications({notifications,currentUser}) {


  const changeNotificationState = async () => {
      try {
        const {data,error} = await supabase
        .from('notifications')
        .select()
        .is('seen',null)
        .eq('to_user',currentUser.user_id)
        
        if(data.length > 0) {
          try {
            const {data,error} = await supabase
            .from('notifications')
            .update({
              seen: true
            })
            .eq("to_user",currentUser.user_id)
            .is("seen",null)
            if (error) throw error
          }catch(error) {
            console.error(error);
          }
        }
      }catch(error) {
        console.error(error);
      }
  }
  changeNotificationState()

    let arrNotifications = notifications.map((notif,index) => <NotificationList key={index} notif={notif} i={index}/>)

    const handeDeleteChat = async() => {
        if(confirm('This notification logs will be deleted permanently for both users, are you sure you want to continue?') == false) return;
        try {
        const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('to_user',currentUser.user_id)
        if (error) throw error
        location.reload()
        } catch(error) {
          alert(error)
        }
      }
  return (
    <div className='notifications'>
        <button className='btn-deleteChat' onClick={handeDeleteChat}>
        <DeleteOutlineIcon />
        </button>
        {arrNotifications}
    </div>
  )
}

export default Notifications