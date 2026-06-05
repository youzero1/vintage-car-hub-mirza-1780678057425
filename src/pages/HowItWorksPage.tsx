import { Link } from 'react-router-dom';
import { Search, FileText, Gavel, HandshakeIcon, Shield, Award, TrendingUp, Users } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Search,
      title: 'Browse & Discover',
      desc: 'Search thousands of vintage and classic car listings. Filter by make, model, year, condition, and more to find exactly what you are looking for.',
      color: 'text-blue-400',
      bg: 'bg-blue-900/20 border-blue-700/30',
    },
    {
      icon: FileText,
      title: 'Detailed Listings',
      desc: 'Every listing includes full specifications, vehicle history, condition reports, restoration details, and direct seller contact information.',
      color: 'text-gold',
      bg: 'bg-gold/10 border-gold/20',
    },
    {
      icon: Gavel,
      title: 'Live Auctions',
      desc: 'Participate in real-time online auctions with live countdown timers, bid history, and instant notifications when you are outbid.',
      color: 'text-green-400',
      bg: 'bg-green-900/20 border-green-700/30',
    },
    {
      icon: HandshakeIcon,
      title: 'Secure Transaction',
      desc: 'Connect directly with verified sellers. Arrange inspections, negotiate terms, and complete your purchase with confidence.',
      color: 'text-purple-400',
      bg: 'bg-purple-900/20 border-purple-700/30',
    },
  ];

  const features = [
    { icon: Shield, title: 'Verified Sellers', desc: 'All sellers are verified members of the VCCP community with established track records.' },
    { icon: Award, title: 'Expert Curation', desc: 'Our team of classic car experts reviews listings to ensure accuracy and completeness.' },
    { icon: TrendingUp, title: 'Market Data', desc: 'Access historical sale prices and market trends to make informed buying and selling decisions.' },
    { icon: Users, title: 'Community', desc: 'Join thousands of collectors, restorers, and enthusiasts sharing a passion for vintage automobiles.' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-cream mb-4">How VCCP Works</h1>
        <p className="text-xl text-cream/60 max-w-2xl mx-auto leading-relaxed">
          The premier marketplace for vintage automobile collectors. Whether buying, selling, or bidding —
          VCCP makes the process simple, transparent, and exciting.
        </p>
      </div>

      {/* Steps */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-cream mb-10 text-center">The Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, i) => (
            <div key={step.title} className={`border rounded-2xl p-6 ${step.bg}`}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full bg-dark flex items-center justify-center border ${step.bg}`}>
                    <step.icon size={22} className={step.color} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-dark ${step.color}`}>
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-cream mb-2">{step.title}</h3>
                  <p className="text-cream/60 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* For Sellers */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-cream mb-4">For Sellers</h2>
            <p className="text-cream/60 leading-relaxed mb-6">
              List your vintage automobile on VCCP and reach thousands of serious collectors worldwide.
              Our platform gives you the tools to showcase your vehicle professionally.
            </p>
            <ul className="space-y-3">
              {[
                'Create detailed listings with full specifications',
                'Set your asking price or run a live auction',
                'Reach a global audience of verified collectors',
                'Manage your listings from your personal dashboard',
                'Track views, inquiries, and bid activity',
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-gold mt-0.5">✓</span>
                  <span className="text-cream/70 text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/sell" className="inline-block mt-6 px-6 py-3 bg-gold text-dark font-bold rounded-xl hover:bg-gold-light transition-colors">
              List Your Car
            </Link>
          </div>
          <div className="bg-dark-2 border border-gold/20 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">🏎️</div>
            <h3 className="text-lg font-bold text-cream mb-2">Ready to Sell?</h3>
            <p className="text-cream/50 text-sm">Join thousands of sellers who have successfully sold their classics on VCCP.</p>
          </div>
        </div>
      </section>

      {/* For Buyers */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 bg-dark-2 border border-gold/20 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-cream mb-2">Find Your Dream Car</h3>
            <p className="text-cream/50 text-sm">Browse an exclusive selection of the world's finest vintage automobiles.</p>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-bold text-cream mb-4">For Buyers</h2>
            <p className="text-cream/60 leading-relaxed mb-6">
              Discover rare and exceptional vintage automobiles from trusted sellers around the world.
              Our advanced search tools help you find exactly what you are looking for.
            </p>
            <ul className="space-y-3">
              {[
                'Advanced search and filtering options',
                'Detailed vehicle histories and condition reports',
                'Direct communication with sellers',
                'Participate in live auctions with real-time bidding',
                'Secure and transparent transaction process',
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-gold mt-0.5">✓</span>
                  <span className="text-cream/70 text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/browse" className="inline-block mt-6 px-6 py-3 bg-gold text-dark font-bold rounded-xl hover:bg-gold-light transition-colors">
              Browse Cars
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-cream mb-10 text-center">Why Choose VCCP</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map(f => (
            <div key={f.title} className="bg-dark-2 border border-gold/20 rounded-xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                <f.icon size={18} className="text-gold" />
              </div>
              <div>
                <h3 className="font-bold text-cream mb-1">{f.title}</h3>
                <p className="text-cream/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Auction Guide */}
      <section className="mb-20 bg-dark-2 border border-gold/20 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-cream mb-6 text-center">Auction Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Reserve Price', desc: 'The minimum price the seller will accept. Auctions can end without a sale if the reserve is not met.' },
            { title: 'Bid Increments', desc: 'Each new bid must exceed the current highest bid. The auction ends when the countdown timer reaches zero.' },
            { title: 'Winning a Bid', desc: 'The highest bidder when the auction ends (if reserve is met) wins and is connected with the seller to complete the sale.' },
          ].map(item => (
            <div key={item.title} className="text-center">
              <h4 className="text-gold font-bold mb-2">{item.title}</h4>
              <p className="text-cream/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-bold text-cream mb-4">Ready to Get Started?</h2>
        <p className="text-cream/60 mb-8">Join the VCCP community today and start your vintage car journey.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/register" className="px-8 py-3 bg-gold text-dark font-bold rounded-xl hover:bg-gold-light transition-colors">
            Create Free Account
          </Link>
          <Link to="/browse" className="px-8 py-3 border border-gold text-gold font-bold rounded-xl hover:bg-gold/10 transition-colors">
            Browse Listings
          </Link>
        </div>
      </section>
    </div>
  );
}
