'use client'
import React, { useEffect, useState } from 'react'
import { Loader2, Target } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts'
import { supabase } from '@/lib/supabase'

type DataType = {
    analyticalscore: number
    communicationscore: number
    creativescore: number
    leadershipscore: number
    technicalscore: number
    teamworkscore: number
}

export default function SkillAssessmentTable() {
    const [data, setData] = useState<DataType | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) return setData(null)

                const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-skill-assessment`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: user.id }),
                })
                setData(await res.json())
            } catch (err) {
                console.error(err)
            } finally { setIsLoading(false) }
        }
        fetchData()
    }, [])

    if (isLoading) return <div className="bg-white rounded-3xl p-8 shadow-xl flex justify-center items-center min-h-[400px]"><Loader2 className='h-8 w-8 animate-spin text-blue-600' /></div>
    if (!data) return <div className="bg-white rounded-3xl p-8 shadow-xl text-center"><p className="text-slate-500">No data found</p></div>

    // Sorted to make the horizontal bar chart look like a leaderboard
    const values = [
        { name: 'Analytical', score: data.analyticalscore * 10, desc: "Strong problem-solving ability" },
        { name: 'Creativity', score: data.creativescore * 10, desc: "Generates innovative ideas" },
        { name: 'Communication', score: data.communicationscore * 10, desc: "Expresses ideas clearly" },
        { name: 'Technical', score: data.technicalscore * 10, desc: "Strong technical capability" },
        { name: 'Teamwork', score: data.teamworkscore * 10, desc: "Works well with others" },
    ].sort((a, b) => b.score - a.score) 

    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl">
                    <Target size={22} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Core Skills Matrix</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center flex-1">
                
                {/* Custom List replacing the table */}
                <div className="space-y-4">
                    {values.map((skill, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-md transition-all">
                            <div>
                                <h4 className="font-bold text-slate-900">{skill.name}</h4>
                                <p className="text-xs text-slate-500">{skill.desc}</p>
                            </div>
                            <div className="px-3 py-1 bg-blue-100 text-blue-700 font-bold rounded-lg text-sm">
                                {skill.score}%
                            </div>
                        </div>
                    ))}
                </div>

                {/* Horizontal Bar Chart */}
                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={values} margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                            <XAxis type="number" domain={[0, 100]} hide />
                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }} width={85} />
                            <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={24}>
                                {values.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 0 ? '#4f46e5' : '#818cf8'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}