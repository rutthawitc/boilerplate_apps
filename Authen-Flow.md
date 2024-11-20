# Authentication Flow Documentation

## Overview
This document outlines the authentication flow implemented in the Next.js 15 boilerplate application. The system uses JWT (JSON Web Tokens) for session management with server-side session handling.

## Components and Files

### Core Authentication Files
- `src/lib/session.ts`: Core session management
- `src/components/app-sidebar.tsx`: Client-side session display
- `src/app/(Auth)/*`: Protected routes

## Authentication Flow

### 1. Login Process
1. User submits login credentials
2. Server validates credentials
3. If valid:
   - Creates a new session using `createSession(userData)`
   - Encrypts session data with JWT
   - Sets encrypted session in HTTP-only cookie
4. Redirects to dashboard on success

### 2. Session Management
```typescript
// Session Creation (src/lib/session.ts)
async function createSession(userData: any) {
    const sessionData = {
        user: userData,
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours
    };
    const encryptedSession = await encrypt(sessionData);
    // Set in HTTP-only cookie
}
```

### 3. Protected Routes
- All routes under `src/app/(Auth)/*` are protected
- Server-side session check using `getSession()`
- Redirects to login if no valid session exists
```typescript
// Example Protected Route
export default async function Page() {
    const session = await getSession();
    if (!session) {
        redirect("/");
    }
    // Render protected content
}
```

### 4. Client-Side Session Handling
- AppSidebar receives session data as prop from server component
- Displays user information (name, email, avatar)
- Handles missing session data with fallbacks
```typescript
interface AppSidebarProps {
    session?: any;
}

export function AppSidebar({ session, ...props }: AppSidebarProps) {
    const [userData, setUserData] = useState({
        name: session?.user?.name || "Guest",
        email: (session?.user?.email || "guest@example.com").toLowerCase(),
        avatar: session?.user?.avatar || "/avatars/default.png"
    });
}
```

### 5. Logout Process
```typescript
// Logout (src/lib/session.ts)
export async function logout() {
    (await cookies()).delete("session");
}
```

## Security Features

### JWT Implementation
- Uses `jose` library for JWT operations
- Tokens are signed with HS256 algorithm
- 2-hour expiration time
- Server-side validation of tokens

### Cookie Security
- HTTP-only cookies prevent XSS attacks
- Server-side session validation
- Automatic session cleanup on expiration

### Error Handling
- Fallback values for missing session data
- Graceful handling of invalid/expired sessions
- Automatic redirects to login page

## Protected Resources
1. Dashboard (`/dashboard`)
2. User Management (`/users`)
3. Banned Users (`/banned-users`)
4. Other authenticated routes

## Best Practices Implemented
1. Server-side session validation
2. HTTP-only cookies for session storage
3. JWT for secure session data
4. Protected route grouping
5. Fallback UI states
6. Type safety with TypeScript
7. Secure session expiration handling

## Development Notes
- Session duration: 2 hours
- Default avatar: `/avatars/default.png`
- Protected routes are grouped under `(Auth)` directory
- ESLint configured to handle TypeScript types
