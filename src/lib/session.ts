// src/lib/session.ts

import 'server-only';
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SECRET_KEY = process.env.JWT_SECRET_KEYs;

const key = new TextEncoder().encode(SECRET_KEY);

export async function logout() {
    (await cookies()).delete("session");
}

export async function encrypt(payload: any) {
    try {
        const iat = Math.floor(Date.now() / 1000);
        const exp = iat + 2 * 60 * 60; // 2 hours

        return await new SignJWT({ ...payload })
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setExpirationTime(exp)
            .setIssuedAt(iat)
            .setNotBefore(iat)
            .sign(key);
    } catch (error) {
        console.error('Encryption error:', error);
        throw error;
    }
}

export async function decrypt(token: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(token, key, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        console.error('Decrypt error:', error);
        return null;
    }
}

export async function createSession(userData: any) {
    try {
        const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
        const sessionData = {
            user: userData,
            expiresAt: expiresAt.toISOString()
        };

        const encryptedSession = await encrypt(sessionData);

        (await cookies()).set("session", encryptedSession, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: expiresAt
        });

        return sessionData;
    } catch (error) {
        console.error('Create session error:', error);
        return null;
    }
}

export async function getSession() {
    try {
        const sessionCookie = (await cookies()).get("session");
        if (!sessionCookie?.value) return null;

        const session = await decrypt(sessionCookie.value);
        if (!session) return null;

        // Check if session has expired
        if (new Date(session.expiresAt) < new Date()) {
            (await cookies()).delete("session");
            return null;
        }

        return session;
    } catch (error) {
        console.error('Get session error:', error);
        return null;
    }
}
