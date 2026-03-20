# SkillChain Workspace

## Overview

SkillChain is a skill-barter platform where users exchange skills without money. Users list what they can teach and what they want to learn. An AI matching system connects them with compatible partners for peer-to-peer skill exchange sessions.

**Team:** Hackattack — Aradhya Negi, Anwesha Kundu, Aakriti Pathak, Mohit Kunwar  
**SDGs:** SDG 8 (Decent Work & Economic Growth) + SDG 4 (Quality Education)

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Frontend**: React + Vite + TailwindCSS + shadcn/ui
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server
│   │   └── src/routes/     # users, skills, matches, sessions, messages, reviews, stats
│   ├── mockup-sandbox/     # Component preview sandbox
│   └── skillchain/         # React + Vite frontend (preview path: /)
│       └── src/pages/      # Home, Discover, Matches, Sessions, Messages, Profile, Leaderboard
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
│       └── src/schema/     # users, skills, badges, sessions, messages, reviews
├── scripts/
│   └── src/seed.ts         # Database seeder (8 users, 38 skills, sessions, reviews)
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Key Features

1. **User Profiles** — Skills offered/wanted, trust score, badges, sessions completed
2. **AI Skill Matching** — Finds compatible swap partners based on complementary skills
3. **Session Booking** — Book peer-to-peer skill exchange sessions with scheduling
4. **Messaging** — Chat with potential skill exchange partners
5. **Reviews & Trust** — Rating system that updates user trust scores
6. **Gamification** — Badges (🌱 New Member, 🏆 Top Teacher, ⭐ Quick Learner, 🤝 Trusted Exchanger, 🎯 Skill Master)
7. **Leaderboard** — Top users by trust score and activity

## Database Schema

- `users` — name, email, avatar, bio, location, trustScore, sessionsCompleted
- `skills` — name, category, level, userId, type (offered/wanted)
- `badges` — userId, badge emoji+name
- `sessions` — initiatorId, partnerId, skillOffered, skillRequested, scheduledAt, status
- `messages` — senderId, receiverId, content, read
- `reviews` — reviewerId, revieweeId, rating, comment, skillExchanged

## Seeding

Run seed data: `pnpm --filter @workspace/scripts run seed`

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all lib packages as project references.

- **Always typecheck from the root** — run `pnpm run typecheck`
- **`emitDeclarationOnly`** — only emit `.d.ts` files during typecheck

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build`
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly`
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API client from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes

## Current User Context

The prototype uses `userId=1` (Aradhya Negi) as the default logged-in user. No auth is implemented for the prototype — this is intentional for hackathon demo purposes.
