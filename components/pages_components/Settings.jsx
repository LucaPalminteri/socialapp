import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Settings() {

  const logout = async () => {
    try {
      await axios.get("/api/auth/signout");
    } catch (error) {
      console.error(error.message);
    }
    router.push("/");
  };

  const router = useRouter()


  return (
    <div className='settings'>
        <h1>Settings</h1>
        <nav>
          <li>Language</li>
          <li>Theme</li>
          <Link href='/edit-profile'>
            <li>Edit Profile</li>
          </Link>
          <li>Archive Ideas</li>
          <li onClick={() => logout()}>Sign Out</li>
        </nav>
    </div>
  )
}

export default Settings