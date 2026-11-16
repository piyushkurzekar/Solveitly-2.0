# Solveitly — Project Guide

> **Read this first.** This document explains what Solveitly is, how the code is organised, how data flows through the system, the conventions to follow and what is still missing. It is written so that a developer or an AI coding agent can start working on the project without any other context.
>
> Last updated: 16 Nov 2026.

---

## 1. What is Solveitly?

Solveitly is an **e-learning website** built by **MVAPS Solution Organization**. Visitors browse courses (C, C++, Python, Java, SQL, HTML, CSS, JavaScript, Web Development Bootcamp, Cloud Computing, DevOps), create a free account, read lessons with code examples, mark lessons complete, track progress on a dashboard and download course notes as PDF.

**Tagline:** "Learn. Solve. Grow."
**Co-founders shown on the site:** Azad Bhasme (CEO), Piyush Kurzekar (COO & CFO), Abhishek Giri (CTO & CMO).

### Current status

| Area | Status |
|---|---|
| Landing page (hero, features, courses, how it works, about/team, blog, CTA, footer) | ✅ Done |
| Auth: register, login, logout, current user (JWT in httpOnly cookie) | ✅ Done |
| Course catalogue with filters | ✅ Done (data from MongoDB) |
| Course detail page (overview, outcomes, syllabus) | ✅ Done |
| Lesson viewer (Markdown, syntax highlighting, copy button, prev/next, sidebar) | ✅ Done |
| Progress tracking (auto-enroll, mark complete, % progress) | ✅ Done |
| Learner dashboard ("My Courses" with progress) | ✅ Done |
| Printable / PDF course notes | ✅ Done (browser print → "Save as PDF") |
| 11 courses / 61 lessons of written content | ✅ Done (`server/content/courses/*.md`) |
| **Admin panel to add/edit courses** | ❌ Planned next |
| Certificates, quizzes, blog posts, payments | ❌ Not started |

---

## 2. Tech stack

Monorepo using **npm workspaces**: `client/` (front end) and `server/` (API).

| Layer | Technology (major version) |
|---|---|
| Front end | React 19, TypeScript, Vite 8 |
| Styling | Tailwind CSS v4 (CSS-first config, **no `tailwind.config.js`**), shadcn/ui-style components, `@tailwindcss/typography`, font: Plus Jakarta Sans |
| Routing | React Router v8 (import everything from `"react-router"`) |
| Server state | TanStack Query v5 |
| Forms | React Hook Form + Zod v4 (`@hookform/resolvers/zod`) |
| HTTP client | Axios (`withCredentials: true`) |
| Markdown | `react-markdown` + `remark-gfm` + `rehype-highlight` (highlight.js, theme `github-dark`) |
| Icons | `lucide-react` (UI), `react-icons` (`fa6` brand icons, `si` tech logos) |
| Toasts | `sonner` |
| Back end | Node.js 20.19+ (developed on Node 24), Express 5, TypeScript 7 (`tsc`), `tsx` for dev |
| Database | **MongoDB Atlas** via Mongoose 9 (DB name `solveitly`). A later switch to PostgreSQL + Prisma is planned but **not decided** — keep DB access inside services/models. |
| Auth | `jsonwebtoken` + `bcrypt` (12 rounds), cookie `token` |
| Security | `helmet`, `cors` (single origin), `express-rate-limit`, Zod validation, 100 kb JSON limit |

The original project (Express + EJS, before the rewrite) has been **deleted**; nothing in the current code depends on it.

---

## 3. Running the project

```bash
# from the repository root (NOT from client/ or server/)
npm install
cp server/.env.example server/.env      # then fill in MONGODB_URI and JWT_SECRET
npm run seed -w server                  # loads courses + lessons into MongoDB (safe to re-run)
npm run dev                             # API on :5000 and web app on :5173 together
```

Open http://localhost:5173.

> ⚠️ Common mistake: running only the Vite dev server. Then every `/api/*` call fails with `ECONNREFUSED` in the Vite log and the course section is empty. Always run `npm run dev` from the root, or `npm run dev:server` in a second terminal.

