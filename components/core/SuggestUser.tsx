import Link from "next/link"
import Avatar from "./Avatar"
import React from 'react'

export default function SuggestUser({user, size}) {
  return (
    <div>
        <Link href={`/${user.username}`} >
        <div className='suggestion-item'>
            <Avatar
            url={user.avatar_url}
            size={size}
            />
            <h4>{user.username}</h4>
        </div>
        </Link>
    </div>
  )
}