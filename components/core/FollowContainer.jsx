import axios from "axios";
import { useState,useEffect } from 'react'
import Link from "next/link";
import { supabase } from "../../utils/supabaseClient";

function FollowContainer({ideas, user, follows, followers}) {

  const [btnState, setBtnState] = useState(false)
  const [userFollowers, setUserFollowers] = useState()
  const [userFollows, setUserFollows] = useState()
  const [currentUser, setCurrentUser] = useState({})
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    setUserFollowers(followers.length)
    setUserFollows(follows.length)
    getUser() 
    followUser()
  }, [])

  console.log(currentUser.user_id);

  const handleFollow = () => {
    
    setBtnState(prev => !prev)
    if(btnState) setUserFollowers(prev => prev+1)
    else setUserFollowers(prev => prev-1)
  }

  const followUser = async ()=> {
    if (currentUser != {}) {
      const {data} = await supabase.from('user_follows').select().eq('user_id',currentUser.user_id).eq('follow_user_id',user.user_id)
    
    if (data != []) setIsFollowing(true)
    else if (data.length == 1) setIsFollowing(false)
    }
  }

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
          currentUser == user.username ? 
          <Link href={{pathname: '/edit-profile',query: 'example'}}>
            <button className='btn-follow'>Edit Profile</button>
          </Link>
          :
          <button className='btn-follow' onClick={()=>handleFollow()}>{btnState ? 'Follow' : 'Unfollow'}</button>
      }
    </div>
  )
}

export default FollowContainer