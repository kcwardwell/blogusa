---
title: 'Why Astro for a Blog'
description: 'A few reasons Astro is a good fit for content-heavy sites.'
pubDate: 2026-08-22
tags: ['astro', 'web']
---

A few things stood out while setting this up:

- **Content collections** give frontmatter a schema, so a typo in a date or a missing title fails at build time instead of silently breaking a page.
- **Islands architecture** means a Markdown post ships as plain HTML — no framework runtime — while interactive bits can still be added later as isolated components.
- **File-based routing** keeps the mapping between a URL and the file that produces it obvious, which matters most on the days you haven't touched the repo in months.

None of this is unique to Astro, but having it all together out of the box removes a lot of the boilerplate that usually comes with a "simple" blog.
