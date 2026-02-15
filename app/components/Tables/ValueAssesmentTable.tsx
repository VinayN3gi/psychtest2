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


interface valuesInterface{
    name:string,
    score:number,
    averageScore:number
}


const InterestInventoryTable = () => {

    const {data,isLoading,error}=trpc.getValueAssesment.useQuery()
    
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
        {name:'Autonomy',score:data.autonomyScore * 10,averageScore:67},
        {name:'Innovation',score:data.innovationScore *10 ,averageScore:24},
        {name:'Achievement',score:data.achievementScore * 10,averageScore:27},
        {name:'Helping',score:data.helpingScore *10 ,averageScore:34},
        {name:'Stability',score:data.stabilityScore *10 ,averageScore:39},
        {name:'Financial',score:data.financialScore * 10 ,averageScore:42}

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
                    <TableCell className="p-2  w-[200px]">Autonomy</TableCell>
                    <TableCell className="p-2">{`${data.autonomyScore *10}%`}</TableCell>
                    <TableCell className="p-2">Values independence and the ability to make decisions.</TableCell>
                </TableRow>
                <TableRow className='bg-blue-100'>
                    <TableCell className="p-2 w-[200px]">Innovation</TableCell>
                    <TableCell className="p-2">{`${data.innovationScore * 10}%`}</TableCell>
                    <TableCell className="p-2">Thrives in environment that encourage new ideas and creativity.</TableCell>
                </TableRow>
                <TableRow className='bg-white'>
                    <TableCell className="p-2 w-[200px]">Achievement</TableCell>
                    <TableCell className="p-2">{`${data.achievementScore *10}%`}</TableCell>
                    <TableCell className="p-2">Motivated by setting and achieveing personal goals.</TableCell>
                </TableRow>
                <TableRow className='bg-blue-100'>
                    <TableCell className="p-2 w-[200px]">Helping score</TableCell>
                    <TableCell className="p-2">{`${data.helpingScore *10}%`}</TableCell>
                    <TableCell className="p-2">Enjoys contributing to other&apos;s well-being and success.</TableCell>
                </TableRow>
                <TableRow className='bg-white'>
                    <TableCell className="p-2 w-[200px]">Stability</TableCell>
                    <TableCell className="p-2">{`${data.stabilityScore *10}%`}</TableCell>
                    <TableCell className="p-2">Seeks balance but is open to change and variety in work.</TableCell>
                </TableRow>
                <TableRow className='bg-blue-100'>
                    <TableCell className="p-2 w-[200px]">Financial </TableCell>
                    <TableCell className="p-2">{`${data.financialScore *10}%`}</TableCell>
                    <TableCell className="p-2">Motivated by financial incentives.</TableCell>
                </TableRow>
            </TableBody>
        </Table>

        <div className=' mt-10  mb-10 '>
            <h1 className=' text-xl  font-semibold text-blue-600 mb-4'>
                    Value Assesment Scores
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
                Value Assesment Comparision
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
          <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="averageScore" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

          </div>


        </div>
      );

}

export default InterestInventoryTable