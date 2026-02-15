import React from 'react'


interface DescriptionProps {
    title: string;
    description: string;
}

const Description = ({title,description}:DescriptionProps) => {

  return (
    <div>
        <h2 className=' font-bold text-3xl mt-2'>{`${title}`}</h2>
        <p className=' mt-5 text-lg'>
        <span className=' font-bold text-xl'>Description : </span>
        <span className='text-xl'>
        {description}
        </span>
        </p>
    </div>
  )
}

export default Description