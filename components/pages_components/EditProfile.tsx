import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ChangeAvatar from '../core/ChangeAvatar'
import { supabase } from '../../utils/supabaseClient';
import {message, chat, user} from '../../helpers/types'

export default function EditProfile({countries, user}) {

  const router = useRouter()
  const name = useRef<HTMLInputElement | undefined>(), 
  email = useRef<HTMLInputElement | undefined>(), 
  country = useRef<HTMLSelectElement | undefined>(), 
  bio = useRef<HTMLTextAreaElement | undefined>(),
  dateOfBirth = useRef<HTMLInputElement | undefined>(), 
  sexF = useRef<HTMLInputElement | undefined>(),
  sexM = useRef<HTMLInputElement | undefined>()

  const [avatar_url, setAvatarUrl] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setAvatarUrl(user.avatar_url)
    name.current.value = user.fullname
    email.current.value = user.email
    dateOfBirth.current.value = user.date_of_birth
    bio.current.value = user.bio
    if (user.gender == 'M') sexM.current.checked = true
    else if (user.gender == 'F') sexF.current.checked = true
    country.current.value = user.country
  }, [user])

  
  const countryOptions = countries.map((country:string,index:number) => <option value={country} key={index}>{country}</option>)

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

    async function updateProfile({ user, avatar_url }) {
      try {
        setLoading(true)
  
        const updates = {
          ...user,
          avatar_url
        }
  
        let { error } = await supabase.from('users').upsert(updates)

        if (error) {
          throw error
        }
      } catch (error) {
        alert(error.message)
      } finally {
        setLoading(false)
      }
    }

  return (
    <div  className='edit-profile'>
        <form onSubmit={handleSubmit}>
          <div className='avatar-edit-container'>
            <ChangeAvatar 
              url={user.avatar_url}
              size={100}
              onUpload={(url:string) => {
                setAvatarUrl(url)
                updateProfile({ user, avatar_url: url })
              }}
            />
          </div>
          <label>Full Name</label>
          <input ref={name} type='text' placeholder='Full Name'/>
          <label>Bio</label>
          <textarea ref={bio} placeholder='Bio'/>
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
          <select ref={country} placeholder='Full Name'>
            {countryOptions}
          </select>

          <button>Update Profile</button>
        </form>
    </div>
  )
}