'use client'
import React, { useState, useEffect } from 'react'
import { 
  ClipboardList, 
  Clock, 
  User, 
  CheckCircle, 
  ArrowRight, 
  BarChart3, 
  Sparkles, 
  Target,
  BrainCircuit,
  Menu,
  X
} from 'lucide-react';

const CareerDiscoveryPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900 font-sans text-slate-900 overflow-hidden relative">
      
      {/* BACKGROUND ELEMENTS */}
      {/* Soft glowing blobs to break up the white background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-3xl opacity-60 mix-blend-multiply animate-pulse-slow"></div>
        <div className="absolute top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-3xl opacity-60 mix-blend-multiply"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-violet-100/40 blur-3xl opacity-50 mix-blend-multiply"></div>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Sparkles size={18} />
            </div>
            PathFinder
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Methodology</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Reviews</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Pricing</a>
            <button className="px-5 py-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all hover:shadow-lg hover:-translate-y-0.5">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* HERO SECTION */}
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

        {/* FEATURES BENTO GRID */}
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

        {/* HOW IT WORKS (Timeline) */}
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">How it works</h2>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 h-full w-0.5 bg-slate-200 -translate-x-1/2 hidden md:block"></div>

            <div className="space-y-12">
              <StepItem 
                number="01"
                title="Create Profile"
                text="Sign up in seconds. No credit card required for the initial discovery phase."
                align="left"
              />
              <StepItem 
                number="02"
                title="Take the Assessment"
                text="Answer 40 questions designed to gauge your personality and cognitive preferences."
                align="right"
              />
              <StepItem 
                number="03"
                title="Receive Insights"
                text="Unlock your comprehensive report with career matches, salary data, and growth plans."
                align="left"
              />
            </div>
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
          <p>&copy; 2024 PathFinder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default CareerDiscoveryPage


/******** SUB-COMPONENTS ********/

const StepItem = ({ number, title, text, align }: { number: string, title: string, text: string, align: 'left' | 'right' }) => {
  return (
    <div className={`flex flex-col md:flex-row items-center gap-8 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Text Side */}
      <div className={`flex-1 text-center ${align === 'right' ? 'md:text-left' : 'md:text-right'}`}>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600">{text}</p>
      </div>

      {/* Center Marker */}
      <div className="relative z-10 w-16 h-16 rounded-full bg-white border-4 border-blue-50 shadow-lg flex items-center justify-center font-bold text-blue-600 text-lg shrink-0">
        {number}
      </div>

      {/* Spacer Side (for desktop layout balance) */}
      <div className="flex-1 hidden md:block"></div>

    </div>
  )
}