<!-- lesson: introduction | Introduction to JavaScript | 10 -->

**JavaScript** is the programming language of the web. Every modern browser runs it, and with **Node.js** it also runs on servers. It makes pages interactive: menus, form validation, live search, games and full web apps.

## Running JavaScript

- **Browser console** — press F12 → *Console* and type code directly.
- **In a web page**:

```html
<script src="app.js" defer></script>
```

- **With Node.js** — `node app.js` in a terminal.

## Variables

```js
let score = 10;          // can be reassigned
const name = "Asha";     // cannot be reassigned
score = score + 5;

// avoid `var` in modern code — it has confusing scoping rules
```

Use `const` by default and `let` only when the value must change.

## Data types

```js
const age = 21;                 // number
const price = 99.5;             // number (no separate float type)
const course = "JavaScript";    // string
const isActive = true;          // boolean
let nothing = null;             // intentionally empty
let notSet;                     // undefined
const big = 9007199254740993n;  // bigint

console.log(typeof course);     // "string"
```

## Strings and template literals

```js
const first = "Learn";
const message = `${first}, Solve, Grow!`;   // template literal
console.log(message.length);                // 19
console.log(message.toUpperCase());
console.log(message.includes("Solve"));     // true
```

## Operators and comparison

```js
console.log(10 / 3);      // 3.3333…
console.log(10 % 3);      // 1
console.log(2 ** 5);      // 32

console.log(5 == "5");    // true  (loose: converts types)
console.log(5 === "5");   // false (strict: no conversion) — always prefer ===
```

## Conditions and loops

```js
const marks = 78;
if (marks >= 90) {
  console.log("A");
} else if (marks >= 60) {
  console.log("B");
} else {
  console.log("C");
}

const status = marks >= 40 ? "pass" : "fail";   // ternary

for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

## Truthy and falsy

`false`, `0`, `""`, `null`, `undefined` and `NaN` are **falsy**; everything else is truthy.

```js
const username = "";
const display = username || "Guest";   // "Guest"
const count = 0;
const shown = count ?? 10;             // 0 — ?? only replaces null/undefined
```

## Key takeaways

- Use `const` by default, `let` when needed, never `var`.
- Use `===` for comparisons.
- Template literals (`` `${value}` ``) make string building easy.

## Practice

Write a script that converts a number of minutes into hours and minutes, e.g. `135` → `"2 h 15 min"`.

<!-- lesson: functions-and-scope | Functions and Scope | 15 -->

## Declaring functions

```js
// function declaration
function add(a, b) {
  return a + b;
}

// function expression
const multiply = function (a, b) {
  return a * b;
};

// arrow function
const square = (x) => x * x;
const greet = (name = "learner") => `Hello, ${name}!`;

console.log(add(2, 3));      // 5
console.log(square(6));      // 36
console.log(greet());        // Hello, learner!
```

Arrow functions with a single expression return it automatically.

## Parameters

```js
function sum(...numbers) {             // rest parameter
  return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4);                       // 10

function createUser({ name, role = "student" }) {   // destructuring
  return `${name} (${role})`;
}
createUser({ name: "Ravi" });          // "Ravi (student)"
```

## Scope

- **Global scope** — declared outside any function or block.
- **Function scope** — variables inside a function.
- **Block scope** — `let` and `const` inside `{ }` exist only in that block.

```js
const site = "Solveitly";        // global

function show() {
  const page = "Courses";        // function scope
  if (true) {
    const tab = "Popular";       // block scope
    console.log(site, page, tab);
  }
  // console.log(tab);           // ReferenceError
}
```

## Closures

A **closure** is a function that remembers variables from where it was created:

```js
function makeCounter() {
  let count = 0;
  return () => {
    count++;
    return count;
  };
}

const next = makeCounter();
next();   // 1
next();   // 2
```

`count` stays private — only the returned function can change it.

## Higher-order functions and callbacks

Functions can be passed to and returned from other functions:

```js
function repeat(times, action) {
  for (let i = 0; i < times; i++) action(i);
}

