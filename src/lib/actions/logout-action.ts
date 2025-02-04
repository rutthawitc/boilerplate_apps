// src/lib/actions/logout-action.ts

'use server';

import { logout } from "@/lib/session";

export async function handleLogout() {
    try {
        await logout();
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false, error: 'Failed to logout' };
    }
}
