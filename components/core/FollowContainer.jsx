import axios from "axios";
import { useState,useEffect } from 'react'
import Link from "next/link";
import { supabase } from "../../utils/supabaseClient";

function FollowContainer({ideas, user, follows, followers}) {

  const [userFollowers, setUserFollowers] = useState()
  const [userFollows, setUserFollows] = useState()
  const [currentUser, setCurrentUser] = useState({})
  const [isFollowing, setIsFollowing] = useState(undefined)

  useEffect(() => {
    getUser() 
    setUserFollowers(followers.length)
    setUserFollows(follows.length)
  }, [])

  
  const handleFollow = async () => {
    if (isFollowing) {
      const {data} =  await axios.put('/api/actions/unfollow', {user_id: currentUser.user_id, follow_user_id: user.user_id})
    }
    else {
      const {data} =  await axios.post('/api/actions/follow',{user_id: currentUser.user_id, follow_user_id: user.user_id})
    }

    setIsFollowing(prev => !prev)
    setUserFollowers(prev => isFollowing ? prev-1 : prev+1)
  }

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

  return (
    <div className='profile-data'>
      <div className='data'>
        <h4>Ideas</h4>
        <h4>{ideas}</h4>
      </div>
      <div className='data'>
        <h4>Followers</h4>
        <h4>{userFollowers}</h4> 
      </div>
      <div className='data'>
        <h4>Follows</h4>
        <h4>{userFollows}</h4>
      </div>
      {
        currentUser == {} ?
        <button>.</button>
        :
          currentUser.user_id == user.user_id ? 
          <Link href={{pathname: '/edit-profile',query: 'example'}}>
            <button className='btn-follow'>Edit Profile</button>
          </Link>
          :
          <button className='btn-follow' onClick={()=>handleFollow()}>
            {
              isFollowing == undefined ?
              "..."
              :
              isFollowing ?
                'Unfollow' 
                : 
                'Follow' 
            }
          </button>
      }
    </div>
  )
}

export default FollowContainer