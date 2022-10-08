import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

function EditProfile({countries, user}) {

  console.log(user);

  useEffect(() => {
    name.current.value = user.fullname
    username.current.value = user.username
    email.current.value = user.email
    dateOfBirth.current.value = user.date_of_birth
    if (user.gender == 'M') sexM.current.checked = true
    else if (user.gender == 'F') sexF.current.checked = true
    country.current.value = user.country
  }, [user])

  
  
  const countryOptions = countries.map((country,index) => <option value={country} key={index}>{country}</option>)
  
  const router = useRouter()
  const name = useRef(), username = useRef(), password = useRef(), email = useRef(), dateOfBirth = useRef(), sexF = useRef(),sexM = useRef(), country = useRef()


    const handleSubmit = async (e) => {
      e.preventDefault();

      //validations
      if( inputValidations() == false ) return ;
      
      const res = await axios.put("/api/edit-profile", 
      {
        fullname:name.current.value,
        username:username.current.value,
        email: email.current.value,
        date_of_birth: dateOfBirth.current.value,
        gender: sexF.current.checked ? 'F' : 'M',
        country: country.current.value
      });
  
      if (res.status === 200) {
          router.push(`/${username.current.value}`);
      }
    };

    const inputValidations = () => {

      if(name.current.value.trim() == '') {
        alert('name cannot be empty')
        return false;
      }

      if(email.current.value.trim() == '') {
        alert('email cannot be empty')
        return false;
      }

      if(username.current.value.trim() == '') {
        alert('username cannot be empty')
        return false;
      }

      if(dateOfBirth.current.value.trim() == '') {
        alert('dateOfBirth cannot be empty')
        return false;
      }

      return true;
    }

  return (
    <div  className='edit-profile'>
      
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input ref={name} type='text' placeholder='Full Name'/>
            <label>Email</label>
            <input ref={email} type='email' placeholder='Email'/>
            <label>Username</label>
            <input ref={username} type='text' placeholder='Username'/>
            <label>Date of Birth</label>
            <input ref={dateOfBirth} type='date'/>
            <label>Sex</label>
            <div className='sex-container'>
              <div>
                <span>M</span>
                <span>F</span>
              </div>
              <div>
                <input ref={sexM} type='radio' name='sex' value='M'/>
                <input ref={sexF} type='radio' name='sex' value='F'/>
              </div>
            </div>
            <label>Country</label>
            <select ref={country} type='' placeholder='Full Name'>
              {countryOptions}
            </select>

            <button>Update Profile</button>
        </form>
    </div>
  )
}

export default EditProfile