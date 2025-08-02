# Wolfgang Wallace - Interactive Band Website

An immersive Next.js website for the band Wolfgang Wallace, featuring storytelling elements, interactive mysteries, and hidden collectible systems.

## 🎵 Features

### Core Website

- **Band Information**: Detailed member profiles with dark fictional backstories
- **Lore Pages**: Multi-act narrative telling the Wolfgang Wallace story
- **Mystery Section**: Interactive puzzles and ciphers to solve
- **RPG Chat**: AI-powered text adventure using OpenAI integration
- **Music Integration**: Embedded Spotify player and lyrical content

### Interactive Systems

#### 🕵️ Mystery Progression

Complete a multi-stage mystery that unlocks special features:

1. **Initial Puzzle**: Decode the "nothing" cipher
2. **The Void**: Find hidden clickable areas
3. **Bonnie-Clyde Cipher**: Solve the bankruptcy message
4. **The Heist**: Final challenge that unlocks all secret features

#### 👁️ Eye Hunt Scavenger System

After completing the heist, players gain access to:

- **20 Hidden Eyes** scattered across the site
- **Tiered Reward System** (1, 5, 10, 20 eyes unlock different content)
- **Progress Tracking** with hints for next unfound eyes
- **Cookie Persistence** to save collection progress

#### 🎮 Secret Features

- **Konami Code**: Enter ↑↑↓↓←→←→BA to invert all images and reveal a special collectible eye
- **Hidden Navigation**: Secret "👁️ HUNT" tab appears for heist completers
- **404 Easter Eggs**: Special content on error pages

## 🛠 Tech Stack

- **Framework**: Next.js 13.0.4 with TypeScript
- **UI**: Material-UI (MUI) v5 with dark theme
- **Styling**: CSS Modules + styled-components + MUI theming
- **Content**: Markdown files and MDX support
- **AI Integration**: OpenAI SDK for RPG chat functionality
- **State Management**: React hooks + cookie storage for persistence
- **Font**: EB Garamond via @next/font

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- OpenAI API key (for RPG functionality)

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd wolfgang-wallace
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
# Create .env.local file
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Development Commands

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run Next.js linting
```

## 📁 Project Structure

```
pages/
├── band/           # Band member information
├── lore/           # Story/narrative content
├── mystery/        # Mystery puzzles and progression
│   ├── bonnie-clyde.tsx    # Cipher puzzle
│   └── the-heist.tsx       # Final challenge
├── rpg/            # AI chat adventure
├── scavenger-hunt/ # Eye collection progress page
└── api/
    └── chat.ts     # OpenAI integration endpoint

components/
├── CollectibleEye.tsx  # Hidden eye collectibles
├── SecretEye.tsx       # Heist completion rewards
├── KonamiCode.tsx      # Secret code handler
└── screens/            # Page-specific components

utils/
├── eyeCollection.ts    # Cookie-based eye tracking
├── eyePlacements.tsx   # Pre-configured eye locations
└── heistStatus.ts      # Completion state management

styles/
├── globals.css
├── ScavengerHunt.module.css
└── [component].module.css
```

## 🎯 Key Features Explained

### Eye Collection System

- Uses `js-cookie` for persistent storage
- 20 unique eyes with individual hints
- Progressive revelation system
- Supports reset functionality

### Mystery Progression

- Multi-stage puzzle system
- State persistence across sessions
- Unlocks advanced site features
- Cryptographic elements and ciphers

### Accessibility

- Keyboard navigation support
- Screen reader friendly
- High contrast dark theme
- Responsive mobile design

## 🤝 Contributing

This is an artistic project for Wolfgang Wallace. Please ensure any contributions maintain the dark, mysterious aesthetic and interactive storytelling elements.

## 📄 License

[Add appropriate license information]

## 🎤 About Wolfgang Wallace

Wolfgang Wallace is a band that creates immersive multimedia experiences combining music with interactive storytelling. This website serves as both a traditional band site and an interactive narrative adventure.
