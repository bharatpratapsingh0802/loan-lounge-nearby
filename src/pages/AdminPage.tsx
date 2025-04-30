
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";
import { Mail, Phone, Eye, EyeOff } from 'lucide-react';
import Header from '@/components/Header';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

const AdminPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('customer');
  const [loading, setLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      console.log("User already logged in, checking profile...", user);
      checkUserTypeAndRedirect();
    }
  }, [user]);

  const checkUserTypeAndRedirect = async () => {
    try {
      console.log("Checking user type and redirecting...");
      // Check if the user is a lender
      if (user?.user_metadata?.user_type === 'lender') {
        console.log("User is a lender, checking if profile exists");
        // Check if the lender has completed their profile
        const { data: lenderProfile, error } = await supabase
          .from('loanagents')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (error && error.code !== 'PGRST116') {
          console.error("Error fetching lender profile:", error);
          throw error;
        }
        
        console.log("Lender profile check result:", lenderProfile);
        
        if (lenderProfile) {
          console.log("Lender has profile, redirecting to dashboard");
          navigate('/admin/dashboard');
        } else {
          console.log("Lender has no profile, redirecting to create profile");
          navigate('/admin/lender-profile');
        }
      } else {
        // For customers, redirect to home
        console.log("User is a customer, redirecting to home");
        navigate('/?loggedIn=true');
      }
    } catch (error: any) {
      console.error('Error checking user type:', error.message);
      toast.error("Error checking profile status");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      console.log("Attempting to login with:", email);
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) throw error;

      toast.success(`Logged in successfully`);
      console.log("Login successful, user data:", data);
      
      const userMetadata = data?.user?.user_metadata;
      const loggedInType = userMetadata?.user_type || 'customer';
      console.log("User type from metadata:", loggedInType);
      
      if (loggedInType === 'customer') {
        navigate('/?loggedIn=true');
      } else {
        // Check if the lender has completed their profile
        const { data: lenderProfile, error: lenderError } = await supabase
          .from('loanagents')
          .select('id')
          .eq('user_id', data?.user?.id)
          .maybeSingle();
        
        if (lenderError && lenderError.code !== 'PGRST116') {
          console.error("Error checking lender profile:", lenderError);
          throw lenderError;
        }
        
        console.log("Lender profile check after login:", lenderProfile);
        
        if (lenderProfile) {
          navigate('/admin/dashboard');
        } else {
          navigate('/admin/lender-profile');
        }
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Admin Login" 
        showBack={true}
        onBackClick={() => navigate('/')}
      />
      
      <div className="p-4 max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Login to access lender management or customer features
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin}>
              <Tabs defaultValue="email" className="w-full mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="phone">
                    <Phone className="mr-2 h-4 w-4" />
                    Phone
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="email" className="mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="phone" className="mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pr-10"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Label>I am a:</Label>
                <RadioGroup 
                  value={userType} 
                  onValueChange={setUserType} 
                  className="flex space-x-4"
                  disabled={loading}
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
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 items-center text-sm text-gray-500">
            <div>
              Don't have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-semibold"
                onClick={() => navigate("/signup")}
                disabled={loading}
              >
                Sign up
              </Button>
            </div>
            <div>Need help? Contact support</div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
