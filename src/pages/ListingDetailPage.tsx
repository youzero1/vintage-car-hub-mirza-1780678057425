import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Calendar, Gauge, ChevronLeft, CheckCircle, XCircle, Award, Wrench, Users, AlertTriangle } from 'lucide-react';
import { CarListing } from '@/types';
import { getListings } from '@/lib/storage';
import { formatCurrency, formatMileage } from '@/lib/utils';
import clsx from 'clsx';

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<CarListing | null>(null);

  useEffect(() => {
    const listings = getListings();
    const found = listings.find(l => l.id === id);
    if (found) setCar(found);
  }, [id]);

  if (!car) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-cream mb-4">Listing Not Found</h2>
        <Link to="/browse" className="text-gold hover:underline">Browse All Listings</Link>
      </div>
    );
  }

  const specs = [
    { label: 'Make', value: car.make },
    { label: 'Model', value: car.model },
    { label: 'Year', value: car.year.toString() },
    { label: 'Trim', value: car.trim },
    { label: 'Body Style', value: car.bodyStyle },
    { label: 'Color', value: car.color },
    { label: 'Interior Color', value: car.interiorColor },
    { label: 'Mileage', value: formatMileage(car.mileage) },
    { label: 'Engine', value: `${car.engine} — ${car.engineSize}` },
    { label: 'Horsepower', value: car.horsepower + ' hp' },
    { label: 'Transmission', value: car.transmission },
    { label: 'Fuel Type', value: car.fuelType },
    { label: 'Drive Type', value: car.driveType },
    { label: 'Condition', value: car.condition },
    { label: 'Restoration', value: car.restorationLevel },
    { label: 'VIN', value: car.vin },
    { label: 'Title Status', value: car.titleStatus },
    { label: 'Number of Owners', value: car.numberOfOwners.toString() },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-cream/50 hover:text-gold text-sm mb-6 transition-colors"
      >
        <ChevronLeft size={16} />
        Back to Listings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Images + Details */}
        <div className="lg:col-span-2">
          {/* Image Gallery Placeholder */}
          <div className="bg-dark-2 border border-gold/20 rounded-xl overflow-hidden mb-6">
            <div className="h-72 md:h-96 flex items-center justify-center bg-dark-3">
              <svg viewBox="0 0 500 250" width="360" height="180" xmlns="http://www.w3.org/2000/svg" opacity="0.4">
                <path d="M40 165 L55 115 L130 80 L250 75 L370 80 L445 115 L460 165 L440 172 Q350 190 250 185 Q150 190 60 172 Z" fill="#c9a84c" />
                <path d="M130 115 L155 82 L250 78 L345 82 L370 115 Z" fill="#1a0a00" />
                <ellipse cx="130" cy="167" rx="28" ry="28" fill="#1a0a00" stroke="#c9a84c" strokeWidth="4" />
                <ellipse cx="370" cy="167" rx="28" ry="28" fill="#1a0a00" stroke="#c9a84c" strokeWidth="4" />
              </svg>
            </div>
          </div>

          {/* Title + Price */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-cream">{car.year} {car.make} {car.model}</h1>
              <p className="text-cream/60 mt-1">{car.trim} • {car.bodyStyle}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gold">{formatCurrency(car.price)}</div>
              {car.negotiable && <div className="text-sm text-cream/50">Price Negotiable</div>}
            </div>
          </div>

          {/* Description */}
          <div className="bg-dark-2 border border-gold/20 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-cream mb-3">Description</h3>
            <p className="text-cream/70 leading-relaxed">{car.description}</p>
          </div>

          {/* Specs Grid */}
          <div className="bg-dark-2 border border-gold/20 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-cream mb-4">Vehicle Specifications</h3>
            <div className="grid grid-cols-2 gap-3">
              {specs.map(s => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-xs text-cream/40 uppercase tracking-wide">{s.label}</span>
                  <span className="text-sm text-cream font-medium">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          {car.features.length > 0 && (
            <div className="bg-dark-2 border border-gold/20 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-bold text-cream mb-4">Features & Options</h3>
              <div className="grid grid-cols-2 gap-2">
                {car.features.map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-gold flex-shrink-0" />
                    <span className="text-sm text-cream/70">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vehicle History */}
          <div className="bg-dark-2 border border-gold/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-cream mb-4">Vehicle History</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Accident History', value: car.accidentHistory, positive: false },
                { label: 'Service Records', value: car.serviceRecords, positive: true },
                { label: 'Certified Pre-Owned', value: car.certifiedPreOwned, positive: true },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  {item.positive ? (
                    item.value ? <CheckCircle size={16} className="text-green-400" /> : <XCircle size={16} className="text-red-400" />
                  ) : (
                    item.value ? <AlertTriangle size={16} className="text-orange-400" /> : <CheckCircle size={16} className="text-green-400" />
                  )}
                  <span className="text-sm text-cream/70">{item.label}: <span className={clsx('font-medium', item.positive ? (item.value ? 'text-green-400' : 'text-red-400') : (item.value ? 'text-orange-400' : 'text-green-400'))}>{item.value ? 'Yes' : 'No'}</span></span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gold" />
                <span className="text-sm text-cream/70">Owners: <span className="font-medium text-cream">{car.numberOfOwners}</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Seller Info */}
        <div className="lg:col-span-1">
          <div className="bg-dark-2 border border-gold/30 rounded-xl p-6 sticky top-20">
            <h3 className="text-lg font-bold text-cream mb-4">Seller Information</h3>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                <Award size={20} className="text-gold" />
              </div>
              <div>
                <div className="font-semibold text-cream">{car.sellerName}</div>
                <div className="text-xs text-cream/50">Verified Seller</div>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-3 text-sm text-cream/70">
                <Mail size={14} className="text-gold" />
                <span>{car.sellerContact}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-cream/70">
                <MapPin size={14} className="text-gold" />
                <span>{car.location}, {car.state} {car.zipCode}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-cream/70">
                <Calendar size={14} className="text-gold" />
                <span>Listed {car.listingDate}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-cream/70">
                <Gauge size={14} className="text-gold" />
                <span>{formatMileage(car.mileage)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={`mailto:${car.sellerContact}`}
                className="block w-full text-center py-3 bg-gold text-dark font-bold rounded-lg hover:bg-gold-light transition-colors"
              >
                <Mail size={16} className="inline mr-2" />
                Email Seller
              </a>
              <a
                href="tel:555-0000"
                className="block w-full text-center py-3 border border-gold text-gold font-bold rounded-lg hover:bg-gold/10 transition-colors"
              >
                <Phone size={16} className="inline mr-2" />
                Call Seller
              </a>
            </div>

            <div className="mt-5 pt-5 border-t border-gold/20">
              <h4 className="text-sm font-semibold text-cream mb-2">Quick Facts</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-cream/50">Condition:</span>
                  <span className="text-cream font-medium">{car.condition}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cream/50">Restoration:</span>
                  <span className="text-cream font-medium">{car.restorationLevel}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cream/50">Title:</span>
                  <span className="text-cream font-medium">{car.titleStatus}</span>
                </div>
              </div>
            </div>

            {car.auctionId && (
              <Link
                to={`/auctions/${car.auctionId}`}
                className="mt-4 block w-full text-center py-3 bg-gold/20 border border-gold text-gold font-bold rounded-lg hover:bg-gold/30 transition-colors"
              >
                View Auction
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
