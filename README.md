# Next.js 15 Boilerplate

A modern, feature-rich boilerplate for Next.js 15 applications with built-in authentication, responsive UI, and accessibility features.

## Features

- 🔐 **Authentication System**
  - JWT-based authentication
  - Server-side session handling
  - Secure HTTP-only cookies
  - 2-hour session expiration
  - Automatic logout on session expiry

- 🎨 **UI Components**
  - Modern, responsive design
  - Shadcn/ui integration
  - Dark mode support
  - Mobile-friendly sidebar
  - Command palette (⌘K)
  - Toast notifications
  - Loading states

- ♿ **Accessibility**
  - ARIA compliant dialogs
  - Screen reader support
  - Keyboard navigation
  - Focus management
  - Semantic HTML

- 🛠️ **Developer Experience**
  - TypeScript support
  - ESLint configuration
  - Prettier formatting
  - Directory structure
  - Hot reloading
  - Development tools

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nextjs15-boilerplate.git
cd nextjs15-boilerplate
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
pnpm dev
```

Visit `http://localhost:3000` to see your application.

## Project Structure

```
src/
├── app/                    # App router pages
│   ├── (Auth)/            # Protected routes
│   │   ├── dashboard/     # Dashboard page
│   │   ├── users/         # User management
│   │   └── layout.tsx     # Auth layout with session check
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── app-sidebar.tsx   # Main sidebar component
├── lib/                  # Utilities and helpers
│   ├── actions/         # Server actions
│   ├── session.ts      # Session management
│   └── utils.ts        # Utility functions
└── styles/              # Global styles
```

## Authentication Flow

The application uses a custom authentication system with JWT tokens:

1. User logs in with credentials
2. Server validates and generates JWT token
3. Token is stored in HTTP-only cookie
4. Session is validated on protected routes
5. Auto-logout after 2 hours of inactivity

For more details, see `Authen-Flow.md`.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## Environment Variables

Required environment variables:

```env
JWT_SECRET_KEY=your-secret-key
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=your-database-url
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
