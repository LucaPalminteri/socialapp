import Header from '../components/core/Header';
import Profile from '../components/pages_components/Profile';
import Footer from '../components/core/Footer'

function profile() {
  return (
    <div>
      <Header title={'PROFILE'}/>
      <Profile />
      <Footer activeNow={'PROFILE'}/>
    </div>
  )
}

export default profile