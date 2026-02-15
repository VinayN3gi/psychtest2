'use client'
import React, { useState } from 'react'
import { MaxWidthWrapper } from './MaxWidthWrapper'
import { Ghost, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { trpc } from '../_trpc/client'
import { buttonVariants } from '@/components/ui/button'


const Dashboard = () => {

  const {data,isLoading}=trpc.getDashboardInfo.useQuery()

  const [clikc,setClick]=useState(false)


  if(isLoading)
  {
    return(
    <MaxWidthWrapper>
      <div className=' mt-10 justify-center items-center flex flex-col'>
        <h1 className=' text-blue-600 text-4xl font-bold text-center '>
          Loading please wait...
        </h1>
        <Loader2 className=' w-10 h-10 animate-spin mt-5' color='blue'/>
      </div>
    </MaxWidthWrapper>
    )
  }

  if(!data)
  {
  return (
    <MaxWidthWrapper>
    <div className=' flex flex-col divide-x-2 divide-zinc-200 text-5xl font-bold text-gray-900/90 mt-5 md:mt-0'>
         My Reports
    </div>
    <div className=' mt-16 flex flex-col items-center gap-2 '>
     <Ghost className=' h-10 w-10 text-zinc-800 '/>
     <h3 className=' font-bold text-xl'>Pretty empty around here </h3>
       <p>Take the <span className=' text-blue-600  hover:text-blue-900 hover:underline'>
        <Link href="/testPage">
        test
        </Link>
        </span> to generate report</p>  
    </div>
  </MaxWidthWrapper>
  )
  }

  return(
    <MaxWidthWrapper>
      <div className=' flex  flex-col divide-x-2 border-b-2 border-gray-600/20 divide-zinc-200 text-5xl font-bold text-gray-900/90 mt-5 md:mt-0 '>
         <span className=' mb-4'>
         My Reports
         </span>
    </div>
    <div className=' mt-8 text-2xl text-black/70  font-semibold'>
      You have already taken the test .Please click on the button to view and download report
    </div>

    <div className=' w-full' onClick={()=>setClick(true)}>
      <Link href="/reportPage" className={buttonVariants({
        size:'lg',
        className:' mt-8 w-full'
      
      })}>
        {clikc ? 'Loading...':'View Report'}
      </Link>
    </div>
    
    </MaxWidthWrapper>
  )

  
}

export default Dashboard