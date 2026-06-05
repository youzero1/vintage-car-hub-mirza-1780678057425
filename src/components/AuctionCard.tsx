import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Clock, Gavel, TrendingUp } from 'lucide-react';
import { Auction } from '@/types';
import { formatCurrency, getTimeLeft } from '@/lib/utils';
import clsx from 'clsx';

type AuctionCardProps = {
  auction: Auction;
};

export default function AuctionCard({ auction }: AuctionCardProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(auction.endTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(auction.endTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [auction.endTime]);

  const isUrgent = timeLeft.total > 0 && timeLeft.total < 30 * 60 * 1000;
  const reserveMet = auction.currentBid >= auction.reservePrice;

  return (
    <Link
      to={`/auctions/${auction.id}`}
      className="block bg-dark-2 border border-gold/20 rounded-xl overflow-hidden hover:border-gold/50 transition-all hover:shadow-lg hover:shadow-gold/10 group"
    >
      {/* Image */}
      <div className="h-48 bg-dark-3 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 200 100" width="160" height="80" xmlns="http://www.w3.org/2000/svg" opacity="0.3">
            <path d="M20 65 L25 48 L50 35 L100 33 L150 35 L175 48 L180 65 L170 68 Q140 75 100 73 Q60 75 30 68 Z" fill="#c9a84c" />
            <path d="M50 48 L60 36 L100 34 L140 36 L150 48 Z" fill="#1a0a00" opacity="0.8" />
            <circle cx="55" cy="67" r="9" fill="#1a0a00" stroke="#c9a84c" strokeWidth="2" />
            <circle cx="145" cy="67" r="9" fill="#1a0a00" stroke="#c9a84c" strokeWidth="2" />
          </svg>
        </div>
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span className={clsx(
            'text-xs px-2 py-1 rounded-full font-bold border',
            auction.status === 'live' ? 'bg-green-900/70 text-green-400 border-green-600 pulse-gold' :
            auction.status === 'upcoming' ? 'bg-blue-900/70 text-blue-400 border-blue-600' :
            auction.status === 'ended' ? 'bg-gray-800 text-gray-400 border-gray-600' :
            'bg-red-900/70 text-red-400 border-red-600'
          )}>
            {auction.status === 'live' ? '● LIVE' :
             auction.status === 'upcoming' ? '◆ UPCOMING' :
             auction.status === 'ended' ? '✓ ENDED' : '✕ CANCELLED'}
          </span>
        </div>
        {reserveMet && auction.status === 'live' && (
          <div className="absolute top-3 right-3">
            <span className="text-xs px-2 py-1 bg-gold/20 border border-gold/50 text-gold rounded font-medium">Reserve Met</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-cream group-hover:text-gold transition-colors">
          {auction.car.year} {auction.car.make} {auction.car.model}
        </h3>
        <p className="text-xs text-cream/50 mt-1">{auction.car.trim} • {auction.car.condition}</p>

        {/* Bid info */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="bg-dark/50 rounded-lg p-2">
            <div className="flex items-center gap-1 text-xs text-cream/40 mb-1">
              <TrendingUp size={10} />
              <span>Current Bid</span>
            </div>
            <div className="text-gold font-bold text-sm">{formatCurrency(auction.currentBid)}</div>
          </div>
          <div className="bg-dark/50 rounded-lg p-2">
            <div className="flex items-center gap-1 text-xs text-cream/40 mb-1">
              <Gavel size={10} />
              <span>Bids</span>
            </div>
            <div className="text-cream font-bold text-sm">{auction.bids.length}</div>
          </div>
        </div>

        {/* Countdown */}
        {auction.status === 'live' && (
          <div className={clsx('mt-3 flex items-center gap-2 bg-dark/50 rounded-lg p-2', isUrgent ? 'countdown-urgent' : '')}>
            <Clock size={12} className={clsx(isUrgent ? 'text-red-400' : 'text-gold')} />
            <span className={clsx('text-xs font-mono font-bold', isUrgent ? 'text-red-400' : 'text-cream')}>
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-xs text-cream/40">remaining</span>
          </div>
        )}
        {auction.status === 'upcoming' && (
          <div className="mt-3 text-xs text-blue-400 bg-blue-900/20 rounded-lg p-2">
            Starts {new Date(auction.startTime).toLocaleDateString()}
          </div>
        )}
        {auction.status === 'ended' && (
          <div className="mt-3 text-xs text-gray-400 bg-gray-800/50 rounded-lg p-2">
            Final Bid: {formatCurrency(auction.currentBid)}
            {auction.currentBid >= auction.reservePrice ? ' — Reserve Met' : ' — Reserve Not Met'}
          </div>
        )}
      </div>
    </Link>
  );
}
