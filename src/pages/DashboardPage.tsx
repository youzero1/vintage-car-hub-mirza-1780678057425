import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Gavel, Car, Plus } from 'lucide-react';
import CarCard from '@/components/CarCard';
import AuctionCard from '@/components/AuctionCard';
import { useAuth } from '@/hooks/useAuth';
import { getListings, getAuctions } from '@/lib/storage';
import { CarListing, Auction } from '@/types';
import { formatCurrency } from '@/lib/utils';
import clsx from 'clsx';

type Tab = 'listings' | 'auctions' | 'bids';

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('listings');
  const [myListings, setMyListings] = useState<CarListing[]>([]);
  const [myAuctions, setMyAuctions] = useState<Auction[]>([]);
  const [myBids, setMyBids] = useState<Auction[]>([]);

  useEffect(() => {
    if (!currentUser) { navigate('/login'); return; }
    const listings = getListings().filter(l => l.sellerId === currentUser.id);
    const auctions = getAuctions();
    setMyListings(listings);
    setMyAuctions(auctions.filter(a => a.sellerId === currentUser.id));
    setMyBids(auctions.filter(a => a.bids.some(b => b.bidderId === currentUser.id)));
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'listings', label: 'My Listings', count: myListings.length },
    { id: 'auctions', label: 'My Auctions', count: myAuctions.length },
    { id: 'bids', label: 'My Bids', count: myBids.length },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
            <User size={28} className="text-gold" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-cream">{currentUser.username}</h1>
            <p className="text-cream/50 text-sm">{currentUser.email}</p>
            <span className="text-xs px-2 py-0.5 bg-gold/20 border border-gold/30 text-gold rounded capitalize">
              {currentUser.role}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Link to="/sell" className="flex items-center gap-2 px-4 py-2 bg-gold text-dark font-bold rounded-lg hover:bg-gold-light text-sm">
            <Plus size={14} /> List Car
          </Link>
          <Link to="/auctions/create" className="flex items-center gap-2 px-4 py-2 border border-gold text-gold font-bold rounded-lg hover:bg-gold/10 text-sm">
            <Gavel size={14} /> Create Auction
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Listings', value: myListings.filter(l => l.status === 'active').length, icon: Car },
          { label: 'Sold', value: myListings.filter(l => l.status === 'sold').length, icon: Car },
          { label: 'Active Auctions', value: myAuctions.filter(a => a.status === 'live').length, icon: Gavel },
          { label: 'Auctions Participated', value: myBids.length, icon: Gavel },
        ].map(stat => (
          <div key={stat.label} className="bg-dark-2 border border-gold/20 rounded-xl p-4">
            <stat.icon size={20} className="text-gold mb-2" />
            <div className="text-2xl font-bold text-cream">{stat.value}</div>
            <div className="text-xs text-cream/50">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gold/20 mb-6">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={clsx(
              'px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px',
              tab === t.id ? 'border-gold text-gold' : 'border-transparent text-cream/50 hover:text-cream'
            )}
          >
            {t.label}
            <span className="ml-1.5 text-xs bg-dark px-1.5 py-0.5 rounded-full text-cream/40">{t.count}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'listings' && (
        <div>
          {myListings.length === 0 ? (
            <div className="text-center py-16">
              <Car size={48} className="text-gold/30 mx-auto mb-4" />
              <p className="text-cream/50 mb-4">You haven't listed any cars yet.</p>
              <Link to="/sell" className="px-6 py-2 bg-gold text-dark font-bold rounded-lg">List Your First Car</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {myListings.map(car => <CarCard key={car.id} car={car} />)}
            </div>
          )}
        </div>
      )}

      {tab === 'auctions' && (
        <div>
          {myAuctions.length === 0 ? (
            <div className="text-center py-16">
              <Gavel size={48} className="text-gold/30 mx-auto mb-4" />
              <p className="text-cream/50 mb-4">You haven't created any auctions yet.</p>
              <Link to="/auctions/create" className="px-6 py-2 bg-gold text-dark font-bold rounded-lg">Create an Auction</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {myAuctions.map(a => <AuctionCard key={a.id} auction={a} />)}
            </div>
          )}
        </div>
      )}

      {tab === 'bids' && (
        <div>
          {myBids.length === 0 ? (
            <div className="text-center py-16">
              <Gavel size={48} className="text-gold/30 mx-auto mb-4" />
              <p className="text-cream/50 mb-4">You haven't placed any bids yet.</p>
              <Link to="/auctions" className="px-6 py-2 bg-gold text-dark font-bold rounded-lg">Browse Auctions</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {myBids.map(auction => {
                const myHighestBid = Math.max(...auction.bids.filter(b => b.bidderId === currentUser.id).map(b => b.amount));
                const isWinning = auction.currentBidderId === currentUser.id;
                return (
                  <Link
                    key={auction.id}
                    to={`/auctions/${auction.id}`}
                    className="block bg-dark-2 border border-gold/20 rounded-xl p-4 hover:border-gold/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-cream">{auction.car.year} {auction.car.make} {auction.car.model}</h3>
                        <p className="text-sm text-cream/50">Your bid: {formatCurrency(myHighestBid)}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-gold font-bold">{formatCurrency(auction.currentBid)}</div>
                        <span className={clsx(
                          'text-xs px-2 py-0.5 rounded-full',
                          isWinning ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
                        )}>
                          {isWinning ? 'Winning' : 'Outbid'}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
