// src/lib/actions/login-action.ts

'use server';

import { z } from 'zod';
import { loginSchema, LoginResponse } from '@/lib/validations/auth'
import { encrypt, createSession } from '@/lib/session'

const testUser = {
    id: "1",
    email: "test@test.com",
    name: "Test User",
    password: "password",
}

export async function login(formData: FormData): Promise<LoginResponse> {
    const rawData = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    try {
        const validatedData = loginSchema.parse(rawData);
        
        // TODO: Add your actual authentication logic here
        // For now, we'll simulate a successful login
        console.log('Login attempt:', validatedData.email);

        // Simulate user lookup
        if (validatedData.email === testUser.email && validatedData.password === testUser.password) {
            const userData = {
                id: testUser.id,
                email: testUser.email,
                name: testUser.name
            };

            await createSession(userData);
            return { success: true };
        }

        return { 
            success: false, 
            errors: [{ field: "general", message: "Invalid email or password" }]
        };
    } catch (error) {
        console.error('Login error:', error);
        if (error instanceof z.ZodError) {
            return { 
                success: false, 
                errors: error.errors.map(err => ({
                    field: err.path[0].toString(),
                    message: err.message
                }))
            };
        }
        return { 
            success: false, 
            errors: [{ field: "general", message: "Login failed" }]
        };
    }
}