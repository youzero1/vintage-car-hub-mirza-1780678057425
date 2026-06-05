import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import Logo from '@/components/Logo';
import { useAuth } from '@/hooks/useAuth';
import clsx from 'clsx';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Browse Cars', path: '/browse' },
    { label: 'Auctions', path: '/auctions' },
    { label: 'Sell Your Car', path: '/sell' },
    { label: 'How It Works', path: '/how-it-works' },
  ];

  function handleLogout() {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  }

  return (
    <nav className="bg-dark border-b border-gold/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <Logo size="sm" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  'text-sm font-medium transition-colors hover:text-gold',
                  location.pathname === link.path ? 'text-gold' : 'text-cream/70'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth area */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-cream/80 hover:text-gold transition-colors text-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center">
                    <User size={14} className="text-gold" />
                  </div>
                  <span>{currentUser.username}</span>
                  <ChevronDown size={14} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-dark-2 border border-gold/30 rounded-lg shadow-xl overflow-hidden">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-3 text-sm text-cream/80 hover:bg-gold/10 hover:text-gold transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      My Dashboard
                    </Link>
                    <Link
                      to="/sell"
                      className="block px-4 py-3 text-sm text-cream/80 hover:bg-gold/10 hover:text-gold transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      List a Car
                    </Link>
                    <Link
                      to="/auctions/create"
                      className="block px-4 py-3 text-sm text-cream/80 hover:bg-gold/10 hover:text-gold transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Create Auction
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-rust-light hover:bg-rust/10 transition-colors flex items-center gap-2"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-cream/70 hover:text-gold transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gold text-dark text-sm font-bold rounded-lg hover:bg-gold-light transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-cream/80 hover:text-gold"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark-2 border-t border-gold/20 px-4 py-4">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className="block py-2 text-cream/70 hover:text-gold transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-gold/20">
            {currentUser ? (
              <>
                <Link to="/dashboard" className="block py-2 text-gold" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                <button onClick={handleLogout} className="block py-2 text-rust-light">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-cream/70" onClick={() => setMobileOpen(false)}>Sign In</Link>
                <Link to="/register" className="block py-2 text-gold font-bold" onClick={() => setMobileOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
