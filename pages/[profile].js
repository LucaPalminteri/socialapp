import { useRouter } from 'next/router'
import Profile from '../components/pages_components/Profile';
import Header from '../components/core/Header';
import axios from 'axios';
import Footer from '../components/core/Footer';

const Post = ({user, ideas}) => {


  console.log(user);


  const router = useRouter()
  const { profile } = router.query

  return (
    <div>
        <Header/>
        <div className='center'>
          <h3>{user.fullname}</h3>
          <h4>@{user.username}</h4>
          <p>email: {user.email}</p>
          <p>Ideas: {ideas}</p>
        </div>
        {/* <Profile user={{user:{},ideas:2}}/> */}
        <Footer />
    </div>
  )
}

export default Post


export async function getServerSideProps(context) {

  const currentUser = context.query.profile

  const baseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const config = {
    headers:{
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      Authorization: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    }
  };
  const user = await axios.get(`${baseURL}/rest/v1/user?select=*&username=eq.${currentUser}`,config);
  const ideas = await axios.get(`${baseURL}/rest/v1/ideas?select=*&username=eq.${currentUser}`,config);
  
  const data = {user: {...user.data[0], password: null}, ideas: ideas.data.length};

  return {props: data}
}