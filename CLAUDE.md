# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React TypeScript web application where users organize their favorite diet sodas into NHL-style hockey lineups with a **stunning vintage 80's hockey arena theme**. Users can assign 25+ pre-loaded diet sodas to 18 positions (4 forward lines + 3 defensive pairs) with **realistic 3D metallic pop cans** and authentic brand colors in a **professional hockey arena atmosphere**.

## Tech Stack & Architecture

- **Frontend**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.2
- **Styling**: Tailwind CSS 4.1.13 with extensive **vintage 80's hockey theme**
- **Design**: **3D metallic pop cans**, **ice rink backgrounds**, **neon effects**, **glassmorphism UI**
- **Storage**: localStorage API for persistence
- **Linting**: ESLint with React hooks and TypeScript support

## Architecture Overview

**Vintage 80's Hockey Arena Architecture**: The app features a sophisticated vintage 80's hockey arena theme with professional-grade component architecture and stunning visual effects.

### Key Architectural Features
- **Vintage Design System**: Comprehensive Tailwind config with ice, neon, and hockey-themed colors
- **3D Visual Components**: Realistic metallic pop cans with chrome effects and authentic branding
- **Arena-Style Interface**: Professional scoreboard headers, ice rink backgrounds, and glassmorphism effects
- **Centralized Types**: All type definitions in `src/types/index.ts` with complete position metadata
- **Complete Pop Library**: 25+ authentic diet sodas in `src/data/pops.ts` with brand-accurate colors
- **Utility Functions**: Comprehensive lineup management in `src/utils/lineup.ts`
- **Component State**: Direct localStorage integration within components for optimal performance
- **Responsive Design**: Mobile-first approach with arena atmosphere maintained across devices

## Vintage Hockey Theme Details

### Design System
The app uses a custom Tailwind configuration that creates an authentic vintage 80's hockey arena experience:

**Color Palette**:
- **Ice Colors**: Multiple shades from `ice-50` to `ice-950` for arena atmosphere
- **Neon Effects**: Electric blue (`neon-blue`), cyan (`neon-cyan`), green (`neon-green`) with glow variants
- **Hockey Colors**: Authentic gold (`hockey-gold`), silver (`hockey-silver`), bronze (`hockey-bronze`)
- **Retro Styling**: Classic red (`retro-red`), orange (`retro-orange`), pink (`retro-pink`)

**Visual Effects**:
- **3D Pop Cans**: Realistic metallic styling with chrome gradients and surface reflections
- **Arena Backgrounds**: Ice rink patterns with face-off circles and center ice design
- **Glassmorphism**: Professional hockey card styling with backdrop blur and transparency
- **Animations**: Neon pulse effects, ice shimmer, and 3D pop can transforms

### Component Styling Patterns
- **Hockey Cards**: Glassmorphism backgrounds with subtle borders and professional layouts
- **Position Slots**: Ice rink styling with enhanced hover states and assignment indicators
- **Arena Display**: Professional scoreboard-style headers with vintage typography
- **Command Centers**: Futuristic control interfaces with neon accents and metallic styling

## Development Commands

```bash
# Start development server
npm run dev

# Build for production (includes TypeScript compilation)
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

## Git Workflow

**CRITICAL REQUIREMENT**: All development work MUST be committed and pushed to git immediately after completion. This is non-negotiable for project continuity and collaboration.

### Mandatory Commit Scenarios

**ALWAYS commit and push for**:
- ✅ **New Features**: Any new functionality or capabilities added
- ✅ **Enhancements**: Improvements to existing features or performance
- ✅ **Bug Fixes**: All fixes, no matter how small
- ✅ **Refactoring**: Code restructuring, cleanup, or architectural changes
- ✅ **Component Work**: New components, component modifications, or removals
- ✅ **Data Changes**: Updates to pop library, type definitions, or constants
- ✅ **Styling**: UI improvements, responsive design fixes, theme changes
- ✅ **Configuration**: Build tools, linting rules, package updates
- ✅ **Documentation**: README, CLAUDE.md, code comments, or guides
- ✅ **Testing**: New tests, test fixes, or testing infrastructure

### Pre-Commit Validation

**REQUIRED before every commit**:
```bash
# 1. Run linting (MANDATORY)
npm run lint

