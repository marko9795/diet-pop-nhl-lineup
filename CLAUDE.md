# Diet Pop NHL Lineup App - Claude Code Guide

## Project Overview

A React TypeScript web application where users organize their favorite diet sodas into NHL-style hockey lineups. Users can assign 25+ pre-loaded diet sodas to 18 positions (4 forward lines + 3 defensive pairs) with visual can representations and brand-accurate colors.

## Tech Stack & Architecture

- **Frontend**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.2
- **Styling**: Tailwind CSS 3.4.17
- **Storage**: localStorage API for persistence
- **Linting**: ESLint with React hooks and TypeScript support

## Project Structure

```
pop-v2/
├── src/
│   ├── App.tsx           # Main application component (self-contained)
│   ├── main.tsx          # React entry point
│   ├── index.css         # Tailwind CSS imports
│   ├── data/             # Pop library data (25+ diet sodas)
│   │   └── pops.ts       # INITIAL_POPS array with brand colors
│   └── types/            # Type definitions
│       └── index.ts      # Position types, Pop interface, Lineup interface
├── package.json          # Dependencies and scripts
├── README.md            # Feature documentation
└── tailwind.config.js   # Tailwind configuration
```

## Key Features Implemented

- ✅ **NHL Lineup System**: 18 positions in hockey formation
- ✅ **Pop Library**: 25+ diet sodas with authentic brand colors
- ✅ **Click-to-Assign**: Interactive position assignment
- ✅ **Visual Design**: 2D can representations with brand styling
- ✅ **Local Storage**: Auto-save functionality
- ✅ **Custom Pop Creation**: User-generated custom pops
- ✅ **Responsive Design**: Works on desktop, tablet, mobile

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

## Important Technical Notes

### Architecture Decision: Self-Contained Component

**CRITICAL**: The main App.tsx is intentionally self-contained with inline types and data to avoid circular import dependencies that were causing blank screen issues. This is a deliberate architectural choice - do not refactor back to modular imports without extensive testing.

### Data Structure

**Positions**: Hockey formation with specific naming convention:
- Forwards: `LW1`, `C1`, `RW1` through `LW4`, `C4`, `RW4`
- Defense: `LD1`, `RD1` through `LD3`, `RD3`

**Pop Interface**:
```typescript
interface Pop {
  id: string;
  name: string;
  brand: string;
  primaryColor: string;    // Hex color for can background
  secondaryColor: string;  // Hex color for branding
  isCustom: boolean;
}
```

### State Management

Simple useState-based state management with:
- `currentLineup`: Tracks pop assignments to positions
- `selectedPop`: Currently selected pop for assignment
- Auto-save to localStorage on lineup changes

## Common Tasks

### Adding New Pops
1. Add to `SAMPLE_POPS` array in App.tsx
2. Include authentic brand colors in hex format
3. Ensure unique ID and proper brand attribution

### Styling Changes
- Primary theme: Dark mode (`bg-gray-900`, `text-white`)
- Brand colors: Use pop's `primaryColor` and `secondaryColor`
- Hockey theme: Gold accents (`text-yellow-400`) for line headers

### Position Management
- 18 total positions in fixed hockey formation
- Click empty position to assign selected pop
- Click filled position to remove pop
- Clear all positions with "Clear Lineup" button

## Debugging Tips

### Blank Screen Issues
If encountering blank screens:
1. Check browser console for errors
2. Verify React is mounting (`console.log` in App.tsx)
3. Avoid complex import chains - keep logic self-contained
4. Test with minimal component first

### Import Dependencies
- **Warning**: This project experienced circular import issues
- Keep critical logic inline in App.tsx
- Test thoroughly before refactoring to modular structure

## Performance Considerations

- Lightweight: Only essential dependencies
- Fast startup: Vite HMR for development
- Efficient rendering: Minimal re-renders with strategic state management
- Small bundle: No heavy UI libraries

## Future Enhancement Areas

- Backend integration for shared lineups
- Advanced statistics and analytics
- Pop trading/sharing features
- Mobile app version
- Multiplayer lineup competitions

## Development History

**Major Issue Resolved**: Circular import dependencies causing blank screens were solved by consolidating logic into self-contained App.tsx component. This architectural decision prioritizes stability over modularity.

## Browser Compatibility

- Modern browsers with ES6+ support
- Mobile-responsive design
- localStorage API required for persistence