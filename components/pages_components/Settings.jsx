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
    <div className='center'>
        <h1>Settings</h1>
        <button  onClick={() => logout()}>Sign Out</button>
    </div>
  )
}

export default Settings