'use client'

import React, { FormEvent, KeyboardEvent, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Bot, Loader2, SendHorizonal, Sparkles, User2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type PersonalityData = {
  extraversionscore: number
  agreeablenessscore: number
  consciencetiousnessscore: number
  stabilityscore: number
  experienceopenessscore?: number
}

type SkillData = {
  analyticalscore: number
  communicationscore: number
  creativescore: number
  leadershipscore: number
  technicalscore: number
  teamworkscore: number
}

type ValueData = {
  achievementscore: number
  innovationscore: number
  stabilityscore: number
  helpingscore: number
  autonomyscore: number
  financialscore: number
}

type InterestData = {
  artisticscore: number
  investigativescore: number
  socialscore: number
  realisticscore: number
  enterprisingscore: number
  conventionalscore: number
}

type ReportContext = {
  personality: { area: string; score: number }[]
  skills: { area: string; score: number }[]
  values: { area: string; score: number }[]
  interests: { area: string; score: number }[]
}

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  fallback?: boolean
}

const starterPrompts = [
  'What are my top strengths?',
  'Which careers fit my report best?',
  'What should I improve next?',
]

const toPercentageEntries = (entries: Array<{ area: string; score: number }>) =>
  entries
    .filter((entry) => Number.isFinite(entry.score))
    .map((entry) => ({
      area: entry.area,
      score: entry.score * 10,
    }))
    .sort((a, b) => b.score - a.score)

const buildEntries = <T extends Record<string, unknown>>(
  data: T,
  fields: Array<{ key: keyof T; label: string }>
) =>
  fields
    .map(({ key, label }) => {
      const value = data[key]
      return {
        area: label,
        score: typeof value === 'number' ? value : Number.NaN,
      }
    })
    .filter((entry) => Number.isFinite(entry.score))

const personalityFields: Array<{ key: keyof PersonalityData; label: string }> = [
  { key: 'extraversionscore', label: 'Extraversion' },
  { key: 'agreeablenessscore', label: 'Agreeableness' },
  { key: 'consciencetiousnessscore', label: 'Conscientiousness' },
  { key: 'stabilityscore', label: 'Stability' },
  { key: 'experienceopenessscore', label: 'Openness' },
]

const skillFields: Array<{ key: keyof SkillData; label: string }> = [
  { key: 'analyticalscore', label: 'Analytical' },
  { key: 'communicationscore', label: 'Communication' },
  { key: 'creativescore', label: 'Creativity' },
  { key: 'leadershipscore', label: 'Leadership' },
  { key: 'technicalscore', label: 'Technical' },
  { key: 'teamworkscore', label: 'Teamwork' },
]

const valueFields: Array<{ key: keyof ValueData; label: string }> = [
  { key: 'achievementscore', label: 'Achievement' },
  { key: 'innovationscore', label: 'Innovation' },
  { key: 'stabilityscore', label: 'Stability' },
  { key: 'helpingscore', label: 'Helping' },
  { key: 'autonomyscore', label: 'Autonomy' },
  { key: 'financialscore', label: 'Financial' },
]

const interestFields: Array<{ key: keyof InterestData; label: string }> = [
  { key: 'artisticscore', label: 'Artistic' },
  { key: 'investigativescore', label: 'Investigative' },
  { key: 'socialscore', label: 'Social' },
  { key: 'realisticscore', label: 'Realistic' },
  { key: 'enterprisingscore', label: 'Enterprising' },
  { key: 'conventionalscore', label: 'Conventional' },
]

