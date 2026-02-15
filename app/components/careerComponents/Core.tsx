import React from 'react'
import Description from '../Description'
import ResponsibilityListItem from '../ResponsibilityListItem'
import WorkEnv from '../WorkEnv'
import EducationComponent from '../EducationComponent'
import Pros from '../Pros'
import Cons from '../Cons'
import Tags from '../Tags'

const Core = () => {
  return (
    <div>
     <Description
      title='5) Other Core Engineering Fields'
      description='Core engineering branches include traditional fields such as Mechanical, 
        Electrical, Civil, and Chemical Engineering. Professionals in these fields apply engineering 
        principles to design, analyse, and improve systems, structures, and processes across various 
        industries. '  
     />   

        <p className=' mt-5 text-xl font-bold'>Key responsibilities :</p>
        <ul className=' list-disc  text-xl  ml-8'>
            <li className=' mt-2' key={Math.random() *100000}>
               {/**Mechanical Engineering */} 
              <ResponsibilityListItem
              title='Mechanical Engineering'
              itemList={[
                'Design and develop mechanical systems and components.',
                'Analyze and test mechanical devices for performance and safety.',
                'Collaborate with other engineers and professionals to integrate mechanical systems into larger projects.'
              ]}
              />   
            </li>


            {/*Electrical Egineering */}
            <li className=' mt-2 ' key={Math.random() *100000}>
                <ResponsibilityListItem
                title='Electrical Engineering'
                itemList={[
                  'Design and test electrical systems and components.',
                  'Develop and implement electrical control systems.',
                  'Collaborate with other engineers and professionals to integrate electrical systems into larger projects.'
                ]}
                />              
            </li>


                {/*Civil Engineering */}    
            <li className=' mt-2' key={Math.random() * 100000}>
                <ResponsibilityListItem
                title='Civil Engineering'
                itemList={[
                  'Design and oversee construction of infrastructure projects.',
                  'Analyze and test materials for structural integrity and safety.',
                  'Collaborate with architects, contractors, and other professionals to ensure project success.'
                ]}
                />
            </li>

            <li className=' mt-2' key={Math.random() * 1000000}>
                <ResponsibilityListItem
                title='Chemical Engineering'
                itemList={[
                  'Design and develop chemical processes and equipment.',
                  'Analyze and test chemical products and materials.',
                  'Collaborate with other engineers and professionals to optimize chemical processes and products.'
                ]}
                />
            </li>        
        </ul>
        
        <WorkEnv
        settingDescription='Engineers in core engineering fields work in a variety of settings, including offices, laboratories, and industrial facilities. They may work independently or as part of a team, depending on the project and organization. Core engineering professionals may also work in the field, visiting construction sites, manufacturing plants, or other project locations to oversee work and ensure quality and safety.'
        scheduleDescription='Typically regular office hours, with potential for extended hours during project 
        deadlines or fieldwork. '
        interactionDescription='Collaboration with engineers, technicians, and industry professionals. '
        />    


        <EducationComponent
        underGraduation='Bachelor’s degree in Mechanical, Electrical, Civil, or Chemical Engineering.'
        postGraduation='Master’s degree in respective engineering '
        doctoral='Areas such as renewable energy, structural engineering, or process engineering.'
        />

        <Pros
        prosHeader1='Diverse career opportunities'
        prosList1={[
          'Wide range of industries and roles available within each core engineering branch. ',
          'Flexibility to work in design, research, development, or project management. '
        ]}
        prosHeader2='Practical Applications'
        prosList2={[
          'Direct impact on real-world projects and infrastructure development.',
          'Opportunities to work on innovative technologies and systems. '
        ]}

        prosHeader3='Problem Solving'
        prosList3={[
          'Engagement in solving complex engineering challenges.',
          'Contribution to advancements in technology'
        ]}
        />

        <Cons
        consHeader1='Technical Complexity'
        consList1={[
          'Requires strong technical knowledge and skills in specific engineering disciplines.',
          'Challenges in understanding and applying complex engineering principles.'
        ]}
        consHeader2='Regulatory and Safety Compliance'
        consList2={[
          'Need to adhere to strict industry standards and regulations.',
          'Responsibility for ensuring safety and quality in engineering projects.'
        ]}
        consHeader3='Resource Intensity'
        consList3={[
          'Dependence on specialized equipment and materials for projects.',
          'Potential high costs associated with engineering design and testing.'
        ]}  
        />

    <h1 className=' font-bold text-xl mt-5'>TAGS</h1>


    <Tags
    title='Interst Inventory'
    header1='Realistic'
    header2='Investigative'
    header1Description='Involves hands-on work with tools, machinery, and physical systems, often in practical and 
    applied settings. '
    header2Description='Requires problem-solving skills, application of scientific principles, and an understanding of 
    technical and complex concepts.'
    />

    <Tags
    title='Personality Traits'
    header1='Conscientiousness'
    header2='Openness to Experience'
    header1Description='Engineers need to be detail-oriented, organized, and diligent in their work to ensure 
    precision and safety in designs and implementations.'
    header2Description='While generally more structured, engineers benefit from being open to new technologies, 
    methodologies, and innovations.'
    header3='Technical Skills'
    header3Description='Proficiency in specialized tools, software, and technologies relevant to the specific 
    engineering discipline (e.g., CAD for design, programming for control systems). '
    />

    <Tags
    title='Value Assesment'
    header1='Achievement'
    header2='Stability'
    header1Description='Motivated by completing projects, solving complex problems, and contributing to 
    technological advancements. '
    header2Description='Values the structured and systematic nature of engineering tasks, often working within 
    established protocols and standards. '
    
    />    
    </div>
  )
}

export default Core