# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

```bash
npm run dev    # Start development server on http://localhost:3000
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run Next.js linting
```

### Installation

```bash
npm install    # Install dependencies
```

## Architecture Overview

This is a Next.js 13 website for the band Wolfgang Wallace, built with TypeScript and React 18. The site combines band information, storytelling elements, interactive mysteries, and an advanced collectible system.

### Tech Stack

- **Framework**: Next.js 13.0.4 with TypeScript
- **UI**: Material-UI (MUI) v5 with dark theme
- **Styling**: CSS Modules + styled-components + MUI theming
- **Content**: Markdown files and MDX support
- **Font**: EB Garamond via @next/font
- **State Management**: React hooks + js-cookie for persistence
- **AI Integration**: OpenAI SDK for RPG chat functionality

### Key Directories

- `pages/` - Next.js file-based routing
  - `band/` - Band member information with collectible eyes
  - `lore/` - Story/narrative content with hidden collectibles
  - `mystery/` - Interactive mystery progression system
    - `bonnie-clyde.tsx` - Cipher puzzle using money bag emoji (💰) instead of eye
    - `the-heist.tsx` - Final challenge that unlocks advanced features
  - `rpg/` - AI-powered text adventure with collectibles
  - `scavenger-hunt/` - Eye collection progress tracking page
  - `404.tsx` - Custom error page with hidden collectible
  - `api/chat.ts` - Chat API endpoint (uses OpenAI SDK)
- `components/` - Reusable React components
  - `header.tsx` - Main navigation header (shows 👁️ HUNT tab for heist completers)
  - `page.tsx` - Page wrapper component
  - `screens/` - Screen-specific components
  - `CollectibleEye.tsx` - Hidden eye collectible system
  - `SecretEye.tsx` - Heist completion reward component
  - `KonamiCode.tsx` - Secret code handler with image inversion
- `utils/` - Utility functions and data
  - `eyeCollection.ts` - Cookie-based eye tracking system
  - `eyePlacements.tsx` - Pre-configured eye locations and hints
  - `heistStatus.ts` - Mystery completion state management
- `public/assets/` - Text content files (lyrics, stories)
- `images/` - Band photos and album artwork
- `styles/` - CSS modules for each major section
  - `ScavengerHunt.module.css` - Eye hunt progress page styling
  - `CollectibleEye.module.css` - Eye collectible animations

### Interactive Systems

#### Mystery Progression System

The site features a multi-stage mystery that unlocks advanced features:

1. **Initial Phase**: Solve "nothing" cipher on `/mystery`
2. **Void Phase**: Find hidden clickable areas in the darkness
3. **Cipher Phase**: Solve the Bonnie-Clyde bankruptcy cipher
4. **Heist Phase**: Complete the final challenge to unlock all secret features

Completion state is tracked in `utils/heistStatus.ts` using localStorage.

#### Eye Hunt Scavenger System

After completing the heist, users gain access to a comprehensive collectible system:

- **20 Hidden Eyes** strategically placed across all pages
- **Tiered Rewards**: 1, 5, 10, and 20 eye milestones unlock different content
- **Smart Hints**: Progress page shows hints for the next unfound eye
- **Persistent Storage**: Uses js-cookie to maintain collection across sessions
- **Interactive Elements**: Eyes have hover effects, collection animations, and opacity variations

#### Konami Code Easter Egg

Enter ↑↑↓↓←→←→BA to activate:

- Image inversion effect site-wide using CSS filters
- Special collectible eye appears in screen center
- Pulsing indicator in bottom-right corner
- Only available to heist completers

### Important Patterns

1. **Theme**: App uses MUI's dark theme configured in `pages/_app.tsx`
2. **Layout**: Pages use the `Page` component wrapper from `components/page.tsx`
3. **Content**: Markdown content is stored in `.md` files and rendered with react-markdown
4. **Routing**: Standard Next.js file-based routing with index files in each directory
5. **API**: OpenAI integration for RPG chat functionality
6. **Collectibles**: Eye system uses unique IDs and hint text for each placement
7. **State Management**: Combination of React state, localStorage, and cookies for persistence
8. **Conditional Rendering**: Many features are gated behind heist completion status

### Eye Placement Guidelines

When adding new collectible eyes:

1. Use `EyePlacements` from `utils/eyePlacements.tsx`
2. Assign unique `eyeId` and descriptive `hint` text
3. Consider using `hidden` prop for more challenging finds
4. Update `EYE_DATA` array to include in hint system
5. Place strategically to encourage exploration

### Security & Performance Notes

- Cookie usage is minimal and contains no sensitive data
- Eye collection data is client-side only
- OpenAI API key should be stored in `.env.local`
- React components in conversation history are converted to plain text before API calls
- No user authentication or database requirements

### Development Notes

- No testing framework is currently configured
- ESLint uses Next.js defaults (no custom configuration)
- The project features complex interactive state management
- Eye emoji (👁️) is reserved for collectibles; other puzzles use different emojis
- All collectible eyes should only be visible to users who have completed the heist
