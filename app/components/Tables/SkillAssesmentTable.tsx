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
    analyticalscore: number
    communicationscore: number
    creativescore: number
    leadershipscore: number
    technicalscore: number
    teamworkscore: number
}

type valuesInterface = {
    name: string,
    score: number,
    averageScore: number
}

const SkillAssessmentTable = () => {

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
                    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-skill-assessment`,
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

    // ⚠️ Map lowercase → UI
    const values: valuesInterface[] = [
        {
            name: 'Analytical Thinking',
            score: data.analyticalscore * 10,
            averageScore: 32
        },
        {
            name: 'Creativity',
            score: data.creativescore * 10,
            averageScore: 38
        },
        {
            name: 'Communication',
            score: data.communicationscore * 10,
            averageScore: 40
        },
        {
            name: 'Technical Skills',
            score: data.technicalscore * 10,
            averageScore: 42
        },
        {
            name: 'Teamwork',
            score: data.teamworkscore * 10,
            averageScore: 39
        },
    ]

    return (
        <div>
            <Table className="min-w-full shadow-md rounded-lg overflow-hidden">
                <TableHeader className="bg-blue-600 text-white">
                    <TableRow>
                        <TableHead className="text-black p-2 text-lg">Skill</TableHead>
                        <TableHead className="text-black p-2 text-lg">Score</TableHead>
                        <TableHead className="text-black p-2 text-lg">Description</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className="text-gray-700 text-lg">
                    <TableRow className='bg-white'>
                        <TableCell>Analytical Thinking</TableCell>
                        <TableCell>{`${data.analyticalscore * 10}%`}</TableCell>
                        <TableCell>Strong problem-solving ability</TableCell>
                    </TableRow>

                    <TableRow className='bg-blue-100'>
                        <TableCell>Creativity</TableCell>
                        <TableCell>{`${data.creativescore * 10}%`}</TableCell>
                        <TableCell>Generates innovative ideas</TableCell>
                    </TableRow>

                    <TableRow className='bg-white'>
                        <TableCell>Communication</TableCell>
                        <TableCell>{`${data.communicationscore * 10}%`}</TableCell>
                        <TableCell>Expresses ideas clearly</TableCell>
                    </TableRow>

                    <TableRow className='bg-blue-100'>
                        <TableCell>Technical Skills</TableCell>
                        <TableCell>{`${data.technicalscore * 10}%`}</TableCell>
                        <TableCell>Strong technical capability</TableCell>
                    </TableRow>

                    <TableRow className='bg-white'>
                        <TableCell>Teamwork</TableCell>
                        <TableCell>{`${data.teamworkscore * 10}%`}</TableCell>
                        <TableCell>Works well with others</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            {/* 📊 Area Chart */}
            <div className='mt-10 mb-10'>
                <h1 className='text-xl font-semibold text-blue-600 mb-4'>
                    Skill Assessment Chart
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
                    Skill Assessment Comparison
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

export default SkillAssessmentTable