import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Gavel, Star, Shield, TrendingUp, ChevronRight, Award } from 'lucide-react';
import Logo from '@/components/Logo';
import CarCard from '@/components/CarCard';
import AuctionCard from '@/components/AuctionCard';
import { getListings, getAuctions } from '@/lib/storage';
import { CarListing, Auction } from '@/types';
import { CAR_MAKES } from '@/lib/utils';

export default function HomePage() {
  const [featuredListings, setFeaturedListings] = useState<CarListing[]>([]);
  const [liveAuctions, setLiveAuctions] = useState<Auction[]>([]);
  const [searchMake, setSearchMake] = useState('');
  const [searchYear, setSearchYear] = useState('');

  useEffect(() => {
    const listings = getListings().filter(l => l.status === 'active').slice(0, 6);
    setFeaturedListings(listings);
    const auctions = getAuctions().filter(a => a.status === 'live' || a.status === 'upcoming').slice(0, 3);
    setLiveAuctions(auctions);
  }, []);

  const years = Array.from({ length: 80 }, (_, i) => 2004 - i);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-2 to-dark-3" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Logo size="xl" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-cream mb-6 leading-tight">
              Discover Rare<br />
              <span className="text-gold">Vintage Classics</span>
            </h1>
            <p className="text-xl text-cream/60 mb-10 leading-relaxed">
              The world's premier marketplace for buying, selling, and auctioning vintage automobiles.
              From muscle cars to European exotics — find your dream car.
            </p>

            {/* Quick search */}
            <div className="bg-dark-2/80 backdrop-blur border border-gold/30 rounded-2xl p-6 mb-8">
              <h3 className="text-gold font-semibold mb-4">Quick Search</h3>
              <div className="flex flex-wrap gap-3">
                <select
                  value={searchMake}
                  onChange={(e: any) => setSearchMake(e.target.value)}
                  className="flex-1 min-w-36 bg-dark border border-gold/30 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none"
                >
                  <option value="">Any Make</option>
                  {CAR_MAKES.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select
                  value={searchYear}
                  onChange={(e: any) => setSearchYear(e.target.value)}
                  className="flex-1 min-w-36 bg-dark border border-gold/30 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none"
                >
                  <option value="">Any Year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <Link
                  to={`/browse?make=${searchMake}&yearMin=${searchYear}&yearMax=${searchYear}`}
                  className="flex items-center gap-2 px-6 py-2 bg-gold text-dark font-bold rounded-lg hover:bg-gold-light transition-colors"
                >
                  <Search size={16} />
                  Search
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/browse"
                className="flex items-center gap-2 px-6 py-3 bg-gold text-dark font-bold rounded-xl hover:bg-gold-light transition-colors"
              >
                Browse All Cars
                <ChevronRight size={18} />
              </Link>
              <Link
                to="/auctions"
                className="flex items-center gap-2 px-6 py-3 border border-gold text-gold font-bold rounded-xl hover:bg-gold/10 transition-colors"
              >
                <Gavel size={18} />
                Live Auctions
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative car */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 500 250" width="500" height="250" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 165 L55 115 L130 80 L250 75 L370 80 L445 115 L460 165 L440 172 Q350 190 250 185 Q150 190 60 172 Z" fill="#c9a84c" />
            <path d="M130 115 L155 82 L250 78 L345 82 L370 115 Z" fill="#1a0a00" />
            <ellipse cx="130" cy="167" rx="28" ry="28" fill="#1a0a00" stroke="#c9a84c" strokeWidth="4" />
            <ellipse cx="370" cy="167" rx="28" ry="28" fill="#1a0a00" stroke="#c9a84c" strokeWidth="4" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-dark-2 border-y border-gold/20 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Active Listings', value: featuredListings.length + '+' },
              { label: 'Live Auctions', value: liveAuctions.filter(a => a.status === 'live').length.toString() },
              { label: 'Makes Available', value: '40+' },
              { label: 'Years Covered', value: '1920–2004' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-gold">{stat.value}</div>
                <div className="text-sm text-cream/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Auctions */}
      {liveAuctions.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Gavel className="text-gold" size={24} />
                <h2 className="text-2xl font-bold text-cream">Live Auctions</h2>
                <span className="text-xs px-2 py-1 bg-green-900/50 text-green-400 border border-green-700/50 rounded-full font-bold pulse-gold">● LIVE</span>
              </div>
              <p className="text-cream/50">Bid now on rare vintage classics</p>
            </div>
            <Link to="/auctions" className="flex items-center gap-1 text-gold hover:text-gold-light text-sm">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveAuctions.map(a => <AuctionCard key={a.id} auction={a} />)}
          </div>
        </section>
      )}

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Star className="text-gold" size={24} />
              <h2 className="text-2xl font-bold text-cream">Featured Listings</h2>
            </div>
            <p className="text-cream/50">Hand-picked vintage classics for sale</p>
          </div>
          <Link to="/browse" className="flex items-center gap-1 text-gold hover:text-gold-light text-sm">
            Browse All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map(car => <CarCard key={car.id} car={car} />)}
        </div>
      </section>

      {/* Browse by Make */}
      <section className="bg-dark-2 border-y border-gold/20 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-cream mb-8 text-center">Browse by Manufacturer</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {CAR_MAKES.slice(0, 20).map(make => (
              <Link
                key={make}
                to={`/browse?make=${make}`}
                className="px-4 py-2 bg-dark border border-gold/20 rounded-lg text-cream/70 hover:border-gold hover:text-gold transition-all text-sm"
              >
                {make}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-cream mb-12 text-center">Why VCCP?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: 'Verified Listings', desc: 'Every listing is reviewed for accuracy and completeness. Vehicle history and condition thoroughly documented.' },
            { icon: Award, title: 'Premium Auctions', desc: 'Live auction platform with real-time bidding, reserve prices, and countdown timers for maximum excitement.' },
            { icon: TrendingUp, title: 'Market Insights', desc: 'Access to vintage car valuations, market trends, and collector data to make informed buying decisions.' },
          ].map(f => (
            <div key={f.title} className="bg-dark-2 border border-gold/20 rounded-xl p-6 text-center">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <f.icon size={24} className="text-gold" />
              </div>
              <h3 className="text-lg font-bold text-cream mb-3">{f.title}</h3>
              <p className="text-cream/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-dark-2 to-dark-3 border-y border-gold/20 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-cream mb-4">Ready to Sell Your Classic?</h2>
          <p className="text-cream/60 mb-8">List your vintage automobile with VCCP and reach thousands of serious collectors worldwide.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/sell" className="px-8 py-3 bg-gold text-dark font-bold rounded-xl hover:bg-gold-light transition-colors">
              List Your Car
            </Link>
            <Link to="/auctions/create" className="px-8 py-3 border border-gold text-gold font-bold rounded-xl hover:bg-gold/10 transition-colors">
              Create Auction
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
