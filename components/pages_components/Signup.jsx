import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {encrypt} from "../../helpers/handleBcrypt"

function Signup() {

    const router = useRouter()
    const name = useRef(), username = useRef(), password = useRef(), email = useRef(), dateOfBirth = useRef()

    const [showPassword, setShowPassword] = useState(false)
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      //validations
      if( inputValidations() == false ) return ;
      
      const hashPas = await encrypt(password.current.value)
      const res = await axios.post("/api/auth/signup", 
      {
        name:name.current.value,
        username:username.current.value,
        password:hashPas,
        email: email.current.value,
        dateOfBirth: dateOfBirth.current.value
      });
  
      if (res.status === 200) {
          router.push("/login");
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

      if(password.current.value.trim() == '') {
        alert('password cannot be empty')
        return false;
      }

      if(dateOfBirth.current.value.trim() == '') {
        alert('dateOfBirth cannot be empty')
        return false;
      }

      return true;
    }

  return (
    <div  className='login'>
      
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <input ref={name} type='text' placeholder='Full Name'/>
            <input ref={email} type='email' placeholder='Email'/>
            <input ref={username} type='text' placeholder='Username'/>
            <div className='password-container'>
                <input type={showPassword ? "text" : "password"} ref={password} placeholder='Password'/>
                {
                showPassword ?
                <VisibilityIcon className='showpass-icon' onClick={() => setShowPassword(prev => !prev)}>View password</VisibilityIcon>
                :
                <VisibilityOutlinedIcon className='showpass-icon' onClick={() => setShowPassword(prev => !prev)}>View password</VisibilityOutlinedIcon>
                }
            </div>
            <label>Date of Birth</label>
            <input ref={dateOfBirth} type='date'/>
            <button>Sign Up</button>
        </form>
        <span>Already have an account? 
            <Link href='/login'><span className='su'> Log In</span></Link>
        </span>
    </div>
  )
}

export default Signup