import React from 'react'

function Idea({idea}) {
  return (
    <div className='idea'>
        <h4>User ID: {idea.user_id}</h4>
        <h4>{idea.title}</h4>
        <p>{idea.body}</p>
        <span>{idea.created_at}</span>
    </div>
  )
}

export default Idea