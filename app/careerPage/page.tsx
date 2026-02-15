import React from 'react'
import { MaxWidthWrapper } from '../components/MaxWidthWrapper'
import Professor from '../components/careerComponents/Professor'
import Physics from '../components/careerComponents/Physics'
import Chemistry from '../components/careerComponents/Chemistry'
import Maths from '../components/careerComponents/Maths'
import Core from '../components/careerComponents/Core'


const page = () => {
  return (
    <MaxWidthWrapper>
      <Professor/>
      <Physics/>
      <Chemistry/>
      <Maths/>
      <Core/>
    </MaxWidthWrapper>
  )
}

export default page