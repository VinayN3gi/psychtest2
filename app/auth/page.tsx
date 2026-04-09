'use client'
import React, { useState } from 'react'
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  BrainCircuit,
  Loader2
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { toast } from "sonner"

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email,setEmail]=useState<string>("")
  const [password,setPassword]=useState<string>("")
  const [username,setUsername]=useState<string>("")
  const [loading,setLoading]=useState<boolean>(false);

  const router = useRouter()

  const handleAuth = async () => {
    // 1. Check if all required fields are filled
    if (!email || !password || (!isLogin && !username)) {
      toast.error("Please fill all fields")
      return
    }

    // --- NEW VALIDATION CHECKS START HERE ---
    
    // 2. Validate Email (must contain '@')
    if (!email.includes('@')) {
      toast.error("Please enter a valid email address containing '@'")
      return
    }

    // 3. Validate Name on Sign Up (must contain at least one letter or number)
    if (!isLogin) {
      const hasAlphanumeric = /[a-zA-Z0-9]/.test(username);
      if (!hasAlphanumeric) {
        toast.error("Full name must contain at least one letter or number.")
        return
      }
    }
    
    // --- NEW VALIDATION CHECKS END HERE ---

    try {
      setLoading(true)

      if (isLogin) {
        // SIGN IN
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        toast.success('Welcome Back')
        router.push("/dashboard")
      } else {
        // SIGN UP
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })
        
        if (error) throw error
        if (!data.user) throw new Error("User creation failed")

        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            id: data.user.id,
            username,
          })

        if (profileError) throw profileError

        toast.success("Account created successfully")
      }

      router.push("/dashboard")
    } catch (error: any) {
      toast.error(error.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* LEFT SIDE - BRANDING (Fills left half on desktop) */}
      <div className="hidden md:flex flex-col justify-between w-1/2 lg:w-5/12 bg-slate-900 p-12 lg:p-20 relative overflow-hidden text-white min-h-screen">
        {/* Decorative background gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tight mb-16 text-white">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Sparkles size={18} />
            </div>
            PathFinder
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold leading-[1.15] mb-6">
            {isLogin ? "Welcome back to your career journey." : "Start discovering your true potential."}
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-md">
            {isLogin 
              ? "Sign in to view your latest insights, update your profile, and explore new personalized career matches." 
              : "Join 50,000+ professionals who found a career that naturally fits their personality and cognitive style."}
          </p>
        </div>

        {/* Social Proof / Mini Dashboard Graphic */}
        <div className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 mt-12 max-w-md">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300">
              <BrainCircuit size={24} />
            </div>
            <div>
              <p className="text-base font-semibold text-white">Algorithm Active</p>
              <p className="text-sm text-slate-400">Analyzing 50+ data points</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <CheckCircle size={18} className="text-green-400" />
            <span>Unbiased personality matching</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - FORM (Fills right half on desktop, full screen on mobile) */}
      <div className="w-full md:w-1/2 lg:w-7/12 min-h-screen bg-slate-50 relative flex items-center justify-center p-6 sm:p-12 lg:p-24 overflow-hidden">
        
        {/* BACKGROUND BLOBS (Scoped to the right side) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-100/50 blur-3xl opacity-60 mix-blend-multiply animate-pulse-slow"></div>
          <div className="absolute bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply"></div>
        </div>

        {/* Back to Home Link */}
        <a href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors z-20">
          <ArrowLeft size={16} />
          Back to Home
        </a>

        <div className="w-full max-w-md relative z-10">
          
          {/* Mobile Header (Shows only on mobile) */}
          <div className="md:hidden flex items-center gap-2 font-bold text-2xl tracking-tight text-slate-900 mb-10">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Sparkles size={18} />
            </div>
            PathFinder
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            {isLogin ? 'Sign in' : 'Create an account'}
          </h2>
          <p className="text-slate-500 text-lg mb-10">
            {isLogin 
              ? 'Enter your details to access your dashboard.' 
              : 'Take the first step towards a fulfilling career.'}
          </p>
          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-slate-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    onChange={(e)=>setUsername(e.target.value)} 
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 shadow-sm"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400" />
                </div>
                <input 
                  type="email" 
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="you@example.com" 
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">Password</label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  onChange={(e)=>setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 shadow-sm"
                />
              </div>
            </div>

              <button 
              onClick={handleAuth}
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 px-8 py-4 mt-4 text-white text-lg font-medium rounded-xl transition-all duration-300 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-slate-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}

export default AuthPage