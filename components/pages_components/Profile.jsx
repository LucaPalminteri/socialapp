import Link from 'next/link'
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Profile() {

const [username, setUsername] = useState("")

  useEffect(()=> {
    user()
  },[])

  const router = useRouter()
  const logout = async () => {
    try {
      await axios.get("/api/auth/signout");
    } catch (error) {
      console.error(error.message);
    }
    router.push("/");
  };

  const user = async () => {
    try {
      const {data} = await axios.get("/api/profile");
      setUsername(data.username)
    } catch (error) {
      console.error(error.message);
    }
  };




  return (
    <div className='profile'>
        <button  onClick={() => logout()}>Sign Out</button>
        <h2>username: {username}</h2>
        <Link href='/settings'>
            <button>Settings</button>
        </Link>
    </div>
  )
}

export default Profile