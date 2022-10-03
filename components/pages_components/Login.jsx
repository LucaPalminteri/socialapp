import Link from 'next/link'
import axios from 'axios'
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import fetchUsers from '../../utils/users';

// TODO: validate input values
function Login() {

    const [showPassword, setShowPassword] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(()=> {
        setUsers(async() => await fetchUsers())
    },[])

    console.log(users);

    const router = useRouter();
    const username = useRef();
    const password = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const res = await axios.post("/api/auth/login", {username:username.current.value,password:password.current.value});
    
        if (res.status === 200) {
            router.push("/homepage");
        }
      };


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
            <button>Log In</button>
        </form>

        <span>Don&apos;t have an account? 
            <Link href='/signup'><span className='su'> Sign Up</span></Link>
        </span>
    </div>
  )
}

export default Login