### Root scripts

| Command | What it does |
|---|---|
| `npm run dev` | API + web app together (via `concurrently`, log prefixes `[api]` / `[web]`) |
| `npm run dev:server` / `npm run dev:client` | One side only |
| `npm run seed -w server` | Upsert course catalog + lesson Markdown into MongoDB |
| `npm run typecheck` | `tsc --noEmit` in both workspaces |
| `npm run build` | Build server (`server/dist`) and client (`client/dist`) |
| `npm start` | Run built API; with `NODE_ENV=production` it also serves `client/dist` |

### Environment variables (`server/.env`, validated with Zod in `server/src/config/env.ts`)

| Variable | Required | Default | Notes |
|---|---|---|---|
| `NODE_ENV` | no | `development` | `production` enables secure cookies, trust proxy and serving `client/dist` |
| `PORT` | no | `5000` | Vite proxies `/api` to this port |
| `MONGODB_URI` | **yes** | — | Atlas SRV string ending in `/solveitly?...` |
| `JWT_SECRET` | **yes** | — | ≥ 32 characters |
| `JWT_EXPIRES_IN_DAYS` | no | `7` | Token and cookie lifetime |
| `CLIENT_URL` | no | `http://localhost:5173` | Allowed CORS origin |

`server/.env` is git-ignored and contains real credentials — **never print, log or commit it.** The server exits at start-up with a readable message if a variable is missing/invalid or MongoDB is unreachable.

---

## 4. Repository layout

```
.
├── package.json              # workspaces + root scripts
├── README.md                 # short setup guide
├── PROJECT_GUIDE.md          # this file
├── client/
│   ├── index.html            # meta tags, favicon (/brand/favicon.png)
│   ├── vite.config.ts        # "@" alias → src, /api proxy → :5000
│   ├── components.json       # shadcn/ui config (new-york, lucide)
│   ├── public/
│   │   ├── brand/            # logo-mark.webp (owl), logo-full.webp, favicon.png, apple-touch-icon.png
│   │   └── images/           # hero, auth illustration, courses/*, blog/*, team/*
│   └── src/
│       ├── main.tsx          # QueryClient, RouterProvider, Toaster
│       ├── router.tsx        # all routes + guards + lazy pages
│       ├── index.css         # Tailwind v4 theme tokens (navy/gold), utilities, print rules
│       ├── lib/              # api.ts (axios + error helpers), utils.ts (cn)
│       ├── data/site.ts      # static marketing content: nav, features, steps, team, blog, contact
│       ├── components/
│       │   ├── ui/           # button, card, input, label, spinner (shadcn style)
│       │   └── layout/       # Navbar, Footer, Logo, SocialLinks, RootLayout
│       ├── features/
│       │   ├── auth/         # api, hooks, zod schemas, AuthLayout, FormField, RouteGuards
│       │   ├── courses/      # api, hooks, types, CourseCard, CourseCatalog, Markdown, ProgressBar
│       │   └── home/         # landing page sections
│       └── pages/            # route-level pages
└── server/
    ├── .env / .env.example
    ├── content/courses/      # one Markdown file per course (lesson bodies)
    └── src/
        ├── index.ts          # connect DB → listen → graceful shutdown
        ├── app.ts            # express app: middleware, routes, prod static hosting, errors
        ├── config/           # env.ts (Zod), db.ts (mongoose connect/disconnect)
        ├── models/           # user, course, lesson, enrollment
        ├── middleware/       # auth (requireAuth, optionalAuth, requireRole), validate, error
        ├── modules/
        │   ├── auth/         # routes → controller → service + zod schema
        │   └── courses/      # routes → controller → service (courses, lessons, progress, notes)
        ├── scripts/          # course-catalog.ts (course metadata), seed-courses.ts
        ├── types/express.d.ts# adds req.user
        └── utils/            # ApiError, jwt helpers + cookie options
```

---

## 5. Architecture and request flow

### Development

