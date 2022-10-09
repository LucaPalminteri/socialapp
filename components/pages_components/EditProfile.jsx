import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Avatar from '../core/Avatar';

function EditProfile({countries, user}) {

  const router = useRouter()
  const name = useRef(), email = useRef(), avatarImage = useRef(),
  dateOfBirth = useRef(), sexF = useRef(),sexM = useRef(), country = useRef(), bio = useRef()

  useEffect(() => {
    name.current.value = user.fullname
    email.current.value = user.email
    dateOfBirth.current.value = user.date_of_birth
    bio.current.value = user.bio
    if (user.gender == 'M') sexM.current.checked = true
    else if (user.gender == 'F') sexF.current.checked = true
    country.current.value = user.country
  }, [user])

  
  const countryOptions = countries.map((country,index) => <option value={country} key={index}>{country}</option>)
  

    const handleSubmit = async (e) => {
      e.preventDefault();

      //validations
      if( inputValidations() == false ) return ;
      
      const res = await axios.put("/api/edit-profile", 
      {
        fullname:name.current.value,
        email: email.current.value,
        date_of_birth: dateOfBirth.current.value,
        gender: sexF.current.checked ? 'F' : 'M',
        bio: bio.current.value,
        country: country.current.value
      });
  
      if (res.status === 200) {
          router.push(`/${user.username}`);
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

      if(dateOfBirth.current.value.trim() == '') {
        alert('dateOfBirth cannot be empty')
        return false;
      }

      return true;
    }

  return (
    <div  className='edit-profile'>
        <form onSubmit={handleSubmit}>
        <Avatar
        url={user.avatar_url}
        size={100}
      />
            <label>Change profile photo</label>
            <input ref={avatarImage} type='file' placeholder='Avatar Image'/>
            <label>Full Name</label>
            <input ref={name} type='text' placeholder='Full Name'/>
            <label>Bio</label>
            <textarea ref={bio} type='text' placeholder='Bio'/>
            <label>Email</label>
            <input ref={email} type='email' placeholder='Email'/>
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