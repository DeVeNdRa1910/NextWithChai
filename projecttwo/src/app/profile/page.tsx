'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function page() {

  const router =  useRouter();
  const [data, setData] = useState("nothing");

  const getUserData = async ()=>{
    try {
      const resp = await axios.post("/api/users/me");
      setData(resp.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message)
    }
  }

  const logout = async ()=>{
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout success');
      router.push('/login')
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile page</h1>
      <br />
      <h2>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>Click: {data}</Link>}</h2>
      <br />
      <button
        className='py-1 px-4 border border-gray-300 bg-gradient-to-br from-black to-green-600 rounded-lg my-4 focus:outline-none focus:border-gray-700 active:scale-95'
        onClick={getUserData}
      >
        Get-Details
      </button>
      <button
        className='py-1 px-4 border border-gray-300 bg-gradient-to-br from-black to-red-600 rounded-lg my-4 focus:outline-none focus:border-gray-700 active:scale-95'
        onClick={logout}
      >
        Logout
      </button>
    </div>
  )
}

export default page
