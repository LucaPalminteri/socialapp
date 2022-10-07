import Image from 'next/image'
import Router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import {supabase} from '../../utils/supabaseClient'

function Idea({idea}) {
  const [currentUser, setCurrentUser] = useState([])

  const router = useRouter();

  useEffect(()=>{
    getUsers()
  },[])

  const getUsers = async () => {
    const {data, error} = await supabase.from('user').select().eq('username',idea.username)
    setCurrentUser(data[0]);
  }

  const handleViewProfile = () => {
    router.push(`/${currentUser.username}`)
  }

  return (
    <div className='idea'>
      <div className='idea-header' onClick={() => handleViewProfile()}>
        <Image
        style={{borderRadius: 100}}
              alt='user-img'
              src={'/user-img.jpg'}
              width={40}
              height={40}
              />
          <h4>{idea.username}</h4>
      </div>
        <h2>{idea.title}</h2>
        <blockquote>{idea.body}</blockquote>
        <p>{idea.created_at.slice(0,10)}</p>
        <p>{idea.created_at.slice(11,19)}</p>
    </div>
  )
}

export default Idea