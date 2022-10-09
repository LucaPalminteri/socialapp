import { useRef, useState, useEffect } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Suggestions from '../core/Suggestions';
import Avatar from '../core/Avatar';
import Link from 'next/link';
import SuggestUser from '../core/SuggestUser';

function Search({users}) {

  const [searchUser, setSearchUser] = useState("")

  let usersFilter = users.filter(user => user.username.includes(searchUser))
  if(searchUser == "") usersFilter = []
  const arrayUsersFilter = usersFilter.map((user,index) => <SuggestUser key={index} user={user} size={40}/>)

  const inputHandler = (e) => {
    setSearchUser(e.target.value);
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

export default Search