# 2. Verify build works
npm run build

# 3. Test in dev mode
npm run dev
# Verify app loads and basic functionality works
```

### Commit Message Patterns

**Use conventional commit format**:
```bash
# Features
git commit -m "feat: add custom pop creation modal"
git commit -m "feat: implement position assignment system"

# Bug fixes
git commit -m "fix: resolve blank screen issue with type imports"
git commit -m "fix: correct position layout spacing"

# Refactoring
git commit -m "refactor: extract components to modular architecture"
git commit -m "refactor: centralize type definitions"

# Documentation
git commit -m "docs: update README with current tech stack"
git commit -m "docs: add TypeScript import guidelines"

# Style/UI
git commit -m "style: improve responsive design for mobile"
git commit -m "style: update brand colors for authentic look"

# Performance
git commit -m "perf: optimize state management with useAppState"
git commit -m "perf: reduce bundle size with lazy loading"

# Configuration
git commit -m "config: update Tailwind to v4.1.13"
git commit -m "config: add ESLint rules for TypeScript"
```

### Complete Git Workflow

```bash
# 1. Pre-commit validation
npm run lint
npm run build  # Verify production build works

# 2. Stage all changes
git add .

# 3. Commit with descriptive message
git commit -m "feat: describe your changes clearly"

# 4. Push immediately (CRITICAL)
git push

# 5. Verify push succeeded
git status
```

### Workflow Enforcement

**This workflow is enforced because**:
- Ensures all work is preserved and shareable
- Maintains project history and accountability
- Enables collaboration and code review
- Prevents loss of work from system issues
- Allows rollback to known working states

**NO EXCEPTIONS**: Even small changes, quick fixes, or "temporary" code must be committed and pushed.

## Critical Technical Notes

### TypeScript Import Requirements

**CRITICAL**: This project uses TypeScript's `verbatimModuleSyntax` setting which requires `import type` for type-only imports. Always use:

```typescript
// ✅ Correct - type-only imports
import type { Position, Pop, Lineup } from './types';

// ❌ Incorrect - will cause blank screen errors
import { Position, Pop, Lineup } from './types';
```

**Why This Matters**: Incorrect import syntax will cause the entire app to render blank with no visible errors in development mode.

### Key Data Structures

**Position System**: Hockey formation with position-first naming convention:
- **Forwards**: `1LW`, `1C`, `1RW` through `4LW`, `4C`, `4RW` (4 lines of 3)
- **Defense**: `1LD`, `1RD` through `3LD`, `3RD` (3 pairs)

**Core Interfaces**:
```typescript
interface Pop {
  id: string;
  name: string;
  brand: string;
  primaryColor: string;    // Hex color for can background
  secondaryColor: string;  // Hex color for branding
  isCustom: boolean;
}

