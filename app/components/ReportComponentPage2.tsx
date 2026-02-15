import React from 'react'
import PersonalityTraitTable from './Tables/PersonalityTraitTable'
import SkillAssesment from './SkillAssesment'
import SkillAssesmentTable from './Tables/SkillAssesmentTable'

const ReportComponentPage2 = () => {
  return (
    <div>

        <div className=' mb-5'>
          <h2 className=' text-2xl text-blue-500 font-bold mb-5 '>
              3. Personality Traits
          </h2>
          <PersonalityTraitTable/>
        </div>

        <div className=' mb-5'>
          <h2 className=' text-2xl text-blue-500 font-bold mb-5 '>
              4. Skills Assesment
          </h2>
          <SkillAssesmentTable/>
        </div>

    </div>
  )
}

export default ReportComponentPage2