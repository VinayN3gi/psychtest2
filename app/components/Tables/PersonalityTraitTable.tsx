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

    const {data,isLoading}=trpc.getPesonalityInventory.useQuery()
    
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
        {
            name:'Extraversion',
            score:data.extraversionScore * 10,
            averageScore:32
        },
        {
            name:'Agreeableness',
            score:data.agreeablenessScore * 10,
            averageScore:35
        },
        {
            name:'Conscientiousness',
            score:data.conscientiousnessScore * 10,
            averageScore:37
        },
        {
            name:'Emotional Stability',
            score:data.stabilityScore * 10,
            averageScore:47
        },
        {
            name:'Openness to Experience',
            score:data.experienceOpennessScore * 10,
            averageScore:54
        }
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
                    <TableCell className="p-2 ">Extraversion</TableCell>
                    <TableCell className="p-2">{`${data.extraversionScore *10}%`}</TableCell>
                    <TableCell className="p-2">Prefers smaller group interactions and quiet environmnet.</TableCell>
                </TableRow>
                <TableRow className='bg-blue-100'>
                    <TableCell className="p-2">Agreeableness</TableCell>
                    <TableCell className="p-2">{`${data.agreeablenessScore * 10}%`}</TableCell>
                    <TableCell className="p-2">Cooperative,empathetic,and enjoys helping others.</TableCell>
                </TableRow>
                <TableRow className='bg-white'>
                    <TableCell className="p-2 w-[200px]">Conscientiousness</TableCell>
                    <TableCell className="p-2">{`${data.conscientiousnessScore *10}%`}</TableCell>
                    <TableCell className="p-2">Organized,responsible and detatl-oriented.</TableCell>
                </TableRow>
                <TableRow className='bg-blue-100'>
                    <TableCell className="p-2 w-[200px]">Emotional Stability</TableCell>
                    <TableCell className="p-2">{`${data.stabilityScore *10}%`}</TableCell>
                    <TableCell className="p-2">Generally calm and resilient under stress.</TableCell>
                </TableRow>
                <TableRow className='bg-white'>
                    <TableCell className="p-2 w-[200px]">Openness to Experience</TableCell>
                    <TableCell className="p-2">{`${data.experienceOpennessScore *10}%`}</TableCell>
                    <TableCell className="p-2">Highly imaginative,curious and open to new experiences and ideas.</TableCell>
                </TableRow>
            </TableBody>
        </Table>

        <div className=' mt-10  mb-10 '>
            <h1 className=' text-xl  font-semibold text-blue-600 mb-4'>
                Personality Traits Score
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
                Personality Trait Comparision
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