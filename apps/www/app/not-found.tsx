import React from 'react'

export default function NotFound() {
  return (
    <div className='flex items-center justify-center w-full h-screen overflow-hidden'>
      <span className='font-uxum font-bold text-4xl'>
        <span className='text-destructive'>404{" "}</span> 
        | Page Not Found!
        </span>
    </div>
  )
}
