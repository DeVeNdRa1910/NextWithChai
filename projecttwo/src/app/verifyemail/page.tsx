'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { useRouter } from 'next/router'
import Link from 'next/link'

function verifyEmail() {

  // const router = useRouter()

  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(true)

  const verifyUserEmail = async ()=>{
    try {
      const resp = await axios.post('/api/users/verifyemail', {token})
      setVerified(true)
      setError(false)
    } catch(error: any){
      setError(true)
      console.log(error.response.data);
    }
  }

  useEffect(()=>{
    // arrange token from url with simple js
    setError(false)
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "")
  }, [])



//import { useRouter } from 'next/router'
//  const router = useRouter()
/*   useEffect(()=>{
    // arrange token from url with simple NextJs


    // saari queries query parameter me aa jayngi
    const {query} = router
    //extract token
    const urlTokenTwo: any = query.token;
    setToken(urlTokenTwo)
  },[router]) */

  useEffect(()=>{
    setError(false)
    if(token.length>0){
      verifyUserEmail()
    }
  },[token])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-3xl'>Verirfy Email</h1>
      <h2 className='p-2 bg-orange-500 text-black'>
        {token ? `${token}` : "Can't Fetch"}
      </h2>
      {
        verified && (
          <div>
            <h2>Verified</h2>
            <Link href={'/login'}>Login</Link>
          </div>
        )
      }
      {
        error && (
          <div>
            <h2>{error}</h2>
          </div>
        )
      }
    </div>
  )
}

export default verifyEmail
