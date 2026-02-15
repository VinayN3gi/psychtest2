import React from 'react'

interface ProsProps {
    prosHeader1: string;
    prosHeader2: string;
    prosHeader3: string;
    prosList1: string[];
    prosList2: string[];
    prosList3: string[];
}

const Pros = ({prosHeader1,prosHeader2,prosHeader3,prosList1,prosList2,prosList3}:ProsProps) => {
  return (
    <div>
        <p className=' mt-5 text-xl font-bold'>Pros :</p>
        <ul className=' list-disc  text-xl  ml-8'>
            <li className=' mt-2' key={Math.random() * 100000}>
               {/**Teaching */} 
               <span className=' font-bold text-xl'>{prosHeader1} </span>  
               <ul className='list-decimal ml-4 text-xl  mt-1  gap-2'>
                {
                    prosList1.map((pros) => (
                        <li key={Math.random()*100000}>{pros}</li>
                    ))
                }
               </ul>
            </li>
                {/**Research */}
            <li className=' mt-2 ' key={Math.random() * 100000}>
                <span className=' font-bold text-xl'>{prosHeader2} </span>  
               <ul className='list-decimal ml-4 text-xl mt-1  gap-2'>
                {
                    prosList2.map((pros) => (
                        <li key={Math.random() * 1000000}>{pros}</li>
                    ))
                }
                </ul>   
            </li>
                {/**Service */}    
            <li className=' mt-2' key={Math.random()*100000}>
                <span className=' font-bold text-xl'>{prosHeader3} </span>  
               <ul className='list-decimal ml-4 text-xl mt-1 gap-2'>
                {
                    prosList3.map((pros) => (
                        <li key={Math.random()*1000000}>{pros}</li>
                    ))
                }
                </ul> 
            </li>
        </ul>
    </div>
  )
}

export default Pros