```
Browser ──► Vite dev server :5173 ──(proxy /api/*)──► Express API :5000 ──► MongoDB Atlas
            (React app, HMR)                          (JSON only)
```

Because of the proxy the browser sees a **single origin**, so the httpOnly auth cookie works without cross-site cookie settings.

### Production

`npm run build` then `NODE_ENV=production npm start`: Express serves the API under `/api/*` and the built React app from `client/dist` (SPA fallback `app.get("/{*splat}")` returns `index.html`). One process, one origin.

### Back-end layering (per feature module)

```
routes.ts      → URL + middleware (rate limit, validateBody(zodSchema), requireAuth)
controller.ts  → reads req, calls service, writes res (thin, no business logic)
service.ts     → business logic + Mongoose queries; throws ApiError
models/*.ts    → Mongoose schemas
```

- Express 5 forwards errors thrown in async handlers automatically — **no try/catch or asyncHandler needed** in controllers.
- `middleware/error.ts` converts errors to JSON: `ApiError` → its status; Mongo duplicate key (11000) → 409; Mongoose validation → 400; malformed JSON → 400; everything else → 500 with a generic message (stack only outside production).
- **Error response shape (always):** `{ "message": string, "errors"?: { [field]: string[] } }`.

---

## 6. Data model (MongoDB)

### `users`
| Field | Type | Notes |
|---|---|---|
| name | string | 2–80 chars |
| email | string | unique, lowercase |
| age | number | 1–120 |
| password | string | bcrypt hash, `select: false` (use `.select("+password")` to read) |
| role | `"student" \| "instructor" \| "admin"` | default `student` — **the admin panel should rely on this** |
| createdAt / updatedAt | Date | timestamps |

Use `toPublicUser()` from `user.model.ts` before sending a user to the client.

### `courses`
| Field | Notes |
|---|---|
| slug | unique, used in URLs (`/courses/c-programming`) |
| title, description, overview | `overview` may contain Markdown |
| category | `"Web Development" \| "Programming" \| "Cloud & DevOps" \| "Databases"` |
| level | `"Beginner" \| "Intermediate" \| "Advanced"` |
| image, imageAlt | image path under `client/public` (e.g. `/images/courses/c.webp`) |
| popular | boolean (badge + "Popular" filter) |
| outcomes | string[] ("What you'll learn") |
| lessons | ordered outline `[{ slug, title, minutes }]` — **denormalised copy**, the source of lesson order |
| order | sort order in the catalogue |
| published | only published courses are returned by the API |

### `lessons`
`course` (ObjectId), `courseSlug`, `slug`, `title`, `order`, `minutes`, `content` (Markdown). Unique index on `(courseSlug, slug)`.

### `enrollments` (progress)
`user`, `course`, `completedLessons: string[]` (lesson slugs), `lastLessonSlug`, `completedAt`. Unique index on `(user, course)`.

- Opening a lesson **upserts** the enrollment and sets `lastLessonSlug` (auto-enroll).
- `percent = completedLessons ∩ current lesson slugs / total lessons`. Slugs of removed lessons are ignored, so editing content never breaks progress.
- `completedAt` is set when every lesson is complete and cleared if one is un-marked.

---

## 7. Course content pipeline

Course content lives in the repository, not in an admin UI (yet).

1. **Metadata** — `server/src/scripts/course-catalog.ts`: slug, title, description, overview, category, level, image, imageAlt, popular, outcomes. Array order = catalogue order.
2. **Lessons** — `server/content/courses/<slug>.md`. Each lesson begins with a marker line; everything until the next marker is the lesson body:

   ```md
   <!-- lesson: variables-and-data-types | Variables, Data Types & Operators | 15 -->

   Lesson body in GitHub-flavoured Markdown...
   ```

   Format: `<!-- lesson: <slug> | <title> | <minutes> -->`. Slugs must be lowercase-kebab and unique within the file. Do **not** start the body with an `# H1` — the page renders the title. Use `##` / `###` headings, fenced code blocks with a language (`c`, `cpp`, `python`, `java`, `sql`, `html`, `css`, `js`, `bash`, `json`, `yaml`, `dockerfile`, `groovy`, `http`), tables and `> ` notes. House style per lesson: explanation → examples → **Key takeaways** → **Practice**.
