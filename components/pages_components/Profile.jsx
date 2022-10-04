import axios from 'axios';
import { useEffect, useState } from 'react';

function Profile() {

  const [currentUser, setCurrentUser] = useState({})

  useEffect(()=> {
    user()
  },[])

  const user = async () => {
    try {
      const {data} = await axios.get("/api/profile");
      setCurrentUser(data)
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='profile'>
      <h1>Profile</h1>
      {
        currentUser == {} ? "Loading..." :
        <>
          <p><strong>username:</strong> {currentUser.username}</p>
          <p><strong>email:</strong> {currentUser.email}</p>
          <p><strong>fullname: </strong>{currentUser.fullname}</p>
          <p><strong>country: </strong>{currentUser.country}</p>
          <p><strong>gender: </strong>{currentUser.gender}</p>
          <p><strong>dateOfBirth:</strong> {currentUser.date_of_birth}</p>
        </>
      }
    </div>
  )
}

export default Profile