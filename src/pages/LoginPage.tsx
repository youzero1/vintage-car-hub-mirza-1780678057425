import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Logo from '@/components/Logo';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Login failed');
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="md" />
          </div>
          <h1 className="text-2xl font-bold text-cream">Sign In</h1>
          <p className="text-cream/50 mt-1">Welcome back to VCCP</p>
        </div>

        <div className="bg-dark-2 border border-gold/30 rounded-2xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-cream/60 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="seller@vccp.com"
                className="w-full bg-dark border border-gold/20 rounded-lg px-4 py-3 text-cream focus:border-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-cream/60 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-dark border border-gold/20 rounded-lg px-4 py-3 text-cream focus:border-gold outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gold text-dark font-bold rounded-lg hover:bg-gold-light transition-colors disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 p-4 bg-dark/50 rounded-lg text-xs text-cream/40">
            <div className="font-semibold text-cream/60 mb-2">Demo Accounts:</div>
            <div>seller@vccp.com / pass123</div>
            <div>bidder@vccp.com / pass123</div>
            <div>collector@vccp.com / pass123</div>
          </div>

          <p className="mt-6 text-center text-sm text-cream/50">
            Don't have an account?{' '}
            <Link to="/register" className="text-gold hover:text-gold-light">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
