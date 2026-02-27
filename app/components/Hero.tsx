import { ArrowRight, BrainCircuit, CheckCircle, Target, User } from 'lucide-react'
import React from 'react'

function Hero() {
  return (
    <section className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
          
          {/* Hero Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Science-backed Analysis
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900 mb-6">
              Find a career that <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                feels like you.
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
              Stop guessing. Take our 15-minute psychological assessment to uncover your strengths, personality type, and the roles where you'll naturally thrive.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-xl shadow-xl shadow-blue-200 hover:bg-blue-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                Start Free Assessment
                <ArrowRight size={20} />
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 border border-slate-200 font-medium rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300">
                View Sample Report
              </button>
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex -space-x-3">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="avatar" />
                  </div>
                ))}
              </div>
              <p>Join <strong>50,000+</strong> professionals today</p>
            </div>
          </div>

          {/* Hero Visual (Abstract Dashboard) */}
          <div className="relative group perspective-1000">
             {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2rem] rotate-3 opacity-10 scale-105 blur-xl group-hover:rotate-6 transition-transform duration-700"></div>
            
            {/* Main Card */}
            <div className="relative bg-white border border-slate-200 rounded-[2rem] shadow-2xl p-6 md:p-8 animate-float">
              
              {/* Fake UI Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <User size={20} className="text-slate-500" />
                  </div>
                  <div>
                    <div className="h-2.5 w-24 bg-slate-900 rounded-full mb-1"></div>
                    <div className="h-2 w-16 bg-slate-200 rounded-full"></div>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">High Match</div>
              </div>

              {/* Fake Charts */}
              <div className="space-y-6">
                {/* Bar Chart Mockup */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    <span>Creativity</span>
                    <span>92%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-[92%] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    <span>Analytical</span>
                    <span>88%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-[88%] bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    <span>Leadership</span>
                    <span>75%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-[75%] bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></div>
                  </div>
                </div>

                {/* Grid of badges */}
                <div className="pt-4 grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <BrainCircuit className="text-blue-600 mb-2" size={24} />
                    <div className="h-2 w-16 bg-slate-300 rounded mb-1"></div>
                    <div className="h-1.5 w-10 bg-slate-200 rounded"></div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <Target className="text-orange-500 mb-2" size={24} />
                    <div className="h-2 w-16 bg-slate-300 rounded mb-1"></div>
                    <div className="h-1.5 w-10 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -right-6 bottom-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:block animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg text-green-600">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Top Career</p>
                    <p className="text-xs text-slate-500">Product Designer</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
  )
}

export default Hero