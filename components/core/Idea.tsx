import { useRouter } from 'next/router'
import Avatar from './Avatar'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { supabase } from '../../utils/supabaseClient';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import {message, chat, user} from '../../helpers/types'


export default function Idea({idea, user, bulbs}) {

  const firstLoadUser:user = {user_id:0,username:""}

  let bulbsCount = 0

  bulbs.map(bulb => {
    if(bulb.idea_id == idea.id && bulb.idea_author == idea.user_id) {
      bulbsCount++;
    }
  })

  const router = useRouter()

  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const [currentUser, setCurrentUser] = useState(firstLoadUser)
  
  useEffect(() => {
    getCurrentUser()
  }, [])
  
  const handleDeleteIdea = async () => {
    if(confirm('Are you sure you want to delete this idea?') == false) return;
    try {
      const { data, error } = await supabase.from('ideas').delete().eq('id',idea.id)
      if (error) throw error
    } catch (error) {
      alert(error)
    }
  }

  const getCurrentUser = async () => {
    const {data} = await axios.get('/api/profile')
    setCurrentUser(data)
    if (data.user_id == user.user_id) 
    {
      setIsCurrentUser(true)
    }
  }
  const handleViewProfile = () => {
    router.push(`/${user.username}`)
  }

  const handleArchiveIdea = async () => {
    alert('not ready')
    return;
    try {
      const { data, error } = await supabase
      .from('ideas_archived')
      .insert({
        idea_id: idea.id,
        created_at: new Date(),
        from_user_id: currentUser.user_id
      })
      if (error) throw error
    } catch (error) {
      console.error(error)
    }
  }

  supabase
  .channel('*')
  .on('postgres_changes', { event: '*', schema: '*' }, payload => {
    console.log(payload.new);
  })
  .subscribe()

  const handleBulb = async () => {
    try {
      const { data, error } = await supabase
      .from('ideas_bulbs')
      .insert({
        idea_id: idea.id,
        created_at: new Date(),
        user_id_like: currentUser.user_id,
        idea_author: user.user_id
      })
      if (error) throw error
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='idea'>
      <div className='idea-header' >
        <div onClick={() => handleViewProfile()}>
          <Avatar 
            url={user.avatar_url} 
            size={40} 
          />
        </div>
          <h4 onClick={() => handleViewProfile()}>{user.username}</h4>
          {
            isCurrentUser? 
            <button onClick={handleDeleteIdea} className='btn-delete-idea'><DeleteOutlineIcon fontSize='small' /></button> 
            : 
            <button onClick={handleArchiveIdea} className='btn-archive-idea'><BookmarkBorderIcon fontSize='small' /></button> 
          }
      </div>
        <h2>{idea.title}</h2>
        <p>{idea.body}</p>
        <div className='date-container'>
          <span>{idea.created_at.slice(0,10)}</span>
          <span>{idea.created_at.slice(11,16)}hs</span>
        </div>
        <footer>
          <nav onClick={handleBulb}>
            <LightbulbOutlinedIcon/>
          </nav>
          <span>{bulbsCount} bulbs</span>
        </footer>
    </div>
  )
}