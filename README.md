# G-Scores Frontend

A modern React + TypeScript + Vite application for managing and searching game scores.

## Project Overview

G-Scores is a frontend application built with React 19, TypeScript, and Vite. It provides a user-friendly interface for browsing, searching, and managing game scores with features including:

- **Dashboard**: View game score statistics and analytics with charts
- **Search Scores**: Search and filter game scores with an intuitive search interface
- **Responsive Design**: Built with Tailwind CSS for a modern, responsive UI
- **HTTP Client**: Axios integration for API communication

## Tech Stack

- **React** 19.2.0 - UI framework
- **TypeScript** 5.9.3 - Type-safe JavaScript
- **Vite** 7.2.4 - Fast build tool with HMR
- **Tailwind CSS** 4.1.17 - Utility-first CSS framework
- **Axios** 1.13.2 - HTTP client for API requests
- **React Router** 7.10.1 - Client-side routing
- **Recharts** 3.5.1 - Data visualization library
- **Lucide React** 0.556.0 - Icon library
- **Sonner** 2.0.7 - Toast notifications

## Project Structure

```
src/
├── components/
│   ├── Header.tsx
│   ├── Searchbar.tsx
│   ├── SearchResults.tsx
│   └── Sidebar.tsx
├── pages/
│   ├── Dashboard.tsx
│   └── SearchScores.tsx
├── App.tsx
├── main.tsx
└── assets/
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Linting

Check code quality with ESLint:

```bash
npm run lint
```

## Features

- **Real-time Search**: Search game scores with instant results
- **Dashboard Analytics**: Visual representation of game score data
- **Responsive UI**: Mobile-friendly design with Tailwind CSS
- **Type Safety**: Full TypeScript support for reliable code
- **Modern Stack**: Built with the latest React and Vite technologies

## ESLint Configuration

For production applications, you can enable type-aware lint rules

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
