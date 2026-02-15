import React from 'react'
import Description from '../Description'
import ResponsibilityListItem from '../ResponsibilityListItem'
import WorkEnv from '../WorkEnv'
import EducationComponent from '../EducationComponent'
import Pros from '../Pros'
import Cons from '../Cons'
import Tags from '../Tags'

const Maths = () => {
  return (
    <div>
     <Description
     title=' 4) Engineering Mathematics'
     description=' Engineering Mathematics involves the application of mathematical methods 
    and principles to solve complex engineering problems. This field focuses on developing 
    mathematical models, performing simulations, and analyzing data to support engineering 
    design and analysis. '
     />   

<p className=' mt-5 text-xl font-bold'>Key responsibilities :</p>
        <ul className=' list-disc  text-xl  ml-8'>
            <li className=' mt-2' key={Math.random() *100000}>
               {/**Mathematical Modeling */} 
              <ResponsibilityListItem
              title='Teaching'
              itemList={['Develop and refine mathematical models to describe engineering systems and processes. '
                ,' Use models to predict system behavior, optimize performance, and analyze stability. '
              ]}
              />   
            </li>


                {/**Data Analysis */}
            <li className=' mt-2 ' key={Math.random() *100000}>
                <ResponsibilityListItem
                title='Data Analysis'
                itemList={['Analyze engineering data using statistical and computational methods.',
                    ' Perform simulations to test engineering designs and predict outcomes.',
                    'Use tools like finite element analysis (FEA) and computational fluid dynamics (CFD).'
                ]}
                />              
            </li>


                {/**Algorithm Development */}    
            <li className=' mt-2' key={Math.random() * 100000}>
                <ResponsibilityListItem
                title='Algorithm Development'
                itemList={['Develop algorithms for solving complex engineering problems.',
                    'Implement computational methods for optimization, control, and signal processing.'
                ]}
                />
            </li>
        </ul>


       <WorkEnv
       settingDescription='Research labs, engineering firms, technology companies, and academic institutions.'
        scheduleDescription='Typically follows a standard work week, with occasional overtime to meet project deadlines.'
        interactionDescription='Collaboration with engineers, computer scientists, and researchers. '        
       />

       <EducationComponent
        underGraduation='Bachelor’s in Engineering Mathematics, Applied Mathematics, or 
        related field. '
        postGraduation='Master’s in Engineering Mathematics, Applied Mathematics, or related field.'
        doctoral='Ph.D. in areas such as numerical analysis, optimization, or computational mathematics.'        
       />

       <Pros
       prosHeader1='Analytical Skills'
       prosList1={[
        'Develop strong analytical and problem-solving skills.',
        'Apply mathematical methods to engineering problems.',
       ]}
       prosHeader2='Interdisciplinary Applications'
       prosList2={[
        'Opportunities to work in various fields such as aerospace, robotics, and finance.',
        'Flexibility to transition between different industries and roles. '
       ]}
        prosHeader3='Research and Development'
        prosList3={[
            'Contribute to the development of new technologies and products.',
            'Solve complex engineering challenges with mathematical tools.'
        ]}/>

        <Cons
        consHeader1='Abstract Nature'
        consList1={[
            'Concepts may be challenging to visualize or explain.',
            'Requires a strong foundation in mathematical theory and principles.'
        ]}
        consHeader2='Computational Complexity'
        consList2={[
            'Complex algorithms and simulations may require significant computing resources.',
            'Debugging and optimizing code can be time-consuming.'
        ]}
        consHeader3='Niche Specialization'
        consList3={[
            'Specialized focus may limit opportunities outside specific areas.',
            'Requires continuous learning to stay updated on new technologies and methods.'
        ]}
        />


    <h1 className=' font-bold text-xl mt-5'>TAGS</h1>



    <Tags
    title='Interst Inventory'
    header1='Investigrative'
    header2='Realistic'
    header1Description='Engages in solving complex scientific and technical problems, exploring fundamental 
    principles of mathematics applied to engineering contexts. '
    header2Description='Works with practical, hands-on applications of mathematics in engineering'
    />


    <Tags
    title="Personality Traits"
    header1='Openness to Experience'
    header2='Conscientiousness'
    header1Description='Requires curiosity and a willingness to explore new ideas and complex concepts in mathematics and engineering.'
    header2Description='Needs to be meticulous, organized, and detail-oriented to handle complex equations and experimental setups.'
    />

    <Tags
    title="Skills Assesment"
    header1='Analytical Thinking'
    header2='Technical Skills'
    header1Description='Strong analytical skills are essential for solving complex mathematics and engineering problems, developing new theories, and conducting experiments. '
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

export default Maths