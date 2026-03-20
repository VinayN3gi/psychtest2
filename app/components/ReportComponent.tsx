'use client'
import React from 'react'
import SkillAssessmentTable from './Tables/SkillAssesmentTable'
import { Sparkles, FileText, CheckCircle2 } from 'lucide-react'
import PersonalityInventoryTable from './Tables/PersonalityTraitTable'
import InterestInventoryTable from './Tables/InterestInventoryTable'

const ReportComponent = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans selection:bg-blue-100 relative overflow-hidden">
      
      {/* Background Blobs for depth */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/40 blur-3xl opacity-50 mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-200/40 blur-3xl opacity-50 mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold uppercase tracking-wider mb-4">
            <Sparkles size={16} /> Comprehensive Analysis
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Your Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Assessment Report</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl">
            A deep dive into your psychological profile, skills, and interests to help you navigate your ideal career path.
          </p>
        </header>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* 1. Introduction Card (Spans full width on mobile, 2 columns on desktop) */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <FileText size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">How to use this report</h2>
            </div>
            
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              This report provides a holistic view of your professional persona. We recommend using these insights to align your academic choices and career trajectory with your natural inclinations.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Self-Reflection & Understanding", 
                "Identifying Career Paths", 
                "Targeting Academic Streams", 
                "Guiding Professional Advice"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats / Summary Card (1 column) */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 shadow-xl text-white flex flex-col justify-center">
             <h3 className="text-xl font-semibold mb-2 opacity-90">Assessment Status</h3>
             <div className="text-5xl font-bold mb-6">100%</div>
             <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span className="opacity-80">Modules Completed</span>
                  <span className="font-semibold">3 / 3</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span className="opacity-80">Data Points Analyzed</span>
                  <span className="font-semibold">120+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-80">Confidence Score</span>
                  <span className="font-semibold text-green-300">High</span>
                </div>
             </div>
          </div>

          {/* 2. Personality Card (Takes up 1 column) */}
          <div className="lg:col-span-1">
             <PersonalityInventoryTable />
          </div>

          {/* 3. Skills Assessment Card (Takes up 2 columns) */}
          <div className="lg:col-span-2">
             <SkillAssessmentTable />
          </div>

          {/* 4. Interest Inventory (Spans full width at bottom) */}
          <div className="lg:col-span-3">
             <InterestInventoryTable />
          </div>

        </div>
      </div>
    </div>
  )
}

export default ReportComponent