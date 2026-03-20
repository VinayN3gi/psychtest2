'use client'
import React, { useState } from 'react'
import { MaxWidthWrapper } from './MaxWidthWrapper'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group" // Kept for your imports, though we use custom UI below for the Likert scale
import { Button } from '@/components/ui/button'
// import { trpc } from '../_trpc/client' // Commented out to match your original if unused
import { useRouter } from 'next/navigation'
import { Contact, Loader2, Sparkles, CheckCircle2 } from 'lucide-react'
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import ContactInfo from './ContactInfo'
import { supabase } from '@/lib/supabase'

const TextPageComponent = () => {
  const router = useRouter();
  
  // State variables - UNTOUCHED
  const [firstAnswer, setFirstAnswer] = useState<number>()
  const [secondAnswer, setSecondAnswer] = useState<number>()
  const [thirdAnswer, setThirdAnswer] = useState<number>()
  const [fourthAnswer, setFourthAnswer] = useState<number>()
  const [fifthAnswer, setFifthAnswer] = useState<number>()
  const [sixthAnswer, setSixthAnswer] = useState<number>()
  const [seventhAnswer, setSeventhAnswer] = useState<number>()
  const [eigthAnswer, setEigthAnswer] = useState<number>()
  const [ninthAnswer, setNinthAnswer] = useState<number>()
  const [tenthAnswer, setTenthAnswer] = useState<number>()
  const [eleventhAnswer, setEleventhAnswer] = useState<number>()
  const [twelvethAnswer, setTwelvethAnswer] = useState<number>()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [next, setNext] = useState<boolean>(false)

  // Logic - UNTOUCHED
  const handleSubmit = async () => {
    if (
      !firstAnswer || !secondAnswer || !thirdAnswer || !fourthAnswer ||
      !fifthAnswer || !sixthAnswer || !seventhAnswer || !eigthAnswer ||
      !ninthAnswer || !tenthAnswer || !eleventhAnswer || !twelvethAnswer
    ) {
      setIsOpen(true)
      return
    }

    setNext(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not logged in')

      const { error } = await supabase.functions.invoke('create-interest-inventory', {
        body: {
          userId: user.id,
          answerOne: firstAnswer,
          answerTwo: secondAnswer,
          answerThree: thirdAnswer,
          answerFour: fourthAnswer,
          answerFive: fifthAnswer,
          answerSix: sixthAnswer,
          answerSeven: seventhAnswer,
          answerEight: eigthAnswer,
          answerNine: ninthAnswer,
          answerTen: tenthAnswer,
          answerEleven: eleventhAnswer,
          answerTwelve: twelvethAnswer,
        },
      })

      if (error) throw error

      router.push('/testPage2')

    } catch (err) {
      console.error('Failed to submit:', err)
    } finally {
      setNext(false)
    }
  }

  // UI HELPER LOGIC: Map states to an array to cleanly render the horizontal Likert scales
  const allAnswers = [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, fifthAnswer, sixthAnswer, seventhAnswer, eigthAnswer, ninthAnswer, tenthAnswer, eleventhAnswer, twelvethAnswer]
  const answeredCount = allAnswers.filter((a) => a !== undefined).length
  const progressPercentage = (answeredCount / 12) * 100

  const questions = [
    { id: 1, text: "Do you enjoy working with machinery and tools?", state: firstAnswer, setter: setFirstAnswer },
    { id: 2, text: "How interested are you in conducting research and experiments?", state: secondAnswer, setter: setSecondAnswer },
    { id: 3, text: "Do you enjoy creating art, such as painting or writing?", state: thirdAnswer, setter: setThirdAnswer },
    { id: 4, text: "How often do you enjoy helping others and volunteering?", state: fourthAnswer, setter: setFourthAnswer },
    { id: 5, text: "Do you like leading group projects or organizing events?", state: fifthAnswer, setter: setFifthAnswer },
    { id: 6, text: "How much do you enjoy tasks that involve organizing data or files?", state: sixthAnswer, setter: setSixthAnswer },
    { id: 7, text: "Do you prefer working outdoors or with physical objects?", state: seventhAnswer, setter: setSeventhAnswer },
    { id: 8, text: "How often do you seek puzzles or problems to solve for fun?", state: eigthAnswer, setter: setEigthAnswer },
    { id: 9, text: "How much do you enjoy performing in front of others, such as acting or playing music?", state: ninthAnswer, setter: setNinthAnswer },
    { id: 10, text: "How comfortable are you working in a team to achieve common goals?", state: tenthAnswer, setter: setTenthAnswer },
    { id: 11, text: "Do you enjoy persuading others to see your point of view?", state: eleventhAnswer, setter: setEleventhAnswer },
    { id: 12, text: "How much often do you like following a structured routine?", state: twelvethAnswer, setter: setTwelvethAnswer },
  ]

  // Split into groups of 4 to create "Section Cards"
  const questionGroups = [
    questions.slice(0, 4),
    questions.slice(4, 8),
    questions.slice(8, 12),
  ]

  return (
    <div className="min-h-screen bg-slate-50 relative font-sans selection:bg-blue-100 pb-20">
      
      {/* Background Blobs for depth */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-200/40 blur-3xl opacity-50 mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/40 blur-3xl opacity-50 mix-blend-multiply"></div>
      </div>

      {/* STICKY PROGRESS BAR */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm py-4 mb-10">
        <MaxWidthWrapper className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-900 tracking-tight">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Sparkles size={16} />
            </div>
            Interest Inventory
          </div>
          
          <div className="flex-1 max-w-md w-full ml-auto">
            <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
              <span>Progress</span>
              <span className="text-blue-600">{answeredCount} / 12 Answered</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Discover Your Interests
          </h1>
          <p className="text-lg text-slate-600">
            Rate how much you agree with the following statements from 1 (Not at all) to 5 (Very Much).
          </p>
        </div>

        {/* QUESTION CARDS */}
        <div className="space-y-8">
          {questionGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
              
              <div className="space-y-12">
                {group.map((q) => (
                  <div key={q.id} className="border-b border-slate-100 pb-10 last:border-0 last:pb-0">
                    
                    {/* Question Text */}
                    <div className="flex gap-4 items-start mb-8">
                      <span className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold text-sm">
                        {q.id}
                      </span>
                      <h3 className="text-xl md:text-2xl font-semibold text-slate-900 leading-tight pt-0.5">
                        {q.text}
                      </h3>
                    </div>

                    {/* Horizontal Likert Scale */}
                    <div className="max-w-xl mx-auto pl-12 md:pl-0">
                      
                      {/* Numbers Row */}
                      <div className="relative flex justify-between items-center z-10">
                        {/* Connecting background line */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 -z-10 rounded-full"></div>
                        
                        {[1, 2, 3, 4, 5].map((val) => {
                          const isSelected = q.state === val;
                          return (
                            <button
                              key={val}
                              onClick={() => q.setter(val)}
                              className={`
                                relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300
                                ${isSelected 
                                  ? 'bg-blue-600 text-white scale-110 shadow-lg shadow-blue-600/30' 
                                  : 'bg-white text-slate-400 border-2 border-slate-200 hover:border-blue-400 hover:text-blue-600'
                                }
                              `}
                            >
                              {isSelected && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                              )}
                              {val}
                            </button>
                          )
                        })}
                      </div>
                      
                      {/* Labels Row */}
                      <div className="flex justify-between text-xs md:text-sm font-semibold text-slate-500 mt-4 px-1">
                        <span className="w-20 text-center -ml-4">Not at all</span>
                        <span className="w-20 text-center">Somewhat</span>
                        <span className="w-20 text-center -mr-4">Very Much</span>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-10 flex justify-end">
          <Button 
            className="w-full md:w-auto px-12 py-6 text-lg rounded-xl bg-slate-900 hover:bg-blue-600 text-white shadow-xl transition-all hover:-translate-y-1 font-semibold flex items-center gap-2" 
            onClick={() => handleSubmit()}
            disabled={next}
          >
            {next ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Continue to Next Section
                <CheckCircle2 size={20} />
              </>
            )}
          </Button>
        </div>

        {/* Dialog for Missing Answers */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="bg-white rounded-3xl p-8 border-0 shadow-2xl sm:max-w-md">
            <DialogHeader>
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <div className="w-6 h-6 text-red-600 font-bold text-xl">!</div>
              </div>
              <DialogTitle className="text-2xl font-bold text-slate-900 tracking-tight">
                Incomplete Assessment
              </DialogTitle>
              <DialogDescription className="text-base text-slate-600 mt-2">
                It looks like you missed a few questions. Please complete all 12 questions before moving to the next section to ensure an accurate report.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 sm:justify-start">
              <DialogClose asChild>
                <Button 
                  type="button" 
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-6 text-lg font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Return to Questions
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
         
        <div className="mt-16 border-t border-slate-200 pt-8">
          <ContactInfo/>
        </div>

      </MaxWidthWrapper>
    </div>
  )
}

export default TextPageComponent