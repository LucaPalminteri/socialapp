import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ProfileSection from '../core/ProfileSection';
import { supabase } from '../../utils/supabaseClient';
import FollowContainer from '../core/FollowContainer';

function Profile({user}) {

  console.log(user);

  const [currentUser, setCurrentUser] = useState({})
  const [userIdeas, setUserIdeas] = useState(0)

  useEffect(()=> {
    getUser()
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

  const getIdeasCount = async () => {
    if(currentUser.user_id != undefined) {
        const { data, error} = await supabase.from('ideas').select('*', { count: 'exact' }).eq('user_id',currentUser.user_id)
        setUserIdeas(data.length)
    }
  }
  getIdeasCount()

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
    <FollowContainer ideas={user.ideas}/>
    <div className='profile-info'>
      <h3>{user.user.fullname}</h3>
      <h4>@{user.user.username}</h4>
      <p>{user.bio}</p>
    </div>
    <ProfileSection currentUser={currentUser}/>
</div>
  )
}

export default Profile