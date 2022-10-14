import { useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Suggestions from '../core/Suggestions';
import SuggestUser from '../core/SuggestUser';

export default function Search({users}) {

  const [searchUser, setSearchUser] = useState("")

  let usersFilter = users.filter(user => user.username.includes(searchUser))
  if(searchUser == "") usersFilter = []
  const arrayUsersFilter = usersFilter.map((user,index) => <SuggestUser key={index} user={user} size={40}/>).slice(0,5)

  const inputHandler = (e) => {
    setSearchUser(e.target.value.toLowerCase());
  }

  return (
    <div className='search'>
      <div className='search-container'>
        <input type='text' placeholder='Search someone by username...' onChange={(e)=> inputHandler(e)}/>
        <button><SearchOutlinedIcon fontSize='small'/></button>
      </div>
      {arrayUsersFilter}
      <Suggestions users={users}/>
    </div>
  )
}