repeat(3, (i) => console.log(`Run ${i + 1}`));
```

## Key takeaways

- Arrow functions are short and great for callbacks.
- `let` and `const` are block-scoped.
- Closures let functions keep private state.

## Practice

Write a function `once(fn)` that returns a new function which calls `fn` only the first time and returns the same result on later calls.

<!-- lesson: arrays-and-objects | Arrays and Objects | 20 -->

## Arrays

```js
const courses = ["HTML", "CSS", "JavaScript"];

courses.push("React");          // add to the end
courses.unshift("Git");         // add to the start
const last = courses.pop();     // remove from the end
console.log(courses.length);    // 4
console.log(courses.includes("CSS"));   // true
console.log(courses.indexOf("JavaScript"));
```

## Essential array methods

```js
const marks = [45, 82, 91, 67, 38];

const doubled = marks.map((m) => m * 2);                 // transform each item
const passed = marks.filter((m) => m >= 40);             // keep matching items
const total = marks.reduce((sum, m) => sum + m, 0);      // combine into one value
const firstHigh = marks.find((m) => m > 80);             // 82
const allPassed = marks.every((m) => m >= 40);           // false
const anyFull = marks.some((m) => m === 100);            // false
const sorted = [...marks].sort((a, b) => b - a);         // copy, then sort descending

marks.forEach((m, i) => console.log(i, m));
```

`map`, `filter` and `reduce` return **new** arrays/values and do not change the original — prefer them over manual loops.

## Objects

Objects store related data as **key–value** pairs:

```js
const student = {
  name: "Asha",
  age: 21,
  skills: ["HTML", "CSS"],
  address: { city: "Pune" },
  greet() {
    return `Hi, I'm ${this.name}`;
  },
};

console.log(student.name);            // dot notation
console.log(student["age"]);          // bracket notation
console.log(student.address.city);
console.log(student.phone?.number);   // optional chaining → undefined, no error
student.email = "asha@example.com";   // add a property
delete student.age;                   // remove a property
```

## Destructuring and spread

```js
const { name, skills } = student;
const [firstSkill] = skills;

const updated = { ...student, name: "Asha K" };   // copy with a change
const allSkills = [...skills, "JavaScript"];
```

## Looping over objects

```js
for (const [key, value] of Object.entries({ html: 5, css: 5, js: 5 })) {
  console.log(`${key}: ${value} lessons`);
}
Object.keys(student);     // array of keys
Object.values(student);   // array of values
```

## Arrays of objects — real-world data

```js
const products = [
  { name: "Laptop", price: 55000, inStock: true },
  { name: "Mouse", price: 700, inStock: false },
  { name: "Keyboard", price: 1500, inStock: true },
];

const available = products
  .filter((p) => p.inStock)
  .map((p) => `${p.name} – ₹${p.price}`);

const cartTotal = products.reduce((sum, p) => sum + p.price, 0);
```

## JSON

JSON is the text format used to send data between servers and browsers:

```js
const text = JSON.stringify(student);
const parsed = JSON.parse(text);
```

## Key takeaways

- `map`, `filter`, `reduce`, `find` cover most array work.
- Use destructuring and spread for clean, immutable updates.
- Optional chaining (`?.`) safely reads nested data.

## Practice

Given an array of student objects with `name` and `marks`, print the names of students who scored above the class average, sorted by marks.

<!-- lesson: dom-and-events | The DOM and Events | 20 -->

The **DOM** (Document Object Model) is the browser's tree representation of your HTML. JavaScript can read and change it to update the page without reloading.

```html
<h1 id="title">Hello</h1>
<input id="task" placeholder="New task" />
<button id="add">Add</button>
<ul id="list"></ul>
<script src="app.js" defer></script>
```

## Selecting elements

```js
const title = document.querySelector("#title");        // first match (CSS selector)
const button = document.getElementById("add");
const items = document.querySelectorAll("#list li");   // all matches (NodeList)
```

## Changing content, styles and classes

```js
title.textContent = "My Tasks";              // safe: inserts plain text
title.style.color = "#19255e";
title.classList.add("highlight");
title.classList.toggle("hidden");
title.setAttribute("data-count", "3");
```

Prefer `textContent` over `innerHTML` for user input — `innerHTML` can execute injected HTML (an XSS security risk).

## Creating and removing elements

```js
const li = document.createElement("li");
li.textContent = "Learn the DOM";
document.querySelector("#list").append(li);
li.remove();
```

## Events

```js
button.addEventListener("click", () => {
  console.log("Button clicked");
});
```

Common events: `click`, `input`, `change`, `submit`, `keydown`, `mouseover`, `scroll`, `DOMContentLoaded`.

## Mini project: a to-do list

```js
const input = document.querySelector("#task");
const addButton = document.querySelector("#add");
const list = document.querySelector("#list");

