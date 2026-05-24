# ASO Audit Agent

AI-powered App Store Optimization audit tool built with Next.js, TypeScript, NVIDIA LLM APIs and Mastra architecture.

## Features

- Paste App Store URL
- Metadata extraction and confirmation flow
- AI-generated ASO audit
- Overall ASO score
- Dimension score visualization
- Quick Wins
- High Impact Changes
- Strategic Recommendations
- Competitor comparison dashboard

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- NVIDIA API (Llama)
- Mastra project structure

## Setup

Install dependencies:

npm install

Run locally:

npm run dev

Create:

.env.local

Add:

NVIDIA_API_KEY=your_key_here

## Design Decisions

- Reduced model size from 70B → 8B for faster inference
- Structured JSON output for reliable rendering
- Dynamic recommendation generation
- Modular architecture separating metadata, LLM logic and parsing