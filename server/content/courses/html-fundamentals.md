<!-- lesson: introduction | Introduction to HTML | 10 -->

**HTML** (HyperText Markup Language) describes the **structure and content** of a web page. Browsers read HTML and display headings, paragraphs, images, links and forms. CSS adds style and JavaScript adds behaviour — but everything starts with HTML.

## Elements and tags

An **element** usually has an opening tag, content and a closing tag:

```html
<p>This is a paragraph.</p>
```

Elements can have **attributes** that add information:

```html
<a href="https://solveitly.com" target="_blank">Visit Solveitly</a>
```

Some elements are **void** (no closing tag): `<img>`, `<br>`, `<input>`, `<meta>`.

## The basic HTML document

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, Solveitly!</h1>
    <p>I am learning HTML.</p>
  </body>
</html>
```

| Part | Purpose |
|---|---|
| `<!DOCTYPE html>` | tells the browser this is an HTML5 document |
| `<html lang="en">` | root element; `lang` helps screen readers and search engines |
| `<head>` | metadata: title, character set, links to CSS |
| `<meta name="viewport">` | makes the page display correctly on phones |
| `<body>` | everything visible on the page |

## Creating and opening your page

1. Create a folder and a file called `index.html`.
2. Paste the document above and save.
3. Double-click the file to open it in your browser.

A code editor such as **VS Code** with the *Live Server* extension reloads the page automatically when you save.

## Nesting and indentation

Elements must be properly nested — close inner elements before outer ones:

```html
<p>This is <strong>very</strong> important.</p>   <!-- correct -->
<p>This is <strong>very</p></strong>              <!-- wrong -->
```

## Comments

```html
<!-- This comment is not shown on the page -->
```

## Key takeaways

- HTML gives a page its structure; CSS and JavaScript build on top of it.
- Every page needs a doctype, `<html>`, `<head>` and `<body>`.
- Indent nested elements to keep your code readable.

## Practice

Create an `about.html` page with your name as the main heading and two short paragraphs about your learning goals.

<!-- lesson: text-links-images | Text, Links and Images | 15 -->

## Headings and paragraphs

HTML has six heading levels, from `<h1>` (most important) to `<h6>`:

```html
<h1>Solveitly Courses</h1>
<h2>Programming</h2>
<h3>Python</h3>
<p>Python is a beginner-friendly language used for web, data and AI.</p>
```

Use **one `<h1>` per page** and don't skip levels just to make text smaller — use CSS for size.

## Formatting text

```html
<p>
  <strong>Important</strong> text,
  <em>emphasised</em> text,
  <mark>highlighted</mark> text,
  H<sub>2</sub>O and x<sup>2</sup>.
</p>
<p>First line<br />Second line</p>
<hr />
<blockquote>Learning never exhausts the mind.</blockquote>
<pre><code>console.log("preformatted code");</code></pre>
```

## Links

```html
<!-- link to another site -->
<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">MDN Docs</a>

<!-- link to another page in your site -->
<a href="about.html">About us</a>

<!-- link to a section on the same page -->
<a href="#contact">Jump to contact</a>
<section id="contact">…</section>

<!-- email and phone -->
<a href="mailto:support@solveitly.com">Email us</a>
<a href="tel:+911234567890">Call us</a>
```

Use `rel="noopener noreferrer"` with `target="_blank"` for security.

## Images

```html
<img
  src="images/student.jpg"
  alt="Student learning on a laptop"
  width="600"
  height="400"
  loading="lazy"
/>
```

- `src` — path to the image (relative or absolute URL).
- `alt` — text description for screen readers and when the image fails to load. **Always** include it (use `alt=""` for purely decorative images).
- `width` / `height` — prevent layout jumps while the image loads.
- `loading="lazy"` — load the image only when it scrolls into view.

## Figures with captions

```html
<figure>
  <img src="chart.png" alt="Bar chart of course enrolments" />
  <figcaption>Course enrolments in 2024</figcaption>
</figure>
```

## Relative paths

| Path | Means |
|---|---|
| `photo.jpg` | same folder |
| `images/photo.jpg` | inside the `images` folder |
| `../photo.jpg` | one folder up |
| `/images/photo.jpg` | from the site root |

## Key takeaways

- Use headings in order to describe the page outline.
- `<a href>` creates links; `#id` links jump within a page.
- Every meaningful image needs descriptive `alt` text.

## Practice

Build a "My favourite places" page with three headings, a paragraph and an image for each place, and a navigation list of links that jump to each section.

<!-- lesson: lists-and-tables | Lists and Tables | 15 -->

## Unordered and ordered lists

```html
<h3>Skills</h3>
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<h3>Steps to join</h3>
<ol>
  <li>Create an account</li>
  <li>Choose a course</li>
  <li>Start learning</li>
</ol>
```

Lists can be nested:

```html
<ul>
  <li>Frontend
    <ul>
      <li>HTML</li>
      <li>CSS</li>
    </ul>
  </li>
  <li>Backend</li>
</ul>
```

## Description lists

Good for terms and definitions or key–value data:

```html
<dl>
  <dt>HTML</dt>
  <dd>Structure of a web page</dd>
  <dt>CSS</dt>
  <dd>Presentation and layout</dd>
</dl>
```

Navigation menus are usually built with `<nav>` and a `<ul>` of links.

## Tables

Use tables for **tabular data** (not for page layout):

```html
<table>
  <caption>Course schedule</caption>
  <thead>
    <tr>
      <th scope="col">Course</th>
      <th scope="col">Lessons</th>
      <th scope="col">Level</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTML Fundamentals</td>
      <td>5</td>
      <td>Beginner</td>
    </tr>
    <tr>
      <td>DevOps Tools</td>
      <td>5</td>
      <td>Intermediate</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Total</td>
      <td colspan="2">10 lessons</td>
    </tr>
  </tfoot>
</table>
```

