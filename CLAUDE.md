# CLAUDE.md — Bahamian Lawyer Web Development

This file describes the codebase structure, conventions, and workflows for AI assistants working in this repository.

---

## Project Overview

A static marketing website offering custom web design services for Bahamian lawyers. The site showcases three demo attorney website templates and provides pricing/contact information.

**Business context:**
- Creator: M. Aurelius Higgs (from Kemps Bay, The Bahamas)
- Offering: Custom attorney websites — $1,000 setup, optional $1,500/year maintenance
- Limited to 5 attorney spots at introductory rates
- Contact via WhatsApp: `https://wa.me/66993726882`

---

## Repository Structure

```
bahamian-lawyer-web-development/
├── index.html               # Main marketing/landing page
├── assets/
│   ├── css/
│   │   └── styles.css       # All styles for index.html (CSS variables, layout, animations)
│   ├── js/
│   │   └── main.js          # Vanilla JS for nav, FAQ accordion, modal, scroll animations
│   └── images/
│       ├── hero-photo.jpg   # Full-bleed hero background (Bahamas ocean)
│       ├── demo-clarke.jpg  # Bostwick template thumbnail
│       ├── demo-ferguson.jpeg # Twenty Twenty template thumbnail
│       └── demo-rolle.jpg   # Seymour template thumbnail
├── bostwick/
│   └── demo.html            # Demo: Bostwick, Bostwick & Co (criminal defence / civil litigation)
├── seymour/
│   └── demo.html            # Demo: Seymour Law (commercial & estate law)
└── twentytwenty/
    └── demo.html            # Demo: Twenty Twenty & Associates (modern general practice)
```

**No build system.** No package.json, no bundler, no preprocessors. Open `index.html` directly in a browser — nothing to install or compile.

---

## Technology Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — vanilla CSS with custom properties (no Sass/Less/Tailwind)
- **JavaScript (ES6+)** — vanilla JS, no frameworks
- **Fonts** — Google Fonts (loaded via CDN)
- **Icons** — Lucide Icons (loaded via unpkg CDN in demo files only)
- **Images** — local JPEGs in `assets/images/`; Unsplash URLs used in demo files

---

## Design System (CSS Variables)

All design tokens are defined at the top of `assets/css/styles.css`:

```css
--ink:        #0E0E0E   /* primary dark text */
--cream:      #F7F3EC   /* light background */
--gold:       #B8933E   /* primary accent */
--gold-light: #D4AE6A   /* lighter accent variant */
--slate:      #2C3340   /* dark card/section background */
--muted:      #6B6B6B   /* secondary/muted text */
--serif:      'Playfair Display', Georgia, serif    /* headings */
--sans:       'DM Sans', system-ui, sans-serif      /* body text */
```

When adding new styles, use these variables — do not hardcode hex values that duplicate them.

---

## CSS Conventions

- **Mobile-first** responsive design with breakpoints at `768px` and `1080px`
- **BEM-inspired class names:** descriptive, hyphenated (e.g., `.hero-text`, `.portfolio-card`, `.service-card`)
- **Animation classes:** `.fade-up` elements become visible when `.visible` is added by the IntersectionObserver
- **State classes:** `.open` (nav, FAQ), `.active` (modal), `.hidden` (loading indicator)
- **No utility classes** — avoid adding Tailwind-style single-purpose classes; write semantic CSS
- Section structure in `styles.css` mirrors the visual order of sections in `index.html`

---

## JavaScript Conventions (`assets/js/main.js`)

The file is short (68 lines) and intentionally minimal:

| Feature | Mechanism |
|---|---|
| Mobile nav toggle | `classList.toggle('open')` + `aria-expanded` |
| FAQ accordion | One item open at a time; `closest('.faq-item')` pattern |
| Demo modal | Sets `iframe.src` on open, clears on close; `aria-hidden` toggle |
| Scroll fade-in | `IntersectionObserver` with `threshold: 0.12` |

**Conventions:**
- No third-party libraries in `main.js`
- Keep JS minimal — prefer CSS for visual states where possible
- Always update `aria-*` attributes alongside visual state changes
- Close modal on: backdrop click, Escape key, or cancel button

---

## HTML Conventions

- Semantic sectioning: `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`
- Heading hierarchy respected: one `<h1>` per page, `<h2>` for sections, `<h3>` for cards
- ARIA labels on all interactive elements (buttons, modals, toggles)
- All images have descriptive `alt` text
- External links use `target="_blank" rel="noopener noreferrer"`

---

## Demo Files (`bostwick/demo.html`, `seymour/demo.html`, `twentytwenty/demo.html`)

Each demo is a **self-contained single HTML file** representing a full attorney website. They:
- Include all CSS inline in `<style>` tags within the file
- Load Lucide Icons from unpkg CDN
- Use Unsplash image URLs for photography
- Are displayed in the demo modal iframe on the main site

When editing demo files:
- Keep all styles within the file's `<style>` block — do not reference external stylesheets
- Each demo has its own design identity; do not bleed styles between demos
- Maintain the fictional law firm personas (names, practice areas, bios)

---

## Content Voice & Tone

The main `index.html` uses **second-person voice** ("you", "your") throughout — direct, conversational, no fluff. Avoid passive or institutional phrasing.

Examples:
- Correct: "You get a site that works — and looks like it costs ten times what you paid."
- Avoid: "Clients are provided with a professional web presence."

---

## Git Workflow

- Commit messages are **imperative, descriptive, and specific** (e.g., `Stack footer lines left-aligned`, `Increase nav brand text contrast — bold + darker gold`)
- No conventional commit prefixes (`feat:`, `fix:`) are used in this repo — plain descriptive messages
- Branch names follow the pattern `claude/<description>-<id>` for AI-assisted branches
- No CI/CD — no automated tests or deployment pipelines exist

---

## Common Tasks

### Add a new FAQ item
In `index.html`, find the `.faq-list` section and add:
```html
<div class="faq-item">
  <button class="faq-q" aria-expanded="false">Question text?</button>
  <div class="faq-a"><p>Answer text.</p></div>
</div>
```
No JS changes needed — the existing accordion handler covers all `.faq-q` buttons.

### Add a new demo template
1. Create a new directory (e.g., `newname/`) with `demo.html` inside
2. Add a thumbnail image to `assets/images/`
3. Add a `.portfolio-card` entry in `index.html` pointing to the new demo

### Change pricing or contact details
All pricing and the WhatsApp number are hardcoded in `index.html`. Search for `wa.me` or `$1` to locate them quickly.

### Modify the hero section
The hero background is `assets/images/hero-photo.jpg`. The overlay opacity and gradient are controlled in `styles.css` under `.hero::before`.

---

## What This Repo Does Not Have

- No package manager (no `npm install` needed)
- No build step (no `npm run build`)
- No tests
- No linter or formatter configuration
- No environment variables
- No backend or database
- No CMS

Everything is static HTML/CSS/JS — edit files and open in a browser to preview.
