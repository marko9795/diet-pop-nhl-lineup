# Diet Pop NHL Lineup App

A web application where users can organize their favorite diet sodas into NHL-style lineups with 4 forward lines and 3 defensive pairs, including the ability to add custom/limited edition pops to their personal library.

## ✨ Features

- **🏒 Full NHL Lineup**: 18 positions (4 forward lines + 3 defensive pairs)
- **🥤 25+ Diet Sodas**: Pre-built database with authentic brand colors and visual designs
- **🎨 Custom Pop Creator**: Add your own limited edition or custom pops with full customization
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **💾 Auto-Save**: Persistent lineup and custom pop data with localStorage
- **🔍 Search & Filter**: Find pops by brand, name, or custom status
- **📊 Live Statistics**: Real-time lineup completion and assignment tracking
- **🎯 Intuitive Interface**: Click-to-assign functionality with modal position selection

## Tech Stack

- **Frontend**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.2
- **Styling**: Tailwind CSS 4.1.13
- **Storage**: localStorage API for persistence

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation & Development

```bash
# Clone the repository
git clone <repository-url>
cd pop-v2

# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:5173 in your browser
```

### Additional Commands

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Run code linting
npm run lint
```

## How to Use

1. **Select a Pop**: Click any diet soda in the Pop Library to select it (highlighted in yellow)
2. **Choose Position**: Click any empty lineup position to open the position selection modal
3. **Assign Pop**: Select the desired position to assign your chosen pop
4. **Manage Lineup**: Click filled positions to remove pops, or use "Clear Lineup" to start over
5. **Create Custom Pops**: Use the custom pop creator to add your own limited editions

## Development & Contributing

### Git Workflow

**IMPORTANT**: All development work must be committed and pushed to git:

```bash
# After making changes
git add .
git commit -m "feat: describe your changes"
git push
```

**Required for**:
- New features and enhancements
- Bug fixes and improvements
- Component additions or modifications
- Refactoring and code cleanup
- Documentation updates

### Development Guidelines

- Run `npm run lint` before committing
- Test thoroughly in development mode
- Follow existing code patterns and conventions
- Update documentation when adding features

For detailed developer guidance, see `CLAUDE.md`.

## Architecture Highlights

- **Modular Component Design**: Separated concerns with reusable React components
- **Centralized State Management**: Comprehensive `useAppState` hook with persistence
- **Type-Safe Development**: Full TypeScript integration with proper type definitions
- **Modern Styling**: Tailwind CSS with responsive design patterns
- **Efficient Build Process**: Vite with Hot Module Replacement for fast development

## Browser Compatibility

- Modern browsers with ES6+ support
- Mobile-responsive design optimized for touch interactions
- localStorage API required for data persistence

## License

MIT License