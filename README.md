# claude-uzor

A web application built with Next.js, Vercel, and Supabase authentication.

## Stack

- **Framework**: Next.js (App Router)
- **Hosting**: Vercel
- **Database & Auth**: Supabase
- **Language**: TypeScript

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env.local` and fill in your Supabase credentials
3. Install dependencies: `npm install`
4. Run the dev server: `npm run dev`

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Never commit `.env.local` — it is listed in `.gitignore`.
