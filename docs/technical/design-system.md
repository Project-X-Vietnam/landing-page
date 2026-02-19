# PXV Design System

## Context

Project X Vietnam (PXV) brand identity for the landing page. All UI components should follow these guidelines.

## Brand Colors

| Token | CSS Variable | Hex | Usage |
|-------|-------------|-----|-------|
| `primary` | `--primary` | `#0E56FA` | Main brand blue — CTAs, links, active states |
| `secondary` | `--secondary` | `#17CAFA` | Accent cyan — gradients, highlights |
| `pxv-dark` | `--pxv-dark` | `#01001F` | Dark backgrounds, body text |
| `pxv-light` | `--pxv-light` | - | Light backgrounds |
| `accent` | `--accent` | - | Blend of primary + secondary |

## Color Usage in Tailwind

```tsx
// Brand colors
<div className="text-primary bg-pxv-dark border-secondary" />

// With opacity
<div className="bg-primary/10 text-primary/80" />

// Custom CSS (when Tailwind tokens aren't enough)
<div style={{ color: "hsl(var(--primary))" }} />
```

## Typography

| Font | Weight Range | Usage |
|------|-------------|-------|
| SF Pro Display | 400, 500, 700 | Body text, UI elements |
| Plus Jakarta Sans | 300–800 | Headings, emphasis, display text |

```tsx
// Font family classes
<p className="font-primary">SF Pro Display body text</p>
<h1 className="font-sans">Also SF Pro Display (aliased)</h1>
```

## Gradients

```tsx
// Text gradient (primary → accent → secondary)
<span className="gradient-text">Gradient Text</span>

// Subtle text gradient (dark → primary → dark)
<span className="gradient-text-subtle">Subtle Gradient</span>

// Background gradients
<div className="bg-gradient-to-r from-primary to-secondary" />
<div className="bg-gradient-to-br from-pxv-dark via-primary/20 to-pxv-dark" />

// Animated gradient
<div className="animate-gradient-x bg-gradient-to-r from-primary via-accent to-secondary" />
```

## Animations

| Class | Effect | Duration |
|-------|--------|----------|
| `animate-float` | Gentle floating | 6s infinite |
| `animate-float-slow` | Slower floating | 8s infinite |
| `animate-gradient-x` | Horizontal gradient shift | 3s infinite |
| `animate-pulse-glow` | Opacity + scale pulse | 3s infinite |
| `animate-shimmer` | Shimmer text effect | 3s infinite |
| `animate-fade-in-up` | Fade in from below | 0.6s once |

## Shadows

```tsx
<div className="shadow-glow" />    // Primary blue glow
<div className="shadow-glow-lg" /> // Larger glow
<div className="shadow-soft" />    // Subtle elevation
<div className="shadow-soft-lg" /> // More elevation
```

## Spacing Conventions

- Section padding: `py-20 px-6 md:px-8`
- Max content width: `max-w-7xl mx-auto`
- Card padding: `p-6` or `p-8`
- Gap between cards: `gap-6` or `gap-8`
- Navbar height offset: `pt-16` on main content

---
*Created: 2026-02-19*
