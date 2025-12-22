import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, GraduationCap } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Results', href: '/results-check' },
  ];
  // inside Header component (top area)
  const [role, setRole] = useState(localStorage.getItem("role"));
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
              <GraduationCap className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
            </div> */}
            <img src="./logo-watermark.png" className='w-10 h-10 transition-transform group-hover:scale-105 rounded-full' alt="logo" />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold text-foreground">BBS</span>
              <span className="text-xs text-muted-foreground hidden sm:block">Critical Thinking</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link to="/login">
              <Button variant="default" className="bg-primary hover:bg-primary/90">
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="default" className="w-full bg-primary hover:bg-primary/90">
                  Login
                </Button>
              </Link>
            </div>
            <div className="ml-4">
              {role ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{role}</span>
                  <button onClick={handleLogout} className="text-sm text-destructive">Logout</button>
                </div>
              ) : (
                <Link to="/login"><Button>Login</Button></Link>
              )}
            </div>
          </div>


        )}
      </nav>
    </header>
  );
};

export default Header;
