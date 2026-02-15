import React from 'react'
import { MaxWidthWrapper } from './MaxWidthWrapper'

const ContactInfo = () => {
  return (
    <MaxWidthWrapper className='  mt-6  border-t-2 border-gray-200 h-200'>
        <div className='flex flex-col items-center justify-center  '></div>
            <div>
                <h1 className=' font-semibold text-xl text-gray-600'>In case of an error please contact through the following medium : </h1>
                    <ul className=' mt-3 text-lg text-gray-700'>
                        <li>Email : acadmate.edu@gmail.com</li>

                    </ul>        
            </div>
        <div/>    
    </MaxWidthWrapper>
  )
}

export default ContactInfo