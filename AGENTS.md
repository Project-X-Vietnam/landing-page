# AGENTS.md

## Common Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15.x | App Router framework |
| React | 19.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.4.x | Utility-first CSS |
| Framer Motion | 12.x | Animations |
| shadcn/ui pattern | - | Component primitives (Radix + CVA) |
| Sonner | 1.7.x | Toast notifications |
| Lucide React | 0.473.x | Icons |

## Architecture

### Project Structure

```
app/                          # Next.js App Router
├── layout.tsx                # Root layout (metadata, GA, Toaster)
├── page.tsx                  # Home/landing page
├── globals.css               # Global styles, CSS vars, animations
├── about/page.tsx            # About page
├── mentors/page.tsx          # Mentors listing
├── partners/page.tsx         # Partners page
├── sfp2026/                  # Summer Fellowship Program 2026
│   ├── layout.tsx
│   └── page.tsx
├── team/page.tsx             # Team page
├── api/lark/                 # Lark API integration
│   ├── submit/route.ts
│   ├── upload/route.ts
│   └── token/route.ts
└── utils/lark.ts             # Lark utilities

components/
├── Navbar.tsx                # Navigation bar (standard + scroll-pill)
├── Header.tsx                # Hero header with countdown
├── Hero.tsx                  # Hero section variant
├── Form.tsx                  # Application form
├── TeamMemberCard.tsx        # Team member display
└── ui/                       # shadcn-style primitives
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    ├── label.tsx
    └── textarea.tsx

lib/
├── utils.ts                  # cn() helper (clsx + tailwind-merge)
├── form-submission.ts        # Form submission logic
└── lark/auth.ts              # Lark authentication
```

### Data Flow

```
API Routes (app/api/) → lib/ utilities → Components → Pages
```

## Component Priority

1. **shadcn/ui primitives** (`components/ui/`) — Button, Card, Input, Label, Textarea
2. **Custom components** (`components/`) — Navbar, Header, Hero, Form
3. **Native HTML** — only when no existing component fits

Import order:
```tsx
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
```

## Design System

### Brand Colors (PXV)

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#0E56FA` | Main brand blue, CTAs, links |
| `secondary` | `#17CAFA` | Accent cyan, gradients |
| `pxv-dark` | `#01001F` | Dark backgrounds |
| `pxv-light` | - | Light backgrounds |
| `accent` | - | Blend of primary + secondary |

### Styling Conventions

- Use Tailwind utility classes; avoid inline styles
- Use `cn()` from `@/lib/utils` for conditional classes
- Use CSS variables via `hsl(var(--token))` for brand colors
- Gradient classes: `gradient-text`, `animate-gradient-x`
- Animation: prefer Framer Motion for scroll/view animations, Tailwind keyframes for simple effects

### Typography

- Primary font: SF Pro Display (body default)
- Secondary font: Plus Jakarta Sans (headings, emphasis)
- Font weights: 300 (light) through 800 (extra bold)

## Reference Examples

| Pattern | Reference File |
|---------|---------------|
| Landing page with sections | `app/page.tsx` |
| Program page with form | `app/sfp2026/page.tsx` |
| Mentors listing | `app/mentors/page.tsx` |
| shadcn Button with CVA | `components/ui/button.tsx` |
| Navbar with scroll behavior | `components/Navbar.tsx` |
| API route handler | `app/api/lark/submit/route.ts` |

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics |
| `LARK_APP_ID` | Lark API integration |
| `LARK_APP_SECRET` | Lark API integration |
