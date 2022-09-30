import Link from 'next/link'
import React from 'react'

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