"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/supabase/config";

export async function signIn(formData: FormData) {
  if (!hasSupabaseConfig()) redirect("/login?error=configuração+do+Supabase+pendente");
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/login?error=${encodeURIComponent("Não foi possível entrar. Verifique suas credenciais.")}`);
  redirect("/dashboard");
}
