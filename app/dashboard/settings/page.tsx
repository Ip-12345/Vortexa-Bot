import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function settings() {
  return (
    <div className='flex justify-center items-center h-full'>
      <UserProfile routing="hash"/>
    </div>
  )
}

export default settings
