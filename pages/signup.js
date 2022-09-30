import Link from 'next/link'
import React from 'react'

function Signup() {
  return (
    <div>
        <h1>Signup</h1>
        <Link href='/login'>
            <button>Login</button>
        </Link>
    </div>
  )
}

export default Signup