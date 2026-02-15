import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import {publicProcedure, router} from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/app/db';
import * as z from 'zod';
import ValueAssesment from '@/app/components/ValueAssesment';


export const appRouter=router({
    getUser:publicProcedure.query(async()=>{
        const {getUser}=getKindeServerSession()
        const user=await getUser()
        if(!user || !user.id) throw new TRPCError({code:'UNAUTHORIZED',message:'Not logged in'})

        const dbUser=await db.user.findFirst({where:{id:user.id}})   
        if(!dbUser)
        {
            try {
                const dbUser=await db.user.create({data:{id:user.id,email:user.email || ''}})
                console.log('Created user',dbUser)    

            } catch (error) {
                  console.error('Failed to create user',error)  
            }
        }    

        return dbUser
    }),
    createInerestInvetory:publicProcedure.input(z.object({
        answerOne:z.number() || z.null(),
        answerTwo:z.number() || z.null(),
        answerThree:z.number() || z.null(),
        answerFour:z.number() || z.null(),
        answerFive:z.number() || z.null(),
        answerSix:z.number() || z.null(),
        answerSeven:z.number() || z.null(),
        answerEight:z.number() || z.null(),
        answerNine:z.number() || z.null(),
        answerTen:z.number() || z.null(),
        answerEleven:z.number() || z.null(),
        answerTwelve:z.number() || z.null(),
    })).mutation(async({input})=>{
        const {getUser}=getKindeServerSession()
        const user=await getUser()
        if(!user || !user.id) throw new TRPCError({code:'UNAUTHORIZED',message:'Not logged in'})
         
        const file=await db.interestInventory.findFirst({where:{userId:user.id}})
        if(file){
          
            const {answerId}=file
            await db.interestInventory.delete({where:{userId:user.id,answerId:answerId}})

            try {
                const {answerOne,answerTwo,answerThree,answerFour,answerFive,answerSix,answerEight,answerNine,answerTen,answerEleven,answerSeven,answerTwelve}=input
                const upload=await db.interestInventory.create({data:{
                    answerOne,answerTwo,answerThree,answerFour,answerFive,answerSix,answerEight,answerNine,answerTen,answerEleven,answerSeven,answerTwelve,
                    userId:user.id,
                }})
                return upload
            } catch (error) {
                throw new TRPCError({code:'INTERNAL_SERVER_ERROR',message:'Failed to create interest inventory'})
            }

        }       


        try {
            const {answerOne,answerTwo,answerThree,answerFour,answerFive,answerSix,answerEight,answerNine,answerTen,answerEleven,answerSeven,answerTwelve}=input
            const upload=await db.interestInventory.create({data:{
                answerOne,answerTwo,answerThree,answerFour,answerFive,answerSix,answerEight,answerNine,answerTen,answerEleven,answerSeven,answerTwelve,
                userId:user.id,
            }})
            console.log('Created interest inventory',upload)
            return upload
        } catch (error) {
            console.error('Failed to create interest inventory',error)
            throw new TRPCError({code:'INTERNAL_SERVER_ERROR',message:'Failed to create interest inventory'})
        }    

    }),

    createPersonalityInventory:publicProcedure.input(z.object({
        answerOne:z.number() || z.null(),
        answerTwo:z.number() || z.null(),
        answerThree:z.number() || z.null(),
        answerFour:z.number() || z.null(),
        answerFive:z.number() || z.null(),
        answerSix:z.number() || z.null(),
        answerSeven:z.number() || z.null(),
        answerEight:z.number() || z.null(),
        answerNine:z.number() || z.null(),
        answerTen:z.number() || z.null(),
        answerEleven:z.number() || z.null(),
        answerTwelve:z.number() || z.null(),
        answerThirteen:z.number() || z.null(),
        answerFourteen:z.number() || z.null(),
        
    })).mutation(async ({input})=>{
        const {getUser}=getKindeServerSession()
        const user=await getUser()
        if(!user || !user.id) throw new TRPCError({code:'UNAUTHORIZED',message:'Not logged in'})

        const file=await db.personalityInventory.findFirst({where:{userId:user.id}})
        
        if(file){
            const {answerId}=file
            await db.personalityInventory.delete({where:{userId:user.id,answerId:answerId}})
            
            try {
                const {answerOne,answerTwo,answerThree,answerFour,answerFive,answerSix,answerEight,answerNine,answerTen,answerEleven,answerSeven,answerTwelve,answerThirteen,answerFourteen}=input
                const upload=await db.personalityInventory.create({data:{
                    answerOne,answerTwo,answerThree,answerFour,answerFive,answerSix,answerEight,answerNine,answerTen,answerEleven,answerSeven,answerTwelve,answerThirteen,answerFourteen,
                    userId:user.id,
                }})
                return upload
            } catch (error) {
                throw new TRPCError({code:'INTERNAL_SERVER_ERROR',message:'Failed to create personality inventory'})
            }
        }

        try {
            const {answerOne,answerTwo,answerThree,answerFour,answerFive,answerSix,answerEight,answerNine,answerTen,answerEleven,answerSeven,answerTwelve,answerThirteen,answerFourteen}=input
            const upload=await db.personalityInventory.create({data:{
                answerOne,answerTwo,answerThree,answerFour,answerFive,answerSix,answerEight,answerNine,answerTen,answerEleven,answerSeven,answerTwelve,answerThirteen,answerFourteen,
                userId:user.id,
            }})
            return upload
        } catch (error) {
            throw new TRPCError({code:'INTERNAL_SERVER_ERROR',message:'Failed to create personality inventory'})
        }
    }),
    skillAssesmentAnswer:publicProcedure.input(z.object({
        answerOne:z.number() || z.null(),
        answerTwo:z.number() || z.null(),
        answerThree:z.number() || z.null(),
        answerFour:z.number() || z.null(),
        answerFive:z.number() || z.null(),
        answerSix:z.number() || z.null(),
        answerSeven:z.number() || z.null(),
        answerEight:z.number() || z.null(),
        answerNine:z.number() || z.null(),
        answerTen:z.number() || z.null(),
        answerEleven:z.number() || z.null(),
        answerTwelve:z.number() || z.null(),
    })).mutation(async({input})=>{
        const {getUser}=getKindeServerSession()
        const user=await getUser()
        if(!user || !user.id) throw new TRPCError({code:'UNAUTHORIZED',message:'Not logged in'})

        const file=await db.skillAssesment.findFirst({where:{userId:user.id}})
        
        if(file){
            const {answerId}=file
            await db.skillAssesment.delete({where:{userId:user.id,answerId:answerId}}
            )
            try {
                const {answerOne,answerSeven,answerEight,answerFive,answerTwo,answerTwelve,answerSix,answerNine,answerTen,answerThree,answerFour,answerEleven}=input
                const upload=await db.skillAssesment.create({data:{
                    answerOne,answerSeven,answerEight,answerFive,answerTwo,answerTwelve,answerSix,answerNine,answerTen,answerThree,answerFour,answerEleven,
                    userId:user.id,
                }})
                return upload
            } catch (error) {
                throw new TRPCError({code:'INTERNAL_SERVER_ERROR',message:'Failed to create skill assesment'})
            }
        }   
        try {
            const {answerOne,answerSeven,answerEight,answerFive,answerTwo,answerTwelve,answerSix,answerNine,answerTen,answerThree,answerFour,answerEleven}=input
            const upload=await db.skillAssesment.create({data:{
                answerOne,answerSeven,answerEight,answerFive,answerTwo,answerTwelve,answerSix,answerNine,answerTen,answerThree,answerFour,answerEleven,
                userId:user.id,
            }})
            console.log('Created skill assesment',upload)
            return upload
        } catch (error) {
            console.error('Failed to create skill assesment',error)
            throw new TRPCError({code:'INTERNAL_SERVER_ERROR',message:'Failed to create skill assesment'})
        }
    }),
    ValueAssesment:publicProcedure.input(z.object({
        answerOne:z.number() || z.null(),
        answerTwo:z.number() || z.null(),
        answerThree:z.number() || z.null(),
        answerFour:z.number() || z.null(),
        answerFive:z.number() || z.null(),
        answerSix:z.number() || z.null(),
        answerSeven:z.number() || z.null(),
        answerEight:z.number() || z.null(),
        answerNine:z.number() || z.null(),
        answerTen:z.number() || z.null(),
        answerEleven:z.number() || z.null(),
        answerTwelve:z.number() || z.null(),
    })).mutation(async({input})=>{
        const {getUser}=getKindeServerSession()
        const user=await getUser()
        if(!user || !user.id) throw new TRPCError({code:'UNAUTHORIZED',message:'Not logged in'})

        const file=await db.valueAssesment.findFirst({where:{userId:user.id}})
        
        if(file){
            const {answerId}=file
            await db.valueAssesment.delete({where:{userId:user.id,answerId:answerId}})
            try {
                const {answerOne,answerTwo,answerThree,answerFour,answerFive,answerSix,answerEight,answerNine,answerTen,answerEleven,answerSeven,answerTwelve}=input
                const upload=await db.valueAssesment.create({data:{
                    answerOne,answerTwo,answerThree,answerFour,answerFive,answerSix,answerEight,answerNine,answerTen,answerEleven,answerSeven,answerTwelve,
                    userId:user.id,
                }})
                return upload
            } catch (error) {
                throw new TRPCError({code:'INTERNAL_SERVER_ERROR',message:'Failed to create value assesment'})
            }
        }    

        try {
            const {answerOne,answerTwo,answerThree,answerFour,answerFive,answerSix,answerEight,answerNine,answerTen,answerEleven,answerSeven,answerTwelve}=input
            const upload=await db.valueAssesment.create({data:{
                answerOne,answerTwo,answerThree,answerFour,answerFive,answerSix,answerEight,answerNine,answerTen,answerEleven,answerSeven,answerTwelve,
                userId:user.id,
            }})
            console.log('Created value assesment',upload)
            return upload
        } catch (error) {
            console.error('Failed to create value assesment',error)
            throw new TRPCError({code:'INTERNAL_SERVER_ERROR',message:'Failed to create value assesment'})
        }
    }),


    
    getInterestInventory:publicProcedure.query(async()=>{
        const {getUser}=getKindeServerSession()
        const user=await getUser()
        if(!user || !user.id) throw new TRPCError({code:'UNAUTHORIZED',message:'Not logged in'})
        
        const file=await db.interestInventoryTable.findFirst({where:{userId:user.id}})    

        if(!file)
        {
            const values=await db.interestInventory.findFirst({where:{userId:user.id}})
            if(!values) throw new TRPCError({code:'NOT_FOUND',message:'No interest inventory found'})

            let artisticScore=0;
            let investigativeScore=0;
            let socialScore=0;
            let realisticScore=0;
            let enterprisingScore=0;
            let conventionalScore=0;
            for (const [key,value] of Object.entries(values))
            {
                if(key==='answerThree' || key==="answerNine") artisticScore+=Number(value)
                else if (key==="answerFive" || key==="answerEleven") enterprisingScore+=Number(value)
                else if(key==="answerTwo" || key==="answerEight") investigativeScore+=Number(value)
                else if(key==="answerOne" || key==="answerSeven") realisticScore+=Number(value)
                else if(key==="answerFour" || key==="answerTen") socialScore+=Number(value)
                else if(key==="answerSix" || key==="answerTwelve") conventionalScore+=Number(value)
            }
            const file=await db.interestInventoryTable.create({data:{
                artisticScore,investigativeScore,socialScore,realisticScore,enterprisingScore,conventionalScore,
                userId:user.id
            }})
            return file
        }
        return file
    
    }),
    getPesonalityInventory:publicProcedure.query(async()=>{
        const {getUser}=getKindeServerSession()
        const user=await getUser()
        if(!user || !user.id) throw new TRPCError({code:'UNAUTHORIZED',message:'Not logged in'})
        const file=await db.personalityTrait.findFirst({where:{userId:user.id}})    
        if(!file)
        {
            const values=await db.personalityInventory.findFirst({where:{userId:user.id}})
            if(!values) throw new TRPCError({code:'NOT_FOUND',message:'No personality inventory found'})
            let extraversionScore =0
            let agreeablenessScore=0 
            let conscientiousnessScore=0
            let stabilityScore=0
            let experienceOpennessScore=0
            for(const [key,value] of Object.entries(values))
            {
                if(key==="answerOne" || key==="answerEleven") experienceOpennessScore+=Number(value)
                else if(key==="answerTwo" || key==="answerSeven") conscientiousnessScore+=Number(value)
                else if(key==="answerThree" || key==="answerEigth") extraversionScore+=Number(value)
                else if(key==="answerFour" || key==="answerNine") stabilityScore+=Number(value)
                else if(key==="answerFive" || key==="answerTen") agreeablenessScore+=Number(value)
            }
            const file=await db.personalityTrait.create({data:{
                extraversionScore,agreeablenessScore,conscientiousnessScore,stabilityScore,experienceOpennessScore,
                userId:user.id
            }})
            return file
        }

        return file
    }),
    getSkillAssesment:publicProcedure.query(async()=>{
        const {getUser}=getKindeServerSession()
        const user=await getUser()
        if(!user || !user.id) throw new TRPCError({code:'UNAUTHORIZED',message:'Not logged in'})
        const file=await db.skillAssesmentTable.findFirst({where:{userId:user.id}})
        if(!file)
        {
            const values=await db.skillAssesment.findFirst({where:{userId:user.id}})
            if(!values) throw new TRPCError({code:'NOT_FOUND',message:'No skill assesment found'})
            let analyticalScore=0
            let communicationScore=0
            let creativeScore=0
            let leadershipScore=0
            let technicalScore=0
            let teamworkScore=0  
            for(const [key,value] of Object.entries(values))
            {
                if(key==="answerOne" || key==="answerSeven") analyticalScore+=Number(value)
                else if(key==="answerThree" || key==="answerNine") communicationScore+=Number(value)
                else if(key==="answerTwo" || key==="answerEight") creativeScore+=Number(value)
                else if(key==="answerSix" || key==="answerTwelve") leadershipScore+=Number(value)
                else if(key==="answerFour" || key==="answerTen") technicalScore+=Number(value)
                else if(key==="answerFive" || key==="answerEleven") teamworkScore+=Number(value)
            }
            const file=await db.skillAssesmentTable.create({data:{
                analyticalScore,communicationScore,creativeScore,leadershipScore,technicalScore,teamworkScore,
                userId:user.id
            }})
            return file
        }
        return file
    }),

    getValueAssesment:publicProcedure.query(async()=>{
        const {getUser}=getKindeServerSession()
        const user=await getUser()
        if(!user || !user.id) throw new TRPCError({code:'UNAUTHORIZED',message:'Not logged in'})
        
       const file=await db.valueAssesmentTable.findFirst({where:{userId:user.id}})
       
       if(!file)
       {
            const values=await db.valueAssesment.findFirst({where:{userId:user.id}})
            if(!values) throw new TRPCError({code:'NOT_FOUND',message:'No value assesment found'})
            let achievementScore=0
            let innovationScore=0
            let stabilityScore=0
            let helpingScore=0
            let autonomyScore=0
            let financialScore=0
            for(const [key,value] of Object.entries(values))
            {
                if(key==="answerOne" || key==="answerTwo")  autonomyScore+=Number(value)
                else if(key==="answerThree" || key==="answerFour")  innovationScore+=Number(value)
                else if(key==="answerFive" || key==="answerSix")  achievementScore+=Number(value)
                else if(key==="answerSeven" || key==="answerEight")  helpingScore+=Number(value)
                else if(key==="answerNine" || key==="answerTen")  financialScore+=Number(value)
                else if(key==="answerEleven" || key==="answerTwelve")  stabilityScore+=Number(value)
            }
            const file=await db.valueAssesmentTable.create({data:{
                achievementScore,innovationScore,stabilityScore,helpingScore,autonomyScore,financialScore,
                userId:user.id
            }})
            return file
       }

        return file
    }),

    getDashboardInfo:publicProcedure.query(async()=>{
        const {getUser}=getKindeServerSession()
        const user=await getUser()
        if(!user || !user.id) throw new TRPCError({code:'UNAUTHORIZED',message:'Not logged in'})
        const file=await db.interestInventoryTable.findFirst({where:{userId:user.id}})
        if(!file) return null
        return file
    })


})

export type AppRouter=typeof appRouter;