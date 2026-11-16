<!-- lesson: how-the-web-works | How the Web Works | 10 -->

Before writing code, it helps to know what happens when you type `solveitly.com` into a browser and press Enter.

## Clients and servers

- A **client** (your browser or phone app) asks for something.
- A **server** (a computer connected to the internet) responds with HTML, CSS, JavaScript, images or data.

## What happens when you open a website

1. **DNS lookup** — the browser asks a DNS server for the IP address of the domain (like a phone book: `solveitly.com → 76.76.21.21`).
2. **Connection** — the browser opens a TCP connection to that IP, secured with **TLS** for HTTPS.
3. **HTTP request** — the browser sends a request such as `GET / HTTP/1.1`.
4. **HTTP response** — the server returns a status code and the HTML.
5. **Rendering** — the browser parses HTML, downloads CSS, JS and images, and paints the page.

## HTTP in a nutshell

A request has a **method**, a **path**, **headers** and sometimes a **body**:

```http
POST /api/auth/login HTTP/1.1
Host: solveitly.com
Content-Type: application/json

{"email": "asha@example.com", "password": "••••••••"}
```

| Method | Meaning |
|---|---|
| `GET` | read data |
| `POST` | create something |
| `PUT` / `PATCH` | update |
| `DELETE` | remove |

| Status | Meaning |
|---|---|
| `200 OK` | success |
| `201 Created` | resource created |
| `301/302` | redirect |
| `400 Bad Request` | invalid input |
| `401 Unauthorized` | not logged in |
| `404 Not Found` | doesn't exist |
| `500 Internal Server Error` | the server crashed |

## Front end vs back end

| Front end (client side) | Back end (server side) |
|---|---|
| HTML, CSS, JavaScript, React | Node.js, Python, Java, PHP |
| What users see and interact with | Business logic, authentication, APIs |
| Runs in the browser | Runs on a server, talks to the database |

A **full-stack developer** works on both.

## Tools you need

- A browser with **DevTools** (Chrome, Edge or Firefox).
- **VS Code** as your editor.
- **Node.js** (LTS) — includes `npm`.
- **Git** for version control.

## Key takeaways

- DNS turns names into IP addresses; HTTP carries requests and responses.
- Status codes tell you whether a request worked.
- The front end runs in the browser; the back end runs on a server.

## Practice

Open DevTools → **Network** tab and reload any website. Find the first HTML request and note its method, status code and the `Content-Type` response header.

<!-- lesson: html-and-css-foundations | HTML & CSS Foundations | 20 -->

HTML gives a page its **structure**; CSS gives it **style and layout**. In this lesson you will build a responsive course card page.

## Page structure

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Courses</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header class="navbar">
      <a href="/" class="logo">Solveitly</a>
      <nav>
        <a href="#courses">Courses</a>
        <a href="#about">About</a>
      </nav>
    </header>

    <main class="container">
      <h1>Explore courses</h1>
      <section id="courses" class="grid">
        <article class="card">
          <h2>HTML Fundamentals</h2>
          <p>Learn the building blocks of the web.</p>
          <a class="btn" href="#">Start learning</a>
        </article>
        <article class="card">
          <h2>CSS Styling</h2>
          <p>Style and lay out modern websites.</p>
          <a class="btn" href="#">Start learning</a>
        </article>
        <article class="card">
          <h2>JavaScript</h2>
          <p>Make your pages interactive.</p>
          <a class="btn" href="#">Start learning</a>
        </article>
      </section>
    </main>
  </body>
</html>
```

## Styling it

```css
*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  color: #121a3d;
  background: #f6f7fb;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #19255e;
}

.navbar a { color: white; text-decoration: none; margin-left: 16px; }
.logo { font-weight: 700; margin-left: 0; }

.container { max-width: 1100px; margin: 0 auto; padding: 32px 16px; }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.card {
  background: white;
  border: 1px solid #e4e7f0;
  border-radius: 16px;
  padding: 24px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgb(0 0 0 / 0.08);
}

