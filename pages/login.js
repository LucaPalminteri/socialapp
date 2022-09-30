import Link from 'next/link'
import React from 'react'

function Login() {
  return (
    <div>
        <h1>Login</h1>

        <form>
            <input type='text'/>
            <input type='password'/>
            <button>Log In</button>
        </form>

        <Link href='/'>
            <button>Luca Home</button>
        </Link>
        <Link href='/homepage'>
            <button>Enter</button>
        </Link>
        <Link href='/signup'>
            <button>Sign Up</button>
        </Link>
    </div>
  )
}

export default Login