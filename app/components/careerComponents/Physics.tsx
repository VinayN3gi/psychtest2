import React from 'react'
import Description from '../Description'
import ResponsibilityListItem from '../ResponsibilityListItem'
import WorkEnv from '../WorkEnv'
import EducationComponent from '../EducationComponent'
import Pros from '../Pros'
import Cons from '../Cons'
import Tags from '../Tags'

const Physics = () => {
  return (
    <div>
        <Description
        title="2) Engineering Physics"
        description='Engineering Physics is a specialized field that combines the principles of 
        physics and engineering. Professionals in this field apply advanced physics concepts to solve 
        complex engineering problems, often in areas like optics, materials science, nanotechnology, 
        and quantum mechanics. '
        />

    <p className=' mt-5 text-xl font-bold'>Key responsibilities :</p>

    <ul className=' list-disc  text-xl  ml-8'>
            <li className=' mt-2' key={Math.random() *100000}>
               {/**Research and development */} 
              <ResponsibilityListItem
              title='Research and Development'
              itemList={['Conducting experiments and simulations to develop new technologies.',
                'Analyze data and apply theoretical physics principles to practical engineering problems.',
                'Innovate in areas such as materials development, energy systems, and electronic devices. ']}
              />   
            </li>


            {/**Design and Analysis */}
            <li className=' mt-2 ' key={Math.random() *100000}>
                <ResponsibilityListItem
                title='Design and Analysis'
                itemList={['Develop mathematicaal models and simulations to predict system','Design components and systems based on physical principles.','Perform analytical calculations to optimize engineering solutions. ']}
                />              
            </li>


                {/**Application of Physicss */}    
            <li className=' mt-2' key={Math.random() * 100000}>
                <ResponsibilityListItem
                title='Application of Physics'
                itemList={['Apply quantum mechanics, thermodynamics, and electromagnetism to engineering challenges.','Develop technologies in fields like semiconductors, superconductors, and laser systems.']}
                />
            </li>
        </ul>

        {/*Work Environment */}
        <WorkEnv settingDescription='Research labs,engineering firms, and technology companies.'
                scheduleDescription=' Typically regular office hours, but may include additional hours for research and development projects. '
                interactionDescription='Collaboration with engineers, scientists, and other professionals. May involve working with clients or external partners.'
        />        

        <EducationComponent
        underGraduation='Bachelor’s degree in Physics, Engineering Physics, or Applied Physics.'
        postGraduation='Master’s degree or Ph.D. in Engineering Physics, Physics, or Applied Physics.'
        doctoral='Ph.D. in areas such as photonics, nanotechnology, or quantum engineering '
        />        

  

    <Pros
    prosHeader1='Innovative Field'
    prosList1={['Opportunity to work on cutting-edge technologies and research.','Apply advanced physics concepts to solve real-world engineering problems.','Contribute to the development of new materials, devices, and systems.']}
    prosHeader2='Diverse Applications'
    prosList2={['Work in a variety of industries, including electronics, aerospace, and renewable energy.','Collaborate with engineers, scientists, and researchers from different disciplines.','Contribute to interdisciplinary projects and initiatives.']}
    prosHeader3='Research Opportunities'
    prosList3={['Engage in research and development projects to advance scientific knowledge.','Contribute to academic publications, patents, and industry innovations.','Explore new areas of physics and engineering through experimentation and analysis.']}
    />

    <Cons
    consHeader1='Complex Subject Matter'
    consList1={['Requires a strong background in physics and mathematics.','Involves complex theories, equations, and technical concepts.','Challenges in applying theoretical physics to practical engineering problems.']}
    consHeader2='Funding and Resources'
    consList2={['Dependent on research grants, funding, and institutional support.','Competition for resources, equipment, and facilities.','Limited access to specialized tools, materials, and technologies.']}
    consHeader3='Specialization Limitations'
    consList3={['Narrow focus on specific areas of physics and engineering.','Limited opportunities for interdisciplinary work or career transitions.','Challenges in adapting to new technologies, trends, and research directions.']}
    />
    

    <h1 className=' font-bold text-xl mt-5'>TAGS</h1>



    <Tags
    title='Interst Inventory'
    header1='Investigrative'
    header2='Realistic'
    header1Description='Engages in solving complex scientific and technical problems, exploring fundamental 
    principles of physics applied to engineering contexts. '
    header2Description='Works with practical, hands-on applications of physics in engineering'
    />


    <Tags
    title="Personality Traits"
    header1='Openness to Experience'
    header2='Conscientiousness'
    header1Description='Requires curiosity and a willingness to explore new ideas and complex concepts in physics and engineering.'
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

export default Physics