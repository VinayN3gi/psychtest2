'use client'
import React from 'react'
import ValueAssessmentTable from './Tables/ValueAssesmentTable'

const ReportComponentPage3 = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans selection:bg-teal-100 relative overflow-hidden">
        
      {/* Background Blobs for depth */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute bottom-[-10%] left-[10%] w-[40%] h-[40%] rounded-full bg-teal-200/40 blur-3xl opacity-50 mix-blend-multiply"></div>
      </div>
        <div className="max-w-7xl mx-auto w-full">
          <div className="w-full">
            <ValueAssessmentTable />
          </div>
        </div>
      </div>
  )
}

export default ReportComponentPage3
