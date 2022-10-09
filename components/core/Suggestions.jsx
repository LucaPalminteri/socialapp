import SuggestUser from './SuggestUser'

export default function Suggestions({users}) {

    const arrayUsers = users.map((user,index) => <SuggestUser key={index} user={user} size={40}/>)
  return (
    <div className='suggestions'>
        <h2>Suggestions</h2>
        {arrayUsers.slice(0,5)}
    </div>
  )
}