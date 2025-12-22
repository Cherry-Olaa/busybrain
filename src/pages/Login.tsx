
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<LoginForm>({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // If input contains "/", treat as student admissionNumber
      const body = formData.username.includes('/')
        ? { admissionNumber: formData.username, password: formData.password }
        : { username: formData.username, password: formData.password };

      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      // Save only what is needed
      localStorage.setItem('token', data.token);
      localStorage.setItem('refresh', data.refresh);
      localStorage.setItem('role', data.role);

      toast({
        title: 'Login Successful',
        description: `Welcome back, ${data.name}!`,
      });

      // Redirect based on role
      if (data.role === 'admin') return navigate('/admin');
      if (data.role === 'staff') return navigate('/staff');
      return navigate('/dashboard-student');

    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted">
      <Card className="w-full max-w-md p-4 bg-card border-border">
        <div className="text-center py-8">
          <div className="inline-flex">
          <img src="./logo-watermark.png" className='w-10 h-10 transition-transform group-hover:scale-105 rounded-full' alt="logo" />
          </div>
          <h1 className="text-2xl font-bold mb-">Welcome Back</h1>
          <p className="text-muted-foreground text-xs">Login to access your portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1"
              placeholder="Username / Admission Number"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1"
              placeholder="Enter your password"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Need help?{' '}
            <Link to="/contact" className="text-primary hover:underline">
              Contact Support
            </Link>
          </p>
        </div>

        <div className="p-4 border-t border-border text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Home
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;