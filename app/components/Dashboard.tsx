'use client'
import React, { useEffect, useState } from 'react'
import { MaxWidthWrapper } from './MaxWidthWrapper'
import { Ghost, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'


const Dashboard = () => {


  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<boolean | null>(null)
  const [click, setClick] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Get logged-in user
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        if (error || !user) {
          console.error("User not found")
          setData(false)
          setIsLoading(false)
          return
        }
        await supabase.auth.refreshSession()
        
        const {
          data: { session },
        } = await supabase.auth.getSession()
        
      
        const res = await fetch(
          `https://rbmpvyjqeejrdoetptya.supabase.co/functions/v1/check_report`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.access_token}`,
            },
            body: JSON.stringify({ userId: user.id }),
          }
        )

        const result = await res.json()
        console.log(result)
        setData(result.exists)

      } catch (err) {
        console.error(err)
        setData(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()
  }, [])

  // 🔄 Loading
  if (isLoading) {
    return (
      <MaxWidthWrapper>
        <div className='mt-10 flex flex-col items-center justify-center'>
          <h1 className='text-blue-600 text-4xl font-bold text-center'>
            Loading please wait...
          </h1>
          <Loader2 className='w-10 h-10 animate-spin mt-5' color='blue' />
        </div>
      </MaxWidthWrapper>
    )
  }

  // No report
  if (!data) {
    return (
      <MaxWidthWrapper>
        <div className='flex flex-col text-5xl font-bold text-gray-900/90 mt-5 md:mt-0'>
          My Reports
        </div>

        <div className='mt-16 flex flex-col items-center gap-2'>
          <Ghost className='h-10 w-10 text-zinc-800' />
          <h3 className='font-bold text-xl'>Pretty empty around here</h3>
          <p>
            Take the{" "}
            <span className='text-blue-600 hover:text-blue-900 hover:underline'>
              <Link href="/testPage">test</Link>
            </span>{" "}
            to generate report
          </p>
        </div>
      </MaxWidthWrapper>
    )
  }

  // Has report
  return (
    <MaxWidthWrapper>
      <div className='flex flex-col border-b-2 border-gray-600/20 text-5xl font-bold text-gray-900/90 mt-5 md:mt-0'>
        <span className='mb-4'>My Reports</span>
      </div>

      <div className='mt-8 text-2xl text-black/70 font-semibold'>
        You have already taken the test. Please click on the button to view and download report
      </div>

      <div className='w-full' onClick={() => setClick(true)}>
        <Link
          href="/reportPage"
          className={buttonVariants({
            size: 'lg',
            className: 'mt-8 w-full',
          })}
        >
          {click ? 'Loading...' : 'View Report'}
        </Link>
      </div>
    </MaxWidthWrapper>
  )
}

export default Dashboard