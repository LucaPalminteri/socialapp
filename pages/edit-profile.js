import EditProfile from '../components/pages_components/EditProfile'
import Header from '../components/core/Header'
import axios from 'axios'
import jwt from "jsonwebtoken"; 

function editprofile({countries,user}) {

  return (
    <div>
        <Header/>
        <EditProfile countries={countries} user={user}/>
    </div>
  )
}

export default editprofile



export async function getServerSideProps(context) {

  const token = context.req.cookies.token

  const baseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const config = {
    headers:{
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      Authorization: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    }
  };

  const currentUser = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_NAME);
  const user = await axios.get(`${baseURL}/rest/v1/user?select=*&user_id=eq.${currentUser.user_id}`,config);

  const baseURLcountry = 'https://countrycode.dev/api/countries';
  const {data} = await axios.get(baseURLcountry);

  return {props: {countries: data, user: user.data[0]}}
}