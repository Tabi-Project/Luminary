# Luminary — Web

The frontend application for the Luminary platform. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework & routing |
| React 19 | UI library |
| TypeScript 5 | Type safety |
| Tailwind CSS v4 | Styling |
| Base UI | Unstyled, accessible component primitives |
| Axios | HTTP client |
| Zod v4 | Schema validation |
| clsx + tailwind-merge | Conditional className composition via `cn()` |

## Folder Structure

```
src/
├── app/                  # Next.js App Router — pages, layouts, and global styles
│   ├── layout.tsx        # Root layout (font, metadata, body wrapper)
│   ├── page.tsx          # Home route
│   └── globals.css       # Global Tailwind entry point
│
├── data/
│   └── endpoints.ts      # Centralised API endpoint map (single source of truth for URLs)
│
├── services/             # One file per domain — wraps API calls with business logic
│   └── auth.service.ts   # Auth-related API calls (login, etc.)
│
├── types/                # Shared TypeScript interfaces and types
│   ├── api.type.ts       # Generic API response shapes (SuccessApiResponse, ErrorApiResponse, Response<T>)
│   ├── button.type.ts    # ButtonProps interface
│   └── form.type.ts      # Form component prop interfaces
│
└── utils/                # Pure, stateless helper functions
    ├── api.ts            # Axios instance + typed wrappers (axiosGet, axiosPost, axiosPatch, axiosDelete)
    ├── cn.ts             # className utility (clsx + twMerge)
    ├── date.ts           # Date formatting helpers
    └── string.ts         # String helpers (capitalizeFirstLetter, etc.)

public/
├── icons/                # SVG / icon assets
└── images/               # Static image assets
```

## Paradigms & Conventions

### API Layer

- **`src/data/endpoints.ts`** is the single source of truth for all API paths. Never hardcode a URL anywhere else.
- **`src/utils/api.ts`** provides typed wrappers (`axiosGet`, `axiosPost`, `axiosPatch`, `axiosDelete`) around the shared Axios instance. All HTTP calls go through these — do not use `axios` directly in components or services.
- **`src/services/`** holds one file per domain (e.g. `auth.service.ts`). Services call the utils wrappers and handle response normalisation before returning to the caller.

### Response Types

All API responses are modelled with generics from `src/types/api.type.ts`:

```ts
// Single resource
Response<User>  // → SuccessApiResponse<User> | ErrorApiResponse

// Collection (T[] triggers paginated shape automatically)
Response<User[]>  // → PaginatedSuccessApiResponse<User[]> | ErrorApiResponse
```

### Styling

- Use Tailwind utility classes. Avoid inline styles.
- Compose conditional classes with the `cn()` utility from `src/utils/cn.ts`, never with raw string concatenation.
- Base UI provides unstyled, accessible primitives — style them with Tailwind rather than adding a component library.

### Components

- Co-locate component-specific types in the same file or in `src/types/` if shared.
- Props interfaces extend HTML element attributes where it makes sense (e.g. `ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>`).

### File & Export Conventions

- Filenames: `kebab-case` for files, `PascalCase` for React components, `camelCase` for utilities and services.
- Types/interfaces are in `*.type.ts` files under `src/types/`.
- Prefer named exports over default exports, except for Next.js page/layout files which require default exports.

## Getting Started

From the monorepo root:

```bash
pnpm dev --filter web
```

Or from this directory:

```bash
pnpm dev
```

The app runs on [http://localhost:3000](http://localhost:3000) by default.

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for the backend API (defaults to `https://localhost:3001/api/v1`) |
