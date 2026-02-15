import React from 'react'
import { MaxWidthWrapper } from './MaxWidthWrapper'
import InterestInventoryTable from './Tables/InterestInventoryTable'
import PersonalityTraitTable from './Tables/PersonalityTraitTable'
import SkillAssesmentTable from './Tables/SkillAssesmentTable'


const ReportComponent = () => {
  return (
    <div className=' mt-5'>
        <h1 className='text-zinc-900 text-center font-semibold text-5xl mb-10'>Sample Report</h1>
        <div className=' mt-5 mb-5'>
            <h2 className=' text-3xl text-blue-500 font-bold '>
               1. Introduction
            </h2>
            <p className='mt-2 text-2xl text-zinc-800'>Purpose of the report</p>
            <p className=' mt-2 text-xl text-zinc-900'>
            This Career Assessment Report is crafted to provide you with a comprehensive overview of
            your interests, personality traits, skills, values, and educational preferences. The goal is to assist you in identifying career paths 
            and academic streams that align with your unique strengths and aspirations.
            </p>
            <p className=' mt-5 text-2xl text-zinc-900 '>Assesment overview</p>
            <p className=' mt-3 text-xl text-zinc-900'>The assessment consist of five key sections :</p>
            <ul className='list-decimal ml-5 mt-3'>
                <li className=' text-lg'> <span className=' font-bold '>Interest Inventory : </span>Evaluates your prefrences for various activities and types of work</li>
                <li className=' text-lg'><span className=' font-bold '>Personality Trailts : </span>Assesses aspects of your personality that influence career suitability and satisfaction. </li>
                <li className=' text-lg'> <span className=' font-bold'>Skills Assesment : </span>Identifies your key strengths and areas for improvement across different skills.</li>
                <li className=' text-lg'><span className=' font-bold'>Values Assesment : </span>Examines the core values that drive your career choices.</li>
                <li className=' text-lg'>
                  <span className='font-bold'>How to Use This Report</span>
                    <ul className=' list-disc ml-5 mt-3'>
                    <li> <span className=' font-bold '>Self-Reflection : </span>Use the insights to understand your career prefrences and academic interests</li>
                    <li><span className=' font-bold'>Career Planning : </span>Identify and explore potential career paths and educational streams. </li>
                    <li> <span className=' font-bold'>Further Research : </span>Investigate the suggested carerrs and educational streams to make well-informed decisions.</li>
                    <li><span className=' font-bold'>Professional Advice: </span>Discuss this report with a individual who will explain these terms.</li>
                    </ul>
                </li>
            </ul>
        </div>

        {/*Left blank for student info */}
        <div>

        </div>

        <div className=' mb-5'>
          <h2 className=' text-2xl text-blue-500 font-bold mb-5 '>
              2. Interest Inventory 
          </h2>
          <InterestInventoryTable/>
        </div>



      {/* 
        <div className=' mb-5'>
          <h2 className=' text-2xl text-blue-500 font-bold mb-5 '>
              3. Personality Traits
          </h2>
          <PersonalityTraitTable/>
        </div>

        <div className=' mb-5'>
          <h2 className=' text-2xl text-blue-500 font-bold mb-5 '>
              4. Skills Assessment
          </h2>
          <SkillAssesmentTable/>
        </div>
        */}
    </div>
  )
}

export default ReportComponent