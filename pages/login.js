import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { useRef } from 'react';
import { useRouter } from 'next/router';

function Login() {

    const router = useRouter();
    const username = useRef();
    const password = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const res = await axios.post("/api/auth/login", {username:username.current.value,password:password.current.value});
    
        if (res.status === 200) {
            router.push("/homepage");
        }
      };


  return (
    <div>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
            <input type='text' ref={username} placeholder='username'/>
            <input type='password' ref={password} placeholder='pssword'/>
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