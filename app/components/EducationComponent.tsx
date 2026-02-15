import React from 'react'


interface EducationComponentProps {
    underGraduation: string;
    postGraduation: string;
    doctoral?: string;
}

const EducationComponent = ({underGraduation,postGraduation,doctoral}:EducationComponentProps) => {
  return (
    <div>
        <p className=' mt-5 text-xl font-bold mb-2'> Educational Path :</p>
        <ul className=' mt-1 ml-8 list-disc gap-2 text-xl'>
            <li className=' mt-1' key={Math.random() * 10000}>
                <span className=' font-bold'>Undergraduate Degree : </span>
                {underGraduation}
            </li>

            <li className=' mt-1' key={Math.random() * 100000}>
                <span className=' font-bold'>Graduate Degree : </span>
                {postGraduation}
            </li>

            <li className=' mt-1' key={Math.random() * 100000}>
                <span className=' font-bold'>Specialization : </span>
                {doctoral}
            </li>

        </ul>
    </div>
  )
}

export default EducationComponent