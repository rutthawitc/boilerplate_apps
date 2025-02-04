// src/lib/routes.ts
/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/login",
    "/register",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */
export const authRoutes = [
    "/login",
    "/register",
];

/**
 * An array of routes that require authentication
 * These routes will redirect unauthenticated users to /login
 * @type {string[]}
 */
export const protectedRoutes = [
    "/dashboard",
    "/settings",
    "/profile",
    "/users"
];

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";