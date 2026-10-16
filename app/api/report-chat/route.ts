import { NextResponse } from 'next/server'

type ReportEntry = {
  area: string
  score: number
}

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type ReportPayload = {
  personality?: ReportEntry[]
  skills?: ReportEntry[]
  values?: ReportEntry[]
  interests?: ReportEntry[]
}

const MODEL_CANDIDATES = [
  process.env.GEMINI_MODEL,
  'gemini-2.0-flash',
  'gemini-2.0-flash-001',
  'gemini-2.0-flash-lite',
  'gemini-1.5-flash-latest',
].filter(Boolean)

const formatTopItems = (items: ReportEntry[] | undefined, count = 3) => {
  if (!items?.length) return 'No data available'
  return items
    .slice(0, count)
    .map((item) => `${item.area} (${item.score}%)`)
    .join(', ')
}

const formatBottomItems = (items: ReportEntry[] | undefined, count = 2) => {
  if (!items?.length) return 'No data available'
  return [...items]
    .sort((a, b) => a.score - b.score)
    .slice(0, count)
    .map((item) => `${item.area} (${item.score}%)`)
    .join(', ')
}

const hasKeyword = (question: string, keywords: string[]) =>
  keywords.some((keyword) => question.includes(keyword))

const buildFallbackAnswer = (question: string, report: ReportPayload) => {
  const normalizedQuestion = question.toLowerCase()
  const topSkills = formatTopItems(report.skills)
  const topInterests = formatTopItems(report.interests)
  const topValues = formatTopItems(report.values)
  const topTraits = formatTopItems(report.personality)
  const weakerAreas = formatBottomItems(report.skills)
  const lowerTraits = formatBottomItems(report.personality)
  const lowerInterests = formatBottomItems(report.interests)

  if (hasKeyword(normalizedQuestion, ['career', 'job', 'role', 'fit'])) {
    return `Your report points toward roles that reward ${topSkills}, align with interests in ${topInterests}, and match values like ${topValues}. A strong next step is to explore career paths where those three patterns overlap.`
  }

  if (hasKeyword(normalizedQuestion, ['strength', 'strong', 'best'])) {
    return `Your strongest themes show up in personality traits like ${topTraits}, skills such as ${topSkills}, and interests around ${topInterests}. Those are the areas most worth leaning on when choosing projects, study paths, or roles.`
  }

  if (
    hasKeyword(normalizedQuestion, [
      'improve',
      'improvement',
      'better',
      'develop',
      'growth',
    ])
  ) {
    return `The clearest growth opportunities in your report are ${weakerAreas}, with lower-scoring patterns also showing up in ${lowerTraits} and ${lowerInterests}. Improve these gradually through small weekly practice, targeted feedback, and stretch assignments.`
  }

  return `Your report shows a mix of personality strengths in ${topTraits}, practical skills in ${topSkills}, interests in ${topInterests}, and values centered on ${topValues}. Ask about strengths, career fit, or areas to improve if you want a more focused answer.`
}

const createFallbackResponse = (question: string, report: ReportPayload) =>
  NextResponse.json({
    answer: buildFallbackAnswer(question, report),
    fallback: true,
  })

export async function POST(request: Request) {
  let question = 'general report summary'
  let report: ReportPayload = {}

  try {
    const apiKey =
      process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_API_KEY

    console.log('API KEY EXISTS:', !!apiKey)

    const body = await request.json()
    console.log('Incoming request:', body)

    question =
      typeof body?.question === 'string' ? body.question.trim() : ''
    report = (body?.report ?? {}) as ReportPayload
    const history = Array.isArray(body?.history)
      ? (body.history as ChatMessage[])
      : []

    if (!question) {
      return NextResponse.json(
        { error: 'A question is required.' },
        { status: 400 }
      )
    }

    if (!apiKey) {
      return createFallbackResponse(question, report)
    }

    const prompt = [
      'You are a supportive AI career-report assistant.',
      'Answer using only the report context.',
      '',
      'Recent conversation:',
      ...history.slice(-6).map((message) => `${message.role}: ${message.content}`),
      '',
      'User question:',
      question,
      '',
      'Report context:',
      JSON.stringify(report, null, 2),
    ].join('\n')

    let answer = ''

    for (const modelName of MODEL_CANDIDATES) {
      console.log(`Trying model: ${modelName}`)

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.5,
              maxOutputTokens: 500,
            },
          }),
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        console.log(`Model failed: ${modelName}`, errorText)

        if (response.status === 429) {
          console.log('Rate limit hit, using fallback response')
          return createFallbackResponse(question, report)
        }

        continue
      }

      const data = await response.json()
      console.log('Gemini raw response:', JSON.stringify(data, null, 2))

      const candidate = data?.candidates?.[0]
      if (!candidate) {
        console.log('No candidates returned')
        continue
      }

      if (candidate?.content?.parts) {
        answer = candidate.content.parts
          .map((part: { text?: string }) => part.text || '')
          .join('')
          .trim()
      }

      if (!answer) {
        console.log(`Empty answer from model: ${modelName}`)
        continue
      }

      console.log(`Success with model: ${modelName}`)
      break
    }

    if (!answer) {
      console.log('All models failed, using fallback response')
      return createFallbackResponse(question, report)
    }

    return NextResponse.json({ answer })
  } catch (error) {
    console.error('API crash, using fallback response:', error)
    return createFallbackResponse(question, report)
  }
}
