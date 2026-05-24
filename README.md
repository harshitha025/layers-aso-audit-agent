# ASO Audit Agent

AI-powered App Store Optimization audit tool built with Next.js, TypeScript, and NVIDIA LLM APIs.

## Features

- Paste Apple App Store URL
- Fetch metadata
- Confirm app selection
- AI-generated ASO audit
- Overall ASO score
- Dimension score visualization
- Quick Wins
- High Impact Changes
- Strategic Recommendations
- Competitor comparison

## Tech Stack

- Next.js
- TypeScript
- NVIDIA API (Llama)
- Tailwind CSS
- Mastra project structure

## Setup

Install dependencies:

npm install

Run locally:

npm run dev

Create:

.env.local

Add:

NVIDIA_API_KEY=your_key

## Design Decisions

- Reduced model size from 70B → 8B for faster response
- Structured JSON output for reliable rendering
- Dynamic competitor generation
- Progress visualization for dimension scores
- Modular architecture separating metadata, LLM, parsing, and UI