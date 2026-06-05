import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Logo from '@/components/Logo';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '', email: '', password: '', confirmPassword: '',
    role: 'both' as 'seller' | 'bidder' | 'both', phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function update(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    setLoading(true);
    const result = register(form.username, form.email, form.password, form.role, form.phone || undefined);
    setLoading(false);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Registration failed');
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="md" />
          </div>
          <h1 className="text-2xl font-bold text-cream">Create Account</h1>
          <p className="text-cream/50 mt-1">Join the VCCP community</p>
        </div>

        <div className="bg-dark-2 border border-gold/30 rounded-2xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-cream/60 mb-1">Username *</label>
              <input
                value={form.username}
                onChange={e => update('username', e.target.value)}
                required
                placeholder="ClassicCarFan"
                className="w-full bg-dark border border-gold/20 rounded-lg px-4 py-3 text-cream focus:border-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-cream/60 mb-1">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={e => update('email', e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-dark border border-gold/20 rounded-lg px-4 py-3 text-cream focus:border-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-cream/60 mb-1">Phone (optional)</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => update('phone', e.target.value)}
                placeholder="555-0100"
                className="w-full bg-dark border border-gold/20 rounded-lg px-4 py-3 text-cream focus:border-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-cream/60 mb-1">Account Type *</label>
              <select
                value={form.role}
                onChange={e => update('role', e.target.value)}
                className="w-full bg-dark border border-gold/20 rounded-lg px-4 py-3 text-cream focus:border-gold outline-none"
              >
                <option value="both">Buyer & Seller</option>
                <option value="seller">Seller Only</option>
                <option value="bidder">Bidder / Buyer Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-cream/60 mb-1">Password *</label>
              <input
                type="password"
                value={form.password}
                onChange={e => update('password', e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-dark border border-gold/20 rounded-lg px-4 py-3 text-cream focus:border-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-cream/60 mb-1">Confirm Password *</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={e => update('confirmPassword', e.target.value)}
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
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-cream/50">
            Already have an account?{' '}
            <Link to="/login" className="text-gold hover:text-gold-light">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
