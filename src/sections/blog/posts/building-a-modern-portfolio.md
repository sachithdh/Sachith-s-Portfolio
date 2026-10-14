---
title: "Building a Modern Portfolio with React & Vite"
date: "2026-09-10"
description: "A deep dive into crafting a performant, visually striking developer portfolio using React 19, Vite, and GSAP animations."
tags: ["react", "vite", "portfolio", "web-dev"]
readTime: "6 min read"
---

# Building a Modern Portfolio with React & Vite

There's a strange irony in being a developer who doesn't have a personal website. We spend our days building digital experiences for others, yet our own corner of the internet is often a barren GitHub profile page. I decided to change that.

## Why Vite?

The tooling landscape has shifted dramatically. Webpack served us well, but Vite's approach — leveraging native ES modules during development and Rollup for production — makes the developer experience remarkably smooth.

```typescript
// vite.config.ts — it really is this simple
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

Cold starts are measured in milliseconds rather than seconds. Hot module replacement is near-instantaneous. The feedback loop between writing code and seeing results has never been tighter.

## The Animation Layer

Static pages feel lifeless. GSAP provides the kinetic energy that transforms a page into an experience. The key is restraint — animation should guide the eye, not distract it.

```typescript
gsap.fromTo(element, 
  { opacity: 0, y: 40 },
  { 
    opacity: 1, 
    y: 0, 
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
    }
  }
);
```

The best animations are the ones users don't consciously notice. They simply feel that the page is *alive*.

## Typography Matters

I settled on a combination of **Oswald** for headers and **Inter** for body text. The contrast between the condensed, bold headers and the clean, readable body creates visual hierarchy without effort.

> Good typography is invisible. Bad typography is everywhere.
> — *Oliver Reichenstein*


## Lessons Learned

1. **Performance is a feature.** Every millisecond of load time matters. Lazy-load images, code-split routes, and keep your bundle lean.
2. **Design for the content.** Start with the words and work outward. The visual design should serve the content, not the other way around.
3. **Ship it.** A portfolio that exists beats a perfect portfolio that doesn't. You can always iterate.

The source is open. Feel free to explore, fork, and make it your own.
