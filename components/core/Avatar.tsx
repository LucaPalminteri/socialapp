import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import Image from 'next/image'
import React from 'react'

export default function Avatar({ url, size }) {

  const [avatarUrl, setAvatarUrl] = useState('/user-img.jpg')

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from('socialapp/profile-img')
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
        size == 100 ?
        <a href={avatarUrl}>
          <Image
              style={{borderRadius: 100}}
            src={avatarUrl}
            alt="Avatar"
            className="avatar image"
            width={size}
            height={size}
          />
        </a>
        :
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