interface Lineup {
  id: string;
  name: string;
  positions: Record<Position, string | null>; // position -> popId
  createdAt: Date;
  updatedAt: Date;
}
```

### State Management Pattern

**Component-Level State**: Direct state management within components using React hooks:
- `App.tsx`: Main application state including currentLineup, selectedPop, and availablePops
- **Lineup Management**: Comprehensive utility functions in `src/utils/lineup.ts`
- **localStorage Integration**: Direct persistence within components for lineup data
- **Pop Assignment**: Position-based assignment system with drag/drop support
- **Custom Pop Creation**: Modal-based creation with brand color customization

### Architecture Components

**Current Architecture**:
- `src/App.tsx` - Main arena application with vintage scoreboard interface
- `src/components/` - Professional arena-themed components:
  - `PopLibrary.tsx` - Arena display case with command center controls and search/filter
  - `LineupCard.tsx` - Vintage hockey card with professional stats and 3D position slots
  - `PositionModal.tsx` - Position selection interface with line organization
  - `PopCan.tsx` - Realistic 3D metallic pop cans with chrome effects and authentic branding
  - `CreateCustomPopModal.tsx` - Custom pop creation with brand color presets
- `src/utils/lineup.ts` - Comprehensive lineup management utilities (201 lines)
- `src/types/index.ts` - Centralized type definitions with position metadata
- `src/data/pops.ts` - Complete pop library with 25+ authentic diet sodas and brand colors
- `src/index.css` - Extensive custom CSS with 3D effects, animations, and arena styling
- `tailwind.config.js` - Custom design system with vintage hockey color palette

## Common Development Tasks

### Adding New Pops
1. Add to `INITIAL_POPS` array in `src/data/pops.ts`
2. Include authentic brand colors in hex format
3. Ensure unique ID and proper brand attribution
4. Test visual representation with brand colors

### Styling Changes
- **Vintage 80's Hockey Arena Theme**: Complete design system in `tailwind.config.js`
- **3D Metallic Effects**: Realistic pop cans with chrome gradients and shine effects
- **Arena Atmosphere**: Ice rink backgrounds, scoreboard styling, and glassmorphism UI
- **Custom Color Palette**: Ice colors, neon effects, hockey gold/silver, retro styling
- **Advanced Animations**: Pop can 3D transforms, neon pulse effects, ice shimmer
- **Brand Colors**: Authentic brand colors with metallic overlays for realistic pop cans

### Component Development
- **Arena Theme Consistency**: Follow vintage 80's hockey aesthetic established in existing components
- **3D Visual Effects**: Use established CSS classes for metallic effects and animations
- **Tailwind Custom Classes**: Leverage custom design system (ice-, neon-, hockey- prefixed classes)
- **Type Safety**: Use proper TypeScript imports with `import type` for types
- **Utility Functions**: Use functions from `src/utils/lineup.ts` for state management

## Debugging Tips

### Blank Screen Issues
If encountering blank screens:
1. Check browser console for errors
2. Verify TypeScript imports use `import type` for types
3. Test imports one by one to isolate breaking changes
4. Verify React is mounting (`console.log` in App.tsx)

### TypeScript Issues
- Always use `import type` for type-only imports
- Check that all components properly export default
- Verify that data files properly export constants

### Performance Considerations
- **Component Architecture**: Modular components with arena theme integration
- **State Updates**: Efficient direct state management with utility functions
- **Bundle Size**: Optimized build (219.68 kB) with minimal dependencies
- **3D Effects**: Hardware-accelerated CSS transforms for smooth animations
- **Development**: Hot Module Replacement (HMR) working smoothly with theme updates

## Architecture Evolution

**Current Status**: Transformed into a stunning vintage 80's hockey arena experience with professional-grade visual design:
- **Vintage Design System**: Comprehensive Tailwind config with ice, neon, and hockey-themed colors
- **3D Metallic Effects**: Realistic pop cans with chrome gradients and authentic branding
- **Arena Atmosphere**: Ice rink backgrounds, scoreboard interfaces, and glassmorphism components
- **Professional Components**: Hockey card layouts, command center controls, and enhanced animations
- **Type Safety**: Proper TypeScript imports with `verbatimModuleSyntax` compliance
- **Performance**: Optimized build with 219.68 kB bundle size and smooth HMR

## Code Quality & Maintenance Authority

**EXPERT AUTHORITY GRANTED**: As Claude Code, you are explicitly empowered and expected to make proactive decisions about code quality, refactoring, and maintenance. Your technical judgment is trusted - act decisively to maintain a clean, maintainable codebase.

### Maintainability is Priority #1

**Core Principle**: A clean, maintainable codebase is always the highest priority. When you see opportunities for improvement, suggest or implement them proactively. Don't wait for permission - your expertise is valued and expected.

### Refactoring Decision Framework

**IMMEDIATE ACTION REQUIRED when you detect**:

#### 🚨 **Critical Refactoring Triggers**
- **File Size**: Any component >300 lines should be broken down
- **Function Complexity**: Functions with >20 lines or >3 levels of nesting
- **Code Duplication**: Identical logic patterns used 3+ times
- **Type Safety Gaps**: Any `any` types or missing type definitions
- **Performance Issues**: Unnecessary re-renders, large bundle sizes
- **Import Violations**: Incorrect TypeScript import syntax

#### ⚠️ **Proactive Improvement Opportunities**
- **Component Extraction**: When logical groupings become apparent
- **Utility Centralization**: Common functions used across multiple files
- **State Optimization**: Inefficient state updates or unnecessary state
- **Styling Consistency**: Mixed styling approaches or repeated patterns
- **Error Handling**: Missing error boundaries or poor error UX
- **Accessibility Gaps**: Missing ARIA labels, keyboard navigation, semantic HTML

### Quality Thresholds & Metrics

**File Size Guidelines**:
- **Components**: <200 lines ideal, 300 lines maximum
- **Hooks**: <150 lines ideal, 200 lines maximum
- **Utilities**: <100 lines ideal, 150 lines maximum
- **Data Files**: No limit, but organize logically

**Complexity Limits**:
- **Cyclomatic Complexity**: <10 per function
- **Nesting Depth**: <4 levels maximum
- **Function Parameters**: <5 parameters ideal
- **Import Count**: <15 imports per file

**Performance Standards**:
- **Bundle Size**: <500KB initial, <2MB total
- **Load Time**: <3s on 3G, <1s on WiFi
- **Render Performance**: <100ms for state updates
- **Memory Usage**: No memory leaks in dev tools

### Proactive Maintenance Actions

**ALWAYS suggest/implement when you see**:

#### 🔧 **Code Structure Improvements**
```typescript
// ❌ Problematic patterns to fix immediately
const MyComponent = () => {
  // 50+ lines of logic mixed with JSX
  // Multiple useEffect hooks doing unrelated things
  // Inline styles instead of Tailwind classes
  // No error handling
}

