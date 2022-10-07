import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ProfileSection from '../core/ProfileSection';
import FollowContainer from '../core/FollowContainer';

function Profile({ user, ideas }) {

  const [currentUser, setCurrentUser] = useState({})

  useEffect(()=> {
    //getUser()
  },[])

  const [width, setWidth] = useState(0);

  const updateSize = () => setWidth(window.innerWidth);

  useEffect(() => (window.onresize = updateSize), []);

  const getUser = async () => {
    try {
      const {data} = await axios.get("/api/profile");
      setCurrentUser(data)
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='profile'>
    <div className='banner'>
        <Image
            alt='banner'
            src={'/banner.jpg'}
            width={width}
            height={180}
            priority
        />
    </div>
    <div className='profile-img'>
      <Image
      style={{borderRadius: 100}}
            alt='user-img'
            src={'/user-img.jpg'}
            layout={'responsive'}
            width={100}
            height={100}
            priority
        />
    </div>
    <FollowContainer ideas={ideas}/>
    <div className='profile-info'>
      <h3>{user.fullname}</h3>
      <h4>@{user.username}</h4>
      <p>{user.bio}</p>
    </div>
    <ProfileSection user={user}/>
</div>
  )
}

export default Profile