function addTask() {
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  li.textContent = text;

  const del = document.createElement("button");
  del.textContent = "✕";
  del.addEventListener("click", () => li.remove());

  li.append(" ", del);
  list.append(li);
  input.value = "";
  input.focus();
}

addButton.addEventListener("click", addTask);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addTask();
});
```

## The event object and forms

```js
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();                       // stop the page reload
  const data = new FormData(form);
  console.log(data.get("email"));
});
```

## Event delegation

Instead of adding a listener to every item, listen on the parent:

```js
list.addEventListener("click", (event) => {
  if (event.target.matches("li")) {
    event.target.classList.toggle("done");
  }
});
```

## Key takeaways

- `querySelector` finds elements with CSS selectors.
- `addEventListener` reacts to user actions.
- Use `textContent` for text and event delegation for dynamic lists.

## Practice

Extend the to-do list so clicking a task toggles a `done` class and the tasks are saved to `localStorage` so they survive a page reload.

<!-- lesson: async-javascript | Asynchronous JavaScript | 20 -->

JavaScript runs on a **single thread**. Slow work — network requests, timers, reading files — happens **asynchronously** so the page stays responsive.

## Callbacks and timers

```js
console.log("1");
setTimeout(() => console.log("2 (after 1 second)"), 1000);
console.log("3");
// Output: 1, 3, 2
```

The **event loop** runs the callback only after the current code has finished.

## Promises

A **Promise** represents a value that will be available later. It is *pending*, then either *fulfilled* or *rejected*.

```js
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

wait(500)
  .then(() => console.log("Half a second later"))
  .catch((error) => console.error(error));
```

## Fetching data from an API

```js
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then((users) => console.log(users.map((u) => u.name)))
  .catch((error) => console.error("Request failed:", error));
```

## async / await

`async`/`await` lets you write asynchronous code that reads like normal code:

```js
async function loadUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const users = await response.json();
    return users.map((u) => u.name);
  } catch (error) {
    console.error("Could not load users:", error.message);
    return [];
  }
}

loadUsers().then((names) => console.log(names));
```

## Running requests in parallel

```js
const [users, posts] = await Promise.all([
  fetch("/api/users").then((r) => r.json()),
  fetch("/api/posts").then((r) => r.json()),
]);
```

`Promise.all` waits for all promises and fails fast if any one fails; `Promise.allSettled` waits for all and reports each result.

## Sending data

```js
await fetch("/api/feedback", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ course: "javascript", rating: 5 }),
});
```

## Showing results on the page

```js
async function showUsers() {
  const list = document.querySelector("#users");
  list.textContent = "Loading…";
  const names = await loadUsers();
  list.textContent = "";
  for (const name of names) {
    const li = document.createElement("li");
    li.textContent = name;
    list.append(li);
  }
}
```

## Key takeaways

- Asynchronous code keeps the UI responsive.
- `fetch` returns a promise; check `response.ok` before using the data.
- Use `async`/`await` with `try`/`catch` for readable, safe async code.

## Practice

Build a small "GitHub profile finder": an input and button that fetch `https://api.github.com/users/<username>` and display the avatar, name and public repo count, with a friendly message when the user is not found.
