'use client'
import React from 'react'
import { trpc } from '../_trpc/client'
import { MaxWidthWrapper } from '../components/MaxWidthWrapper'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'

const page = () => {
   const {data,isLoading,error}=trpc.getUser.useQuery(undefined,{
        retry:true,
        retryDelay:500
   })


   if(error) return <div>Error: {error.message}</div>
  
   if(!data)
   return (
    <MaxWidthWrapper className=' mb-12 mt-14 sm:mt-30 justify-center items-center flex flex-col text-center'>
      <Loader2 className=' h-8 w-8 animate-spin ' color="blue"/>
      <h1 className=' text-2xl mt-3  font-semibold text-zinc-500'>Connecting to database </h1>
      <p>You will be automatically redirected</p>

     </MaxWidthWrapper> 
  
  ) 

  if(data) redirect('/dashboard')
}

export default page