import Idea from "./Idea"
import React from 'react'

export default function ProfileSection({user, ideas}) {

    const arrayIdeas = ideas.map(idea => <Idea key={idea.id} idea={idea} user={user} bulbs={[]}/>)

  return (
    <div className='profile-section'>
        <nav className='btn-container'>
            <button className='btn-profile'>
                IDEAS
            </button>
            <button className='btn-profile'>
                PROBLEMS
            </button>
        </nav>
        <main className="profile-ideas">
            {
            arrayIdeas.length == 0 ?
            <h3>No Ideas</h3>
            :
            arrayIdeas.reverse()
            }
        </main>
    </div>
  )
}