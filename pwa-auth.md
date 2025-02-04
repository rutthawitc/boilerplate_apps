# PWA Authentication Methods

## Overview
This document provides a step-by-step guide on the authentication methods used in the Next.js 15 boilerplate application, focusing on Progressive Web App (PWA) integration.

## Authentication Steps

### 1. Login Process
- **User Input**: The user enters their login credentials (username and password).
- **Server Validation**: The server validates the credentials against the stored user data.
- **Session Creation**:
  - If credentials are valid, a session is created using the `createSession(userData)` function.
  - The session data is encrypted using JSON Web Tokens (JWT).
  - The encrypted session is stored in an HTTP-only cookie to enhance security.
- **Redirection**: Upon successful login, the user is redirected to the dashboard.

### 2. Session Management
- **Session Creation**:
  - Implemented in `src/lib/session.ts`.
  - Sessions are set to expire after 2 hours.
  - Example:
    ```typescript
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
- **Route Protection**:
  - All routes under `src/app/(Auth)/*` are protected.
  - Server-side session checks are performed using the `getSession()` function.
  - If no valid session exists, users are redirected to the login page.
- **Example**:
  ```typescript
  export default async function Page() {
      const session = await getSession();
      if (!session) {
          redirect("/");
      }
      // Render protected content
  }
  ```

## Conclusion
This document outlines the authentication methods tailored for PWA integration, ensuring secure and efficient user session management in the Next.js 15 boilerplate application.
