import React from 'react'
import Footer from '../components/core/Footer'
import Header from '../components/core/Header'

function NotificationsPage() {
  return (
    <div>
        <Header showBackArrow={false} title={undefined} username={undefined}/>
        <div className='center'>
            <p>Notifications is coming soon...</p>
        </div>
        <Footer activeNow='NOTIFICATIONS'/>
    </div>
  )
}

export default NotificationsPage