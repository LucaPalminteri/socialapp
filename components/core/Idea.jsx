import Image from 'next/image'
import Router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import {supabase} from '../../utils/supabaseClient'
import Avatar from './Avatar'

function Idea({idea}) {
  const [currentUser, setCurrentUser] = useState([])

  console.log(idea);

  const router = useRouter()

  useEffect(()=>{
    getUsers()
  },[])

  const getUsers = async () => {
    const {data, error} = await supabase.from('user').select().eq('user_id',idea.user_id)
    setCurrentUser(data[0]);
  }

  const handleViewProfile = () => {
    router.push(`/${currentUser.username}`)
  }

  return (
    <div className='idea'>
      <div className='idea-header' >
        <div onClick={() => handleViewProfile()}>
          <Avatar
          url={currentUser.avatar_url}
          size={40}
          onClick={() => handleViewProfile()}
        />
        </div>
          <h4 onClick={() => handleViewProfile()}>{idea.username}</h4>
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

export default Idea