import { useRouter } from 'next/router';
import { useRef } from 'react';
import axios from 'axios';

export default function Create() {

  const router = useRouter();
  const title = useRef<HTMLInputElement | undefined>();
  const body = useRef<HTMLTextAreaElement | undefined>();

  const handleSubmit = async (e) => {
      e.preventDefault();

      if( inputValidations() == false ) return;
  
      const res = await axios.post("/api/create", {title:title.current.value,body:body.current.value});
  
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

      if(body.current.value.length > 1000) {
        alert('body length cannot be larger than 1000 characters')
        return false;
      }

      return true
    }


  return (
    <div className='create'>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input type='text' ref={title} placeholder='Title of the idea'/>
            <textarea ref={body} placeholder="Type your idea here ..."/>
            <button>Create Idea</button>
        </form>
    </div>
  )
}