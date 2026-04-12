import { LoginPayload } from '@/app/auth/login/components/useSignIn';
import { RegisterPayload } from '@/app/auth/register/components/useSignUp';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const authServices = {
  async register(payload: RegisterPayload) {
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: payload.fullName,
          username: payload.userName,
        },
      },
    });
    if (error) throw error;
    return data;
  },
  async login(payload: LoginPayload) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    if (error) throw error;
    return data;
  },
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};
