import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { trpc } from '@/app/_trpc/client'
import { Loader2 } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart, Line,Legend,} from 'recharts';




type valuesInterface={
    name:string,
    score:number,
    averageScore:number
}


const InterestInventoryTable = () => {
    

    const {data,isLoading}=trpc.getInterestInventory.useQuery()
    
    if(isLoading) return <div className=' justify-center flex items-center'><Loader2 color='blue' className=' h-7 w-7  animate-spin '/></div>


    if(!data) return <div className=' justify-center text-center'>
        <div className='text-2xl font-bold'>
        No data found
        </div>
        <div className=' mt-1'>
            Please refresh the page or try again later
        </div>
        </div>
    
   

        const values:valuesInterface[]=[
        {name:'Artistic',score:data.artisticScore * 10,averageScore:40},
        {name:'Investigative',score:data.investigativeScore * 10,averageScore:35},
        {name:'Social',score:data.socialScore * 10,averageScore:45},
        {name:'Realistic',score:data.realisticScore * 10 ,averageScore:50},
        {name:'Enterprising',score:data.enterprisingScore * 10,averageScore:55},
        {name:'Conventional',score:data.conventionalScore * 10,averageScore:39},
        ]

 
    return (
        <div>
        <Table className="min-w-full leading-normal shadow-md rounded-lg overflow-hidden">
            <TableHeader className="bg-blue-600 text-white">
                <TableRow>
                    <TableHead className=" text-black p-2 text-lg">Interest Area</TableHead>
                    <TableHead className="text-black p-2 text-lg">Score</TableHead>
                    <TableHead className="text-black p-2 text-lg">Description</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="text-gray-700 text-lg">
                <TableRow className='bg-white'>
                    <TableCell className="p-2  w-[200px]">Artistic</TableCell>
                    <TableCell className="p-2">{`${data.artisticScore *10}%`}</TableCell>
                    <TableCell className="p-2">You enjoy creating art, music, dance, drama, or creative writing. Likes to express ideas artistically</TableCell>
                </TableRow>
                <TableRow className='bg-blue-100'>
                    <TableCell className="p-2 w-[200px]">Investigative</TableCell>
                    <TableCell className="p-2">{`${data.investigativeScore * 10}%`}</TableCell>
                    <TableCell className="p-2">Curious about scientific and technical subjects. Likes to solve problems and conduct research.</TableCell>
                </TableRow>
                <TableRow className='bg-white'>
                    <TableCell className="p-2 w-[200px]">Social</TableCell>
                    <TableCell className="p-2">{`${data.socialScore *10}%`}</TableCell>
                    <TableCell className="p-2">Prefers working with people,helping others and engaging in social activities.</TableCell>
                </TableRow>
                <TableRow className='bg-blue-100'>
                    <TableCell className="p-2 w-[200px]">Realistic</TableCell>
                    <TableCell className="p-2">{`${data.realisticScore *10}%`}</TableCell>
                    <TableCell className="p-2">Enjoys practical,hands-on activities and working with tools or machinery</TableCell>
                </TableRow>
                <TableRow className='bg-white'>
                    <TableCell className="p-2 w-[200px]">Enterprising</TableCell>
                    <TableCell className="p-2">{`${data.enterprisingScore *10}%`}</TableCell>
                    <TableCell className="p-2">Interested in leading teams,making decisions,and maniging projects or businesses</TableCell>
                </TableRow>
                <TableRow className='bg-blue-100'>
                    <TableCell className="p-2 w-[200px]">Conventional</TableCell>
                    <TableCell className="p-2">{`${data.conventionalScore *10}%`}</TableCell>
                    <TableCell className="p-2">Prefers structured ,orderly tasks like data management,accounting or administrative work.</TableCell>
                </TableRow>
            </TableBody>
        </Table>
        
        <div className=' mt-10  mb-10 '>
            <h1 className=' text-xl  font-semibold text-blue-600 mb-4'>
                Interest Inventory Scores
            </h1>
        <ResponsiveContainer width="100%" height={250} >
        <AreaChart
          width={500}
          height={400}
          data={values}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="score" stroke="#ADD8E6" fill="#ADD8E6" />
        </AreaChart>
      </ResponsiveContainer>
        </div> 


          <div className=' mb-5'>
            <h1 className='text-xl text-blue-600 font-semibold mb-5'>
                Interest Inventory Comparision
            </h1>

        <ResponsiveContainer width="100%" height={250}>
        <LineChart
          width={500}
          height={400}
          data={values}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="score" stroke="#ADD8E6" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="averageScore" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

          </div>

        </div>
      );
}

export default InterestInventoryTable