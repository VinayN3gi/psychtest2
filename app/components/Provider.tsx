'use client'
import React, { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // Import the QueryClient class
import { trpc } from '../_trpc/client'
import { httpBatchLink } from '@trpc/client'
import { absoluteUrl } from '@/lib/utils'


const Provider = ({children}:{children:ReactNode}) => {
    const [queryClient] = useState(()=>new QueryClient()) // Use QueryClient instead of queryClient
    const [trpcClient] = useState(()=>trpc.createClient({
      links:[
        httpBatchLink({
          url:absoluteUrl('/api/trpc')
         // url:'http://localhost:3000/api/trpc'
        
        })
      ]
    })) // Use trpcClient instead of trpcClient
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default Provider