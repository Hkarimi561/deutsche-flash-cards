import { Injectable } from '@angular/core';
import {AuthChangeEvent, AuthSession, createClient, Session, SupabaseClient, User} from '@supabase/supabase-js';
import {environment} from '../../environments/environment';
import {Profile} from '../interfaces/profile';

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/'
  // Make sure to include https:// when not localhost.
  url = url.startsWith('http') ? url : https://${url}
  // Make sure to include a trailing /.
  url = url.endsWith('/') ? url : ${url}/
  return url
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Sign in using OAuth (e.g., Google, GitHub)
  signInWithOAuth(provider: 'google' | 'github') {
    return this.supabase.auth.signInWithOAuth({
      provider,
      options: {redirectTo: getURL(), }, // Redirect user after login
    });
  }


  // Get the authenticated user
  async getUser() {
    return await this.supabase.auth.getUser();

  }

  // Sign out
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

  // Check if the user is logged in
  async isLoggedIn(): Promise<boolean> {
    const { data: { user } } = await this.supabase.auth.getUser();
    return !!user; // Return `true` if the user exists
  }
}