3. **Seed** — `npm run seed -w server` parses every file first (fails without touching the DB if a file is broken), then upserts courses and lessons by slug, deletes lessons removed from a file and unpublishes courses removed from the catalog. Enrollments are never deleted.

Current content: 11 courses, 61 lessons (~16.75 hours). The content was written by the AI assistant during development — a subject-matter review is recommended.

> When the admin panel is built, it will write to the same `courses`/`lessons` collections. Decide then whether Markdown files stay the source of truth (seed would overwrite admin edits) or the DB becomes the source of truth (stop running seed for edited courses).

---

## 8. API reference

Base path `/api`. Auth = httpOnly cookie `token` (JWT, payload `{ sub: userId, role }`, `sameSite=lax`, `secure` in production).

| Method | Path | Auth | Body / notes | Response |
|---|---|---|---|---|
| GET | `/health` | – | – | `{ status, uptime }` |
| POST | `/auth/register` | – | `{ name, email, age, password }` (rate limited 20/15 min) | `201 { user }` + sets cookie |
| POST | `/auth/login` | – | `{ email, password }` (rate limited) | `{ user }` + sets cookie; 401 "Incorrect email or password" |
| POST | `/auth/logout` | – | – | `204`, clears cookie |
| GET | `/auth/me` | required | – | `{ user }` / 401 |
| GET | `/courses` | – | – | `{ courses: CourseSummary[] }` |
| GET | `/courses/:slug` | optional | – | `{ course: CourseDetail }` (`progress` is `null` when logged out / not enrolled) |
| POST | `/courses/:slug/enroll` | required | – | `{ progress }` |
| GET | `/courses/:slug/lessons/:lessonSlug` | required | auto-enrolls | `{ course, lesson, prev, next, progress }` |
| PUT | `/courses/:slug/lessons/:lessonSlug/complete` | required | `{ completed: boolean }` | `{ progress }` |
| GET | `/courses/:slug/notes` | required | – | `{ course, lessons[] }` (all lesson bodies) |
| GET | `/me/courses` | required | – | `{ courses: MyCourse[] }` (with `progress`, `nextLessonSlug`) |

TypeScript shapes for these responses are in `client/src/features/courses/types.ts` and `client/src/features/auth/api.ts`.

---

## 9. Front end

### Routes (`client/src/router.tsx`)

| Path | Page | Access |
|---|---|---|
| `/` | HomePage (landing sections) | public |
| `/courses` | CoursesPage (catalogue + filters) | public |
| `/courses/:slug` | CourseDetailPage | public (lazy-loaded) |
| `/login`, `/register` | Login / Register | **GuestRoute** – logged-in users are redirected |
| `/dashboard` | DashboardPage | **ProtectedRoute** |
| `/courses/:slug/learn/:lessonSlug` | LessonPage | **ProtectedRoute** (lazy) |
| `/courses/:slug/notes` | CourseNotesPage (printable/PDF) | **ProtectedRoute** (lazy) |
| `*` | NotFoundPage | public |

All routes render inside `RootLayout` (fixed Navbar, `<main class="pt-16">`, Footer, scroll restoration, `#hash` scrolling).

### Auth flow on the client

- `useCurrentUser()` (query key `["auth","me"]`) calls `/auth/me`; a 401 resolves to `null` (logged out), not an error.
- `ProtectedRoute` redirects to `/login` with `state.from = <current path>`. Login and Register navigate to `from` after success, `GuestRoute` also honours `from`, and the "Register"/"Sign in" switch links forward the state. Result: clicking "Start learning" while logged out → login/register → **back to the same lesson**.
- Login/register put the user in the cache and invalidate all `["courses", …]` queries; logout clears the whole cache.

### Data fetching (TanStack Query)

