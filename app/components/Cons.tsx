import React from 'react'

interface ConsProps {
    consHeader1: string;
    consHeader2: string;
    consHeader3: string;
    consList1: string[];
    consList2: string[];
    consList3: string[];

}

const Cons = ({consHeader1,consHeader2,consHeader3,consList1,consList2,consList3}:ConsProps) => {
  return (
    <div>
         <p className=' mt-5 text-xl font-bold'>Cons :</p>
        <ul className=' list-disc  text-md  ml-8'>
            <li className=' mt-2' key={Math.random() * 100000}>
               {/**Teaching */} 
               <span className=' font-bold text-lg'>{consHeader1} </span>  
               <ul className='list-decimal ml-4 text-xl mt-1  gap-2'>
                {
                    consList1.map((cons) => (
                        <li key={Math.random() * 100000}>{cons}</li>
                    ))
                }
               </ul>
            </li>
                {/**Research */}
            <li className=' mt-2 ' key={Math.random() * 10000}>
                <span className=' font-bold text-xl'>{consHeader2} </span>  
               <ul className='list-decimal ml-4 text-xl mt-1  gap-2'>
                {
                    consList2.map((cons) => (
                        <li key={Math.random() * 1000000}>{cons}</li>
                    ))
                }
                </ul>   
            </li>
                {/**Service */}    
            <li className=' mt-2' key={Math.random() * 100000}>
                <span className=' font-bold text-xl'>{consHeader3} </span>  
               <ul className='list-decimal ml-4 text-xl mt-1  gap-2'>
                {
                    consList3.map((cons) => (
                        <li key={Math.random() * 100000}>{cons}</li>
                    ))
                }
                </ul> 
            </li>
        </ul>
    </div>
  )
}

export default Cons