import axios from 'axios'
import { useState, useEffect } from 'react';
import Idea from '../core/Idea';
import Spinner from '../core/Spinner';

function Homepage() {

  const [ideas, setIdeas] = useState([])

  useEffect(()=> {
    getIdeas()
  },[])

  const getIdeas = async () => {
    const { data } = await axios.get('/api/ideas');
    setIdeas(data);
  }

  const arrayIdeas = ideas.map(idea => {
    return (
      <Idea key={idea.id} idea={idea}/>
    )
  })

  return (
    <div className='homepage'>
        {ideas.length == 0 ? 
        <Spinner />
        :
        arrayIdeas.reverse()}
    </div>
  )
}

export default Homepage