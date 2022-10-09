import Profile from '../components/pages_components/Profile';
import Header from '../components/core/Header';
import axios from 'axios';
import Footer from '../components/core/Footer';

const Post = ({user, ideas, follows, followers}) => {

  return (
    <div>
        <Header title={'PROFILE'} username={user.username}/>
        <Profile user={user} ideas={ideas} follows={follows} followers={followers}/>
        <Footer activeNow={'PROFILE'}/>
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
  const userId = await user.data[0].user_id
  const ideas = await axios.get(`${baseURL}/rest/v1/ideas?select=*&user_id=eq.${userId}`,config);
  const follows = await axios.get(`${baseURL}/rest/v1/user_follows?select=*&user_id=eq.${userId}`,config);
  const followers = await axios.get(`${baseURL}/rest/v1/user_follows?select=*&follow_user_id=eq.${userId}`,config);
  
  const data = {user: {...user.data[0], password: null}, ideas: ideas.data, follows: follows.data, followers: followers.data};

  return {props: data}
}