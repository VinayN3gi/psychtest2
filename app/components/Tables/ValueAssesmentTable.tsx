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
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, LineChart, Line, Legend
} from 'recharts'
import { supabase } from '@/lib/supabase'

interface DataType {
    achievementscore: number
    innovationscore: number
    stabilityscore: number
    helpingscore: number
    autonomyscore: number
    financialscore: number
}

interface valuesInterface {
    name: string,
    score: number,
    averageScore: number
}

const ValueAssessmentTable = () => {

    const [data, setData] = useState<DataType | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {
                    data: { user }
                } = await supabase.auth.getUser()

                if (!user) {
                    setData(null)
                    return
                }

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-value-assessment`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userId: user.id }),
                    }
                )

                const result = await res.json()
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

    // 🔄 Loading
    if (isLoading)
        return (
            <div className='flex justify-center items-center'>
                <Loader2 className='h-7 w-7 animate-spin' color='blue' />
            </div>
        )

    // ❌ No data
    if (!data)
        return (
            <div className='text-center'>
                <div className='text-2xl font-bold'>No data found</div>
                <div className='mt-1'>Please refresh the page or try again later</div>
            </div>
        )

    // ⚠️ map lowercase → UI
    const values: valuesInterface[] = [
        { name: 'Autonomy', score: data.autonomyscore * 10, averageScore: 67 },
        { name: 'Innovation', score: data.innovationscore * 10, averageScore: 24 },
        { name: 'Achievement', score: data.achievementscore * 10, averageScore: 27 },
        { name: 'Helping', score: data.helpingscore * 10, averageScore: 34 },
        { name: 'Stability', score: data.stabilityscore * 10, averageScore: 39 },
        { name: 'Financial', score: data.financialscore * 10, averageScore: 42 }
    ]

    return (
        <div>
            <Table className="min-w-full shadow-md rounded-lg overflow-hidden">
                <TableHeader className="bg-blue-600 text-white">
                    <TableRow>
                        <TableHead className="text-black p-2 text-lg">Value</TableHead>
                        <TableHead className="text-black p-2 text-lg">Score</TableHead>
                        <TableHead className="text-black p-2 text-lg">Description</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className="text-gray-700 text-lg">
                    <TableRow className='bg-white'>
                        <TableCell>Autonomy</TableCell>
                        <TableCell>{`${data.autonomyscore * 10}%`}</TableCell>
                        <TableCell>Values independence</TableCell>
                    </TableRow>

                    <TableRow className='bg-blue-100'>
                        <TableCell>Innovation</TableCell>
                        <TableCell>{`${data.innovationscore * 10}%`}</TableCell>
                        <TableCell>Enjoys creativity</TableCell>
                    </TableRow>

                    <TableRow className='bg-white'>
                        <TableCell>Achievement</TableCell>
                        <TableCell>{`${data.achievementscore * 10}%`}</TableCell>
                        <TableCell>Goal-driven mindset</TableCell>
                    </TableRow>

                    <TableRow className='bg-blue-100'>
                        <TableCell>Helping</TableCell>
                        <TableCell>{`${data.helpingscore * 10}%`}</TableCell>
                        <TableCell>Helping others</TableCell>
                    </TableRow>

                    <TableRow className='bg-white'>
                        <TableCell>Stability</TableCell>
                        <TableCell>{`${data.stabilityscore * 10}%`}</TableCell>
                        <TableCell>Prefers stability</TableCell>
                    </TableRow>

                    <TableRow className='bg-blue-100'>
                        <TableCell>Financial</TableCell>
                        <TableCell>{`${data.financialscore * 10}%`}</TableCell>
                        <TableCell>Motivated by money</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            {/* 📊 Area Chart */}
            <div className='mt-10 mb-10'>
                <h1 className='text-xl font-semibold text-blue-600 mb-4'>
                    Value Assessment Scores
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
                    Value Assessment Comparison
                </h1>

                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={values}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="score" stroke="#8884d8" />
                        <Line type="monotone" dataKey="averageScore" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default ValueAssessmentTable