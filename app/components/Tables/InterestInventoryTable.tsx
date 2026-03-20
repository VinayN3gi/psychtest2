'use client'
import React, { useEffect, useState } from 'react'
import { Loader2, Compass } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { supabase } from '@/lib/supabase'

type DataType = {
    artisticscore: number
    investigativescore: number
    socialscore: number
    realisticscore: number
    enterprisingscore: number
    conventionalscore: number
}

export default function InterestInventoryTable() {
    const [data, setData] = useState<DataType | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) return setData(null)

                const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-interest-inventory`, {
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

    if (isLoading) return <div className="bg-white rounded-3xl p-8 shadow-xl flex justify-center items-center min-h-[300px]"><Loader2 className='h-8 w-8 animate-spin text-blue-600' /></div>
    if (!data) return <div className="bg-white rounded-3xl p-8 shadow-xl text-center"><p className="text-slate-500">No data found</p></div>

    const values = [
        { name: 'Artistic', score: data.artisticscore * 10, desc: 'Creative expression (art, music, writing)' },
        { name: 'Investigative', score: data.investigativescore * 10, desc: 'Problem-solving and research' },
        { name: 'Social', score: data.socialscore * 10, desc: 'Helping and interacting with people' },
        { name: 'Realistic', score: data.realisticscore * 10, desc: 'Hands-on, practical tasks' },
        { name: 'Enterprising', score: data.enterprisingscore * 10, desc: 'Leadership and business' },
        { name: 'Conventional', score: data.conventionalscore * 10, desc: 'Structured and organized work' },
    ]

    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row gap-8">
            
            {/* Left Side: Modernized Table */}
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-green-50 text-green-600 rounded-xl">
                        <Compass size={22} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Interest Distribution</h2>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-100">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 border-b border-slate-100 text-slate-900 font-semibold">
                            <tr>
                                <th className="px-6 py-4">Area</th>
                                <th className="px-6 py-4">Match</th>
                                <th className="px-6 py-4">Focus</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {values.map((item, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="w-8">{item.score}%</span>
                                            <div className="w-16 h-1.5 bg-slate-200 rounded-full hidden sm:block">
                                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.score}%` }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs sm:text-sm">{item.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Right Side: Smooth Area Chart */}
            <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 text-center">Interest Spectrum</h3>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={values} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    )
}