Hooks in `features/courses/hooks.ts`; keys:

| Key | Hook | Notes |
|---|---|---|
| `["courses","list"]` | `useCourses` | staleTime 5 min |
| `["courses","detail",slug]` | `useCourse` | staleTime 0 (progress changes) |
| `["courses","lesson",slug,lessonSlug]` | `useLesson` | |
| `["courses","notes",slug]` | `useCourseNotes` | |
| `["courses","mine"]` | `useMyCourses` | dashboard |
| mutation | `useSetLessonComplete(slug)` | updates progress in all cached lessons of the course, invalidates detail + mine |

Global defaults (`main.tsx`): no refetch on window focus; **no retry on 401/404**, up to 2 retries otherwise.

### Lesson rendering

`features/courses/components/Markdown.tsx` wraps `react-markdown` with GFM tables, highlight.js (`common` languages + dockerfile, groovy, http), a code-block header with language label and **Copy** button, external links opening in a new tab, and Tailwind Typography (`prose`) styled to the brand. Raw HTML in Markdown is **not** rendered (safe by default — keep it that way).

### PDF notes

`CourseNotesPage` renders every lesson of a course with a cover page. "Download PDF" calls `window.print()`; `index.css` print rules plus `print:hidden` on Navbar/Footer and `print:break-before-page` per lesson produce a clean PDF ("Save as PDF").

### Code splitting

Pages that use Markdown/highlighting are `React.lazy`-loaded (`lazyPage()` in `router.tsx`), so the ~340 kB Markdown bundle is only downloaded on course/lesson/notes pages.

---

## 10. Design system

Brand colours come from the owl logo (`client/public/brand/logo-mark.webp`): **navy `#19255e`** and **gold `#e3bd4b`**.

- Tokens are defined in `client/src/index.css` (`:root` + `@theme inline`). Use Tailwind classes `bg-navy-800`, `text-navy-900`, `bg-gold-500`, `text-gold-600`, `bg-muted`, `text-muted-foreground`, `border`, etc. — **don't hard-code hex values in components**.
- Scales: `navy-950/900/800/700/600/100/50`, `gold-600/500/400/100`. `primary` = navy-800.
- Custom utilities: `container-page` (max-w-7xl + responsive padding) and `bg-dots` (dotted pattern on dark sections).
- Button variants (`components/ui/button.tsx`): `default` (navy), `gold`, `outline`, `outlineLight` (on dark backgrounds), `secondary`, `ghost`, `link`, `destructive`; sizes `sm`, `default`, `lg`, `xl`, `icon`. Use `asChild` with `<Link>` for link-buttons.
- Section pattern on the landing page: `SectionHeader` (gold uppercase eyebrow + navy title + muted description), alternating white and `bg-muted` sections, dark navy hero and CTA.
- `Logo` component: `tone="light"` (on white) or `tone="dark"` (owl inside a white badge — the navy owl is invisible on navy otherwise).
- Static marketing text (nav links, features, steps, team, blog cards, contact details, social links) lives in `client/src/data/site.ts` — edit content there, not in the components.

---

## 11. Conventions and rules (for developers and agents)

