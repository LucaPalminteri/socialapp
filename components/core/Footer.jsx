import React from 'react'
import Link from 'next/link'

function Footer() {
  return (
    <div>
        <Link href='/homepage'>
            <button>Homepage</button>
        </Link>
        <Link href='/create'>
            <button>Create</button>
        </Link>
        <Link href='/profile'>
            <button>Profile</button>
        </Link>
    </div>
  )
}

export default Footer