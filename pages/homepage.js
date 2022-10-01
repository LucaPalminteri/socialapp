import Header from '../components/core/Header'
import Homepage from '../components/pages_components/Homepage'
import Footer from '../components/core/Footer'

function homepage() {
  return (
    <div>
      <Header title={'HOMEPAGE'} />
      <Homepage />
      <Footer activeNow='HOMEPAGE'/>
    </div>
  )
}

export default homepage