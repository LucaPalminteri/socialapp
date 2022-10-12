import SuggestUser from './SuggestUser'
import React from 'react'

export default function Suggestions({users}) {

    const arrayUsers = users.map((user:any,index:any) => <SuggestUser key={index} user={user} size={40}/>)
  return (
    <div className='suggestions'>
        <h2>Suggestions</h2>
        {arrayUsers.slice(0,5)}
    </div>
  )
}