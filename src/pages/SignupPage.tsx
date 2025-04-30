import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, User, Lock } from 'lucide-react';
import { z } from 'zod';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Header from '@/components/Header';
import EmailVerification from '@/components/EmailVerification';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  userType: z.enum(['customer', 'lender']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const { user, isVerified, isCheckingVerification, checkVerification, resendVerificationEmail } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState<string>('');
  const [verificationChecking, setVerificationChecking] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'customer',
    },
  });

  // Periodically check verification status if in verification mode
  useEffect(() => {
    if (showVerification && user && !isVerified) {
      const checkInterval = setInterval(async () => {
        console.log("Checking verification status on signup page...");
        setVerificationChecking(true);
        const isNowVerified = await checkVerification();
        setVerificationChecking(false);
        
        if (isNowVerified) {
          console.log("User is now verified from signup page!");
          clearInterval(checkInterval);
          
          // Redirect based on user type
          redirectBasedOnUserType();
        }
      }, 5000); // Check every 5 seconds
      
      return () => clearInterval(checkInterval);
    }
  }, [showVerification, user, isVerified]);

  // Check if user is already logged in and verified
  useEffect(() => {
    if (user) {
      console.log("User already exists in signup:", user);
      
      if (isVerified) {
        console.log("User is verified, redirecting...");
        redirectBasedOnUserType();
      } else {
        console.log("User exists but not verified, showing verification screen");
        setShowVerification(true);
        setRegisteredEmail(user.email || '');
      }
    }
  }, [user, isVerified]);

  const redirectBasedOnUserType = async () => {
    try {
      console.log("Redirecting based on user type...");
      const userMetadata = user?.user_metadata;
      const userType = userMetadata?.user_type || 'customer';
      
      if (userType === 'lender') {
        // Check if lender profile exists
        console.log("User is a lender, checking if profile exists");
        const { data: lenderProfile, error } = await supabase
          .from('loanagents')
          .select('id')
          .eq('user_id', user?.id)
          .maybeSingle();
          
        if (error && error.code !== 'PGRST116') {
          console.error("Error fetching lender profile:", error);
          throw error;
        }
        
        if (lenderProfile) {
          console.log("Lender has profile, redirecting to dashboard");
          navigate('/admin/dashboard');
        } else {
          console.log("Lender has no profile, redirecting to create profile");
          navigate('/admin/lender-profile');
        }
      } else {
        navigate('/?loggedIn=true');
      }
    } catch (error: any) {
      console.error('Error during redirect:', error);
      toast.error("Error checking profile status");
    }
  };

  const onSubmit = async (data: SignupFormValues) => {
    try {
      setIsLoading(true);
      console.log("Starting signup process", data.email);
      
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.name.split(' ')[0],
            last_name: data.name.split(' ').slice(1).join(' '),
            user_type: data.userType,
            full_name: data.name
          },
          emailRedirectTo: window.location.origin + '/admin'
        }
      });

      if (error) throw error;
      
      console.log("Signup successful, showing verification screen", signUpData);
      setRegisteredEmail(data.email);
      setShowVerification(true);
      
      toast.success("Account created! Please check your email to verify your account.");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  // If showing verification screen
  if (showVerification) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header 
          title="Email Verification" 
          showBack={true}
          onBackClick={() => navigate('/')}
        />
        
        <div className="flex-1 flex items-center justify-center p-4">
          <EmailVerification 
            email={registeredEmail}
            onResendEmail={resendVerificationEmail}
            isLoading={verificationChecking || isCheckingVerification}
          />
        </div>
      </div>
    );
  }

  // Otherwise show signup form
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Sign Up" 
        showBack={true} 
        onBackClick={() => navigate('/')}
      />
      
      <div className="max-w-md mx-auto p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input {...field} placeholder="Enter your full name" disabled={isLoading} />
                      <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input {...field} type="email" placeholder="Enter your email" disabled={isLoading} />
                      <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400"
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-2.5 text-gray-400"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>I am signing up as a:</FormLabel>
                  <FormControl>
                    <RadioGroup 
                      onValueChange={field.onChange} 
                      value={field.value}
                      className="flex space-x-4"
                      disabled={isLoading}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="lender" id="lender" />
                        <Label htmlFor="lender">Lender</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="customer" id="customer" />
                        <Label htmlFor="customer">Customer</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-semibold"
                onClick={() => navigate("/admin")}
                disabled={isLoading}
              >
                Log in
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;
