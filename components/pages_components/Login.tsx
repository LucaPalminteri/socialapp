import Link from 'next/link'
import axios from 'axios'
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {encrypt} from "../../helpers/handleBcrypt"
import { CircularProgress } from '@mui/material';

export default function Login() {

    const [showPassword, setShowPassword] = useState(false)
    const [load, setLoad] = useState(false)

    const router = useRouter();
    const username = useRef<HTMLInputElement | undefined>();
    const password = useRef<HTMLInputElement | undefined>();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if( inputValidations() == false ) return;
        const hashPas = await encrypt(password.current.value)
    
        const res = await axios.post("/api/auth/login", {username:username.current.value,password:hashPas});
    
        if (res.status === 200) {
            router.push("/homepage");
        } 
        else if(res.status === 401) {
            alert('email or password incorrect')
        }
      };

      const inputValidations = () => {

        if(username.current.value.trim() == '') {
          alert('username cannot be empty')
          return false;
        }
  
        if(password.current.value.trim() == '') {
          alert('password cannot be empty')
          return false;
        }
        return true
    }

  return (
    <div className='login'>
        <h1>Log In</h1>

        <form onSubmit={handleSubmit}>
            <input type='text' ref={username} placeholder='Username'/>
            <div className='password-container'>
                <input type={showPassword ? "text" : "password"} ref={password} placeholder='Password'/>
                {
                showPassword ?
                <VisibilityIcon className='showpass-icon' onClick={() => setShowPassword(prev => !prev)}>View password</VisibilityIcon>
                :
                <VisibilityOutlinedIcon className='showpass-icon' onClick={() => setShowPassword(prev => !prev)}>View password</VisibilityOutlinedIcon>
                }
            </div>
            <button onClick={() => setLoad(true)}>{load ? <CircularProgress style={{width: 16,height: 16, color: '#FFF'}}/> : "Log In"}</button>
        </form>

        <span>Don&apos;t have an account? 
            <Link href='/signup'><span className='su'> Sign Up</span></Link>
        </span>
    </div>
  )
}