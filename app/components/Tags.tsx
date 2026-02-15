import React from 'react'

interface InterestInventoryTagsProps {
    title: string,
    header1: string,
    header2: string,
    header1Description: string,
    header2Description: string,
    header3?: string,
    header3Description?: string

}

const Tags = ({title,header1,header1Description,header2,header2Description,header3,header3Description}:InterestInventoryTagsProps) => {
  return (
    <div className=' mb-5 ml-5'>
        
        <p className=' mt-2 text-xl text-blue-500'>{title}</p>
        <ul className=' mt-1 ml-8 list-disc gap-2 text-xl '>
            <li className=' mt-1' key={Math.random()}>
                <span className=' font-bold '>{header1}:</span>
                {header1Description}
            </li>

            <li className=' mt-1' key={Math.random()}>
                <span className=' font-bold'>{header2}:</span>
                {header2Description}
            </li>

            {
                header3 && header3Description ? (
                    <li className=' mt-1' key={Math.random()}>
                        <span className=' font-bold'>{header3}</span>
                        {header3Description}
                    </li>
                ) : null
                   
            }

            </ul>
    </div>
  )
}

export default Tags