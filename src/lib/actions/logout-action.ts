'use server';

import { logout } from "@/lib/session";
import { redirect } from "next/navigation";

export async function handleLogout() {
    await logout();
    redirect("/login");
}
