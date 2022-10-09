import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TranslateIcon from '@mui/icons-material/Translate';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import SupportOutlinedIcon from '@mui/icons-material/SupportOutlined';

export default function Settings() {

  const logout = async () => {
    try {
      await axios.get("/api/auth/signout");
    } catch (error) {
      console.error(error.message);
    }
    router.push("/");
  };

  const router = useRouter()

  const shareData = {
    title: 'Social App',
    text: 'Join a small social app project!',
    url: 'https://socialapp-phi.vercel.app/'
  }

  const shareHandler = async () => {
    try {
      await navigator.share(shareData)
    } catch(error) {
      console.error(error);
    }
  }


  return (
    <div className='settings'>
        <nav>
          <li>
            <TranslateIcon/>
            <p>Language</p>
          </li>
          <li>
            <NotificationsNoneOutlinedIcon/>
            <p>Notifications</p>
          </li>
          <li>
            <ColorLensOutlinedIcon/>
            <p>Theme</p>
          </li>
          <Link href='/edit-profile'>
            <li>
              <AccountBoxOutlinedIcon/>
              <p>Edit Profile</p>
            </li>
          </Link>
          <li>
            <BookmarkBorderIcon/>
            <p>Archive Ideas</p>
          </li>
          <li>
            <LockOutlinedIcon/>
            <p>Privacy</p>
          </li>
          <li>
            <SecurityOutlinedIcon/>
            <p>Security</p>
          </li>
          <li>
            <InfoOutlinedIcon/>
            <p>About</p>
          </li>
          <li>
            <SupportOutlinedIcon/>
            <p>Help</p>
          </li>
          <li onClick={shareHandler}>
            <PersonAddAltOutlinedIcon/>
            <p>Invite friends</p>
          </li>
          <li onClick={() => logout()}>
            <LogoutOutlinedIcon/>
            <p>Log out</p>
          </li>
        </nav>
    </div>
  )
}