
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isVerified: boolean;
  isCheckingVerification: boolean;
  signOut: () => Promise<void>;
  checkVerification: () => Promise<boolean>;
  resendVerificationEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isVerified: false,
  isCheckingVerification: false,
  signOut: async () => {},
  checkVerification: async () => false,
  resendVerificationEmail: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isCheckingVerification, setIsCheckingVerification] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check user verification status
  const checkVerification = async (): Promise<boolean> => {
    try {
      setIsCheckingVerification(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return false;
      
      // If email_confirmed_at exists and is not null, the user is verified
      const verified = !!user.email_confirmed_at;
      setIsVerified(verified);
      return verified;
    } catch (error) {
      console.error("Error checking verification status:", error);
      return false;
    } finally {
      setIsCheckingVerification(false);
    }
  };

  // Resend verification email
  const resendVerificationEmail = async () => {
    try {
      if (!user?.email) {
        toast.error("No email found to send verification");
        return;
      }

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
        options: {
          emailRedirectTo: window.location.origin + '/admin'
        }
      });

      if (error) throw error;
      
      toast.success("Verification email sent! Please check your inbox");
    } catch (error: any) {
      console.error("Error sending verification email:", error);
      toast.error(error.message || "Failed to resend verification email");
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_OUT') {
          console.log('User signed out event detected');
          navigate('/');
          toast.success("Successfully logged out");
        } else if (event === 'USER_UPDATED' || event === 'SIGNED_IN') {
          // When user is updated or signed in, check verification
          if (session?.user) {
            checkVerification();
          }
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkVerification();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      console.log('Sign out successful from context');
      // Navigate is handled by the auth state change listener
    } catch (error: any) {
      console.error('Error signing out:', error.message);
      toast.error("Failed to log out");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isVerified, 
      isCheckingVerification,
      signOut, 
      checkVerification,
      resendVerificationEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
