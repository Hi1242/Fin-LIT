# Financial Education App for Kids

## Overview

This is an interactive financial education application designed to teach children about money management through gamification. The app features avatar selection, learning modules, quizzes, budgeting games, and progress tracking. Built with React, TypeScript, and modern web technologies, it provides an engaging educational experience with a colorful, child-friendly interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Context API with useReducer for global state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions and interactions
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **API Design**: RESTful endpoints with /api prefix
- **Session Management**: Express sessions with PostgreSQL store

### UI Component System
- **Design System**: shadcn/ui with "new-york" style variant
- **Theme**: Neutral base color with custom app colors (coral, turquoise, sunny, mint, bubblegum)
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Built on Radix UI primitives for keyboard navigation and screen reader support

## Key Components

### Educational Modules
- **Avatar Selection**: Character customization for personalized experience
- **Learning Slides**: Interactive content delivery with progress tracking
- **Quiz System**: Knowledge assessment with explanations
- **Budgeting Game**: Hands-on money management simulation
- **Progress Dashboard**: Achievement tracking and badge system

### Data Models
- **Users**: Basic user management with username/password
- **App State**: Comprehensive state including selected avatar, progress tracking, budget simulation, and earned badges
- **Content**: Structured learning materials, quiz questions, budget items, and achievement badges

### Navigation System
- **Bottom Navigation**: Fixed navigation bar for easy access to main sections
- **Screen-based Routing**: Single-page application with component-based screen switching
- **Progress Persistence**: Local storage integration for maintaining user progress

## Data Flow

### State Management Flow
1. Global app state managed through React Context
2. Actions dispatched to update specific state slices
3. Components subscribe to relevant state changes
4. Local storage persistence for progress data

### Learning Flow
1. Avatar selection → Learning modules → Quiz assessment → Budgeting game → Progress review
2. Badge system rewards completion milestones
3. Progress tracking across all educational components

### Data Persistence
- Development: In-memory storage with MemStorage class
- Production: PostgreSQL database with Drizzle ORM migrations
- Client state: Local storage for progress and preferences

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Query for server state
- **UI Framework**: Radix UI primitives, Tailwind CSS, shadcn/ui components
- **Database**: Drizzle ORM, Neon Database serverless PostgreSQL
- **Development**: Vite, TypeScript, ESBuild for production builds
- **Animation**: Framer Motion for interactive animations

### Development Tools
- **Hot Reload**: Vite HMR with runtime error overlay
- **Type Safety**: Strict TypeScript configuration
- **Code Quality**: ESLint integration through Vite
- **Database**: Drizzle Kit for schema migrations and management

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds optimized React bundle to `dist/public`
2. **Backend**: ESBuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Development**: Uses tsx for TypeScript execution and Vite dev server
- **Production**: Node.js serves static files and API endpoints
- **Database**: Environment variable `DATABASE_URL` for PostgreSQL connection

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database (configured for Neon Database)
- Static file serving capability
- Environment variable support for database configuration

### Development Workflow
- `npm run dev`: Start development server with hot reload
- `npm run build`: Create production build
- `npm run start`: Run production server
- `npm run db:push`: Apply database schema changes