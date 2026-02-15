'use client'
import React, { useState } from 'react'
import { MaxWidthWrapper } from './MaxWidthWrapper'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'




const StreamPreference = () => {
  const [firstAnswer, setFirstAnswer] = useState<string>('')
  const [secondAnswer, setSecondAnswer] = useState<string>('')
  const [thirdAnswer, setThirdAnswer] = useState<string>('')
  const [fourthAnswer, setFourthAnswer] = useState<string>('')
  const [fifthAnswer, setFifthAnswer] = useState<string>('')
  const [sixthAnswer, setSixthAnswer] = useState<string>('')
  const [seventhAnswer, setSeventhAnswer] = useState<string>('')
  const [eigthAnswer, setEigthAnswer] = useState<string>('')
  const [ninthAnswer, setNinthAnswer] = useState<string>('')
  const [tenthAnswer, setTenthAnswer] = useState<string>('')
  const [eleventhAnswer, setEleventhAnswer] = useState<string>('')
  const [twelvethAnswer, setTwelvethAnswer] = useState<string>('')
  const [thirteenthAnswer, setThirteenthAnswer] = useState<string>('')
  const [fourteenthAnswer, setFourteenthAnswer] = useState<string>('')
  const [fifteenthAnswer, setFifteenthAnswer] = useState<string>('')

  return (
    <MaxWidthWrapper className=' mx-auto'>
        <div className='mx-auto mb-6 max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border-gray-200  bg-white px-7 py-2 shadow-md  backdrop-blur transition-all hover:border-gray-300 hover:bg-white/30 '>
       <p className=' text-sm font-semibold text-gray-700'>
            Academic Stream Preference
       </p>
    </div>
    <div className=' mt-5 mb-5 border-b-2  border-zinc-500'>
      <h1 className=' text-3xl font-bold text-gray-700'>Academic Stream Preference</h1>
      <p className=' text-gray-600 text-xl mb-3 mt-2'>This will help us identify stream best suitable for you</p>
    </div>
    <ol>

    {/* Question 1 */}


    <li>
         <div className=' flex flex-row gap-2  font-semibold text-lg text-black'>
            <p>{`Q1) `}</p>
            <p>How comfortable are you with solving complex mathematical problems ? </p>
         </div>
         <RadioGroup className=' flex flex-col ml-6 mt-3 ' color='black' required>
            <div className="flex items-center space-x-2 text-lg">
            <RadioGroupItem value="option-one" id="option-one"  onClick={()=>setFirstAnswer('A')}/>
            <Label htmlFor="option-one" className='  hover:text-red-700 hover:cursor-pointer'>Very Uncomfortable</Label>
            </div>
            <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two"  onClick={()=>setFirstAnswer('B')}/>
            <Label htmlFor="option-two" className='  hover:text-red-600/75 hover:cursor-pointer'>Uncomfortable</Label>
            </div>
            <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-three" id="option-three"  onClick={()=>setFirstAnswer('C')}/>
            <Label htmlFor="option-three" className=' hover:text-green-600/50 hover:cursor-pointer '>Neutral</Label>
            </div>
            <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-four" id="option-four"  onClick={()=>setFirstAnswer('D')}/>
            <Label htmlFor="option-four" className=' hover:text-green-600/90 hover:cursor-pointer'>Somewhat Comfortable</Label>
            </div>
            <div className="flex items-center space-x-2 mb-4">
            <RadioGroupItem value="option-five" id="option-five"  onClick={()=>setFirstAnswer('E')}/>
            <Label htmlFor="option-five" className=' hover:text-green-700 hover:cursor-pointer'>Very Comfortable</Label>
            </div>
        </RadioGroup>
        </li>

        {/* Question 2 */}

        <li>
         <div className=' flex flex-row gap-2  font-semibold text-lg text-black'>
            <p>{`Q2) `}</p>
            <p>Do you enjoy conducting experiments and exploring scientific concepts ? </p>
         </div>
         <RadioGroup className=' flex flex-col ml-6 mt-3 ' color='black' required>
            <div className="flex items-center space-x-2 text-lg">
            <RadioGroupItem value="option-six" id="option-six"  onClick={()=>setSecondAnswer('A')}/>
            <Label htmlFor="option-six" className='  hover:text-red-700 hover:cursor-pointer' >Not at all</Label>
            </div>
            <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-seven" id="option-seven"  onClick={()=>setSecondAnswer('B')}/>
            <Label htmlFor="option-seven" className='  hover:text-red-600/75 hover:cursor-pointer' >Rarely</Label>
            </div>
            <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-eigth" id="option-eigth"  onClick={()=>setSecondAnswer('C')}/>
            <Label htmlFor="option-eigth" className=' hover:text-green-600/50 hover:cursor-pointer '>Maybe</Label>
            </div>
            <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-nine" id="option-nine"  onClick={()=>setSecondAnswer('D')}/>
            <Label htmlFor="option-nine" className=' hover:text-green-600/90 hover:cursor-pointer'>Sometimes</Label>
            </div>
            <div className="flex items-center space-x-2 mb-4">
            <RadioGroupItem value="option-ten" id="option-ten"  onClick={()=>setSecondAnswer('E')}/>
            <Label htmlFor="option-ten" className=' hover:text-green-700 hover:cursor-pointer'>Yes,very much</Label>
            </div>
        </RadioGroup>
        </li>

        {/* Question 3 */}

        


    </ol>
    </MaxWidthWrapper>
  )
}

export default StreamPreference