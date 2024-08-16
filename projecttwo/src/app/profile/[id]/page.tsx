'use client'

import React from 'react'

function page({params}: any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='my-4'>Profile Page</h1>
      <h2 className='p-3 bg-orange-500 text-white rounded-md font-semibold text-2xl'>{params.id}</h2>
    </div>
  )
}

export default page
