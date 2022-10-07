import React from 'react'
import { useRouter } from 'next/router';
import { useRef } from 'react';
import axios from 'axios';

function Create() {

  const router = useRouter();
  const title = useRef();
  const body = useRef();

  const handleSubmit = async (e) => {
      e.preventDefault();

      if( inputValidations() == false ) return;
  
      const res = await axios.post("/api/create", {title:title.current.value,body:body.current.value});

      console.log(res);
  
      if (res.status === 200) {
          router.push("/homepage");
      } 
    };

    const inputValidations = () => {

      if(title.current.value.trim() == '') {
        alert('title cannot be empty')
        return false;
      }

      if(body.current.value.trim() == '') {
        alert('body cannot be empty')
        return false;
      }
      return true
    }


  return (
    <div className='create'>
        <h1>Create</h1>
        <form onSubmit={handleSubmit}>
            <input type='text' ref={title} placeholder='Title of the idea'/>
            <textarea ref={body} placeholder="Type your idea here ..."/>
            <button>Create Idea</button>
        </form>
    </div>
  )
}

export default Create