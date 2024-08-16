'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function signupPage() {

  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [ loading, setLoading] = useState(false);

  const onSignup = async ()=>{
    try {
      setLoading(true)

      const resp = await axios.post("/api/users/signup", user)

      console.log("Signup success ", resp.data);
      router.push('/login')

      toast.success("User created successfully")

    } catch (error : any) {
      console.log('signup failed');
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
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
        <label htmlFor="username">Username :</label>
        <input 
          id='username'
          value={user.username}
          onChange={(e)=>{setUser({...user, username: e.target.value})}}
          placeholder='username'
          type="text" 
          className='bg-transparent p-1 border-b border-gray-600 px-4 mb-4 focus:outline-none focus:border-gray-400 focus:bg-transparent'
        />
      </div>
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
          onClick={onSignup}
        >Signup 
        </button>
      )}
      <Link href="/login" className='mt-5'>Visit login page</Link>
    </div>
  )
}