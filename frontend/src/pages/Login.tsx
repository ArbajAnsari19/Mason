
import { useState } from 'react';
import { AuthForm } from '@/components/AuthForm';
import { login, setToken } from '@/api/api';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { Layout } from '@/components/Layout';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const response = await login(data.email, data.password);
      setToken(response.token);
      setUser(response.user);
      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Smart Notes</h1>
          <p className="text-muted-foreground mt-2">AI-powered note-taking app</p>
        </div>
        
        <AuthForm
          type="login"
          onSubmit={handleLogin}
          isLoading={isLoading}
        />
      </div>
    </Layout>
  );
};

export default Login;
