<!-- lesson: introduction | Introduction to CSS & Selectors | 10 -->

**CSS** (Cascading Style Sheets) controls how HTML looks: colours, fonts, spacing, layout and animation.

## Adding CSS to a page

```html
<!-- 1. External stylesheet (recommended) -->
<link rel="stylesheet" href="styles.css" />

<!-- 2. Internal styles -->
<style>
  h1 { color: navy; }
</style>

<!-- 3. Inline styles (avoid for most cases) -->
<p style="color: gray;">Hello</p>
```

## Anatomy of a rule

```css
selector {
  property: value;
}

h1 {
  color: #19255e;
  font-size: 2.5rem;
  text-align: center;
}
```

## Selectors

```css
p { }                    /* element selector */
.card { }                /* class selector — reusable */
#header { }              /* id selector — unique */
nav a { }                /* descendant: links inside nav */
ul > li { }              /* direct child */
h2 + p { }               /* paragraph right after an h2 */
a:hover { }              /* pseudo-class: mouse over */
li:first-child { }
input:focus { }
p::first-line { }        /* pseudo-element */
input[type="email"] { }  /* attribute selector */
.btn, .link { }          /* group several selectors */
```

## The cascade and specificity

When several rules target the same element, CSS decides which wins by:

1. **Importance** — `!important` beats normal rules (use very rarely).
2. **Specificity** — more specific selectors win:
   inline style > `#id` > `.class`, `:hover`, `[attr]` > `element`.
3. **Source order** — if specificity is equal, the later rule wins.

```css
p { color: black; }          /* specificity 0-0-1 */
.intro { color: green; }     /* 0-1-0 → wins over p */
#welcome { color: purple; }  /* 1-0-0 → wins over .intro */
```

## Inheritance

Some properties (like `color` and `font-family`) are inherited by child elements, so setting them on `body` styles the whole page:

```css
body {
  font-family: "Inter", system-ui, sans-serif;
  color: #1f2937;
  line-height: 1.6;
}
```

## Colours and units

```css
color: navy;                 /* keyword */
color: #19255e;              /* hex */
color: rgb(25 37 94);        /* rgb */
color: rgb(25 37 94 / 50%);  /* with transparency */

font-size: 16px;   /* absolute */
font-size: 1.25rem;/* relative to the root font size — great for accessibility */
width: 50%;        /* relative to the parent */
height: 100vh;     /* 100% of the viewport height */
```

## Key takeaways

- Keep CSS in an external file and style with classes.
- Specificity decides conflicts: id > class > element.
- Prefer `rem` for font sizes.

## Practice

Style a simple article page: set a page font, colour headings with your brand colour, style links differently on hover, and give every `.note` paragraph a light background.

<!-- lesson: box-model | The Box Model | 15 -->

Every element on a page is a rectangular **box** made of four layers:

```
┌──────────────── margin ────────────────┐
│ ┌────────────── border ──────────────┐ │
│ │ ┌──────────── padding ───────────┐ │ │
│ │ │            content             │ │ │
│ │ └────────────────────────────────┘ │ │
│ └────────────────────────────────────┘ │
└────────────────────────────────────────┘
```

| Layer | Purpose |
|---|---|
| content | the text or image |
| padding | space **inside** the border |
| border | the line around the padding |
| margin | space **outside** the border, between elements |

```css
.card {
  width: 300px;
  padding: 24px;
  border: 1px solid #e4e7f0;
  margin: 16px auto;           /* top/bottom 16px, centred horizontally */
  border-radius: 12px;
}
```

## box-sizing

By default `width` sets only the content width, so padding and border are **added** to it (the card above would be 350px wide). Most developers switch to `border-box`, where `width` includes padding and border:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

## Shorthand values

```css
margin: 10px;                 /* all four sides */
margin: 10px 20px;            /* vertical | horizontal */
margin: 10px 20px 30px;       /* top | horizontal | bottom */
margin: 10px 20px 30px 40px;  /* top | right | bottom | left (clockwise) */
```

## Display types

```css
display: block;        /* starts on a new line, takes full width (div, p, h1) */
display: inline;       /* flows with text, ignores width/height (span, a) */
display: inline-block; /* flows inline but respects width/height */
display: none;         /* removed from the layout */
```

## Margin collapsing

Vertical margins between two block elements **collapse** into the larger of the two:
a `margin-bottom: 30px` followed by `margin-top: 20px` gives a gap of 30px, not 50px.

## Overflow

```css
.box {
  height: 150px;
  overflow: auto;   /* add a scrollbar only when needed (hidden, scroll, visible) */
}
```

## Using DevTools

Right-click any element → **Inspect**. The *Computed* tab shows its box model with the exact content, padding, border and margin sizes — the fastest way to debug spacing.

## Key takeaways

- Padding is inside the border, margin is outside.
- Use `box-sizing: border-box` everywhere.
- Inspect the box model in DevTools when spacing looks wrong.

## Practice

Create three pricing cards of equal width with 24px padding, a 1px border, rounded corners and 16px space between them.

<!-- lesson: flexbox | Flexbox Layout | 20 -->

**Flexbox** lays out items in **one dimension** — a row or a column. It is perfect for navbars, toolbars, centring and evenly spaced cards.

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

```css
.container {
  display: flex;
  gap: 16px;
}
```

## Main axis and cross axis

- `flex-direction: row` (default) → main axis is horizontal, cross axis vertical.
- `flex-direction: column` → main axis is vertical.

## Container properties

