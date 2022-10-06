import React from 'react'

function FollowContainer({ideas}) {

  return (
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
        <h4>{ideas}</h4>
      </div>
    </div>
  )
}

export default FollowContainer