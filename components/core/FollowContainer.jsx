import axios from "axios";
import { useState,useEffect } from 'react'
import Link from "next/link";

function FollowContainer({ideas, username}) {

  const [btnState, setBtnState] = useState(false)
  const [followers, setFollowers] = useState()
  const [follows, setFollows] = useState()
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    setFollowers(Math.floor(Math.random() * 1000))
    setFollows(Math.floor(Math.random() * 300))
    getUser() 
  }, [])

  const handleFollow = () => {
    setBtnState(prev => !prev)
    if(btnState) setFollowers(prev => prev-1)
    else setFollowers(prev => prev+1)
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
        <h4>{followers}</h4> 
      </div>
      <div className='data'>
        <h4>Follows</h4>
        <h4>{follows}</h4>
      </div>
      <div className='data'>
        <h4>Ideas</h4>
        <h4>{ideas}</h4>
      </div>
      {
        currentUser == username ? 
        <Link href='/edit-profile'>
          <button className='btn-follow'>Edit Profile</button>
        </Link>
        :
        <button className='btn-follow' onClick={()=>handleFollow()}>{btnState ? 'Unfollow' : 'Follow'}</button>
      }
    </div>
  )
}

export default FollowContainer