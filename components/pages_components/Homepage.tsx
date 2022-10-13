import Idea from '../core/Idea';
import { supabase } from '../../utils/supabaseClient';
import React from 'react'
import GoFollow from '../core/GoFollow'

export default function Homepage({users, ideas}) {

  const arrayIdeas = ideas.map(idea => <Idea key={idea.id} idea={idea} user={users.find(user => user.user_id == idea.user_id)}/>)

  return (
    <div className='homepage'>
      {
        ideas.length == 0 ?
        <GoFollow/>
        :
        arrayIdeas.reverse()
      }
    </div>
  )
}