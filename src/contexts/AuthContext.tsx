import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  user: any;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check current auth session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsAuthenticated(true);
          setUser(session.user);
        } else {
          // Check localStorage for admin token as fallback
          const token = localStorage.getItem('admin_token');
          if (token) {
            // Try to sign in with admin credentials to get Supabase session
            await signInAdmin();
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setIsAuthenticated(true);
          setUser(session.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signInAdmin = async () => {
    try {
      // Create a temporary admin user email for Supabase auth
      const adminEmail = 'admin@asupet.local';
      const adminPassword = 'asupet2024admin';
      
      // First try to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword,
      });
      
      if (error) {
        // If user doesn't exist, try to create it (but suppress console errors)
        if (error.message.includes('Invalid login credentials')) {
          try {
            const { error: signUpError } = await supabase.auth.signUp({
              email: adminEmail,
              password: adminPassword,
            });
            
            if (!signUpError) {
              // Try to sign in again after signup
              const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                email: adminEmail,
                password: adminPassword,
              });
              
              if (!signInError && signInData.user) {
                setIsAuthenticated(true);
                setUser(signInData.user);
                localStorage.setItem('admin_token', 'authenticated');
                return true;
              }
            }
          } catch (signUpError) {
            // Silently handle signup errors - fallback to localStorage auth
            console.warn('Supabase signup failed, using localStorage auth:', signUpError);
          }
        }
        // Don't throw error, just fall back to localStorage auth
        console.warn('Supabase auth failed, using localStorage auth:', error.message);
        return false;
      }
      
      if (data.user) {
        setIsAuthenticated(true);
        setUser(data.user);
        localStorage.setItem('admin_token', 'authenticated');
        return true;
      }
    } catch (error) {
      // Silently handle all Supabase errors
      console.warn('Supabase auth error, using localStorage auth:', error);
    }
    return false;
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simple authentication check first
    if (username === 'admin' && password === 'asupet2024') {
      // Try to authenticate with Supabase to get proper session
      const supabaseAuth = await signInAdmin();
      
      if (supabaseAuth) {
        return true;
      } else {
        // Fallback to localStorage auth if Supabase fails
        setIsAuthenticated(true);
        setUser({ id: 'admin', email: 'admin@asupet.local' });
        localStorage.setItem('admin_token', 'authenticated');
        return true;
      }
    }
    return false;
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    loading,
    user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};