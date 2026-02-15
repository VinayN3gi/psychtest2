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

    const {data,isLoading}=trpc.getSkillAssesment.useQuery()
    
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
            name:'Analytical Thinking',
            score:data.analyticalScore * 10,
            averageScore:32
        },
        {
            name:'Creativity',
            score:data.creativeScore * 10,
            averageScore:38
        },
        {
            name:'Communnication',
            score:data.communicationScore * 10,
            averageScore:40
        },
        {
            name:'Technical Skills',
            score:data.technicalScore * 10,
            averageScore:42
        },
        {
            name:'Teamwork',
            score:data.teamworkScore * 10,
            averageScore:39
        },
        {
            name:'Leadership',
            score:data.leadershipScore * 10,
            averageScore:23
        },
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
                    <TableCell className="p-2  w-[200px]">Analytical Thinking</TableCell>
                    <TableCell className="p-2">{`${data.analyticalScore *10}%`}</TableCell>
                    <TableCell className="p-2">Strong ability to analyze information and solve complex problems.</TableCell>
                </TableRow>
                <TableRow className='bg-blue-100'>
                    <TableCell className="p-2 w-[200px]">Creativity</TableCell>
                    <TableCell className="p-2">{`${data.creativeScore * 10}%`}</TableCell>
                    <TableCell className="p-2">Excellent in generating original ideas and solutions.</TableCell>
                </TableRow>
                <TableRow className='bg-white'>
                    <TableCell className="p-2 w-[200px]">Communnication</TableCell>
                    <TableCell className="p-2">{`${data.communicationScore *10}%`}</TableCell>
                    <TableCell className="p-2">Effective in conveying ideas clearly and engaging others.</TableCell>
                </TableRow>
                <TableRow className='bg-blue-100'>
                    <TableCell className="p-2 w-[200px]">Technical Skills</TableCell>
                    <TableCell className="p-2">{`${data.technicalScore *10}%`}</TableCell>
                    <TableCell className="p-2">Competent in technical task but prefers more creative or investigrative work.</TableCell>
                </TableRow>
                <TableRow className='bg-white'>
                    <TableCell className="p-2 w-[200px]">Teamwork</TableCell>
                    <TableCell className="p-2">{`${data.teamworkScore *10}%`}</TableCell>
                    <TableCell className="p-2">Works well in groups but may prefer individual tasks when focusing on creativity.</TableCell>
                </TableRow>
                <TableRow className='bg-blue-100'>
                    <TableCell className="p-2 w-[200px]">Leadership</TableCell>
                    <TableCell className="p-2">{`${data.leadershipScore *10}%`}</TableCell>
                    <TableCell className="p-2">Interested in leading a team of individuals capable of taking difficult decision.</TableCell>
                </TableRow>
            </TableBody>
        </Table>

        <div className=' mt-10 mb-10'>
            <h1 className='text-xl font-semibold text-blue-600 mb-4 '>
                Skill Assesment Chart
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
                Skill Assesment Comparision
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