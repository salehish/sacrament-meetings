# Sacrament Meeting Planner

A WDD430 Next.js application for reviewing and printing sacrament meeting programs.

## Features
- Typed meeting models and five sample records
- Meeting archive and individual agenda pages
- Current Sunday redirect
- JSON API routes with validation
- Reusable components and responsive Tailwind styling
- Print-friendly agenda and optimized local image

## Run locally
```bash
npm install
npm run dev
```

## API
- `GET /api/meetings`
- `GET /api/meetings?date=2026-11-08`
- `GET /api/meetings/1`
- Invalid IDs return 400; unknown IDs return 404.