export default function ReportChat() {
  const [report, setReport] = useState<ReportContext | null>(null)
  const [isReportLoading, setIsReportLoading] = useState(true)
  const [question, setQuestion] = useState('')
  const [isAsking, setIsAsking] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Ask me anything about your assessment report. I can explain your strengths, patterns, and possible career directions based on your results.',
    },
  ])

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setReport(null)
          return
        }

        const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const headers = { 'Content-Type': 'application/json' }
        const body = JSON.stringify({ userId: user.id })

        const [personalityRes, skillRes, valueRes, interestRes] = await Promise.all([
          fetch(`${baseUrl}/functions/v1/get-personality-inventory`, { method: 'POST', headers, body }),
          fetch(`${baseUrl}/functions/v1/get-skill-assessment`, { method: 'POST', headers, body }),
          fetch(`${baseUrl}/functions/v1/get-value-assessment`, { method: 'POST', headers, body }),
          fetch(`${baseUrl}/functions/v1/get-interest-inventory`, { method: 'POST', headers, body }),
        ])

        const [personality, skills, values, interests] = await Promise.all([
          personalityRes.json() as Promise<PersonalityData>,
          skillRes.json() as Promise<SkillData>,
          valueRes.json() as Promise<ValueData>,
          interestRes.json() as Promise<InterestData>,
        ])

        setReport({
          personality: toPercentageEntries(buildEntries(personality, personalityFields)),
          skills: toPercentageEntries(buildEntries(skills, skillFields)),
          values: toPercentageEntries(buildEntries(values, valueFields)),
          interests: toPercentageEntries(buildEntries(interests, interestFields)),
        })
      } catch (error) {
        console.error(error)
        setReport(null)
      } finally {
        setIsReportLoading(false)
      }
    }

    fetchReportData()
  }, [])

  const askQuestion = async (nextQuestion?: string) => {
    const prompt = (nextQuestion ?? question).trim()

    if (!prompt || !report || isAsking) return

    const userMessage: ChatMessage = { role: 'user', content: prompt }
    const nextMessages = [...messages, userMessage]

    setMessages(nextMessages)
    setQuestion('')
    setIsAsking(true)

    try {
      const response = await fetch('/api/report-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: prompt,
          report,
          history: messages.slice(-6),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to get an answer right now.')
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: 'assistant', content: data.answer, fallback: Boolean(data.fallback) },
      ])
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to get an answer right now.'

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: 'assistant',
          content: message,
        },
      ])
    } finally {
      setIsAsking(false)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await askQuestion()
  }

  const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      await askQuestion()
    }
  }

  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/40 backdrop-blur md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-amber-700">
            <Sparkles size={16} />
            Report Assistant
          </div>
          <h2 className="mt-4 text-2xl font-bold text-slate-900">Ask about your report</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
            Ask for strengths, likely career fits, weak areas, or a simpler explanation of any section in your assessment.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {starterPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => askQuestion(prompt)}
            disabled={isAsking || isReportLoading || !report}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4 rounded-3xl bg-slate-50 p-4 md:p-5">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <Bot size={18} />
              </div>
            )}

            <div
              className={`max-w-3xl rounded-3xl px-4 py-3 text-sm leading-7 shadow-sm md:text-[15px] ${
                message.role === 'user'
                  ? 'bg-slate-900 text-white'
                  : 'border border-slate-200 bg-white text-slate-700'
              }`}
            >
              {message.fallback && (
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-600">
                  Report-based fallback
                </div>
              )}
              {message.content}
            </div>

            {message.role === 'user' && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-200 text-slate-700">
                <User2 size={18} />
              </div>
            )}
          </div>
        ))}

        {isAsking && (
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <Bot size={18} />
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-600 shadow-sm">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <label htmlFor="report-chat-question" className="sr-only">
          Ask about your report
        </label>
        <textarea
          id="report-chat-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            isReportLoading
              ? 'Loading your report context...'
              : 'Ask something like: Which strengths stand out most in my report?'
          }
          disabled={isReportLoading || isAsking || !report}
          rows={4}
          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 disabled:cursor-not-allowed disabled:bg-slate-100"
        />

        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-500">
            {isReportLoading
              ? 'Fetching report data for the assistant.'
              : report
              ? 'The assistant answers using your current report data.'
              : 'Report data is unavailable right now.'}
          </p>

          <Button
            type="submit"
            disabled={isReportLoading || isAsking || !report || !question.trim()}
            className="gap-2"
          >
            {isAsking ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
            {isAsking ? 'Thinking' : 'Ask AI'}
          </Button>
        </div>
      </form>
    </section>
  )
}
