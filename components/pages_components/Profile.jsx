import Link from 'next/link'
import { useRouter } from 'next/router';
import axios from 'axios';

function Profile() {

    const router = useRouter()
  const logout = async () => {
    try {
      await axios.get("/api/auth/signout");
    } catch (error) {
      console.error(error.message);
    }
    router.push("/");
  };


  return (
    <div>
        <button  onClick={() => logout()}>Sign Out</button>
        <Link href='/settings'>
            <button>Settings</button>
        </Link>
    </div>
  )
}

export default Profile