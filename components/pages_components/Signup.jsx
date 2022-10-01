import { useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link'

function Signup() {

    const router = useRouter()
    const username = useRef(), password = useRef(), email = useRef(), dateOfBirth = useRef()
  
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
    <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <input ref={email} type='email' placeholder='Email'/>
            <input ref={username} type='text' placeholder='Username'/>
            <input ref={password} type='password' placeholder='Password'/>
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