import Link from 'next/link'
import React from 'react'
import Footer from '../components/core/Footer'
import { useRouter } from 'next/router';
import axios from 'axios';

function Profile() {

  const router = useRouter()
  const logout = async () => {
    try {
      await axios.get("/api/auth/signout");
    } catch (error) {
      console.error(error.message);
    }
    router.push("/");
  };

  return (
    <div>
        <h1>Profile</h1>
        <Footer/>
        <button  onClick={() => logout()}>Sign Out</button>
        <Link href='/settings'>
            <button>Settings</button>
        </Link>
    </div>
  )
}

export default Profile