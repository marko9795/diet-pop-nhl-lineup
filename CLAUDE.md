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
- **3D Graphics**: Three.js 0.180.0 + React-Three-Fiber 9.3.0 + @react-three/drei 10.7.6
- **Design**: Photorealistic WebGL pop cans with advanced PBR materials, HDRI environments, ice rink backgrounds, neon effects
- **Storage**: localStorage API for persistence

### Key Components
- `App.tsx` - Main arena application with 3-tab navigation (Lineup Builder + Collection Browser + Pop Cards)
- `TabNavigation.tsx` - Hockey-themed tab switching interface with 3 tabs
- `PopLibrary.tsx` - **REFACTORED**: Arsenal display using shared usePopFilters hook and FilterControls component
- `CollectionBrowser.tsx` - **REFACTORED**: Full collection view using shared filtering logic (clean grid display)
- `FilterControls.tsx` - **NEW**: Reusable search/filter UI component with optional create button
- `PopCards.tsx` - Dedicated pop inspection tab with dropdown selector and stats display
- `PopStatsCard.tsx` - Detailed pop inspection with photorealistic 3D display
- `PopCan3D.tsx` - **OPTIMIZED**: Streamlined Three.js component (730→142 lines) with useMemo performance optimization
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
- `src/utils/colors.ts` - **NEW**: Shared color utilities with WCAG contrast calculations
- `src/utils/textureGeneration.ts` - **NEW**: Three.js texture creation functions (extracted from PopCan3D)
- `src/utils/geometryGeneration.ts` - **NEW**: Three.js geometry creation functions (LatheGeometry)
- `src/hooks/usePopFilters.ts` - **NEW**: Custom hook for shared filtering logic
- `src/components/FilterControls.tsx` - **NEW**: Reusable search/filter UI component
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
- PopStatsCard display (detailed pop inspection with photorealistic 3D visualization)
- Focus: Examining individual pop details and statistics with immersive 3D experience

### Professional 3D System with LatheGeometry
**MAJOR UPGRADE**: Professional Three.js WebGL 3D pop can using industry-standard LatheGeometry approach

**PopCan3D Component Features**:
- **🏗️ LatheGeometry Foundation**: Authentic 12-point can profile rotated around Y-axis for perfect cylindrical shape
- **🎨 Authentic Can Contours**: Real aluminum can measurements with bottom curve, body, neck taper, and beveled rim
- **🌟 Enhanced Spotlight Lighting**: Professional lighting setup with spotlight + directional lights for metallic highlights
- **🎯 Optimized UV Mapping**: LatheGeometry's native cylindrical UV coordinates for seamless texture wrapping
- **✍️ Simplified Brand Graphics**: Clean, readable labels optimized for cylindrical surface mapping
- **🔄 Interactive Controls**: Smooth orbital rotation with momentum and damping
- **⚡ Performance**: 60fps WebGL rendering with useMemo optimization for geometry and texture creation
- **🔧 Modular Architecture**: Utilities extracted to separate modules for maintainability (730→142 lines)

**Technical Excellence - LatheGeometry Implementation**:
- **Professional Geometry**: Single LatheGeometry created from authentic can profile points (`utils/geometryGeneration.ts`)
- **Industry Best Practices**: Following Three.js forum recommendations for realistic 3D cans
- **Optimized Materials**: MeshStandardMaterial with metalness (0.8) and strategic roughness values
- **Enhanced Lighting**: Spotlight (intensity 1.2) + directional lights for proper metallic surface illumination
- **Modular Architecture**: Texture generation extracted to `utils/textureGeneration.ts` for reusability
- **Performance Optimization**: useMemo hooks prevent unnecessary geometry/texture recreation
- **Authentic Proportions**: Real soda can dimensions (4.83" H × 2.6" D) with proper curves and bevels

**Dependencies & Performance**:
- **Core**: Three.js 0.180.0, @react-three/fiber 9.3.0, @react-three/drei 10.7.6
- **Bundle Impact**: ~1.2MB total (acceptable for photorealistic 3D capability)
- **Performance**: Optimized geometry, texture caching, efficient material systems
- **Compatibility**: Modern browsers with WebGL 1.0+ support

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
**3D Rendering**: Check WebGL support, console for Three.js errors, verify geometry/material setup
**Performance**: Use React DevTools for component analysis, Chrome DevTools for WebGL debugging

## Maintenance Authority

**EXPERT AUTHORITY GRANTED**: Claude Code has full authority to make proactive quality improvements. Act decisively on:

**Immediate Action Required**:
- Components >300 lines → break down
- Code duplication (3+ times) → extract
- Missing type definitions → add proper types
- Import violations → fix TypeScript imports

**Quality Thresholds**:
- Bundle size: <500KB initial, <2MB total (~1.2MB with Three.js - acceptable for photorealistic 3D)
- Load time: <3s on 3G, <1s on WiFi
- Complexity: <10 per function, <4 nesting levels
- 3D Performance: 60fps WebGL rendering with optimized geometry and materials

**Proactive Improvements**:
- Extract components when logical groupings appear
- Centralize repeated functions
- Add error boundaries and loading states
- Improve accessibility (ARIA, keyboard navigation)

## Browser Compatibility

- Modern browsers with ES6+ support
- **WebGL Support**: Required for photorealistic 3D rendering (WebGL 1.0+)
- Mobile-responsive design with touch interactions for 3D controls
- localStorage API required for data persistence

**3D Rendering Requirements**:
- WebGL 1.0+ support (available in all modern browsers 2015+)
- Hardware acceleration enabled for optimal performance
- Supports all major browsers: Chrome, Firefox, Safari, Edge