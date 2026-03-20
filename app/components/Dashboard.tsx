'use client'
import React, { useEffect, useState } from 'react'
import { MaxWidthWrapper } from './MaxWidthWrapper'
import { Ghost, Loader2, FileText, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<boolean | null>(null)
  const [click, setClick] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Get logged-in user
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        if (error || !user) {
          console.error("User not found")
          setData(false)
          setIsLoading(false)
          return
        }
        await supabase.auth.refreshSession()
        
        const {
          data: { session },
        } = await supabase.auth.getSession()
        
        const res = await fetch(
          `https://rbmpvyjqeejrdoetptya.supabase.co/functions/v1/check_report`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.access_token}`,
            },
            body: JSON.stringify({ userId: user.id }),
          }
        )

        const result = await res.json()
        console.log(result)
        setData(result.exists)

      } catch (err) {
        console.error(err)
        setData(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()
  }, [])

  // 🔄 Loading State
  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 relative overflow-hidden">
        {/* Soft Background Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/40 blur-3xl opacity-50 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-200/40 blur-3xl opacity-50 mix-blend-multiply pointer-events-none"></div>
        
        <div className="flex flex-col items-center bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-slate-100">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
          <h2 className="text-xl font-bold text-slate-900">Loading your dashboard</h2>
          <p className="text-sm text-slate-500 mt-2">Fetching your assessment data...</p>
        </div>
      </div>
    )
  }

  // 📭 Empty State (No report)
  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 pt-10 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/40 blur-3xl opacity-50 mix-blend-multiply"></div>
        </div>

        <MaxWidthWrapper>
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-slate-600 mt-2 text-lg">Manage your career assessment and profile.</p>
          </div>

          <div className="mt-12 bg-white border border-slate-100 rounded-[2rem] p-10 md:p-16 shadow-xl shadow-slate-200/50 text-center max-w-3xl mx-auto flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
              <Ghost size={48} strokeWidth={1.5} />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">It's pretty empty around here</h3>
            
            <p className="text-slate-600 text-lg mb-10 max-w-md">
              You haven't generated your career report yet. Take our scientifically-backed assessment to discover your ideal path.
            </p>
            
            <Link 
              href="/testPage" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-xl shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5"
            >
              <Sparkles size={20} />
              Take the Assessment
            </Link>
          </div>
        </MaxWidthWrapper>
      </div>
    )
  }

  // 📝 Has Report State (Single Hero Card Layout)
  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/40 blur-3xl opacity-50 mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-200/40 blur-3xl opacity-50 mix-blend-multiply"></div>
      </div>

      <MaxWidthWrapper>
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Your Career Report</h1>
          <p className="text-slate-600 mt-3 text-lg">Your comprehensive career analysis is ready to view.</p>
        </div>

        {/* Single Featured Report Card */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col lg:flex-row items-center justify-between gap-10 hover:shadow-blue-900/5 transition-all duration-300 max-w-5xl mx-auto">
          
          {/* Left Side: Content */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
            <div className="w-24 h-24 shrink-0 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-3xl flex items-center justify-center shadow-inner border border-blue-100/50">
              <FileText size={40} strokeWidth={1.5} />
            </div>
            
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full border border-green-200">
                  <CheckCircle2 size={14} /> Analysis Complete
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                Comprehensive Career Analysis
              </h3>
              <p className="text-slate-500 max-w-xl text-lg leading-relaxed">
                A deep dive into your personality traits, core values, and skills matrix, scientifically matched with your ideal career paths.
              </p>
            </div>
          </div>

          {/* Right Side: Action */}
          <div className="w-full lg:w-auto shrink-0 flex flex-col items-center gap-3" onClick={() => setClick(true)}>
            <Link
              href="/reportPage"
              className="group flex items-center justify-center gap-3 w-full lg:w-auto px-10 py-5 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl shadow-xl transition-all duration-300 font-semibold text-lg hover:-translate-y-1 hover:shadow-blue-600/20"
            >
              {click ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Opening Report...
                </>
              ) : (
                <>
                  View Full Report
                  <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Link>
            <span className="text-slate-400 text-sm font-medium">Click to open your dashboard</span>
          </div>

        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default Dashboard