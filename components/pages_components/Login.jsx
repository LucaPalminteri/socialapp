import Link from 'next/link'
import axios from 'axios'
import { useRef } from 'react';
import { useRouter } from 'next/router';

// TODO: validate input values
function Login() {

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
    <div>
        <h1>Log In</h1>

        <form onSubmit={handleSubmit}>
            <input type='text' ref={username} placeholder='Username'/>
            <input type='password' ref={password} placeholder='Pa\ssword'/>
            <button>Log In</button>
        </form>

        <span>Don&apos;t have an account? 
            <Link href='/signup'><span className='su'> Sign Up</span></Link>
        </span>
    </div>
  )
}

export default Login