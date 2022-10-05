import Image from 'next/image'
import { useState, useEffect } from 'react'
import {supabase} from '../../utils/supabaseClient'

function Idea({idea}) {
  const [currentUser, setCurrentUser] = useState([])

  useEffect(()=>{
    getUsers()
  },[])

  const getUsers = async () => {
    const {data, error} = await supabase.from('user').select('*').eq('user_id',idea.user_id)
    setCurrentUser(data);
  }


  return (
    <div className='idea'>
      <div className='idea-header'>
        <Image
        style={{borderRadius: 100}}
              alt='user-img'
              src={'/user-img.jpg'}
              width={40}
              height={40}
              />
          <h4>{currentUser.length != 0 ? currentUser[0].username : ""}</h4>
      </div>
        <h2>{idea.title}</h2>
        <p>{idea.body}</p>
        <span>{idea.created_at}</span>
    </div>
  )
}

export default Idea