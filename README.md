# Solveitly — E-learning Platform

Monorepo (npm workspaces) with a React frontend and a Node.js/Express API.

> 📘 For the full architecture, data model, API, conventions and roadmap, read **[PROJECT_GUIDE.md](PROJECT_GUIDE.md)**.

| Part | Stack |
|---|---|
| `client/` | React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/ui, React Router, TanStack Query, React Hook Form + Zod |
| `server/` | Node.js, Express 5, TypeScript, MongoDB (Mongoose), Zod, JWT in httpOnly cookie, bcrypt, Helmet, rate limiting |

## Getting started

Requirements: Node.js 20.19+ and a MongoDB database (local install or a free MongoDB Atlas cluster).

```bash
npm install                                # installs client + server
cp server/.env.example server/.env         # then edit MONGODB_URI and JWT_SECRET
npm run seed -w server                     # load courses + lessons into MongoDB
npm run dev                                # API on :5000, web app on :5173
```

Open http://localhost:5173. In development Vite proxies `/api/*` to the API, so the auth cookie works without CORS issues.

## Scripts (run from the repo root)

| Command | What it does |
|---|---|
| `npm run dev` | Run API and web app together |
| `npm run dev:server` / `npm run dev:client` | Run only one side |
| `npm run seed -w server` | Load / update courses and lessons from `server/content` into MongoDB (safe to re-run) |
| `npm run typecheck` | Type-check both workspaces |
| `npm run build` | Build server (`server/dist`) and client (`client/dist`) |
| `npm start` | Run the built API. With `NODE_ENV=production` it also serves `client/dist`, so one process hosts the whole site |

## Project structure

```
client/src/
  components/ui/       shadcn/ui primitives (button, input, card, ...)
  components/layout/   Navbar, Footer, RootLayout
  features/auth/       auth API calls, hooks, form schemas, route guards
  features/home/       landing page sections
  data/                static content (courses, team, blog) — to be moved to the API
  lib/                 axios instance, helpers
  pages/               route-level pages
  router.tsx           all routes

server/src/
  config/              env validation (Zod), MongoDB connection
  models/              Mongoose models
  modules/<feature>/   routes → controller → service, plus Zod schemas
  middleware/          auth (requireAuth, requireRole), validation, errors
  utils/               ApiError, JWT helpers
```

## Course content

Each course is one Markdown file in `server/content/courses/<slug>.md`; course details (title, level, outcomes…) live in `server/src/scripts/course-catalog.ts`. Every lesson starts with a marker line:

```md
<!-- lesson: lesson-slug | Lesson title | 15 -->
```

Edit or add lessons, then run `npm run seed -w server` to update the database. Learners' progress is kept.

New backend features go in `server/src/modules/<name>/` following the `auth` module. New frontend features go in `client/src/features/<name>/`.

## API

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | – | Health check |
| POST | `/api/auth/register` | – | `{ name, email, age, password }` → creates account and logs in |
| POST | `/api/auth/login` | – | `{ email, password }` → sets the auth cookie |
| POST | `/api/auth/logout` | – | Clears the auth cookie |
| GET | `/api/auth/me` | ✔ | Current user |
| GET | `/api/courses` | – | All published courses |
| GET | `/api/courses/:slug` | optional | Course detail + lesson outline (+ progress when logged in) |
| GET | `/api/courses/:slug/lessons/:lessonSlug` | ✔ | Lesson content; enrolls the learner |
| PUT | `/api/courses/:slug/lessons/:lessonSlug/complete` | ✔ | `{ completed: boolean }` → updated progress |
| GET | `/api/courses/:slug/notes` | ✔ | All lessons of a course (printable PDF notes) |
| GET | `/api/me/courses` | ✔ | Courses the user has started, with progress |

Errors are returned as `{ message, errors? }`, where `errors` maps field names to messages.
