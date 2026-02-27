import React from 'react'
import StepItem from './StepItem'

function Works() {
  return (
    <section className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">How it works</h2>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 h-full w-0.5 bg-slate-200 -translate-x-1/2 hidden md:block"></div>

            <div className="space-y-12">
              <StepItem 
                number="01"
                title="Create Profile"
                text="Sign up in seconds. No credit card required for the initial discovery phase."
                align="left"
              />
              <StepItem 
                number="02"
                title="Take the Assessment"
                text="Answer 40 questions designed to gauge your personality and cognitive preferences."
                align="right"
              />
              <StepItem 
                number="03"
                title="Receive Insights"
                text="Unlock your comprehensive report with career matches, salary data, and growth plans."
                align="left"
              />
            </div>
          </div>

        </section>
  )
}

export default Works