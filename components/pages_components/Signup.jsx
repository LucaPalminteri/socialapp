import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';

function Signup() {

    const router = useRouter()
    const username = useRef(), password = useRef(), email = useRef(), dateOfBirth = useRef()

    const [showPassword, setShowPassword] = useState(false)
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const res = await axios.post("/api/auth/signup", 
      {
        username:username.current.value,
        password:password.current.value,
        email: email.current.value,
        dateOfBirth: dateOfBirth.current.value
      });
  
      if (res.status === 200) {
          router.push("/login");
      }
    };

  return (
    <div  className='login'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
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