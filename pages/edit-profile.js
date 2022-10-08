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

  const currentUsername = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_NAME);

  const baseURL = 'https://countrycode.dev/api/countries';
  const {data} = await axios.get(baseURL);

  return {props: {countries: data, user: currentUsername}}
}