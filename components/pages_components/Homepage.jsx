import Idea from '../core/Idea';

export default function Homepage({users, ideas}) {

  const arrayIdeas = ideas.map(idea => <Idea key={idea.id} idea={idea} user={users.find(user => user.user_id == idea.user_id)}/>)

  return (
    <div className='homepage'>
        {arrayIdeas.reverse().slice(0,10)}
    </div>
  )
}