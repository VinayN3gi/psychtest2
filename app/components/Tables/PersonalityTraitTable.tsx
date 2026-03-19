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

type DataType = {
    extraversionscore: number
    agreeablenessscore: number
    consciencetiousnessscore: number
    stabilityscore: number
    experienceopenessscore: number
}

type valuesInterface = {
    name: string,
    score: number,
    averageScore: number
}

const PersonalityInventoryTable = () => {

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
                    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-personality-inventory`,
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
            <div className='justify-center flex items-center'>
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

    // ⚠️ Map lowercase → camelCase usage
    const values: valuesInterface[] = [
        {
            name: 'Extraversion',
            score: data.extraversionscore * 10,
            averageScore: 32
        },
        {
            name: 'Agreeableness',
            score: data.agreeablenessscore * 10,
            averageScore: 35
        },
        {
            name: 'Conscientiousness',
            score: data.consciencetiousnessscore * 10,
            averageScore: 37
        },
        {
            name: 'Emotional Stability',
            score: data.stabilityscore * 10,
            averageScore: 47
        },
    ]

    return (
        <div>
            <Table className="min-w-full shadow-md rounded-lg overflow-hidden">
                <TableHeader className="bg-blue-600 text-white">
                    <TableRow>
                        <TableHead className="text-black p-2 text-lg">Trait</TableHead>
                        <TableHead className="text-black p-2 text-lg">Score</TableHead>
                        <TableHead className="text-black p-2 text-lg">Description</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className="text-gray-700 text-lg">
                    <TableRow className='bg-white'>
                        <TableCell>Extraversion</TableCell>
                        <TableCell>{`${data.extraversionscore * 10}%`}</TableCell>
                        <TableCell>Prefers smaller groups and calm environments.</TableCell>
                    </TableRow>

                    <TableRow className='bg-blue-100'>
                        <TableCell>Agreeableness</TableCell>
                        <TableCell>{`${data.agreeablenessscore * 10}%`}</TableCell>
                        <TableCell>Cooperative and empathetic.</TableCell>
                    </TableRow>

                    <TableRow className='bg-white'>
                        <TableCell>Conscientiousness</TableCell>
                        <TableCell>{`${data.consciencetiousnessscore * 10}%`}</TableCell>
                        <TableCell>Organized and responsible.</TableCell>
                    </TableRow>

                    <TableRow className='bg-blue-100'>
                        <TableCell>Emotional Stability</TableCell>
                        <TableCell>{`${data.stabilityscore * 10}%`}</TableCell>
                        <TableCell>Calm under pressure.</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            {/* 📊 Area Chart */}
            <div className='mt-10 mb-10'>
                <h1 className='text-xl font-semibold text-blue-600 mb-4'>
                    Personality Traits Score
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
                    Personality Trait Comparison
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

export default PersonalityInventoryTable