| Property | Controls | Common values |
|---|---|---|
| `flex-direction` | direction of the main axis | `row`, `column` |
| `justify-content` | alignment on the main axis | `flex-start`, `center`, `space-between`, `space-around`, `space-evenly` |
| `align-items` | alignment on the cross axis | `stretch`, `center`, `flex-start`, `flex-end` |
| `flex-wrap` | allow items to wrap | `nowrap`, `wrap` |
| `gap` | space between items | `16px`, `1rem 2rem` |

## Perfect centring

```css
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

## A navbar

```css
.navbar {
  display: flex;
  justify-content: space-between;   /* logo left, links right */
  align-items: center;
  padding: 0 24px;
  height: 64px;
}

.navbar ul {
  display: flex;
  gap: 24px;
  list-style: none;
}
```

## Item properties

```css
.item {
  flex-grow: 1;     /* take a share of the free space */
  flex-shrink: 1;   /* allow shrinking when space is tight */
  flex-basis: 200px;/* starting size before growing/shrinking */
}

/* shorthand */
.item { flex: 1 1 200px; }
.sidebar { flex: 0 0 250px; }     /* fixed 250px */
.content { flex: 1; }             /* fill the remaining space */

.special { align-self: flex-end; order: -1; }
```

## Responsive cards that wrap

```css
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.cards .card {
  flex: 1 1 260px;   /* at least 260px, grow to fill the row */
}
```

## Key takeaways

- `display: flex` on the parent; items line up along the main axis.
- `justify-content` = main axis, `align-items` = cross axis.
- `flex: 1` makes an item fill the available space.

## Practice

Build a page layout with a fixed 240px sidebar and a flexible content area, and a footer whose three columns wrap onto separate lines on small screens.

<!-- lesson: grid | CSS Grid Layout | 20 -->

**CSS Grid** lays out content in **two dimensions** — rows and columns at the same time. Use it for page layouts, galleries and dashboards.

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;   /* three equal columns */
  gap: 24px;
}
```

The `fr` unit means "one fraction of the free space".

## Defining tracks

```css
grid-template-columns: 200px 1fr;               /* fixed sidebar + flexible content */
grid-template-columns: repeat(4, 1fr);          /* four equal columns */
grid-template-columns: 2fr 1fr;                 /* first column twice as wide */
grid-template-rows: auto 1fr auto;              /* header, content, footer */
```

## Responsive grid without media queries

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
```

The browser fits as many 220px+ columns as possible and stretches them to fill the row — a single line that works from mobile to desktop.

## Placing items

```css
.featured {
  grid-column: 1 / 3;     /* from line 1 to line 3 → spans two columns */
  grid-row: span 2;       /* spans two rows */
}
```

## Named areas

```css
.page {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 64px 1fr 48px;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  min-height: 100vh;
}

.page header  { grid-area: header; }
.page aside   { grid-area: sidebar; }
.page main    { grid-area: main; }
.page footer  { grid-area: footer; }
```

## Alignment

```css
.grid {
  justify-items: center;   /* horizontal alignment inside cells */
  align-items: start;      /* vertical alignment inside cells */
  place-items: center;     /* both at once */
}
```

## Grid or Flexbox?

| Use Grid when… | Use Flexbox when… |
|---|---|
| you need rows **and** columns | items flow in a single row or column |
| the layout defines where items go | the content size drives the layout |
| page layouts, galleries, dashboards | navbars, buttons groups, centring |

They work great together: a grid for the page, flexbox inside each card.

## Key takeaways

- `grid-template-columns` + `gap` handle most layouts.
- `repeat(auto-fit, minmax(…, 1fr))` gives responsive columns for free.
- Named `grid-template-areas` make complex layouts readable.

## Practice

Create a dashboard with a header, a sidebar, four statistic cards in a responsive grid and a footer using `grid-template-areas`.

<!-- lesson: responsive-design | Responsive Design | 15 -->

**Responsive design** makes one website look good on phones, tablets and desktops. Over half of web traffic comes from mobile devices, so this is essential.

## 1. The viewport meta tag

Without this line, phones render the page at desktop width and zoom out:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

## 2. Flexible units and images

```css
.container {
  width: 100%;
  max-width: 1200px;   /* never wider than 1200px */
  margin: 0 auto;
  padding: 0 16px;
}

img {
  max-width: 100%;     /* images shrink with their container */
  height: auto;
}
```

## 3. Media queries

Media queries apply CSS only when a condition is true. A **mobile-first** approach writes the base styles for small screens and adds rules for larger ones:

```css
/* base: mobile — one column */
.cards {
  display: grid;
  gap: 16px;
}

/* tablets and up */
@media (min-width: 768px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
}

/* desktops and up */
@media (min-width: 1024px) {
  .cards { grid-template-columns: repeat(3, 1fr); }
}
```

Common breakpoints: **640px**, **768px**, **1024px**, **1280px** — but choose breakpoints where *your* design starts to look wrong.

## 4. Fluid typography

```css
h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);   /* min, preferred, max */
}
```

## 5. Responsive navigation

```css
.nav-links { display: none; }
.menu-button { display: block; }

@media (min-width: 768px) {
  .nav-links { display: flex; gap: 24px; }
  .menu-button { display: none; }
}
```

## Other useful media features

```css
@media (prefers-color-scheme: dark) {
  body { background: #0b1233; color: #f3f5fb; }
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}

@media print {
  nav, footer { display: none; }
}
```

## Testing

Open DevTools and toggle the **device toolbar** (Ctrl + Shift + M) to preview different screen sizes, then test on a real phone.

## Key takeaways

- Always include the viewport meta tag.
- Design mobile-first and add `min-width` media queries.
- Use `max-width`, `%`, `rem`, `clamp()` and grid/flex for fluid layouts.

## Practice

Make your dashboard from the Grid lesson responsive: one column on phones, two on tablets and the full layout with a sidebar on desktops.
