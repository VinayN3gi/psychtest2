import React from 'react'

interface ResponsibilityListItemProps {
    title: string;
    itemList: string[];
}

const ResponsibilityListItem = ({title,itemList}:ResponsibilityListItemProps) => {
  return (
    <div>
        <span className=' font-bold text-lg'>{title}</span>
        <ul className='list-decimal ml-4 text-xl mt-1  gap-2'>
            {itemList.map((item,index) => (
                <li key={(index+1) * Math.random() * 100000}>{item}</li>
            ))}
        </ul>
    </div>
  )
}

export default ResponsibilityListItem