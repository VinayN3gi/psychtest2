import { ArrowRight, BarChart3, ClipboardList, Clock, Target } from 'lucide-react'
import React from 'react'

function Feature() {
  return (
    <section className="mb-32">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">More than just a quiz.</h2>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg">We combine Big 5 personality traits with modern labor market data.</p>
              </div>
    
              <div className="grid md:grid-cols-3 gap-6">
                {/* Card 1 - Large */}
                <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 group overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                    <BarChart3 size={150} />
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                      <BarChart3 />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Detailed Data Analysis</h3>
                    <p className="text-slate-600 max-w-md">We don't just give you a job title. We break down your cognitive patterns, work style preferences, and motivational drivers.</p>
                  </div>
                </div>
    
                {/* Card 2 */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                    <Target className="text-blue-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Actionable Roadmap</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">Get a step-by-step guide on how to transition into your ideal role, including skills to learn.</p>
                </div>
    
                {/* Card 3 */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <ClipboardList />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Unbiased Results</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Our algorithm is designed to eliminate bias, focusing purely on your raw potential and fit.</p>
                </div>
    
                {/* Card 4 - Large */}
                <div className="md:col-span-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100/50 shadow-xl shadow-slate-200/50 hover:shadow-blue-200/40 transition-all flex items-center justify-between group">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to start?</h3>
                    <p className="text-slate-600 mb-6">Join thousands discovering their path.</p>
                    <span className="font-semibold text-blue-700 flex items-center gap-2 group-hover:gap-4 transition-all cursor-pointer">
                      Begin Assessment <ArrowRight size={18} />
                    </span>
                  </div>
                  <div className="hidden sm:block">
                    <Clock size={80} className="text-blue-200 group-hover:text-blue-300 transition-colors" />
                  </div>
                </div>
              </div>
            </section>
  )
}

export default Feature