import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useAuctions } from '@/hooks/useAuctions';
import { useListings } from '@/hooks/useListings';
import { useAuth } from '@/hooks/useAuth';
import { formatCurrency } from '@/lib/utils';
import clsx from 'clsx';

export default function CreateAuctionPage() {
  const { currentUser } = useAuth();
  const { listings } = useListings();
  const { createAuction } = useAuctions();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    carId: '',
    startingBid: '',
    reservePrice: '',
    durationHours: '24',
    startNow: true,
    startDate: '',
  });

  const myListings = currentUser
    ? listings.filter(l => l.sellerId === currentUser.id && l.status === 'active' && !l.auctionId)
    : [];

  function update(key: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!currentUser) { navigate('/login'); return; }
    const car = listings.find(l => l.id === form.carId);
    if (!car) return;

    const now = new Date();
    const startTime = form.startNow ? now : new Date(form.startDate);
    const durationHours = parseInt(form.durationHours) || 24;
    const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000);

    createAuction({
      carId: car.id,
      sellerId: currentUser.id,
      sellerName: currentUser.username,
      startingBid: parseInt(form.startingBid) || 0,
      reservePrice: parseInt(form.reservePrice) || 0,
      status: form.startNow ? 'live' : 'upcoming',
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      durationHours,
      car,
    });
    setSubmitted(true);
  }

  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-cream mb-4">Sign In Required</h2>
        <p className="text-cream/60 mb-6">You need to be signed in to create an auction.</p>
        <Link to="/login" className="px-6 py-3 bg-gold text-dark font-bold rounded-xl">Sign In</Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <CheckCircle size={64} className="text-gold mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-cream mb-4">Auction Created!</h2>
        <p className="text-cream/60 mb-8">Your auction has been scheduled successfully.</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => navigate('/auctions')} className="px-6 py-3 bg-gold text-dark font-bold rounded-xl">View Auctions</button>
          <button onClick={() => navigate('/dashboard')} className="px-6 py-3 border border-gold text-gold font-bold rounded-xl">My Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-cream mb-2">Create an Auction</h1>
      <p className="text-cream/50 mb-8">List one of your vehicles for a live auction.</p>

      {myListings.length === 0 ? (
        <div className="bg-dark-2 border border-gold/20 rounded-xl p-8 text-center">
          <p className="text-cream/60 mb-4">You have no active listings available for auction.</p>
          <Link to="/sell" className="px-6 py-2 bg-gold text-dark font-bold rounded-lg">List a Car First</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="bg-dark-2 border border-gold/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-cream mb-4">Select Vehicle</h3>
            <select
              value={form.carId}
              onChange={e => update('carId', e.target.value)}
              required
              className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none"
            >
              <option value="">Choose a listing...</option>
              {myListings.map(l => (
                <option key={l.id} value={l.id}>
                  {l.year} {l.make} {l.model} — {formatCurrency(l.price)}
                </option>
              ))}
            </select>
          </section>

          <section className="bg-dark-2 border border-gold/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-cream mb-4">Bidding Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-cream/50 mb-1">Starting Bid ($) *</label>
                <input
                  type="number"
                  value={form.startingBid}
                  onChange={e => update('startingBid', e.target.value)}
                  required
                  placeholder="50000"
                  className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-cream/50 mb-1">Reserve Price ($)</label>
                <input
                  type="number"
                  value={form.reservePrice}
                  onChange={e => update('reservePrice', e.target.value)}
                  placeholder="75000"
                  className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-cream/50 mb-1">Duration (hours)</label>
                <select
                  value={form.durationHours}
                  onChange={e => update('durationHours', e.target.value)}
                  className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none"
                >
                  {[1, 2, 4, 6, 12, 24, 48, 72].map(h => (
                    <option key={h} value={h}>{h} hour{h > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="bg-dark-2 border border-gold/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-cream mb-4">Start Time</h3>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="startType"
                  checked={form.startNow}
                  onChange={() => update('startNow', true)}
                  className="accent-gold"
                />
                <span className="text-sm text-cream/80">Start immediately (go live now)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="startType"
                  checked={!form.startNow}
                  onChange={() => update('startNow', false)}
                  className="accent-gold"
                />
                <span className="text-sm text-cream/80">Schedule for later</span>
              </label>
              {!form.startNow && (
                <input
                  type="datetime-local"
                  value={form.startDate}
                  onChange={e => update('startDate', e.target.value)}
                  className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none"
                />
              )}
            </div>
          </section>

          <button
            type="submit"
            className={clsx(
              'w-full py-4 font-bold text-lg rounded-xl transition-colors',
              form.carId && form.startingBid
                ? 'bg-gold text-dark hover:bg-gold-light'
                : 'bg-gold/40 text-dark/60 cursor-not-allowed'
            )}
            disabled={!form.carId || !form.startingBid}
          >
            Launch Auction
          </button>
        </form>
      )}
    </div>
  );
}
