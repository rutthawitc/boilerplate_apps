import { supabase } from "./supabase";

export const getUserInfo = async (id: string) => {
  const { data, error } = await supabase
    .from("pwa_user")
    .select("name, role, status, islocked")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};
export const getAllUsers = async () => {
  const { data, error } = await supabase.from("pwa_user").select("*");  
  if (error) {
    throw error;
  }
  return data;
};

export const getUserbyName = async (name: string) => {
  const { data, error } = await supabase
    .from("pwa_user")
    .select("name, role, status, islocked")
    .eq("name", name)
    .single();

  if (error) {
    throw error;
  }

  return data;
};
