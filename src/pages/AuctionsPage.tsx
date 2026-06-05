import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gavel, Plus } from 'lucide-react';
import AuctionCard from '@/components/AuctionCard';
import { useAuctions } from '@/hooks/useAuctions';
import { useAuth } from '@/hooks/useAuth';
import clsx from 'clsx';

type FilterTab = 'all' | 'live' | 'upcoming' | 'ended';

export default function AuctionsPage() {
  const { auctions } = useAuctions();
  const { currentUser } = useAuth();
  const [tab, setTab] = useState<FilterTab>('all');

  const filtered = auctions.filter(a => {
    if (tab === 'all') return true;
    return a.status === tab;
  });

  const counts = {
    all: auctions.length,
    live: auctions.filter(a => a.status === 'live').length,
    upcoming: auctions.filter(a => a.status === 'upcoming').length,
    ended: auctions.filter(a => a.status === 'ended').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-cream mb-1">Auctions</h1>
          <p className="text-cream/50">Bid on rare vintage classics in real-time</p>
        </div>
        {currentUser && (
          <Link
            to="/auctions/create"
            className="flex items-center gap-2 px-4 py-2 bg-gold text-dark font-bold rounded-lg hover:bg-gold-light transition-colors"
          >
            <Plus size={16} />
            Create Auction
          </Link>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gold/20 pb-0">
        {(['all', 'live', 'upcoming', 'ended'] as FilterTab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={clsx(
              'px-4 py-2 text-sm font-medium border-b-2 transition-colors capitalize -mb-px',
              tab === t
                ? 'border-gold text-gold'
                : 'border-transparent text-cream/50 hover:text-cream'
            )}
          >
            {t === 'live' ? '● Live' : t.charAt(0).toUpperCase() + t.slice(1)}
            <span className="ml-1.5 text-xs bg-dark px-1.5 py-0.5 rounded-full text-cream/40">{counts[t]}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Gavel size={48} className="text-gold/30 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-cream mb-2">No auctions found</h3>
          <p className="text-cream/50 mb-6">
            {tab === 'live' ? 'No live auctions at the moment. Check back soon!' :
             tab === 'upcoming' ? 'No upcoming auctions scheduled.' :
             'No ended auctions to display.'}
          </p>
          {currentUser && (
            <Link to="/auctions/create" className="px-6 py-2 bg-gold text-dark font-bold rounded-lg">
              Create an Auction
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(a => <AuctionCard key={a.id} auction={a} />)}
        </div>
      )}
    </div>
  );
}
