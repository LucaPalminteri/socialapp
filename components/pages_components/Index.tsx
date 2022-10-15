import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function Index() {
  return (
    <div className='index'>
      <div className='logo'>
        <Image src={'/ideagram-horizontal.png'} width={300} height={90} alt={''}/>
      </div>
      <div className='main-img'>
        <Image src={'/ideas-team-5.jpg'} width={300} height={300} alt={''} style={{borderRadius: 20}}/>
      </div>
      <div className='btn-container'>
        <Link href='/login'>
          <button>Login</button>
        </Link>
        <Link href='/signup'>
            <button>Create account</button>
        </Link>
      </div>
      {/* <div className='description'>
        <h2>A small project made for connect better ideas</h2>
      </div> */}
    </div>
  )
}