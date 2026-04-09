import React from 'react'
import SkillAssesmentTable from './Tables/SkillAssesmentTable'

const ReportComponentPage2 = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans selection:bg-orange-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[45%] rounded-full bg-orange-200/40 blur-3xl opacity-50 mix-blend-multiply"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full">
          <div className='mb-5 w-full'>
          <SkillAssesmentTable/>
          </div>
        </div>
    </div>
  )
}

export default ReportComponentPage2
