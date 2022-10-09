import Image from 'next/image';
import { useEffect, useState } from 'react';
import ProfileSection from '../core/ProfileSection';
import FollowContainer from '../core/FollowContainer';
import Avatar from '../core/Avatar';

export default function Profile({ user, ideas, follows, followers }) {

  const [width, setWidth] = useState(0);

  const updateSize = () => setWidth(window.innerWidth);

  useEffect(() => (window.onresize = updateSize), []);

  return (
    <div className='profile'>
    <div className='banner'>
        {/* <Image
            alt='banner'
            src={'/banner.jpg'}
            width={width}
            height={17}
            priority
        /> */}
    </div>
    <div className='profile-img'>
        <Avatar
          url={user.avatar_url}
          size={100}
        />
    </div>
    <FollowContainer ideas={ideas} user={user} follows={follows} followers={followers}/>
    <div className='profile-info'>
      <h3>{user.fullname}</h3>
      <h4>@{user.username}</h4>
      <p>{user.bio}</p>
    </div>
    <ProfileSection user={user} ideas={ideas}/>
</div>
  )
}