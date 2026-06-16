# Luminary

**Luminary** is a directory and news platform celebrating women making global impact across fields such as business, science, technology, education, politics, and the arts.

The platform makes the work of women visible, verifiable, and searchable by providing a community-powered directory and curated news feed highlighting women driving change in their communities and industries.

This project was created as part of an **International Women's Day initiative** by **Tabî Project** and **TEE Foundation**.

---

## Overview

Women across Africa and globally are leading businesses, driving scientific breakthroughs, shaping policy, creating art, and building communities. Despite this impact, they remain underrepresented in mainstream recognition platforms and media coverage.

Luminary aims to address this gap by providing a searchable platform that:

- Celebrates women making meaningful impact
- Enables public nominations and self-submissions
- Provides verified profiles with supporting evidence
- Surfaces news stories highlighting women globally

---

## Key Features

### Women's Directory

A searchable and filterable directory of verified profiles highlighting women across multiple fields.

Each profile includes:

- Full name
- Country
- Field(s) of work
- Organisation or initiative
- Biography and achievements
- Links to websites, projects, publications, and social profiles
- Profile photo
- Evidence links verifying the nominee's work

Directory functionality includes:

- Search by **name, field, country, or organisation**
- Filter by **field category, country/region, or year of recognition**
- Sorting by **recently added, alphabetical, or field**

---

### Nomination & Self-Submission System

Luminary allows both third-party nominations and self-submissions.

Submission features include:

- Nominee details
- Nominator details (for third-party nominations)
- Description of impact
- Field category
- Evidence links
- Photo uploads

For third-party nominations, nominees receive an automated email requesting consent before a profile is published.

Submission status workflow:
- Submitted → Outreach Sent → Consent Received → Published / Declined

---

### News Feed

Luminary includes a curated news feed highlighting stories of women making global impact.

News items include:

- Headline
- Source
- Summary
- Image
- External link
- Field tags
- Publication date

Additional features:

- **Daily Spotlight** highlighting one featured story
- **Weekly Roundup** summarizing major stories
- Filters by **field, country, or date**
- Moderated community news submissions

---

### Field Categories

Profiles and news items are organised using a shared category system:

- Business & Entrepreneurship
- Science & Research
- Technology & Engineering
- Arts & Culture
- Activism & Advocacy
- Education & Academia
- Health & Medicine
- Agriculture & Food
- Politics & Governance
- Sport & Fitness
- Media & Journalism
- Finance & Economics

---

## Developer Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) v8+ (`npm install -g pnpm`)

### Monorepo Structure

This project uses **pnpm workspaces** with [Turborepo](https://turbo.build/). The two apps are:

| App | Path | Description |
|-----|------|-------------|
| `web` | `apps/web` | Next.js frontend |
| `server` | `apps/server` | Express.js backend |

### Install all dependencies

From the repo root:

```bash
pnpm install
```

### Run in development

```bash
pnpm dev
```

This starts both apps concurrently via Turborepo.

### Installing new packages

Always run installs from the **repo root** using the `--filter` flag to target a specific app:

```bash
# Add a dependency to the frontend
pnpm add <package> --filter web

# Add a dependency to the backend
pnpm add <package> --filter server

# Add a dev dependency
pnpm add -D <package> --filter web
```

### Environment variables

Each app has its own `.env` file. Copy the example files and fill in your values:

```bash
cp apps/server/.env.example apps/server/.env
```

---

## Technology Stack

**Frontend**
- Next.js 16 (React 19)
- TypeScript
- Tailwind CSS

**Backend**
- Node.js
- Express

**Database & Authentication**
- Supabase (PostgreSQL)

**Search**
- Supabase Full-Text Search

**Email**
- Resend or SendGrid

**Image Storage**
- Cloudinary

**CMS (News Management)**
- Notion API or Strapi

**Hosting**
- Netlify (Frontend)
- Railway or Render (Backend)

---

## Verification Standards

All profiles published on Luminary must meet verification requirements to maintain credibility.

Verification includes:

- At least one evidence link (press coverage, official website, published work, LinkedIn, etc.)
- Editorial review before publication
- Consent confirmation for third-party nominations
- Ability for users to flag inaccurate or outdated information
- Display of a **"Last Verified"** date on each profile

---

## Design Principles

Luminary follows several core UX and accessibility principles:

- **SEO-first page structure**
- **Mobile-first responsive design**
- **Accessible interfaces compliant with WCAG 2.1 AA**
- **Minimum touch target size of 44 × 44 pixels**
- **High color contrast for readability**
- A visual tone that is **celebratory but credible**

---

## Contributing

Contributions are welcome.

Ways to contribute include:

- Submitting nominations
- Reporting incorrect profile information
- Suggesting improvements to the platform
- Contributing to development

Please see the [`CONTRIBUTING.md`](/CONTRIBUTING.md) file for contribution guidelines.

---

## License

This project is part of the **Luminary initiative by the Tabî Project and TEE Foundation**.