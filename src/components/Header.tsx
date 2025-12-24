import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Results", href: "/results-check" },
  ];

  // sync role
  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const AuthActions = ({ mobile = false }) => {
    if (role) {
      return (
        <div
          className={`flex gap-3 ${
            mobile ? "flex-col items-start mt-auto" : "items-center"
          }`}
        >
          <span className="text-sm text-muted-foreground">{role}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-destructive hover:underline"
          >
            Logout
          </button>
        </div>
      );
    }

    return (
      <Link
        to="/login"
        onClick={() => setMobileMenuOpen(false)}
        className={mobile ? "mt-auto w-full" : ""}
      >
        <Button className={mobile ? "w-full" : ""}>Login</Button>
      </Link>
    );
  };

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b">
        <nav className="container mx-auto px-4">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="./logo-watermark.png"
                alt="logo"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-bold text-lg">BBS</div>
                <div className="text-xs text-muted-foreground hidden sm:block">
                  Critical Thinking
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {item.name}
                </Link>
              ))}
              <AuthActions />
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen((p) => !p)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 md:hidden bg-background flex flex-col px-4 py-6">
          {/* Links */}
          <div className="flex flex-col gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth at bottom */}
          <AuthActions mobile />
        </div>
      )}
    </>
  );
};

export default Header;
