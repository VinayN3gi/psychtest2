'use client'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Loader2 } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts'
import { supabase } from '@/lib/supabase'

type DataType = {
    artisticscore: number
    investigativescore: number
    socialscore: number
    realisticscore: number
    enterprisingscore: number
    conventionalscore: number
}

type valuesInterface = {
    name: string,
    score: number,
    averageScore: number
}

const InterestInventoryTable = () => {

    const [data, setData] = useState<DataType | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // ✅ get user
                const {
                    data: { user }
                } = await supabase.auth.getUser()

                if (!user) {
                    setData(null)
                    return
                }

                // ✅ call edge function
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-interest-inventory`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userId: user.id }),
                    }
                )


                const result = await res.json()
                console.log(result)
                setData(result)

            } catch (err) {
                console.error(err)
                setData(null)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    if (isLoading)
        return (
            <div className='justify-center flex items-center'>
                <Loader2 color='blue' className='h-7 w-7 animate-spin' />
            </div>
        )

    if (!data)
        return (
            <div className='justify-center text-center'>
                <div className='text-2xl font-bold'>No data found</div>
                <div className='mt-1'>Please refresh the page or try again later</div>
            </div>
        )

    const values: valuesInterface[] = [
        { name: 'Artistic', score: data.artisticscore * 10, averageScore: 40 },
        { name: 'Investigative', score: data.investigativescore * 10, averageScore: 35 },
        { name: 'Social', score: data.socialscore * 10, averageScore: 45 },
        { name: 'Realistic', score: data.realisticscore * 10, averageScore: 50 },
        { name: 'Enterprising', score: data.enterprisingscore * 10, averageScore: 55 },
        { name: 'Conventional', score: data.conventionalscore * 10, averageScore: 39 },
    ]

    return (
        <div>
            <Table className="min-w-full shadow-md rounded-lg overflow-hidden">
                <TableHeader className="bg-blue-600 text-white">
                    <TableRow>
                        <TableHead className="text-black p-2 text-lg">Interest Area</TableHead>
                        <TableHead className="text-black p-2 text-lg">Score</TableHead>
                        <TableHead className="text-black p-2 text-lg">Description</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className="text-gray-700 text-lg">
                    <TableRow className='bg-white'>
                        <TableCell>Artistic</TableCell>
                        <TableCell>{`${data.artisticscore * 10}%`}</TableCell>
                        <TableCell>Creative expression (art, music, writing)</TableCell>
                    </TableRow>

                    <TableRow className='bg-blue-100'>
                        <TableCell>Investigative</TableCell>
                        <TableCell>{`${data.investigativescore * 10}%`}</TableCell>
                        <TableCell>Problem-solving and research</TableCell>
                    </TableRow>

                    <TableRow className='bg-white'>
                        <TableCell>Social</TableCell>
                        <TableCell>{`${data.socialscore * 10}%`}</TableCell>
                        <TableCell>Helping and interacting with people</TableCell>
                    </TableRow>

                    <TableRow className='bg-blue-100'>
                        <TableCell>Realistic</TableCell>
                        <TableCell>{`${data.realisticscore * 10}%`}</TableCell>
                        <TableCell>Hands-on, practical tasks</TableCell>
                    </TableRow>

                    <TableRow className='bg-white'>
                        <TableCell>Enterprising</TableCell>
                        <TableCell>{`${data.enterprisingscore * 10}%`}</TableCell>
                        <TableCell>Leadership and business</TableCell>
                    </TableRow>

                    <TableRow className='bg-blue-100'>
                        <TableCell>Conventional</TableCell>
                        <TableCell>{`${data.conventionalscore * 10}%`}</TableCell>
                        <TableCell>Structured and organized work</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            {/* 📊 Area Chart */}
            <div className='mt-10 mb-10'>
                <h1 className='text-xl font-semibold text-blue-600 mb-4'>
                    Interest Inventory Scores
                </h1>

                <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={values}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="score" stroke="#ADD8E6" fill="#ADD8E6" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* 📈 Line Chart */}
            <div className='mb-5'>
                <h1 className='text-xl text-blue-600 font-semibold mb-5'>
                    Interest Inventory Comparison
                </h1>

                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={values}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="score" stroke="#ADD8E6" />
                        <Line type="monotone" dataKey="averageScore" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default InterestInventoryTable