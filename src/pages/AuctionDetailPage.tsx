import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Gavel, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';
import { useAuctions } from '@/hooks/useAuctions';
import { useAuth } from '@/hooks/useAuth';
import { formatCurrency } from '@/lib/utils';
import clsx from 'clsx';

export default function AuctionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { auctions, bid } = useAuctions();
  const { currentUser } = useAuth();
  const [bidAmount, setBidAmount] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const auction = auctions.find(a => a.id === id);

  if (!auction) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-cream mb-4">Auction Not Found</h2>
        <Link to="/auctions" className="text-gold hover:underline">Back to Auctions</Link>
      </div>
    );
  }

  const minBid = auction.currentBid + 1;
  const reserveMet = auction.currentBid >= auction.reservePrice;

  function handleBid(e: React.FormEvent) {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    const amount = parseInt(bidAmount);
    if (isNaN(amount)) {
      setMessage({ type: 'error', text: 'Please enter a valid bid amount.' });
      return;
    }
    const result = bid(auction.id, currentUser.id, currentUser.username, amount);
    if (result.success) {
      setMessage({ type: 'success', text: `Bid of ${formatCurrency(amount)} placed successfully!` });
      setBidAmount('');
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to place bid.' });
    }
    setTimeout(() => setMessage(null), 4000);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-cream/50 hover:text-gold text-sm mb-6 transition-colors"
      >
        <ChevronLeft size={16} />
        Back to Auctions
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="lg:col-span-2">
          {/* Car image placeholder */}
          <div className="bg-dark-2 border border-gold/20 rounded-xl overflow-hidden mb-6">
            <div className="h-64 flex items-center justify-center bg-dark-3">
              <svg viewBox="0 0 500 250" width="320" height="160" xmlns="http://www.w3.org/2000/svg" opacity="0.4">
                <path d="M40 165 L55 115 L130 80 L250 75 L370 80 L445 115 L460 165 L440 172 Q350 190 250 185 Q150 190 60 172 Z" fill="#c9a84c" />
                <path d="M130 115 L155 82 L250 78 L345 82 L370 115 Z" fill="#1a0a00" />
                <ellipse cx="130" cy="167" rx="28" ry="28" fill="#1a0a00" stroke="#c9a84c" strokeWidth="4" />
                <ellipse cx="370" cy="167" rx="28" ry="28" fill="#1a0a00" stroke="#c9a84c" strokeWidth="4" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-cream mb-1">
            {auction.car.year} {auction.car.make} {auction.car.model}
          </h1>
          <p className="text-cream/50 mb-6">{auction.car.trim} • {auction.car.condition}</p>

          {/* Description */}
          <div className="bg-dark-2 border border-gold/20 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-cream mb-3">About This Vehicle</h3>
            <p className="text-cream/70 leading-relaxed">{auction.car.description}</p>
          </div>

          {/* Bid History */}
          <div className="bg-dark-2 border border-gold/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-cream mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-gold" />
              Bid History ({auction.bids.length})
            </h3>
            {auction.bids.length === 0 ? (
              <p className="text-cream/40 text-sm">No bids yet. Be the first to bid!</p>
            ) : (
              <div className="space-y-2">
                {[...auction.bids].reverse().map((b, i) => (
                  <div key={b.id} className={clsx(
                    'flex items-center justify-between p-3 rounded-lg',
                    i === 0 ? 'bg-gold/10 border border-gold/30' : 'bg-dark'
                  )}>
                    <div>
                      <span className={clsx('text-sm font-medium', i === 0 ? 'text-gold' : 'text-cream/70')}>{b.bidderName}</span>
                      <span className="text-xs text-cream/30 ml-2">{new Date(b.timestamp).toLocaleString()}</span>
                    </div>
                    <span className={clsx('font-bold', i === 0 ? 'text-gold' : 'text-cream')}>{formatCurrency(b.amount)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Bidding panel */}
        <div className="lg:col-span-1">
          <div className="bg-dark-2 border border-gold/30 rounded-xl p-6 sticky top-20">
            {/* Status */}
            <div className="mb-4">
              <span className={clsx(
                'text-xs px-3 py-1 rounded-full font-bold border',
                auction.status === 'live' ? 'bg-green-900/70 text-green-400 border-green-600' :
                auction.status === 'upcoming' ? 'bg-blue-900/70 text-blue-400 border-blue-600' :
                'bg-gray-800 text-gray-400 border-gray-600'
              )}>
                {auction.status === 'live' ? '● LIVE' :
                 auction.status === 'upcoming' ? '◆ UPCOMING' : '✓ ENDED'}
              </span>
            </div>

            {/* Current bid */}
            <div className="mb-4">
              <div className="text-xs text-cream/40 mb-1">Current Bid</div>
              <div className="text-3xl font-bold text-gold">{formatCurrency(auction.currentBid)}</div>
              {auction.currentBidderName && (
                <div className="text-xs text-cream/40 mt-1">by {auction.currentBidderName}</div>
              )}
            </div>

            {/* Reserve */}
            <div className={clsx('text-xs px-3 py-2 rounded-lg mb-4', reserveMet ? 'bg-green-900/30 text-green-400' : 'bg-orange-900/30 text-orange-400')}>
              {reserveMet ? '✓ Reserve Price Met' : '⚠ Reserve Not Yet Met'}
            </div>

            {/* Countdown */}
            {auction.status === 'live' && (
              <div className="mb-6">
                <div className="text-xs text-cream/40 mb-2 flex items-center gap-1">
                  <Clock size={10} /> Time Remaining
                </div>
                <CountdownTimer endTime={auction.endTime} large={false} />
              </div>
            )}

            {auction.status === 'upcoming' && (
              <div className="mb-6 text-sm text-blue-400">
                Starts {new Date(auction.startTime).toLocaleString()}
              </div>
            )}

            {/* Bid form */}
            {auction.status === 'live' && (
              <form onSubmit={handleBid}>
                {message && (
                  <div className={clsx(
                    'mb-3 p-3 rounded-lg text-sm',
                    message.type === 'success' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                  )}>
                    {message.text}
                  </div>
                )}
                <div className="mb-3">
                  <label className="block text-xs text-cream/50 mb-1">Your Bid (min {formatCurrency(minBid)})</label>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={e => setBidAmount(e.target.value)}
                    min={minBid}
                    placeholder={minBid.toString()}
                    className="w-full bg-dark border border-gold/30 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none"
                  />
                </div>
                {!currentUser ? (
                  <Link
                    to="/login"
                    className="block w-full text-center py-3 bg-gold text-dark font-bold rounded-lg hover:bg-gold-light transition-colors"
                  >
                    Sign In to Bid
                  </Link>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-3 bg-gold text-dark font-bold rounded-lg hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
                  >
                    <Gavel size={16} />
                    Place Bid
                  </button>
                )}
                {currentUser && auction.sellerId === currentUser.id && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-orange-400">
                    <AlertTriangle size={12} />
                    You cannot bid on your own auction.
                  </div>
                )}
              </form>
            )}

            {/* Stats */}
            <div className="mt-6 pt-4 border-t border-gold/20 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-cream/50">Starting Bid:</span>
                <span className="text-cream">{formatCurrency(auction.startingBid)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-cream/50">Total Bids:</span>
                <span className="text-cream">{auction.bids.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-cream/50">Seller:</span>
                <span className="text-cream">{auction.sellerName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
