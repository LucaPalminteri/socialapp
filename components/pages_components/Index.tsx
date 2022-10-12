import Link from 'next/link'
import React from 'react'

export default function Index() {
  return (
    <div className='center'>
        
        <h1>Luca</h1>
        <div style={{display: 'flex'}}>
      <Link href='/login'>
            <button>Login</button>
        </Link>
      <Link href='/signup'>
            <button>Sign Up</button>
        </Link>
        </div>
    </div>
  )
}