
import { useToast } from '@/components/ui/use-toast'
import { getKindeServerSession, LoginLink } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect, RedirectType } from 'next/navigation'
import React from 'react'
import { MaxWidthWrapper } from '../components/MaxWidthWrapper'
import { Bird, BookA } from 'lucide-react'
import { db } from '../db'
import { buttonVariants } from '@/components/ui/button'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import TextPageComponent from '../components/TextPageComponent'






const page = async () => {
  const {getUser}=getKindeServerSession()
  const user=await getUser()


 if(!user || !user.id)
  {

    return (
      <MaxWidthWrapper className=' mx-auto mb-12 mt-14 sm:mt-30 justify-center items-center flex flex-col text-center'>
          <BookA className=' h-20 w-20'/>
          <h1 className=' mt-4 text-3xl font-semibold text-zinc-600'>User not logged in </h1>
          <p className=' mt-2 text-zinc-500'>Please <span>
            <LoginLink className=' text-blue-500 hover:underline hover:text-blue-800 font-semibold'>
              login
            </LoginLink>
            </span>  to take the test</p>
      </MaxWidthWrapper>
    )
    
  }

  const dbUser=db.user.findFirst({
    where:{
      id:user.id
    }
  })

  if(!dbUser) redirect("/auth_callback")

    

  return (
    <div>
      <TextPageComponent/>
    </div>
  )
}

export default page