| Element | Meaning |
|---|---|
| `<table>` | the table |
| `<caption>` | title of the table |
| `<thead>`, `<tbody>`, `<tfoot>` | header, body and footer groups |
| `<tr>` | table row |
| `<th>` | header cell (`scope="col"` or `"row"` helps accessibility) |
| `<td>` | data cell |
| `colspan` / `rowspan` | merge cells across columns / rows |

## Key takeaways

- `<ul>` for unordered items, `<ol>` when order matters.
- Tables are for data; use CSS for layout.
- `<th scope>` and `<caption>` make tables accessible.

## Practice

Create a weekly timetable as a table with days as columns and time slots as rows, and use `rowspan` for a lab session that lasts two slots.

<!-- lesson: forms | Forms and Inputs | 15 -->

Forms collect information from users — logins, sign-ups, searches, feedback.

```html
<form action="/register" method="post">
  <label for="name">Full name</label>
  <input id="name" name="name" type="text" required />

  <label for="email">Email</label>
  <input id="email" name="email" type="email" placeholder="you@example.com" required />

  <label for="password">Password</label>
  <input id="password" name="password" type="password" minlength="8" required />

  <button type="submit">Create account</button>
</form>
```

- `action` — where the data is sent; `method` — `get` (data in the URL) or `post` (data in the request body).
- `name` — the key used when the data is submitted.
- `<label for="id">` — connects a label to its input. Clicking the label focuses the input and screen readers announce it.

## Input types

| Type | Use |
|---|---|
| `text`, `email`, `password`, `tel`, `url` | text-based input with built-in validation for email/url |
| `number`, `range` | numbers |
| `date`, `time`, `datetime-local` | date and time pickers |
| `checkbox`, `radio` | choices |
| `file` | file upload |
| `color`, `search`, `hidden` | special purposes |

## Choices

```html
<fieldset>
  <legend>Preferred level</legend>
  <label><input type="radio" name="level" value="beginner" checked /> Beginner</label>
  <label><input type="radio" name="level" value="advanced" /> Advanced</label>
</fieldset>

<label><input type="checkbox" name="newsletter" /> Send me updates</label>

<label for="course">Course</label>
<select id="course" name="course">
  <option value="">Select a course</option>
  <option value="html">HTML Fundamentals</option>
  <option value="css">CSS Styling</option>
</select>

<label for="message">Message</label>
<textarea id="message" name="message" rows="4"></textarea>
```

Radio buttons with the same `name` form a group where only one can be selected.

## Built-in validation

```html
<input type="number" name="age" min="1" max="120" required />
<input type="text" name="pincode" pattern="[0-9]{6}" title="6-digit pincode" />
```

The browser blocks submission and shows a message when the rules fail. Always validate on the **server** too — browser validation can be bypassed.

## Key takeaways

- Every input needs a `name` and a connected `<label>`.
- Choose the most specific input type — it gives better keyboards on mobile and free validation.
- Group related controls with `<fieldset>` and `<legend>`.

## Practice

Build a course feedback form with name, email, a course `<select>`, a 1–5 rating using radio buttons, a comments `<textarea>` and a submit button.

<!-- lesson: semantic-html | Semantic HTML & Accessibility | 15 -->

**Semantic** elements describe the *meaning* of their content, not just how it looks. They help screen readers, search engines and other developers understand your page.

## Page layout elements

```html
<body>
  <header>
    <a href="/" class="logo">Solveitly</a>
    <nav aria-label="Main">
      <ul>
        <li><a href="/courses">Courses</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h1>How to Start Coding</h1>
      <p>Published <time datetime="2024-06-01">1 June 2024</time></p>
      <section>
        <h2>Pick a first language</h2>
        <p>…</p>
      </section>
    </article>

    <aside>
      <h2>Related courses</h2>
    </aside>
  </main>

  <footer>
    <p>&copy; 2024 Solveitly</p>
  </footer>
</body>
```

| Element | Meaning |
|---|---|
| `<header>` | introductory content or site header |
| `<nav>` | a block of navigation links |
| `<main>` | the main content (only one per page) |
| `<article>` | self-contained content (blog post, card) |
| `<section>` | a thematic group with a heading |
| `<aside>` | related, secondary content |
| `<footer>` | footer of the page or section |

Compare `<div class="nav">` with `<nav>` — both look the same, but only `<nav>` tells assistive technology what it is.

## Accessibility (a11y) checklist

- Give every image meaningful `alt` text.
- Use a logical heading order (`h1` → `h2` → `h3`).
- Connect every form input to a `<label>`.
- Use real `<button>` elements for actions and `<a>` for navigation.
- Make sure everything works with the **keyboard** (Tab, Enter, Space).
- Ensure enough **colour contrast** between text and background.
- Set the page language: `<html lang="en">`.

## SEO basics

```html
<head>
  <title>HTML Fundamentals Course | Solveitly</title>
  <meta name="description" content="Learn HTML5 from scratch with hands-on examples." />
</head>
```

Search engines use the title, description, headings and semantic structure to understand and rank your page.

## Validating your HTML

Use the [W3C Markup Validator](https://validator.w3.org/) to find unclosed tags and invalid attributes.

## Key takeaways

- Prefer semantic elements over generic `<div>`s.
- Accessible pages work for everyone — and usually rank better.
- A good title and meta description improve search results.

## Practice

Rebuild your "favourite places" page using `header`, `nav`, `main`, `article` and `footer`, then test it using only the keyboard.