.btn {
  display: inline-block;
  padding: 10px 18px;
  border-radius: 8px;
  background: #e3bd4b;
  color: #111a47;
  font-weight: 600;
  text-decoration: none;
}
```

## What you used

- **Semantic HTML** (`header`, `nav`, `main`, `section`, `article`).
- **Flexbox** for the navbar.
- **CSS Grid** with `auto-fit` + `minmax` for responsive cards — no media query needed.
- **Transitions** for a subtle hover effect.

## Key takeaways

- Start with meaningful HTML, then style it.
- Grid and Flexbox handle almost every layout.
- Reuse classes like `.card` and `.btn` across pages.

## Practice

Add a hero section above the cards with a headline, a short paragraph and two buttons, and a footer with three columns that stack on small screens.

> Want more depth? Take the **HTML Fundamentals** and **CSS Styling** courses.

<!-- lesson: javascript-in-the-browser | JavaScript in the Browser | 20 -->

Now let's make the page interactive. We will load course data from JavaScript, render cards dynamically and add a live search.

```html
<input id="search" type="search" placeholder="Search courses…" />
<section id="courses" class="grid"></section>
<script src="app.js" defer></script>
```

## Rendering data

```js
const courses = [
  { title: "HTML Fundamentals", level: "Beginner", lessons: 5 },
  { title: "CSS Styling", level: "Beginner", lessons: 5 },
  { title: "JavaScript Programming", level: "Beginner", lessons: 5 },
  { title: "DevOps Tools", level: "Intermediate", lessons: 5 },
];

const grid = document.querySelector("#courses");
const search = document.querySelector("#search");

function render(list) {
  grid.textContent = "";

  if (list.length === 0) {
    grid.textContent = "No courses match your search.";
    return;
  }

  for (const course of list) {
    const card = document.createElement("article");
    card.className = "card";

    const title = document.createElement("h2");
    title.textContent = course.title;

    const meta = document.createElement("p");
    meta.textContent = `${course.level} · ${course.lessons} lessons`;

    card.append(title, meta);
    grid.append(card);
  }
}

render(courses);
```

## Live search

```js
search.addEventListener("input", () => {
  const term = search.value.trim().toLowerCase();
  const filtered = courses.filter((c) => c.title.toLowerCase().includes(term));
  render(filtered);
});
```

## Saving preferences with localStorage

```js
const themeButton = document.querySelector("#theme");

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem("theme", theme);
}

applyTheme(localStorage.getItem("theme") ?? "light");

themeButton.addEventListener("click", () => {
  applyTheme(document.body.dataset.theme === "light" ? "dark" : "light");
});
```

```css
body[data-theme="dark"] { background: #0b1233; color: #f3f5fb; }
```

## Loading data from an API

In real apps, data comes from a server:

```js
async function loadCourses() {
  const response = await fetch("/api/courses");
  if (!response.ok) throw new Error("Failed to load courses");
  const data = await response.json();
  render(data.courses);
}
```

You will build that `/api/courses` endpoint yourself in the next lesson.

## Key takeaways

- Keep data in arrays/objects and render the UI from it.
- Use `textContent` (not `innerHTML`) when inserting text.
- `localStorage` stores small preferences in the browser.

## Practice

Add filter buttons ("All", "Beginner", "Intermediate") that combine with the search box to filter the courses.

> Want more depth? Take the **JavaScript Programming** course.

<!-- lesson: nodejs-and-express | Backend with Node.js & Express | 25 -->

**Node.js** runs JavaScript outside the browser. **Express** is a minimal framework for building web servers and REST APIs with Node.

## Setting up a project

```bash
mkdir course-api && cd course-api
npm init -y
npm install express
npm install --save-dev nodemon
```

In `package.json` add `"type": "module"` (to use `import`) and a script:

```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon server.js"
  }
}
```

## Your first server

```js
// server.js
import express from "express";

