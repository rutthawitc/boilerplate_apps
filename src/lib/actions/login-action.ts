// src/lib/actions/login-action.ts

'use server';

import { z } from 'zod';
import { LoginFormType, pwa_loginSchema, LoginResponse, PWAUserResponse, UserRole, BannedUser } from '@/lib/validations/auth'
import { encrypt, createSession } from '@/lib/session'
import { supabase } from '@/lib/supabase'

async function checkBannedUser(name: string): Promise<BannedUser | null> {
    try {
        const { data, error } = await supabase
            .from('banned_users')
            .select('*')
            .eq('name', name)
            .single();

        if (error && error.code === 'PGRST116') {
            // User not found in banned_users table - this is actually good!
            return null;
        }

        if (error) {
            // Log only real errors, not the "not found" case
            console.error('Error checking banned user:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error in checkBannedUser:', error);
        return null;
    }
}

async function getUserRole(name: string): Promise<UserRole | null> {
    try {
        const { data, error } = await supabase
            .from('pwa_user')
            .select('*')
            .eq('name', name)
            .single();

        if (error && error.code !== 'PGRST116') { // Not found error
            console.error('Error fetching user role:', error);
            return null;
        }

        return data || null;
    } catch (error) {
        console.error('Error in getUserRole:', error);
        return null;
    }
}

async function createNewUser(name: string): Promise<UserRole | null> {
    try {
        const { data, error } = await supabase
            .from('pwa_user')
            .insert([
                {
                    name,
                    role: 'user',
                    status: true,
                    islocked: false
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Error creating new user:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error in createNewUser:', error);
        return null;
    }
}

export async function login(formData: FormData): Promise<LoginResponse> {
    console.log('Raw FormData received:', Object.fromEntries(formData.entries()));
    
    const rawData = {
        username: formData.get("username"),
        pwd: formData.get("pwd"),
    };
    console.log('Parsed raw data:', rawData);

    try {
        const validatedData = pwa_loginSchema.parse(rawData);
        console.log('Validated data:', validatedData);
        
        // Step 1: Authenticate with PWA
        const response = await fetch(`${process.env.PWA_AUTH_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: validatedData.username, pwd: validatedData.pwd }),
        });
        
        const user = await response.json() as PWAUserResponse;
        console.log('User from PWA:', user);

        if (user.status !== 'success') {
            return { 
                success: false, 
                errors: [{ field: "general", message: user.status_desc || 'Login failed' }]
            };
        }

        // Step 2: Get user role from pwa_user table
        let userRole = await getUserRole(user.username.toString());
        
        // If user doesn't exist in pwa_user table
        if (!userRole) {
            // Step 3: Check if user is banned
            const bannedUser = await checkBannedUser(user.username.toString());
            
            if (bannedUser) {
                return { 
                    success: false, 
                    errors: [{ field: "general", message: `Your account is banned. Reason: ${bannedUser.desc}` }]
                };
            }

            // Step 4: Create new user if not banned
            userRole = await createNewUser(user.username.toString());
            
            if (!userRole) {
                return { 
                    success: false, 
                    errors: [{ field: "general", message: "Failed to create user account" }]
                };
            }
        } else {
            // Check existing user status
            if (userRole.islocked) {
                return { 
                    success: false, 
                    errors: [{ field: "general", message: "Your account is locked. Please contact administrator." }]
                };
            }

            if (!userRole.status) {
                return { 
                    success: false, 
                    errors: [{ field: "general", message: "Your account is inactive. Please contact administrator." }]
                };
            }
        }

        // Create session with user data including role
        const userData = {
            id: user.username.toString(),
            username: user.username.toString(),
            name: `${user.firstname} ${user.lastname}`,
            email: user.email,
            position: user.position,
            department: user.dep_name,
            division: user.div_name,
            organization: user.org_name,
            costcenter: user.costcenter,
            ba: user.ba,
            part: user.part,
            area: user.area,
            level: user.level,
            job_name: user.job_name,
            role: userRole.role,
            status: userRole.status,
            islocked: userRole.islocked
        };

        await createSession(userData);
        return { success: true };

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
            errors: [{ field: "general", message: "An unexpected error occurred" }]
        };
    }
}