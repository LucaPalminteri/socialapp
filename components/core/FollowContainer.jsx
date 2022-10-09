import axios from "axios";
import { useState,useEffect } from 'react'
import Link from "next/link";

function FollowContainer({ideas, username, follows, followers}) {

  const [btnState, setBtnState] = useState(false)
  const [userFollowers, setUserFollowers] = useState()
  const [userFollows, setUserFollows] = useState()
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    setUserFollowers(followers.length)
    setUserFollows(follows.length)
    getUser() 
  }, [])

  const handleFollow = () => {
    setBtnState(prev => !prev)
    if(btnState) setUserFollowers(prev => prev-1)
    else setUserFollowers(prev => prev+1)
  }

  const getUser = async () => {
    try {
      const {data} = await axios.get("/api/profile");
      setCurrentUser(data.username)
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='profile-data'>
      <div className='data'>
        <h4>Followers</h4>
        <h4>{userFollowers}</h4> 
      </div>
      <div className='data'>
        <h4>Follows</h4>
        <h4>{userFollows}</h4>
      </div>
      <div className='data'>
        <h4>Ideas</h4>
        <h4>{ideas}</h4>
      </div>
      {
        currentUser == {} ?
        <button>.</button>
        :
          currentUser == username ? 
          <Link href={{pathname: '/edit-profile',query: 'example'}}>
            <button className='btn-follow'>Edit Profile</button>
          </Link>
          :
          <button className='btn-follow' onClick={()=>handleFollow()}>{btnState ? 'Unfollow' : 'Follow'}</button>
      }
    </div>
  )
}

export default FollowContainer