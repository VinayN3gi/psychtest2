import React from 'react'

import Description from '../Description'
import ResponsibilityListItem from '../ResponsibilityListItem'
import WorkEnv from '../WorkEnv'
import EducationComponent from '../EducationComponent'
import Pros from '../Pros'
import Cons from '../Cons'
import Tags from '../Tags'
import { MaxWidthWrapper } from '../MaxWidthWrapper'



const Professor = () => {
  return (
    <div className=' mb-10'>
        <h1 className=' font-semibold text-5xl mb-5 text-blue-600 text-center'>Science and Research</h1>
        <Description 
        title='1) University Professor'
        description='A university professor is an academic expert who teaches courses, conducts 
        research, and publishes scholarly work within a higher education institution. Professors often 
        specialize in a particular field or discipline and contribute to the academic community 
        through teaching, research, and service. '
        />

        <p className=' mt-5 text-xl font-bold'>Key responsibilities :</p>
        <ul className=' list-disc  text-xl  ml-8'>
            <li className=' mt-2' key={Math.random() *100000}>
               {/**Teaching */} 
              <ResponsibilityListItem
              title='Teaching'
              itemList={['Developing and delivering courses in their area of expertise.','Preparing lectures, assignments, and exams.','Mentoring and advising students.','Evaluating student performance and providing feedback.']}
              />   
            </li>


                {/**Research */}
            <li className=' mt-2 ' key={Math.random() *100000}>
                <ResponsibilityListItem
                title='Research'
                itemList={['Conducting original research in their field of study.','Publishing research findings in academic journals.','Applying for research grants and funding.','Collaborating with other researchers and institutions.']}
                />              
            </li>


                {/**Service */}    
            <li className=' mt-2' key={Math.random() * 100000}>
                <ResponsibilityListItem
                title='Service'
                itemList={['Serving on academic committees and boards.','Participating in departmental and university activities.','Engaging with the broader academic community.','Mentoring junior faculty and students.']}
                />
            </li>
        </ul>


          {/*Work Environment */}
          <WorkEnv settingDescription='Universities,colleges and research institution'
                scheduleDescription='Flexible but often includes evenings and weekends.Balances teaching,research, and administrative duties.'
                interactionDescription='Work with students,colleagues, and academic proffesionals.May involve collaboration with external oragnizations and industry partners.'   
            />

            {/*Educational Path */}
            <EducationComponent
              underGraduation='Bachelor’s degree in a related field (e.g., biology, chemistry, physics, etc.)'
                postGraduation='Master’s and Ph.D. in a specialized area of study (e.g., molecular biology, organic chemistry, astrophysics, etc.)'
                doctoral='Often required,involving further research and academic training.'  
            />


        <Pros
              prosHeader1='Intellectiual Freedom'
              prosHeader2='Job Satisfaction'
                prosHeader3='Academic Prestige'
                prosList1={['Professors have significant control over their research topics and teaching methods.','Ability to explore and contribute to new knowledge in their field. ']}
                prosList2={['Opportunities to engage in meaningful teaching and mentoring.','Personal fulfillment from contributing to student success and advancement.']}
                prosList3={['Recognition as an expert in a specific academic discipline. ','Opportunities to influence the academic community and shape future research. ']}
        />


        <Cons consHeader1='High Workload'
                consList1={['Balancing teaching, research, and administrative responsibilities can be challenging. ','Expectations for publishing, obtaining funding, and service can lead to long hours. ']}
                consHeader2='Competitive Job Market'
                consList2={['Limited availability of tenure-track positions in many academic fields. ','High competition for research grants and funding. ']}
                consHeader3='Limited Job Security'
                consList3={['Adjunct and non-tenure track positions may lack job security and benefits. ','Tenure-track positions often require a lengthy probationary period. ']}
            />


        {/**Tags */}


        <h1 className=' font-bold text-xl mt-5'>TAGS</h1>


        <Tags 
            header1='Investigative'
            header2='Social'
            header1Description='Professors in science are deeply involved in research, exploring new theories, conducting 
            experiments, and seeking answers to scientific questions.'
            header2Description='They often engage in teaching, mentoring students, and participating in academic 
            communities. '
            title="Interest Inventory" 
        />


        <Tags
            title='Personality Traits'
            header1="Openness to Experience"
            header1Description='Professors are curious, imaginative, and open-minded, willing to explore new ideas'
            header2='Conscientiousness'
            header2Description='They are organized, detail-oriented, and responsible, ensuring that they meet their '
            header3='Agreeableness'
            header3Description='Effective professors often display empathy and cooperation, especially in mentoring students 
            and collaborating with colleagues. '
        />


        <Tags
            title='Skills Assessment'
            header1='Analytical Skills'
            header1Description='Strong ability to analyze complex scientific data, solve problems, and conduct research.'
            header2='Communication Skills'
            header2Description='Effective in conveying complex scientific concepts clearly to students and peers through 
            lectures, publications, and presentations.' 
            header3='Teamwork'
            header3Description='Collaborative skills are essential for working with students, colleagues, and external'
            />

            <Tags
            title="Values Assessment"
            header1="Achievement"
            header1Description='Professors are driven by the accomplishment of publishing research, obtaining grants, and 
            conributing to their field of study.'
            header2='Autonomy'
            header2Description='Professors often value independence in their research and teaching methods, appreciating 
            the freedom to explore their academic interests.'
            header3='Innovation'
            header3Description='They thrive in environments that encourage new ideas and scientific discovery, often 
            pursuing innovative research projects.'
            />
        
        <div className=' border-b-2 border-gray-600/40 mt-4'/>

    </div>

  )
}

export default Professor