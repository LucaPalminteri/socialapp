import React from 'react'
import NotificationList from "../core/NotificationList"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { supabase } from '../../utils/supabaseClient';


function Notifications({notifications,currentUser}) {

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