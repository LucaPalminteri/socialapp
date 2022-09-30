import Link from 'next/link'
import React from 'react'
import Footer from '../components/core/Footer'

function Profile() {
  return (
    <div>
        <h1>Profile</h1>
        <Footer/>
        <Link href='/'>
            <button>Sign Out</button>
        </Link>
        <Link href='/settings'>
            <button>Settings</button>
        </Link>
    </div>
  )
}

export default Profile