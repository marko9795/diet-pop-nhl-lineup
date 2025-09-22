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
- **3D Graphics**: Three.js 0.180.0 + React-Three-Fiber 9.3.0 for photorealistic 3D pop cans
- **Design**: WebGL 3D pop cans with PBR materials, ice rink backgrounds, neon effects, glassmorphism UI
- **Storage**: localStorage API for persistence

### Key Components
- `App.tsx` - Main arena application with 3-tab navigation (Lineup Builder + Collection Browser + Pop Cards)
- `TabNavigation.tsx` - Hockey-themed tab switching interface with 3 tabs
- `PopLibrary.tsx` - Arsenal display with search/filter for lineup building
- `CollectionBrowser.tsx` - Full collection view with improved spacing (clean grid display)
- `PopCards.tsx` - Dedicated pop inspection tab with dropdown selector and stats display
- `PopStatsCard.tsx` - Detailed pop inspection with WebGL/CSS 3D toggle and photorealistic display
- `PopCan3D.tsx` - **NEW**: Photorealistic Three.js pop cans with dynamic textures and PBR materials
- `LineupCard.tsx` - Hockey formation with 3D position slots
- `PopCan.tsx` - CSS-based 3D metallic pop cans with authentic branding (fallback mode)
- `PopDropdown.tsx` - Simple select-based pop selector with retro styling
- `CreatePopModal.tsx` - Custom pop creation modal with live preview and color pickers

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

### 3-Tab Architecture
**Clean separation of functionality across three dedicated tabs:**

**🏒 Lineup Builder Tab**:
- PopLibrary component (arsenal with search/filter and CREATE NEW button)
- LineupCard component (hockey formation with 18 position slots)
- Focus: Building and managing hockey lineups

**🥤 Collection Browser Tab**:
- Clean grid display of all pops (standard + custom)
- Search and brand filtering
- Focus: Browsing the complete collection

**🃏 Pop Cards Tab**:
- PopDropdown selector (simple select-based, reliable across all browsers)
- PopStatsCard display (detailed pop inspection with photorealistic WebGL 3D or CSS fallback)
- 3D Mode Toggle: Switch between WebGL 3D (photorealistic) and CSS 3D (compatible) modes
- Focus: Examining individual pop details and statistics with immersive 3D visualization

### Photorealistic 3D System
**NEW FEATURE**: Revolutionary Three.js WebGL 3D pop can visualization

**PopCan3D Component Features**:
- **Realistic Cylindrical Geometry**: Proper 3D cylinder with metallic proportions
- **Dynamic Texture Generation**: Canvas-based textures from pop brand colors and data
- **PBR Materials**: Physically-based rendering with metallic properties and reflections
- **Interactive Controls**: Smooth orbital rotation with momentum and damping
- **Professional Lighting**: Multi-light setup (ambient, directional, point lights)
- **Performance**: 60fps WebGL rendering with optimized geometry and materials

**Progressive Enhancement**:
- **WebGL Detection**: Automatic feature detection with graceful fallback
- **User Toggle**: Switch between WebGL 3D and CSS 3D modes
- **Cross-Browser**: Works on all modern browsers with WebGL support
- **Mobile Friendly**: Touch-responsive orbital controls

**Technical Implementation**:
- **Dependencies**: Three.js 0.180.0, @react-three/fiber 9.3.0, @react-three/drei 10.7.6
- **Bundle Impact**: +300KB gzipped (acceptable for visual impact)
- **Performance**: Optimized geometry, texture caching, proper cleanup
- **Type Safety**: Full TypeScript integration with @types/three

### Custom Pop Creation
**Feature**: Users can create custom pops via "CREATE NEW" button in PopLibrary (Lineup Builder tab)
- **CreatePopModal.tsx**: Full-featured creation form with live preview
- **Form Fields**: Name, Brand, Description, Caffeine, Calories, Year, Color palette
- **Visual Design**: Color pickers with live 3D pop can preview
- **Persistence**: Custom pops saved to localStorage, integrated with main collection
- **Validation**: Required field checks, automatic custom badge assignment

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
- Bundle size: <500KB initial, <2MB total (Three.js adds ~300KB but acceptable for 3D)
- Load time: <3s on 3G, <1s on WiFi
- Complexity: <10 per function, <4 nesting levels
- 3D Performance: 60fps WebGL rendering, graceful fallback for unsupported browsers

**Proactive Improvements**:
- Extract components when logical groupings appear
- Centralize repeated functions
- Add error boundaries and loading states
- Improve accessibility (ARIA, keyboard navigation)

## Browser Compatibility

- Modern browsers with ES6+ support
- **WebGL Support**: Required for 3D mode (auto-detects and falls back to CSS 3D)
- Mobile-responsive design with touch interactions
- localStorage API required for data persistence

**3D Mode Requirements**:
- WebGL 1.0+ support (available in all modern browsers)
- Hardware acceleration enabled
- Automatic fallback to CSS 3D for unsupported browsers