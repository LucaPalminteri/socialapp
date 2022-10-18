import axios from "axios";
import { useState,useEffect } from 'react'
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabaseClient";
import SendIcon from '@mui/icons-material/Send';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

export default function FollowContainer({ideas, user, follows, followers}) {

  const [userFollowers, setUserFollowers] = useState(followers.length)
  const [currentUser, setCurrentUser] = useState({})  
  const [isFollowing, setIsFollowing] = useState(undefined)
  const route = useRouter()

  useEffect(() => {
    getUser()
    
  }, [])

  
  const handleFollow = async () => {
    if (isFollowing) {
      const {data} =  await axios.put('/api/actions/unfollow', {user_id: currentUser.user_id, follow_user_id: user.user_id})
    }
    else {
      const {data} =  await axios.post('/api/actions/follow',{user_id: currentUser.user_id, follow_user_id: user.user_id})
      sendNotification()
    }

    setIsFollowing(prev => !prev)
    setUserFollowers(prev => isFollowing ? prev-1 : prev+1)
  }

  const updateUserData = async ()=> {
    try {
      const { data, error} = await supabase
      .from('account_data')
      .update(
        {
          followers:userFollowers,
          following:follows.length,
          ideas:ideas.length
        }
      )
      .eq('user_id',user?.user_id)
      if (error) throw error
    } catch (error) {
      alert(error)
    }
  }
  if (currentUser.user_id != undefined) updateUserData()
  const followUser = async ()=> {
      const {data} = await supabase.from('user_follows').select().eq('user_id',currentUser.user_id).eq('follow_user_id',user.user_id)
      if (data.length != 0) setIsFollowing(true)
      else if (data != []) setIsFollowing(false)
      
  }
  if (currentUser.user_id != undefined) followUser()
  
  const getUser = async () => {
    try {
      const {data} = await axios.get("/api/profile");
      setCurrentUser(data)
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChat = ()=> {
    route.push(`/chat/${user.username}`);
  }

  const sendNotification = async () => {
    try {
      const {data,error} = await supabase.from('notifications')
      .insert([{
        user_id: user.user_id,
        type: 'follow',
        from: currentUser.user_id,
        created_at: new Date()
      }],{upsert: false})

      if (error) throw error
    }catch(error) {
      console.error(error);
      alert(error)
    }
  }


  return (
    <div className='profile-data'>
      <div className='data'>
        <h4>Ideas</h4>
        <h4>{ideas.length}</h4>
      </div>
      <div className='data'>
        <h4>Followers</h4>
        <h4>{userFollowers}</h4> 
      </div>
      <div className='data'>
        <h4>Follows</h4>
        <h4>{follows.length}</h4>
      </div>
      {
        currentUser == {} ?
        <button>.</button>
        :
          currentUser.user_id == user.user_id ? 
          <Link href={{pathname: '/edit-profile'}}>
            <button className='btn-follow'>Edit Profile</button>
          </Link>
          :
          <>
          <button className='btn-follow' onClick={()=>handleFollow()}>
            {
              isFollowing == undefined ?
              "Loading..."
              :
              isFollowing ?
                'Unfollow' 
                : 
                'Follow' 
            }
          </button>
          </>
      }
          <button onClick={handleChat} className="btn-chat">
            {
              currentUser.user_id == user.user_id ?
              <PeopleOutlineIcon/>
              :
              <SendIcon/>
            }
          </button>
    </div>
  )
}