import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ProfileSection from '../core/ProfileSection';
import { supabase } from '../../utils/supabaseClient';

function Profile() {

  const [currentUser, setCurrentUser] = useState({})
  const [userIdeas, setUserIdeas] = useState(0)


  useEffect(()=> {
    user()
  },[])

  const [width, setWidth] = useState(0);

  const updateSize = () => setWidth(window.innerWidth);

  useEffect(() => (window.onresize = updateSize), []);

  const user = async () => {
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
    <div className='profile-data'>
      <div className='data'>
        <h4>Followers</h4>
        <h4>0</h4> 
      </div>
      <div className='data'>
        <h4>Follows</h4>
        <h4>0</h4>
      </div>
      <div className='data'>
        <h4>Ideas</h4>
        <h4>{userIdeas}</h4>
      </div>
    </div>
    <div className='profile-info'>
      <h3>{currentUser.fullname}</h3>
      <h4>@{currentUser.username}</h4>
      <p>{user.bio}</p>
    </div>
    <ProfileSection currentUser={currentUser}/>
</div>
  )
}

export default Profile