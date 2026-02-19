# Documentation Guide

## Structure

```
docs/
├── CLAUDE.md              # This file — how to navigate docs
├── technical/             # Technical documentation
│   └── (architecture decisions, patterns, guides)
├── features/              # Feature-specific documentation
│   └── (feature specs, requirements)
└── api/                   # API integration documentation
    └── (API contracts, integration notes)
```

## How to Use

### Reading Docs

- Start with this file to understand the structure
- Check `technical/` for architecture and patterns
- Check `features/` for feature specs and requirements
- Check `api/` for API integration details

### Writing Docs

Use this template for new documentation:

```markdown
# [Title]

## Context
[Why this document exists]

## Details
[Technical details, decisions, patterns]

## References
- [Related files, URLs]

---
*Created: YYYY-MM-DD*
```

### Conventions

- One topic per file
- Use descriptive filenames: `data-flow-architecture.md`, not `doc1.md`
- Keep files focused and concise
- Update existing docs rather than creating duplicates
