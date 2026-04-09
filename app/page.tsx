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
import Hero from './components/Hero';
import Feature from './components/Feature';
import Works from './components/Works';
import { useRouter } from 'next/navigation';

const CareerDiscoveryPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router=useRouter();

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
           {/* <a href="#" className="hover:text-blue-600 transition-colors">Methodology</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Reviews</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Pricing</a> */} 
            <button onClick={()=>router.push("/auth")}
            className="px-5 py-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all hover:shadow-lg hover:-translate-y-0.5">
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
        <Hero/>

        {/* FEATURES BENTO GRID */}
        <Feature/>

        {/* HOW IT WORKS (Timeline) */}
        <Works/>
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
