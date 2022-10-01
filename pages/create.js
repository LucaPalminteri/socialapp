import Header from '../components/core/Header'
import Create from '../components/pages_components/Create'
import Footer from '../components/core/Footer'

function create() {
  return (
    <div>
        <Header title={'CREATE'} />
        <Create />
        <Footer activeNow='CREATE'/>
    </div>
  )
}

export default create