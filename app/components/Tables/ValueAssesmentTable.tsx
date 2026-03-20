'use client'
import React, { useEffect, useState } from 'react'
import { Loader2, Gem } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts'
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
    averageScore: number,
    desc: string
}

export default function ValueAssessmentTable() {
    const [data, setData] = useState<DataType | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) return setData(null)

                const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-value-assessment`, {
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

    if (isLoading) return <div className="bg-white rounded-3xl p-8 shadow-xl flex justify-center items-center min-h-[400px]"><Loader2 className='h-8 w-8 animate-spin text-teal-600' /></div>
    if (!data) return <div className="bg-white rounded-3xl p-8 shadow-xl text-center"><p className="text-slate-500">No data found</p></div>

    // Map data and add descriptions for the UI
    const values: valuesInterface[] = [
        { name: 'Autonomy', score: data.autonomyscore * 10, averageScore: 67, desc: 'Values independence & self-direction' },
        { name: 'Innovation', score: data.innovationscore * 10, averageScore: 24, desc: 'Driven by creativity & new ideas' },
        { name: 'Achievement', score: data.achievementscore * 10, averageScore: 27, desc: 'Motivated by goals & success' },
        { name: 'Helping', score: data.helpingscore * 10, averageScore: 34, desc: 'Desire to support & uplift others' },
        { name: 'Stability', score: data.stabilityscore * 10, averageScore: 39, desc: 'Prefers predictable, secure environments' },
        { name: 'Financial', score: data.financialscore * 10, averageScore: 42, desc: 'Highly motivated by monetary reward' }
    ]

    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col lg:flex-row gap-10">
            
            {/* Left Side: Modern Value Cards */}
            <div className="flex-1 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
                        <Gem size={22} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Core Value Assesment</h2>
                </div>
                
                <p className="text-slate-500 text-sm mb-6">
                    Your core values dictate the environments where you'll feel most fulfilled. Here is a breakdown of what matters most to you.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {values.map((item, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md hover:bg-white transition-all group">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-slate-900">{item.name}</h4>
                                <span className="px-2 py-1 bg-teal-100 text-teal-700 font-bold rounded-lg text-xs">
                                    {item.score}%
                                </span>
                            </div>
                            <p className="text-xs text-slate-500">{item.desc}</p>
                            
                            {/* Mini progress bar inside card */}
                            <div className="mt-3 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-teal-500 rounded-full group-hover:bg-teal-400 transition-colors" 
                                    style={{ width: `${item.score}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side: Comparative Bar Chart */}
            <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6 text-center">Your Score vs. Average</h3>
                
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={values} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis 
                                dataKey="name" 
                                tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} 
                                axisLine={false} 
                                tickLine={false} 
                                dy={10}
                            />
                            <YAxis 
                                tick={{ fill: '#64748b', fontSize: 11 }} 
                                axisLine={false} 
                                tickLine={false} 
                            />
                            <Tooltip 
                                cursor={{fill: '#f8fafc'}} 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 500 }} 
                            />
                            <Legend 
                                verticalAlign="top" 
                                height={36} 
                                iconType="circle" 
                                wrapperStyle={{ fontSize: '12px', color: '#64748b' }}
                            />
                            <Bar dataKey="score" name="Your Score" radius={[4, 4, 0, 0]} maxBarSize={40}>
                                {values.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill="#14b8a6" /> /* Teal 500 */
                                ))}
                            </Bar>
                            <Bar dataKey="averageScore" name="Average" fill="#cbd5e1" radius={[4, 4, 0, 0]} maxBarSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    )
}