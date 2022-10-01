import React from 'react'
import Link from 'next/link'

function Settings() {
  return (
    <div>
        <h1>Settings</h1>
        <Link href='/profile'>
            <button>Go Back</button>
        </Link>
    </div>
  )
}

export default Settings