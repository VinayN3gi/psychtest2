'use client'
import React, { useEffect, useState } from 'react'
import { Loader2, BrainCircuit } from 'lucide-react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { supabase } from '@/lib/supabase'

type DataType = {
    extraversionscore: number
    agreeablenessscore: number
    consciencetiousnessscore: number
    stabilityscore: number
    experienceopenessscore: number // Added from your schema logic
}

export default function PersonalityInventoryTable() {
    const [data, setData] = useState<DataType | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) return setData(null)

                const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-personality-inventory`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: user.id }),
                })
                setData(await res.json())
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    if (isLoading) return <div className="bg-white rounded-3xl p-8 shadow-xl flex justify-center items-center min-h-[400px]"><Loader2 className='h-8 w-8 animate-spin text-blue-600' /></div>
    if (!data) return <div className="bg-white rounded-3xl p-8 shadow-xl text-center"><p className="text-slate-500">No data found</p></div>

    const values = [
        { name: 'Extraversion', score: data.extraversionscore * 10, fullMark: 100 },
        { name: 'Agreeableness', score: data.agreeablenessscore * 10, fullMark: 100 },
        { name: 'Conscientious', score: data.consciencetiousnessscore * 10, fullMark: 100 },
        { name: 'Stability', score: data.stabilityscore * 10, fullMark: 100 },
        // { name: 'Openness', score: data.experienceopenessscore * 10, fullMark: 100 }, // Ensure this exists in your DB
    ]

    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                    <BrainCircuit size={22} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Personality Profile</h2>
            </div>

            {/* Radar Chart */}
            <div className="h-[250px] w-full -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={values}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="User" dataKey="score" stroke="#8b5cf6" fill="#a78bfa" fillOpacity={0.5} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            {/* Progress Bars replacing the Table */}
            <div className="mt-6 space-y-4 flex-1">
                {values.map((trait, idx) => (
                    <div key={idx}>
                        <div className="flex justify-between text-sm font-semibold mb-1">
                            <span className="text-slate-700">{trait.name}</span>
                            <span className="text-purple-600">{trait.score}%</span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000" 
                                style={{ width: `${trait.score}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}