import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-gold/20 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo size="sm" />
            <p className="mt-4 text-cream/50 text-sm leading-relaxed">
              The premier marketplace for vintage and classic automobile enthusiasts worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-gold font-semibold mb-4">Buy & Sell</h4>
            <ul className="space-y-2">
              <li><Link to="/browse" className="text-cream/50 hover:text-gold text-sm transition-colors">Browse Listings</Link></li>
              <li><Link to="/sell" className="text-cream/50 hover:text-gold text-sm transition-colors">Sell Your Car</Link></li>
              <li><Link to="/auctions" className="text-cream/50 hover:text-gold text-sm transition-colors">Live Auctions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gold font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/how-it-works" className="text-cream/50 hover:text-gold text-sm transition-colors">How It Works</Link></li>
              <li><Link to="/register" className="text-cream/50 hover:text-gold text-sm transition-colors">Create Account</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gold font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-cream/50">
              <li>info@vccp.com</li>
              <li>1-800-VCCP-CAR</li>
              <li>Mon–Fri 9AM–6PM EST</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gold/10 text-center text-cream/30 text-sm">
          © {new Date().getFullYear()} VCCP — Vintage Car Collector Portal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
