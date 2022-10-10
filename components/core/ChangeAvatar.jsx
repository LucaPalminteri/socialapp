import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import Image from 'next/image'

export default function Avatar({ url, size, onUpload }) {
    
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from('socialapp/profile-img')
        .download(path)
    //   if (error) {
    //     throw error
    //   }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  async function uploadAvatar(event) {
     try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      console.log(file);

      let { error } = await supabase.storage
        .from('socialapp/profile-img')
        .upload(filePath, file)


      if (error) {
        throw error
      }

      onUpload(filePath)
      location.reload()
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          style={{borderRadius: size}}
          alt="Avatar"
          width={size}
          height={size}

        />
      ) : (
        <Image
          src={'/user-img.jpg'}
          style={{borderRadius: size}}
          alt="Avatar"
          width={size}
          height={size}

        />
      )}
      <div>
        <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Change profile photo'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
            width: '20px'
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  )
}