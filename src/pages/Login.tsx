// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { GraduationCap, Loader2 } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import { useAuth } from '@/contexts/AuthContext';

// interface LoginForm {
//   username: string;
//   password: string;
// }

// const Login = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const { login, loading: authLoading } = useAuth();

//   const [formData, setFormData] = useState<LoginForm>({
//     username: '',
//     password: '',
//   });

//   const [localLoading, setLocalLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLocalLoading(true);

//     try {
//       await login(formData.username, formData.password);
      
//       const role = localStorage.getItem('role');
      
//       toast({
//         title: 'Login Successful',
//         description: 'Welcome back!',
//       });

//       if (role === 'admin') {
//         navigate('/admin');
//       } else if (role === 'staff') {
//         navigate('/staff');
//       } else {
//         navigate('/dashboard-student');
//       }

//     } catch (err: any) {
//       console.error("Login error:", err);
      
//       // Check for 403 status (deactivated account)
//       if (err.response?.status === 403) {
//         toast({
//           title: 'Account Deactivated',
//           description: err.response?.data?.message || 'Your account has been deactivated. Please contact administration.',
//           variant: 'destructive',
//         });
//       } else {
//         toast({
//           title: 'Error',
//           description: err.response?.data?.message || err.message || 'Login failed',
//           variant: 'destructive',
//         });
//       }
//     } finally {
//       setLocalLoading(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const isLoading = localLoading || authLoading;

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted">
//       <Card className="w-full max-w-md p-4 bg-card border-border">
//         <div className="text-center py-8">
//           <div className="inline-flex justify-center mb-4">
//             <img 
//               src="./logo-watermark.png" 
//               className="w-16 h-16 transition-transform group-hover:scale-105 rounded-full" 
//               alt="logo" 
//             />
//           </div>
//           <h1 className="text-2xl font-bold">Welcome Back</h1>
//           <p className="text-muted-foreground text-sm mt-1">Login to access your portal</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <Label htmlFor="username">Username / Admission Number</Label>
//             <Input
//               id="username"
//               name="username"
//               type="text"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               className="mt-1"
//               placeholder="Enter username or admission number"
//               disabled={isLoading}
//             />
//           </div>

//           <div>
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="mt-1"
//               placeholder="Enter your password"
//               disabled={isLoading}
//             />
//           </div>

//           <Button 
//             type="submit" 
//             className="w-full" 
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="animate-spin mr-2" size={18} />
//                 Logging in...
//               </>
//             ) : (
//               'Login'
//             )}
//           </Button>
//         </form>

//         <div className="p-4 text-center">
//           <p className="text-sm text-muted-foreground">
//             Need help?{' '}
//             <Link to="/contact" className="text-primary hover:underline">
//               Contact Support
//             </Link>
//           </p>
//         </div>

//         <div className="p-4 border-t border-border text-center">
//           <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//             ← Back to Home
//           </Link>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Login;
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Loader2, 
  Sparkles, 
  Star, 
  Heart, 
  Moon, 
  Sun,
  Lock,
  User,
  LogIn
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface LoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState<LoginForm>({
    username: '',
    password: '',
  });

  const [localLoading, setLocalLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalLoading(true);

    try {
      await login(formData.username, formData.password);
      
      const role = localStorage.getItem('role');
      
      toast({
        title: '✨ Welcome Back! ✨',
        description: 'Login successful! Redirecting to your dashboard...',
      });

      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'staff') {
        navigate('/staff');
      } else {
        navigate('/dashboard-student');
      }

    } catch (err: any) {
      console.error("Login error:", err);
      
      if (err.response?.status === 403) {
        toast({
          title: '😔 Account Deactivated',
          description: err.response?.data?.message || 'Your account has been deactivated. Please contact the school office.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: '😕 Login Failed',
          description: err.response?.data?.message || err.message || 'Invalid username or password. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setLocalLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isLoading = localLoading || authLoading;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Stars */}
        {[...Array(10)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-yellow-300 opacity-30"
            size={Math.random() * 20 + 10}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
            }}
          />
        ))}
        
        {/* Decorative Circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-pink-300 rounded-full opacity-20 blur-3xl"></div>
        
        {/* Islamic Motifs */}
        <Moon className="absolute top-20 left-20 w-12 h-12 text-emerald-300 opacity-20 rotate-45" />
        <Sun className="absolute bottom-20 right-20 w-16 h-16 text-orange-300 opacity-20" />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
      `}</style>

      <Card className="w-full max-w-md p-6 bg-white/95 backdrop-blur-sm border-2 border-yellow-200 shadow-xl relative z-10">
        {/* Top Decorative Strip */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 rounded-full flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>

        <div className="text-center py-6">
          {/* Animated Logo */}
          <div className="inline-flex justify-center mb-4 relative group">
            <div className="absolute inset-0 bg-yellow-300 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <img 
              src="/logo-watermark.png" 
              className="w-20 h-20 transition-all duration-300 group-hover:scale-110 rounded-full border-4 border-yellow-400 relative z-10" 
              alt="logo" 
            />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-500 animate-ping" />
          </div>

          <h1 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Welcome Back!
            </span>
          </h1>
          <p className="text-gray-600 text-sm flex items-center justify-center gap-1">
            <Heart className="w-4 h-4 text-pink-500" />
            Login to access your portal
            <Star className="w-4 h-4 text-yellow-500" />
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-700 font-medium flex items-center gap-2">
              <User className="w-4 h-4 text-amber-500" />
              Username / Admission Number
            </Label>
            <div className="relative">
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                className="pl-10 border-2 border-yellow-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl bg-white text-gray-900 placeholder:text-gray-400"
                placeholder="Enter username or admission number"
                disabled={isLoading}
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-500" />
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-10 border-2 border-yellow-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl bg-white text-gray-900 placeholder:text-gray-400"
                placeholder="Enter your password"
                disabled={isLoading}
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:from-amber-600 hover:via-yellow-600 hover:to-orange-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Logging in...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                Login to Your Account
                <Sparkles className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        {/* Help Section */}
        <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 rounded-full">
              <Heart className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-800">Need help?</p>
              <p className="text-xs text-amber-600 mt-1">
                Contact our support team and we'll be happy to assist you!
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-4 flex justify-center gap-4 text-xs">
          <Link to="/" className="text-gray-500 hover:text-amber-600 transition-colors flex items-center gap-1">
            ← Home
          </Link>
          <span className="text-gray-300">|</span>
          <Link to="/contact" className="text-gray-500 hover:text-amber-600 transition-colors">
            Contact Support
          </Link>
        </div>

        {/* Bottom Decoration */}
        <div className="mt-6 flex justify-center gap-1">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
        </div>
      </Card>
    </div>
  );
};

export default Login;