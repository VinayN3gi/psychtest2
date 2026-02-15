import React from 'react'
import Description from '../Description'
import ResponsibilityListItem from '../ResponsibilityListItem'
import WorkEnv from '../WorkEnv'
import EducationComponent from '../EducationComponent'
import Pros from '../Pros'
import Cons from '../Cons'
import Tags from '../Tags'

const Chemistry = () => {
  return (
    <div>
        <Description
        title='3) Chemistry'
        description=' Engineering Chemistry focuses on the application of chemical principles to 
        engineering processes and materials. This field involves designing chemical processes, 
        developing new materials, and solving industrial problems through chemical engineering 
        techniques'
        />

<p className=' mt-5 text-xl font-bold'>Key responsibilities :</p>
        <ul className=' list-disc  text-xl  ml-8'>
            <li className=' mt-2' key={Math.random() *100000}>
               {/**Process Design*/} 
              <ResponsibilityListItem
              title='Process Design'
              itemList={['Develop and optimize chemical processes for manufacturing and production.'
                ,' Design reactors, separation units, and other chemical processing equipment.'
                ,'Implement safety protocols and environmental regulations in chemical plants.']} 
              />   
            </li>


                {/**Material Development */}
            <li className=' mt-2 ' key={Math.random() *100000}>
                <ResponsibilityListItem
                title='Research'
                itemList={['Research and develop new materials, including polymers, composites, and nanomaterials. ',
                    'Test material properties and performance for specific applications. ',
                    'Innovate in areas such as pharmaceuticals, energy storage, and catalysis. ']}
                />              
            </li>


                {/**Chemical Analysis */}    
            <li className=' mt-2' key={Math.random() * 100000}>
                <ResponsibilityListItem
                title='Chemical Analysis'
                itemList={[
                    'Perform chemical analyses and quality control for industrial processes.',
                    'Use analytical techniques such as spectroscopy, chromatography, and mass spectrometry.',
                ]}
                />
            </li>
        </ul>
        
        {/*Work Environment */}
         <WorkEnv
         settingDescription='Chemical plants, research labs, manufacturing facilities, and academic institutions.'
         scheduleDescription='Typically follows a standard workweek, but may require overtime for projects or emergencies.'
            interactionDescription='Collaborate with engineers, scientists, technicians, and other professionals. May work with regulatory agencies and industry partners.'
         />      

         <EducationComponent
         underGraduation='Bachelor’s degree in chemical engineering, chemistry, or a related field.'
        postGraduation=' Master’s  in Chemical Engineering, Materials Science, or related field'
        doctoral='Ph.D. in  areas such as nanotechnology,catalysis,or pharmaceuticals.'
         />

        <Pros
        prosHeader1='Diverse Career Paths'
        prosList1={[
            'Opportunities in various industries, including pharmaceuticals, energy, and materials.',
            'Flexibility to work in research, development, or production roles. '
        ]}  
        prosHeader2='Innovation and Development'
        prosList2={[
            'Involvement in developing new materials and chemical processes',
            'Involvement in developing new materials and chemical processes'
        ]}  
        
        prosHeader3='Interdiciplinary Work'
        prosList3={[
            'Collaboration with engineers, scientists, and other professionals.',
            'Opportunities to work on interdisciplinary projects and solve complex problems.'
        ]}
        /> 

        <Cons
        consHeader1='Safety Compliance'
        consList1={[
            'Strict safety regulations and protocols in chemical plants and laboratories.',
            'Risk of exposure to hazardous chemicals and materials.'
        ]}
        consHeader2='Complex Problem-Solving'
        consList2={[
            'Challenges in optimizing chemical processes and materials.',
            'Need to balance efficiency, cost, and environmental impact.'
        ]}
        consHeader3='Resource Intensity'
        consList3={[
            'Dependence on specialized equipment, facilities, and resources.',
            'Competition for research funding and access to advanced technologies.'
        ]}
        />

        <h1 className=' font-bold text-xl mt-5'>TAGS</h1>



        <Tags
        title='Interst Inventory'
        header1='Investigrative'
        header2='Realistic'
        header1Description='Engages in solving complex scientific and technical problems, exploring fundamental 
        principles of chemistry applied to engineering contexts. '
        header2Description='Works with practical, hands-on applications of chemistry in engineering'
        />


        <Tags
        title="Personality Traits"
        header1='Openness to Experience'
        header2='Conscientiousness'
        header1Description='Requires curiosity and a willingness to explore new ideas and complex concepts in chemistry and engineering.'
        header2Description='Needs to be meticulous, organized, and detail-oriented to handle complex equations and experimental setups.'
        />

        <Tags
        title="Skills Assesment"
        header1='Analytical Thinking'
        header2='Technical Skills'
        header1Description='Strong analytical skills are essential for solving complex physics and engineering problems, developing new theories, and conducting experiments. '
        header2Description='Proficiency in using advanced scientific equipment and software for modeling, simulation, and analysis of physical phenomena. '
        />

        <Tags
        title='Value Assesment'
        header1='Innovation'
        header2='Achievement'
        header1Description='Values environments that encourage new ideas and solutions, particularly in the development of cutting-edge technologies and theories.'
        header2Description='Motivated by discovering new principles, publishing findings, and contributing to advancements in technology and science.'
        header3='Autonomy'
        header3Description='Appreciates the freedom to explore and conduct research independently, often working on self-driven projects. '
        />

        <div className=' border-b-2 border-gray-600/40 mt-4'/>

    </div>
  )
}

export default Chemistry