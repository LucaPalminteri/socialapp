import Link from 'next/link'
import React from 'react'
import Header from '../components/core/Header'

function Signup() {
  return (
    <div className='login'>
        <Header/>
        <h1>Sign Up</h1>
        <form>
            <input type='email' placeholder='Email'/>
            <input type='text' placeholder='Username'/>
            <input type='password' placeholder='Password'/>
            <label>Date of Birth</label>
            <input type='date'/>
            <button>Sign Up</button>
        </form>
        <span>Already have an account? 
            <Link href='/login'><span className='su'> Log In</span></Link>
        </span>
    </div>
  )
}

export default Signup