// ✅ Improved structure to implement
const MyComponent = () => {
  const { state, actions } = useMyComponentLogic();
  return <MyComponentView state={state} actions={actions} />;
}
```

#### 📦 **Architecture Enhancements**
- Extract custom hooks when component logic >30 lines
- Create utility functions for repeated calculations
- Centralize constants and configuration
- Implement proper error boundaries
- Add loading and error states

#### 🎯 **Type Safety Improvements**
- Replace `any` with proper types immediately
- Add missing interface properties
- Create union types for better type safety
- Implement generic types where beneficial

### Expert Judgment Guidelines

**Trust Your Instincts**: If something feels wrong, it probably is. Common indicators:
- Code that's hard to understand on first read
- Repetitive patterns that could be abstracted
- Components doing too many things
- Unclear naming or purpose
- Missing edge case handling

**Proactive Refactoring Windows**:
1. **During Feature Work**: Improve related code you touch
2. **Bug Fixes**: Address underlying causes, not just symptoms
3. **Code Reviews**: Suggest improvements beyond the immediate change
4. **Performance Issues**: Optimize entire code paths, not just hotspots
5. **New Requirements**: Evolve architecture to support future needs

### Maintenance Workflow

**When implementing improvements**:

```bash
# 1. Identify improvement opportunity
# 2. Plan refactoring approach
# 3. Implement incrementally
# 4. Validate with tests and linting
npm run lint
npm run build
npm run dev  # Verify functionality

# 5. Commit with clear message
git commit -m "refactor: extract UserProfile component for better maintainability"
git push
```

### Quality Enforcement Rules

**NON-NEGOTIABLE STANDARDS**:
- ✅ All TypeScript imports must use `import type` for types
- ✅ No `any` types without explicit justification
- ✅ All components must handle error states
- ✅ ESLint must pass without warnings
- ✅ Production build must succeed
- ✅ No console.log statements in production code
- ✅ All functions must have clear, descriptive names
- ✅ Complex logic must be extracted to custom hooks or utilities

### Long-term Vision

**Continuous Improvement**: The codebase should get better with every interaction. Each Claude session should leave the code cleaner, more maintainable, and better structured than it was found.

**Technical Debt Prevention**: Address issues early before they compound. It's always easier to fix problems when they're small.

**Knowledge Transfer**: Document decisions and improvements to help future developers understand the codebase evolution.

**REMEMBER**: You are the expert. When you see opportunities for improvement, act on them. The user trusts your judgment to maintain code quality proactively.

## Browser Compatibility

- Modern browsers with ES6+ support
- Mobile-responsive design
- localStorage API required for persistence