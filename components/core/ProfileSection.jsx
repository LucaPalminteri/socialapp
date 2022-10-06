import { useState, useEffect } from "react"
import {supabase} from "../../utils/supabaseClient"
import Idea from "./Idea"
import Spinner from '../core/Spinner';

function ProfileSection({currentUser}) {
    const [userIdeas, setUserIdeas] = useState([])

    useEffect(()=>{
        getUserIdeas()
    },[currentUser.user_id])

    const getUserIdeas = async () => {
        if(currentUser.user_id != undefined) {
            const { data, error} = await supabase.from('ideas').select().eq('user_id',currentUser.user_id)
            setUserIdeas(data)
        }
    }

    const arrayIdeas = userIdeas.map(idea => {
        return (
          <Idea key={idea.id} idea={idea}/>
        )
      })

  return (
    <div className='profile-section'>
        <nav className='btn-container'>
            <button 
                className='btn-profile'
            >
                IDEAS
            </button>
            <button 
                className='btn-profile'
            >
                PROBLEMS
            </button>
        </nav>
        <main className="profile-ideas">
            {arrayIdeas.length == 0 ?
            <Spinner />
            :
            arrayIdeas.reverse()}
        </main>
    </div>
  )
}

export default ProfileSection