const app = express();
app.use(express.json());           // parse JSON request bodies

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(5000, () => console.log("API running on http://localhost:5000"));
```

Run `npm run dev` and open `http://localhost:5000`.

## A REST API for courses

```js
let courses = [
  { id: 1, title: "HTML Fundamentals", level: "Beginner" },
  { id: 2, title: "CSS Styling", level: "Beginner" },
];
let nextId = 3;

// list
app.get("/api/courses", (req, res) => {
  res.json({ courses });
});

// read one
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === Number(req.params.id));
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json({ course });
});

// create
app.post("/api/courses", (req, res) => {
  const { title, level = "Beginner" } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });
  const course = { id: nextId++, title, level };
  courses.push(course);
  res.status(201).json({ course });
});

// update
app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === Number(req.params.id));
  if (!course) return res.status(404).json({ message: "Course not found" });
  Object.assign(course, req.body);
  res.json({ course });
});

// delete
app.delete("/api/courses/:id", (req, res) => {
  courses = courses.filter((c) => c.id !== Number(req.params.id));
  res.status(204).end();
});
```

## Middleware

Middleware functions run between the request and your route handler — for logging, authentication, parsing and errors:

```js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();                                     // pass control to the next handler
});

// error handler (four arguments) — keep it last
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});
```

## Testing your API

Use **Postman**, **Thunder Client** (VS Code extension) or `curl`:

```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{"title": "JavaScript"}'
```

## Key takeaways

- Express maps HTTP methods + paths to handler functions.
- Return correct status codes (`201`, `400`, `404`).
- Middleware adds cross-cutting features like logging and error handling.

## Practice

Add a `GET /api/courses?level=Beginner` filter using `req.query.level`, and validate that `level` in `POST` is either "Beginner" or "Intermediate".

<!-- lesson: working-with-databases | Working with a Database | 20 -->

Data stored in a JavaScript array disappears when the server restarts. A **database** keeps it permanently. We will use **MongoDB** with **Mongoose**.

## SQL vs NoSQL

| Relational (SQL) | Document (NoSQL, e.g. MongoDB) |
|---|---|
| Tables with fixed columns | Collections of JSON-like documents |
| Relationships with JOINs | Embed related data or reference by id |
| MySQL, PostgreSQL | MongoDB, Firestore |

## Connecting with Mongoose

```bash
npm install mongoose dotenv
```

```bash
# .env  (never commit this file)
MONGODB_URI=mongodb+srv://user:password@cluster0.example.mongodb.net/courses
```

```js
// db.js
import mongoose from "mongoose";
import "dotenv/config";

export async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");
}
```

A free database is available on **MongoDB Atlas**.

## Defining a model

```js
// models/Course.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    level: { type: String, enum: ["Beginner", "Intermediate"], default: "Beginner" },
    lessons: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true }   // adds createdAt and updatedAt
);

export const Course = mongoose.model("Course", courseSchema);
```

## CRUD with Mongoose

```js
import express from "express";
import { connectDB } from "./db.js";
import { Course } from "./models/Course.js";

const app = express();
app.use(express.json());

app.get("/api/courses", async (req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.json({ courses });
});

app.post("/api/courses", async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ course });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.patch("/api/courses/:id", async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json({ course });
});

app.delete("/api/courses/:id", async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

await connectDB();
app.listen(5000, () => console.log("API on http://localhost:5000"));
```

## Security basics

- Keep secrets in `.env` and add `.env` to `.gitignore`.
- Validate input before saving it.
- Hash passwords with **bcrypt** — never store plain text passwords.

```js
import bcrypt from "bcrypt";
const hash = await bcrypt.hash(password, 12);
const ok = await bcrypt.compare(attempt, hash);
```

## Key takeaways

- Databases make data permanent; Mongoose adds schemas and validation to MongoDB.
- Every handler that touches the database is `async`.
- Secrets live in environment variables.

## Practice

