import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';


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
          <li>Theme</li>
          <li>Theme</li>
          <li>Edit Profile</li>
          <li>Saved</li>
          <li onClick={() => logout()}>Sign Out</li>
        </nav>
    </div>
  )
}

export default Settings