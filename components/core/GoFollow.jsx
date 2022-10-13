import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



function GoFollow() {
  return (
    <div className='go-follow'>
        <Image height={300} width={300} alt={''} src={'/go-follow.jpg'}/>
        <h3>Seems you don&apos;t follow anyone</h3>
        <Link href={'/search'}>
            <button>Show me some accounts!</button>
        </Link>
            
    </div>
  )
}

export default GoFollow