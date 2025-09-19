# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React TypeScript web application where users organize their favorite diet sodas into NHL-style hockey lineups with a **stunning vintage 80's hockey arena theme**. Features 25+ diet sodas, 18 hockey positions (4 forward lines + 3 defensive pairs), **realistic 3D metallic pop cans**, and authentic brand colors in a **professional hockey arena atmosphere**.

## Quick Start

### Essential Commands
```bash
npm run dev    # Start development server
npm run build  # Production build + TypeScript check
npm run lint   # Code quality check (required before commits)
```

### Critical Import Requirement
**MUST use `import type` for types** (will cause blank screen otherwise):
```typescript
// ✅ Correct
import type { Position, Pop, Lineup } from './types';

// ❌ Wrong - causes blank screen
import { Position, Pop, Lineup } from './types';
```

## Architecture

### Tech Stack
- **Frontend**: React 19.1.1 + TypeScript + Vite 7.1.2
- **Styling**: Tailwind CSS 4.1.13 with custom vintage 80's hockey theme
- **Design**: 3D metallic pop cans, ice rink backgrounds, neon effects, glassmorphism UI
- **Storage**: localStorage API for persistence

### Key Components
- `App.tsx` - Main arena application with tab navigation (Lineup Builder + Collection Browser)
- `TabNavigation.tsx` - Hockey-themed tab switching interface
- `PopLibrary.tsx` - Arsenal display with search/filter for lineup building
- `CollectionBrowser.tsx` - Full collection view with improved spacing and dropdown selector
- `PopStatsCard.tsx` - Detailed pop inspection with extra-large 3D display
- `LineupCard.tsx` - Hockey formation with 3D position slots
- `PopCan.tsx` - Realistic 3D metallic pop cans with authentic branding
- `PopDropdown.tsx` - Searchable pop selector with hockey styling

### Data Structure
**Hockey Positions**: `1LW`, `1C`, `1RW` through `4LW`, `4C`, `4RW` (forwards) + `1LD`, `1RD` through `3LD`, `3RD` (defense)

**Core Types**:
```typescript
interface Pop {
  id: string; name: string; brand: string;
  primaryColor: string; secondaryColor: string; isCustom: boolean;
}

interface Lineup {
  id: string; name: string;
  positions: Record<Position, string | null>; // position -> popId
  createdAt: Date; updatedAt: Date;
}
```

### File Organization
- `src/types/index.ts` - Centralized type definitions
- `src/data/pops.ts` - 25+ authentic diet sodas with brand colors
- `src/utils/lineup.ts` - Lineup management utilities
- `src/index.css` - Custom 3D effects, animations, arena styling
- `tailwind.config.js` - Vintage hockey color palette (ice-, neon-, hockey- prefixed)

## Development Workflow

### Git Workflow (Mandatory)
**CRITICAL**: All work MUST be committed and pushed immediately. No exceptions.

```bash
# 1. Pre-commit validation (required)
npm run lint && npm run build

# 2. Commit and push
git add . && git commit -m "feat: describe changes" && git push
```

**Commit Types**: `feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `perf:`, `config:`

### Code Quality Standards

**File Size Limits**:
- Components: <200 lines ideal, 300 max
- Functions: <20 lines, <3 nesting levels
- No `any` types without justification

**Required Standards**:
- ✅ `import type` for all type imports
- ✅ ESLint passes without warnings
- ✅ Production build succeeds
- ✅ All components handle error states
- ✅ No console.log in production code

### Styling Guidelines
- **Arena Theme**: Use established Tailwind classes (ice-, neon-, hockey- prefixed)
- **3D Effects**: Leverage existing CSS classes for metallic effects
- **Responsive**: Mobile-first with arena atmosphere maintained
- **Brand Colors**: Authentic brand colors with metallic overlays for realistic pop cans

## Common Tasks

### Adding New Pops
1. Add to `INITIAL_POPS` in `src/data/pops.ts`
2. Include authentic brand colors (hex format)
3. Test visual representation

### Component Development
- Follow vintage 80's hockey aesthetic
- Use existing Tailwind custom classes
- Maintain type safety with proper imports
- Use utility functions from `src/utils/lineup.ts`

### Debugging
**Blank Screen**: Check TypeScript imports use `import type` for types
**TypeScript**: Verify proper default exports and type imports
**Performance**: Use React DevTools for component analysis

## Maintenance Authority

**EXPERT AUTHORITY GRANTED**: Claude Code has full authority to make proactive quality improvements. Act decisively on:

**Immediate Action Required**:
- Components >300 lines → break down
- Code duplication (3+ times) → extract
- Missing type definitions → add proper types
- Import violations → fix TypeScript imports

**Quality Thresholds**:
- Bundle size: <500KB initial, <2MB total
- Load time: <3s on 3G, <1s on WiFi
- Complexity: <10 per function, <4 nesting levels

**Proactive Improvements**:
- Extract components when logical groupings appear
- Centralize repeated functions
- Add error boundaries and loading states
- Improve accessibility (ARIA, keyboard navigation)

## Browser Compatibility

- Modern browsers with ES6+ support
- Mobile-responsive design with touch interactions
- localStorage API required for data persistence