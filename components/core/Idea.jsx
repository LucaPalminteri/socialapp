import { useRouter } from 'next/router'
import Avatar from './Avatar'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { supabase } from '../../utils/supabaseClient';

export default function Idea({idea, user}) {

  const router = useRouter()

  const [isCurrentUser, setIsCurrentUser] = useState(false)
  
  useEffect(() => {
    getCurrentUser()
  }, [])
  
  const handleDeleteIdea = async () => {
    if(confirm('Are you sure you want to delete this idea?') == false) return;
    try {
      const { data, error } = await supabase.from('ideas').delete('id',idea.id)
      if (error) throw error
    } catch (error) {
      alert(error)
    }
  }

  const getCurrentUser = async () => {
    const {data} = await axios.get('/api/profile')
    if (data.user_id == user.user_id) setIsCurrentUser(true)
  }
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
          {isCurrentUser? <button onClick={handleDeleteIdea} className='btn-delete-idea'><DeleteOutlineIcon fontSize='small' /></button> : <></>}
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