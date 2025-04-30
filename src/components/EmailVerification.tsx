
import React from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';

interface EmailVerificationProps {
  email: string;
  onResendEmail: () => Promise<void>;
  isLoading: boolean;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ 
  email, 
  onResendEmail,
  isLoading
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm max-w-md mx-auto text-center">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <Mail className="h-8 w-8 text-blue-500" />
      </div>
      
      <h2 className="text-2xl font-semibold mb-2">Verify your email</h2>
      <p className="text-gray-600 mb-4">
        We've sent a verification link to <span className="font-medium">{email}</span>
      </p>
      
      <div className="w-full mb-6">
        <Progress value={isLoading ? 75 : 25} className="h-2 mb-2" />
        <p className="text-sm text-gray-500">Waiting for verification...</p>
      </div>
      
      <div className="space-y-4 w-full">
        <Button 
          variant="outline"
          className="w-full"
          onClick={onResendEmail}
          disabled={isLoading}
        >
          Resend verification email
        </Button>
        
        <p className="text-sm text-gray-500">
          Please check your inbox (and spam folder) for the verification link
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
