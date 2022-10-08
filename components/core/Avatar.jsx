import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import Image from 'next/image'
import Link from 'next/link'

export default function Avatar({ url, size }) {

  const [avatarUrl, setAvatarUrl] = useState('/user-img.jpg')

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from('public/socialapp/profile-img')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  return (
    <div>
      {avatarUrl ? (
        <Image
            style={{borderRadius: 100}}
          src={avatarUrl}
          alt="Avatar"
          className="avatar image"
          width={size}
          height={size}
        />
      ) : (
        <div
          className="avatar no-image"
          style={{ height: size, width: size }}
        />
      )}
     
    </div>
  )
}