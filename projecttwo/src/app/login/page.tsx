'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
function page() {

  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [ loading, setLoading] = useState(false);

  const onLogin = async ()=>{
    try {
      setLoading(true)
      setButtonDisabled(true)
      const resp = await axios.post("/api/users/login", user)

      console.log("Login success ", resp.data);
      router.push('/login')

      toast.success("Login successfully")

    } catch (error : any) {
      console.log('Login failed');
      toast.error(error.message)
    }
    setButtonDisabled(false)
    router.push('/profile')
  }

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  },[user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "processing" : "Signup"}</h1>
      <br />
      <div className='flex items-center justify-between py-2 w-full max-w-sm'>
        <label htmlFor="username">Email :</label>
        <input 
          id='email'
          value={user.email}
          onChange={(e)=>{setUser({...user, email: e.target.value})}}
          placeholder='email'
          type="email" 
          className='bg-transparent p-1 border-b border-gray-600 px-4 mb-4 focus:outline-none focus:border-gray-400 focus:bg-transparent'
        />
      </div>
      <div className='flex items-center justify-between py-2 w-full max-w-sm'>
        <label htmlFor="username">Password :</label>
        <input 
          id='password'
          value={user.password}
          onChange={(e)=>{setUser({...user, password: e.target.value})}}
          placeholder='password'
          type="password" 
          className='bg-transparent p-1 border-b border-gray-600 px-4 mb-4 focus:outline-none focus:border-gray-400 focus:bg-transparent'
        />
      </div>
      {buttonDisabled ? <h1>Please fill the form</h1> : (
        <button
          className='py-1 px-4 border border-gray-300 bg-gradient-to-br from-black to-blue-600 rounded-lg my-4 focus:outline-none focus:border-gray-700 active:scale-95'
          onClick={onLogin}
        >Login 
        </button>
      )}
      <Link href="/signup" className='mt-5'>Visit signup page</Link>
    </div>
  )
}

export default page
