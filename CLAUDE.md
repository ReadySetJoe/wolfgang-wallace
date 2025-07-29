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

This is a Next.js 13 website for the band Wolfgang Wallace, built with TypeScript and React 18. The site combines band information, storytelling elements, and interactive features.

### Tech Stack
- **Framework**: Next.js 13.0.4 with TypeScript
- **UI**: Material-UI (MUI) v5 with dark theme
- **Styling**: CSS Modules + styled-components + MUI theming
- **Content**: Markdown files and MDX support
- **Font**: EB Garamond via @next/font

### Key Directories
- `pages/` - Next.js file-based routing
  - `band/` - Band member information
  - `lore/` - Story/narrative content
  - `mystery/` - Mystery elements
  - `rpg/` - RPG-related features
  - `api/chat.ts` - Chat API endpoint (uses OpenAI SDK)
- `components/` - Reusable React components
  - `header.tsx` - Main navigation header
  - `page.tsx` - Page wrapper component
  - `screens/` - Screen-specific components
- `public/assets/` - Text content files (lyrics, stories)
- `images/` - Band photos and album artwork
- `styles/` - CSS modules for each major section

### Important Patterns
1. **Theme**: App uses MUI's dark theme configured in `pages/_app.tsx`
2. **Layout**: Pages use the `Page` component wrapper from `components/page.tsx`
3. **Content**: Markdown content is stored in `.md` files and rendered with react-markdown
4. **Routing**: Standard Next.js file-based routing with index files in each directory
5. **API**: Minimal API usage, mainly for the chat feature in `pages/api/chat.ts`

### Development Notes
- No testing framework is currently configured
- ESLint uses Next.js defaults (no custom configuration)
- The project appears to be actively developed with uncommitted changes in several core files