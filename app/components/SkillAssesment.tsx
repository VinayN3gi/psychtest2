'use client'
import React, { useState } from 'react'
import { MaxWidthWrapper } from './MaxWidthWrapper'
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group" // Kept for reference, replaced by custom UI
import { Button } from '@/components/ui/button'
// import { Label } from "@/components/ui/label"
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, Target, Sparkles, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ContactInfo from './ContactInfo'
import { supabase } from '@/lib/supabase'

const SkillAssesment = () => {
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
      if (
        !fifthAnswer || !fourthAnswer || !thirdAnswer || !secondAnswer ||
        !firstAnswer || !sixthAnswer || !seventhAnswer || !eigthAnswer ||
        !ninthAnswer || !tenthAnswer || !eleventhAnswer || !twelvethAnswer
      ) {
        setIsOpen(true)
        return
      }
    
      setNext(true)
    
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Not logged in')
    
        const { error } = await supabase.functions.invoke('create-skill-assessment', {
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
            answerTwelve: twelvethAnswer
          },
        })
    
        if (error) throw error
    
        router.push('/testPage4')
    
      } catch (err) {
        console.error('Failed to submit:', err)
      } finally {
        setNext(false)
      }
    }

  // UI HELPER LOGIC: Map states to an array to cleanly render the horizontal Likert scales
  const allAnswers = [
    firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, fifthAnswer, sixthAnswer, 
    seventhAnswer, eigthAnswer, ninthAnswer, tenthAnswer, eleventhAnswer, twelvethAnswer
  ]
  const answeredCount = allAnswers.filter((a) => a !== undefined).length
  const progressPercentage = (answeredCount / 12) * 100

  // Question Mapper with dynamic labels to match your original text options
  const questions = [
    { id: 1, text: "How good are you at analysing data to make decisions?", state: firstAnswer, setter: setFirstAnswer, labels: ["Very poor", "Average", "Excellent"] },
    { id: 2, text: "How well can you come up with innovative solutions to problems?", state: secondAnswer, setter: setSecondAnswer, labels: ["Very poor", "Average", "Excellent"] },
    { id: 3, text: "How effectively can you convey your ideas in writing?", state: thirdAnswer, setter: setThirdAnswer, labels: ["Very poor", "Average", "Excellent"] },
    { id: 4, text: "How proficient are you in using software tools or programming languages?", state: fourthAnswer, setter: setFourthAnswer, labels: ["Very poor", "Average", "Excellent"] },
    { id: 5, text: "How well do you collaborate with others on a project?", state: fifthAnswer, setter: setFifthAnswer, labels: ["Very poorly", "Adequately", "Very Well"] },
    { id: 6, text: "How comfortable are you in leading a team or project?", state: sixthAnswer, setter: setSixthAnswer, labels: ["Very uncomfortable", "Neutral", "Very comfortable"] },
    { id: 7, text: "How effectively can you identify patterns in complex information?", state: seventhAnswer, setter: setSeventhAnswer, labels: ["Very poorly", "Adequately", "Very Well"] },
    { id: 8, text: "How often do you come up with new ideas for your projects or hobbies?", state: eigthAnswer, setter: setEigthAnswer, labels: ["Never", "Sometimes", "Always"] },
    { id: 9, text: "How well can you express your thoughts verbally?", state: ninthAnswer, setter: setNinthAnswer, labels: ["Very Poorly", "Adequately", "Very well"] },
    { id: 10, text: "How confident are you in troubleshooting technical issues?", state: tenthAnswer, setter: setTenthAnswer, labels: ["Not at all", "Moderately", "Extremely"] },
    { id: 11, text: "How often do you prefer working in a team rather than alone?", state: eleventhAnswer, setter: setEleventhAnswer, labels: ["Never", "Sometimes", "Always"] },
    { id: 12, text: "How effective are you at motivating others to achieve goals?", state: twelvethAnswer, setter: setTwelvethAnswer, labels: ["Strongly disagree", "Neutral", "Strongly Agree"] },
  ]

  // Split into groups of 4 to create "Section Cards"
  const questionGroups = [
    questions.slice(0, 4),
    questions.slice(4, 8),
    questions.slice(8, 12),
  ]

  return (
    <div className="min-h-screen bg-slate-50 relative font-sans selection:bg-orange-100 pb-20">
      
      {/* Background Blobs for depth */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-200/40 blur-3xl opacity-50 mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-200/40 blur-3xl opacity-50 mix-blend-multiply"></div>
      </div>

      {/* STICKY PROGRESS BAR */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm py-4 mb-10">
        <MaxWidthWrapper className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-900 tracking-tight">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white">
              <Target size={18} />
            </div>
            Skill Assessment
          </div>
          
          <div className="flex-1 max-w-md w-full ml-auto">
            <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
              <span>Progress</span>
              <span className="text-orange-600">{answeredCount} / 12 Answered</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full transition-all duration-500 ease-out"
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
            Evaluate Your Skills
          </h1>
          <p className="text-lg text-slate-600">
            Assess your current proficiency in various areas to help identify careers that match your capabilities.
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
                      <span className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-orange-50 text-orange-600 font-bold text-sm">
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
                                  ? 'bg-orange-500 text-white scale-110 shadow-lg shadow-orange-500/30' 
                                  : 'bg-white text-slate-400 border-2 border-slate-200 hover:border-orange-400 hover:text-orange-500'
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
            className="w-full md:w-auto px-12 py-6 text-lg rounded-xl bg-slate-900 hover:bg-orange-500 text-white shadow-xl transition-all hover:-translate-y-1 font-semibold flex items-center gap-2" 
            onClick={() => onSubmit()}
            disabled={next}
          >
            {next ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Continue to Final Section
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

export default SkillAssesment