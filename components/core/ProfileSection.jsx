import { useState, useEffect } from "react"
import {supabase} from "../../utils/supabaseClient"
import Idea from "./Idea"
import Spinner from '../core/Spinner';

function ProfileSection({user}) {

    const [userIdeas, setUserIdeas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect( ()=> { 
        getUserIdeas() 
        setIsLoading(false)
    },[] )

    const getUserIdeas = async () => {
        const { data,error } = await supabase.from('ideas').select().eq('user_id',user.user_id)
        setUserIdeas(data)
    }

    const arrayIdeas = userIdeas.map(idea => <Idea key={idea.id} idea={idea}/>)

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
            {
                arrayIdeas.length == 0 ?
                isLoading ?
                <Spinner />
                :
                <h3>You don&apos;t have ideas yet. Create One!</h3>
                :
                arrayIdeas.reverse()
            }
        </main>
    </div>
  )
}

export default ProfileSection