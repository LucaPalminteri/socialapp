import { useRouter } from 'next/router'
import Avatar from './Avatar'
import { supabase } from '../../utils/supabaseClient'
import React from 'react'



export default function Idea({idea, user}) {

  const router = useRouter()

  const handleViewProfile = () => {
    router.push(`/${user.username}`)
  }

  return (
    <div className='idea'>
      <div className='idea-header' >
        <div onClick={() => handleViewProfile()}>
          <Avatar 
          url={user.avatar_url} 
          size={40} 
          onClick={() => handleViewProfile()
          } />
        </div>
          <h4 onClick={() => handleViewProfile()}>{user.username}</h4>
      </div>
        <h2>{idea.title}</h2>
        <p>{idea.body}</p>
        <div className='date-container'>
          <span>{idea.created_at.slice(0,10)}</span>
          <span>{idea.created_at.slice(11,16)}hs</span>
        </div>
        <footer>
          <nav>
            likes | comments | share
          </nav>
        </footer>
    </div>
  )
}