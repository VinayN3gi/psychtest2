import React from 'react'

const StepItem = ({ number, title, text, align }: { number: string, title: string, text: string, align: 'left' | 'right' }): React.ReactNode => {
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

export default StepItem