'use client'
import React from 'react'
import courseData from "@/data/music_courses.json"
import Link from 'next/link'
import { BackgroundGradient } from './ui/background-gradient'

// design our data type it is feature of typeScript
interface Course{
    id: number,
    title: String,
    slug: String,
    description: String,
    price: number,
    instructor: String,
    isFeatured: boolean,
    image: String
}

function FeaturedCourses() {

  // batana padega ki item ka data type kya hai (item:Course) like that
  const featuredCourses = courseData.courses.filter((item:Course) => item.isFeatured)



  return (
    <div className='py-12 bg-gray-900'>
      <div>
        <div className="text-center">
          <h2 className='text-base text-teal-600 font-semibold tracking-wide uppercase' >FEATURED COURSES</h2>
          <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight teact-white sm:text-4xl'>Learn With the Best</p>
        </div>
      </div>
      <div className='mt-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center'>
          {featuredCourses.map((item:Course) => (
            <div key={item.id} className="flex justify-center">
              <BackgroundGradient className=' rounded-3xl flex flex-col  bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-sm' >
                <div className='p-4 sm:p-6 flex flex-col items-center text-center flex-grow rounded-3xl' >
                  <img src={item.image}  alt="" className='h-60 rounded-2xl' />
                  <p className='font-bold text-xl mt-1 mb-4' >{item.title}</p>
                  <p className='mb-4' >{item.description}</p>
                  <Link href={`/courses/${item.slug}}`} 
                  className='px-4 py-2 rounded border border-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 duration-200'
                  >
                    Learn More
                  </Link> 
                </div>
              </BackgroundGradient>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-20 text-center '>
        <Link href={"/courses"}
        className='px-4 py-2 rounded border border-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 duration-200'
        >
          View All Courses
        </Link>
      </div>
    </div>
  )
}

export default FeaturedCourses
