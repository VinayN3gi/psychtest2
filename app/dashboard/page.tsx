
import { trpc } from '@/app/_trpc/client'
import { db } from '@/app/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { MaxWidthWrapper } from '../components/MaxWidthWrapper'
import { Ghost } from 'lucide-react'
import Dashboard from '../components/Dashboard'




const page = async () => {
    const {getUser}=getKindeServerSession()
    const user=await getUser()

    if(!user) redirect('/auth_callback')

    const dbUser=await  db.user.findFirst({where:{id:user.id}})  

    if(!dbUser) redirect('/auth_callback')

  return (
    <Dashboard/>
  )
}

export default page