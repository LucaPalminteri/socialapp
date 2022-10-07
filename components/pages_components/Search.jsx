import Link from 'next/link'
import axios from 'axios'
import { useRef, useState, useEffect } from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {encrypt} from "../../helpers/handleBcrypt"

function Search() {

    const username = useRef();

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
        <h1>Search</h1>
        <form onSubmit={handleSubmit}>
            <input type='text' ref={username} placeholder='Search something...'/>
            <button>Search</button>
        </form>
    </div>
  )
}

export default Search