import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function Index() {
  return (
    <div className=''>
        
        <Image src={'/ideagram-horizontal.png'} width={300} height={90} alt={''}/>
        <Image src={'/ideas-team-5.jpg'} width={300} height={300} alt={''} />

        <div style={{display: 'flex', justifyContent: 'center'}}>
      <Link href='/login'>
            <button>Login</button>
        </Link>
      <Link href='/signup'>
            <button>Create account</button>
        </Link>
        </div>

        {/* <Image src={'/ideas-team-1.jpg'} width={300} height={300} alt={''}/>
        <Image src={'/ideas-team-2.jpg'} width={300} height={300} alt={''}/>
        <Image src={'/ideas-team-3.jpg'} width={300} height={300} alt={''}/>
        <Image src={'/ideas-team-4.jpg'} width={300} height={300} alt={''}/> */}
    </div>
  )
}