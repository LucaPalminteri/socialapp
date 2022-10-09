import Link from 'next/link'
import Avatar from './Avatar'

function Suggestions({users}) {

    const arrayUsers = users.map((user,index) => {
        return (
        <Link href={`/${user.username}`} key={index} >
        <div className='suggestion-item'>
            <Avatar
            url={user.avatar_url}
            size={40}
            onClick={() => handleViewProfile()}
            />
            <h4>{user.username}</h4>
        </div>
        </Link>
        )
    })
  return (
    <div className='suggestions'>
        <h2>Suggestions</h2>
        {arrayUsers}
    </div>
  )
}

export default Suggestions