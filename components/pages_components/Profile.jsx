import axios from 'axios';
import { useEffect, useState } from 'react';

function Profile() {

  const [username, setUsername] = useState("")

  useEffect(()=> {
    user()
  },[])

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
      <h1>Profile</h1>
      <h2>username: {username != "" ? username : "Loading..."}</h2>
    </div>
  )
}

export default Profile