
import { useState } from 'react';
import { AuthForm } from '@/components/AuthForm';
import { signup, setToken } from '@/api/api';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { Layout } from '@/components/Layout';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (data: { username?: string; email: string; password: string }) => {
    if (!data.username) return;
    
    try {
      setIsLoading(true);
      const response = await signup(data.username, data.email, data.password);
      setToken(response.token);
      setUser(response.user);
      toast.success('Account created successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Smart Notes</h1>
          <p className="text-muted-foreground mt-2">Create your account</p>
        </div>
        
        <AuthForm
          type="signup"
          onSubmit={handleSignup}
          isLoading={isLoading}
        />
      </div>
    </Layout>
  );
};

export default Signup;
