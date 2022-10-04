import axios from 'axios'
import { useState, useEffect } from 'react';
import Idea from '../core/Idea';

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

  console.log(ideas);

  return (
    <div className='homepage'>
        <h1>Homepage</h1>
        {ideas.length == 0 ? 
        <div className="spinner"></div>
        :
        arrayIdeas}
    </div>
  )
}

export default Homepage