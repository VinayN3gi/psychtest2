'use client'
import React, { useState } from 'react'
import { MaxWidthWrapper } from './MaxWidthWrapper'
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group" // Kept for reference, replaced by custom Likert UI
import { Label } from "@/components/ui/label"
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, Gem, Sparkles, CheckCircle2 } from 'lucide-react'
// import { trpc } from '../_trpc/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import ContactInfo from './ContactInfo'
import { supabase } from '@/lib/supabase'


const ValueAssesment = () => {
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
    const router = useRouter()

    // Logic - UNTOUCHED
    const onSubmit = async () => {
      const answers = [
        firstAnswer, secondAnswer, thirdAnswer, fourthAnswer,
        fifthAnswer, sixthAnswer, seventhAnswer, eigthAnswer,
        ninthAnswer, tenthAnswer, eleventhAnswer, twelvethAnswer
      ]

      if (answers.some(a => a == null)) {
        setIsOpen(true)
        return
      }

      setNext(true)

      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Not logged in')

        const { error } = await supabase.functions.invoke('create-value-assessment', {
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

        router.push('/reportPage')

      } catch (err) {
        console.error('Failed to submit value assessment:', err)
      } finally {
        setNext(false)
      }
    }

  // UI HELPER LOGIC: Map states to an array to cleanly render the horizontal Likert scales
  const allAnswers = [
    firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, fifthAnswer, sixthAnswer, 
    seventhAnswer, eigthAnswer, ninthAnswer, tenthAnswer, eleventhAnswer, twelvethAnswer
  ]
  const answeredCount = allAnswers.filter((a) => a != null).length
  const progressPercentage = (answeredCount / 12) * 100

  const standardLabels = ["Not important", "Moderately", "Extremely important"]
  
  // Question Mapper with dynamic labels to match your original text options
  const questions = [
    { id: 1, text: "How important is it for you to have control over your work schedule?", state: firstAnswer, setter: setFirstAnswer, labels: standardLabels },
    { id: 2, text: "How much do you value ability to work independtly without constant supervision?", state: secondAnswer, setter: setSecondAnswer, labels: standardLabels },
    { id: 3, text: "How important is it for you to be in a role where you can innovate and develop new ideas?", state: thirdAnswer, setter: setThirdAnswer, labels: standardLabels },
    { id: 4, text: "How much do you value being able to contribute to creative processes or projects in your work?", state: fourthAnswer, setter: setFourthAnswer, labels: standardLabels },
    { id: 5, text: "How motivated are you by setting and achieving challenging goals in your carrer?", state: fifthAnswer, setter: setFifthAnswer, labels: ["Not motivated", "Moderately", "Extremely motivated"] },
    { id: 6, text: "How important is it for you to be recognized for your accomplishments in the workplace?", state: sixthAnswer, setter: setSixthAnswer, labels: standardLabels },
    { id: 7, text: "How important is it for you to work in a job that allows you to make a positive impact on other's lives?", state: seventhAnswer, setter: setSeventhAnswer, labels: standardLabels },
    { id: 8, text: "How much do you value opportunities to provide support or assistance to colleagues or clients?", state: eigthAnswer, setter: setEigthAnswer, labels: standardLabels },
    { id: 9, text: "How important is it for you have a high salary and financial benefits in your job?", state: ninthAnswer, setter: setNinthAnswer, labels: standardLabels },
    { id: 10, text: "How much do you value job security and financial stability as part of your career?", state: tenthAnswer, setter: setTenthAnswer, labels: standardLabels },
    { id: 11, text: "How important is it for you to have a good balance between your work responsibilities and personal life?", state: eleventhAnswer, setter: setEleventhAnswer, labels: standardLabels },
    { id: 12, text: "How much do you value having flexible working hours or the ability to take time off when needed?", state: twelvethAnswer, setter: setTwelvethAnswer, labels: standardLabels },
  ]

  // Split into groups of 4 to create "Section Cards"
  const questionGroups = [
    questions.slice(0, 4),
    questions.slice(4, 8),
    questions.slice(8, 12),
  ]

  return (
    <div className="min-h-screen bg-slate-50 relative font-sans selection:bg-teal-100 pb-20">
      
      {/* Background Blobs for depth */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-teal-200/30 blur-3xl opacity-50 mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-200/30 blur-3xl opacity-50 mix-blend-multiply"></div>
      </div>

      {/* STICKY PROGRESS BAR */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm py-4 mb-10">
        <MaxWidthWrapper className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-900 tracking-tight">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white">
              <Gem size={18} />
            </div>
            Core Values
          </div>
          
          <div className="flex-1 max-w-md w-full ml-auto">
            <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
              <span>Progress</span>
              <span className="text-teal-600">{answeredCount} / 12 Answered</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full transition-all duration-500 ease-out"
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
            Evaluate Your Values
          </h1>
          <p className="text-lg text-slate-600">
            Identify what matters most to you in a career to ensure long-term fulfillment and happiness.
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
                      <span className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-teal-50 text-teal-600 font-bold text-sm">
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
                                  ? 'bg-teal-500 text-white scale-110 shadow-lg shadow-teal-500/30' 
                                  : 'bg-white text-slate-400 border-2 border-slate-200 hover:border-teal-400 hover:text-teal-600'
                                }
                              `}
                            >
                              {isSelected && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full"></span>
                              )}
                              {val}
                            </button>
                          )
                        })}
                      </div>
                      
                      {/* Labels Row */}
                      <div className="flex justify-between text-xs md:text-sm font-semibold text-slate-500 mt-4 px-1">
                        <span className="w-24 text-center -ml-6">{q.labels[0]}</span>
                        <span className="w-24 text-center">{q.labels[1]}</span>
                        <span className="w-24 text-center -mr-6">{q.labels[2]}</span>
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
            className="w-full md:w-auto px-12 py-6 text-lg rounded-xl bg-slate-900 hover:bg-teal-600 text-white shadow-xl transition-all hover:-translate-y-1 font-semibold flex items-center gap-2" 
            onClick={() => onSubmit()}
            disabled={next}
          >
            {next ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                Generating Report...
              </>
            ) : (
              <>
                Finish Assessment
                <Sparkles size={20} />
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
                It looks like you missed a few questions. Please complete all 12 questions before generating your final report.
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

export default ValueAssesment