1. **Run commands from the repo root**, using workspaces (`npm run <script> -w server|client`). Install packages with `npm install <pkg> -w client` (or `-w server`).
2. **Server is ESM + `NodeNext`:** relative imports must end in `.js` (`import { env } from "../config/env.js"`), even in `.ts` files.
3. **Validate every request body** with a Zod schema via `validateBody(schema)`; throw `ApiError` (`ApiError.notFound()`, `.conflict()`, …) from services.
4. **Keep client and server Zod schemas in sync** — auth schemas are duplicated in `server/src/modules/auth/auth.schema.ts` and `client/src/features/auth/schemas.ts`.
5. New back-end features → `server/src/modules/<feature>/` with routes/controller/service; mount the router in `app.ts` **before** `app.use("/api", notFound)`.
6. New front-end features → `client/src/features/<feature>/` (api.ts, hooks.ts, types.ts, components/), route-level components in `pages/`, register routes in `router.tsx`.
7. Use the `@/` alias in the client (`@/components/ui/button`).
8. Never send password hashes to the client; never log secrets; keep `.env` out of git.
9. Use `textContent`-safe rendering (React default). Don't enable raw HTML in Markdown.
10. Mongoose 9: use `returnDocument: "after"` (not `new: true`) in `findOneAndUpdate`.
11. Express 5 wildcard routes use the `"/{*splat}"` syntax.
12. Tailwind v4: theme changes go in `index.css` (`@theme inline`), plugins via `@plugin` — there is no `tailwind.config.js`.
13. **Content honesty:** don't add fabricated statistics ("10,000+ students"), fake testimonials or stock photos presented as real team members. The old site used AI-generated portraits for the founders; they were replaced with real photos supplied by the owner.
14. After changes run `npm run typecheck` (and `npm run build` for bigger changes).

---

## 12. Gotchas

- **MongoDB Atlas free (M0) clusters pause after inactivity.** Symptom: `Could not connect to MongoDB ...` on start. Fix: Atlas → Clusters → `•••` → *Resume*. Network access is `0.0.0.0/0`.
- **npm 11 blocks install scripts** (warnings for `bcrypt`, `esbuild`). Both work without them on this machine (prebuilt binaries); no action needed.
- **TypeScript 7** (native compiler) is used — `tsc` is the binary. Avoid removed options like `baseUrl`; `paths` works without it.
- Original downloaded "jpg" images were actually WebP; all images are now `.webp`.
- A leftover empty `controllers/` folder may exist at the root (Windows/VS Code lock) — safe to delete.
- The repository is **not a git repo yet**. Run `git init` before collaborating; `.gitignore` is already in place.
- The main JS bundle is ~685 kB (Vite warns). Acceptable for now; can be reduced with more code splitting.

---

## 13. Known gaps and roadmap

**Planned next: Admin panel**
- Restrict with `requireAuth` + `requireRole("admin")` (role already exists on users; promote a user by setting `role: "admin"` in MongoDB).
- CRUD for courses (metadata, image upload, publish toggle) and lessons (Markdown editor with live preview using the existing `Markdown` component, reorder lessons).
- Keep `courses.lessons` outline in sync whenever lessons are added/renamed/reordered/deleted.
- Decide the source of truth between Markdown files + seed and DB edits (see §7).

**Other gaps**
- "Certificates on completion" is advertised on the site (hero highlights, auth pages, features) but **no certificate feature exists** — build it or remove the claim.
- Footer contact details (address, phone) are placeholders in `client/src/data/site.ts`.
- Blog cards are static with "Coming soon" — no blog module.
- No automated tests, no CI, no git history.
- No password reset / email verification, no profile editing.
- No quizzes/assignments, no video lessons, no payments.
- Dark-mode tokens are not defined (light theme only).

---

## 14. History of changes (summary)

1. **Analysis** of the original project: Express + EJS + MongoDB with only register/login and a static landing page; several bugs (broken links, raw JSON errors, hard-coded `"secret"` JWT fallback, no unique email, duplicated navbar, hot-linked images).
2. **Rewrite** into the current monorepo: React + Vite + Tailwind client, Express + TypeScript API, proper auth (validation, rate limiting, httpOnly cookie, `/me`, logout), images downloaded locally. (The old code was kept in `legacy/` during the rewrite and later deleted.)
3. **MongoDB Atlas** connected (cluster `Cluster0`, database `solveitly`); auth flow tested end-to-end.
4. **Rebrand**: new owl logo, navy/gold theme, professional landing page redesign, real founder photos (Sanket Chaudhari removed from the team at the owner's request; Piyush's role updated to COO & CFO).
5. **Learning platform**: Course/Lesson/Enrollment models, seed pipeline, 61 written lessons, course catalogue, detail, lesson viewer, progress, dashboard and PDF notes — verified with an automated browser test (register → lesson → complete → next → dashboard → PDF → mobile → 404).