Add a `Lesson` model with `title`, `content` and a `course` reference (`mongoose.Schema.Types.ObjectId`), and an endpoint `GET /api/courses/:id/lessons`.

<!-- lesson: full-stack-project | Project: Full-Stack Notes App | 30 -->

Time to put everything together. You will build a **Notes app**: an Express + MongoDB API and a front end that creates, lists and deletes notes.

## Project structure

```
notes-app/
├── server.js
├── models/Note.js
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── .env
└── package.json
```

## 1. The model

```js
// models/Note.js
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 100 },
    body: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Note = mongoose.model("Note", noteSchema);
```

## 2. The API (and serving the front end)

```js
// server.js
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { Note } from "./models/Note.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));          // serves index.html, app.js, styles.css

app.get("/api/notes", async (req, res) => {
  res.json({ notes: await Note.find().sort({ createdAt: -1 }) });
});

app.post("/api/notes", async (req, res) => {
  const { title, body } = req.body;
  if (!title?.trim()) return res.status(400).json({ message: "Title is required" });
  const note = await Note.create({ title: title.trim(), body });
  res.status(201).json({ note });
});

app.delete("/api/notes/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

await mongoose.connect(process.env.MONGODB_URI);
app.listen(process.env.PORT ?? 3000, () => console.log("Notes app on http://localhost:3000"));
```

## 3. The page

```html
<!-- public/index.html -->
<main class="container">
  <h1>My Notes</h1>
  <form id="note-form">
    <input name="title" placeholder="Title" required />
    <textarea name="body" placeholder="Write something…"></textarea>
    <button type="submit">Add note</button>
  </form>
  <p id="error" role="alert"></p>
  <section id="notes" class="grid"></section>
</main>
<script src="app.js" defer></script>
```

## 4. The front-end logic

```js
// public/app.js
const form = document.querySelector("#note-form");
const list = document.querySelector("#notes");
const errorBox = document.querySelector("#error");

async function api(path, options = {}) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok && res.status !== 204) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? `Request failed (${res.status})`);
  }
  return res.status === 204 ? null : res.json();
}

function renderNotes(notes) {
  list.textContent = "";
  for (const note of notes) {
    const card = document.createElement("article");
    card.className = "card";

    const h2 = document.createElement("h2");
    h2.textContent = note.title;
    const p = document.createElement("p");
    p.textContent = note.body;
    const del = document.createElement("button");
    del.textContent = "Delete";
    del.addEventListener("click", async () => {
      await api(`/api/notes/${note._id}`, { method: "DELETE" });
      loadNotes();
    });

    card.append(h2, p, del);
    list.append(card);
  }
}

async function loadNotes() {
  const { notes } = await api("/api/notes");
  renderNotes(notes);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorBox.textContent = "";
  const data = Object.fromEntries(new FormData(form));
  try {
    await api("/api/notes", { method: "POST", body: JSON.stringify(data) });
    form.reset();
    loadNotes();
  } catch (error) {
    errorBox.textContent = error.message;
  }
});

loadNotes();
```

## 5. Deploying

1. Push the project to **GitHub** (with `.env` in `.gitignore`).
2. Create a free web service on a host such as **Render** or **Railway** and connect the repository.
3. Set the `MONGODB_URI` environment variable in the host's dashboard.
4. Use `npm start` (`node server.js`) as the start command.

## What you built

- A REST API with validation and correct status codes.
- A MongoDB model with timestamps.
- A front end that talks to the API with `fetch`.
- A deployable full-stack app. 🎉

## Next steps

- Add editing (`PATCH /api/notes/:id`).
- Add user accounts so each person sees only their notes.
- Rebuild the front end with **React**.

## Practice

Add a search box that filters notes on the server with `GET /api/notes?q=term` using a case-insensitive regular expression: `Note.find({ title: { $regex: escaped, $options: "i" } })`.

Escape the user's input first so characters like `.` or `*` are treated literally (and can't be used to slow your server down): `const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");`
