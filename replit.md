# TechNova - Next Generation Electronics Store

## Overview

TechNova is a futuristic e-commerce platform for cutting-edge electronics, featuring an AI-powered shopping assistant with image analysis capabilities. The application combines a sleek, cyberpunk-inspired design with modern web technologies to create an immersive shopping experience for high-end tech products like smartphones, wearables, audio equipment, and smart home devices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 19 with TypeScript, using Vite as the build tool and development server.

**UI Component Library**: Shadcn/ui components built on Radix UI primitives, providing a comprehensive set of accessible, customizable components (buttons, dialogs, forms, cards, etc.).

**Styling Approach**: 
- Tailwind CSS for utility-first styling
- Custom design system with futuristic aesthetics (neon blues, purples, glass morphism effects)
- Dark theme by default with custom color variables defined in CSS
- Typography using Inter (body), Space Grotesk (display), and JetBrains Mono (code)

**State Management**: 
- React hooks (useState, useEffect) for local component state
- TanStack Query (React Query) for server state management and API caching
- No global state management library (Redux, Zustand) - intentionally keeping state local

**Animation**: Framer Motion for page transitions, hover effects, and micro-interactions.

**Routing**: Single-page application with view-based routing (home, shop, cart views) managed via local state rather than a routing library.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**API Structure**: RESTful API endpoints:
- `/api/chat` - POST endpoint for AI chat interactions with Gemini
- `/api/health` - GET endpoint for health checks and API key verification

**Build System**: Custom build script using esbuild for server bundling and Vite for client bundling, with selective dependency bundling to optimize cold start times.

**Development Setup**: 
- Hot Module Replacement (HMR) via Vite in development
- Custom middleware for serving static files and handling client-side routing fallback
- Development-only features like error overlays and dev banners from Replit plugins

### Data Storage

**Database ORM**: Drizzle ORM configured for PostgreSQL (via Neon serverless).

**Current Implementation**: In-memory storage using a `MemStorage` class for user data. The schema includes user management interfaces, but the primary application data (products, cart) is currently client-side only.

**Schema Location**: Shared schema types in `shared/schema.ts` for type safety across frontend and backend.

**Future Considerations**: Database schema is configured but not actively used for product catalog - products are hardcoded in constants. Migration path exists for moving to persistent storage.

### Authentication & Authorization

**Current State**: Authentication infrastructure is stubbed out (user schema, storage interface) but not actively implemented. The application currently operates without user authentication.

**Prepared Interfaces**: Storage layer includes methods for user creation and retrieval by ID/username, suggesting planned authentication features.

### Design System

**Glass Morphism Effects**: Extensive use of semi-transparent panels with backdrop blur for navigation, cards, and modals.

**Color Palette**:
- Primary: Neon blue (#00f3ff) for CTAs and highlights
- Secondary: Neon purple (#bc13fe) for gradients and accents
- Background: Deep slate/near-black (#020617)
- Glass overlays with 5-15% white opacity

**Layout Patterns**:
- Centered max-width containers (7xl = 1280px)
- Fixed-height product cards (500px) with 60/40 image-to-content ratio
- Floating bottom navigation dock with pill-shaped glass panel
- Responsive grid layouts (1/2/3 columns for mobile/tablet/desktop)

## External Dependencies

### AI Integration

**Google Gemini API**: Primary AI service for chat functionality and image analysis.
- Package: `@google/genai` v1.30.0
- Two model configurations:
  - Standard model for regular queries
  - Thinking model with extended reasoning budget for complex comparisons
- Supports text and image inputs (base64 encoded)
- System prompt configures AI as TechNova product specialist

**API Key Management**: Environment variable `GEMINI_API_KEY` (also accepts `API_KEY`) loaded via `.env.local` file.

### Database

**Neon Serverless PostgreSQL**: Cloud-hosted PostgreSQL database.
- Package: `@neondatabase/serverless` v0.10.4
- Connection via `DATABASE_URL` environment variable
- Serverless architecture for automatic scaling

**ORM**: Drizzle ORM v0.39.1 with Drizzle Kit for migrations.

### UI Component Libraries

**Radix UI**: Unstyled, accessible component primitives (v1.x range for various components including dialogs, dropdowns, tooltips, etc.).

**Framer Motion**: Animation library v12.23.24 for transitions and interactive animations.

**Lucide React**: Icon library v0.554.0 for consistent iconography.

### Development Tools

**Replit-specific plugins**:
- `@replit/vite-plugin-runtime-error-modal` - Runtime error overlay
- `@replit/vite-plugin-cartographer` - Development tooling
- `@replit/vite-plugin-dev-banner` - Development banner (dev-only)

### Form Handling

**React Hook Form**: Form state management with `@hookform/resolvers` for validation.

**Zod**: Schema validation library (`zod` and `drizzle-zod` for database schema validation).

### Utility Libraries

- `clsx` & `tailwind-merge` - Conditional className composition
- `class-variance-authority` - Component variant management
- `date-fns` - Date manipulation
- `nanoid` - Unique ID generation
- `cmdk` - Command menu component

### Build & Deployment

**Production Build**: Two-stage build process:
1. Client build via Vite → `dist/public`
2. Server build via esbuild → `dist/index.cjs`

**Dependency Bundling Strategy**: Selective bundling of frequently-used dependencies (listed in allowlist) to reduce syscall overhead during cold starts. External dependencies remain unbundled.