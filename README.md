# chandrap12330.github.io

A content-first personal site for AI engineering projects, open-source work, and technical notes. It is built with Next.js, TypeScript, MDX, and static export for GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Content

Add a Markdown/MDX file to one of these directories:

```text
content/projects/
content/open-source/
content/notes/
```

Each file needs front matter at minimum:

```mdx
---
title: Example title
summary: A short, accurate description.
status: In progress
tags: [topic]
---
```

For notes, use `date: YYYY-MM-DD`; for an external source such as a pull request, add `link: https://...`.

## Checks and production build

```bash
npm run lint
npm run build
```

`npm run build` creates the deployable static files in `out/`.

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy-pages.yml` builds and publishes the site whenever `main` is updated.

In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** once. The repository name follows the GitHub user-site convention, so the site will be published at `https://chandrap12330.github.io/`.

## Before publishing

Replace the intentional placeholders on the home page (name presentation, LinkedIn, and resume) only with links and descriptions you want public. Keep project and contribution status accurate as work progresses.
