import { Link } from 'react-router-dom';
import { MapPin, Calendar, Gauge, Tag } from 'lucide-react';
import { CarListing } from '@/types';
import { formatCurrency, formatMileage } from '@/lib/utils';
import clsx from 'clsx';

type CarCardProps = {
  car: CarListing;
  compact?: boolean;
};

const CONDITION_COLORS: Record<string, string> = {
  'Excellent': 'bg-green-900/50 text-green-400 border-green-700/50',
  'Very Good': 'bg-blue-900/50 text-blue-400 border-blue-700/50',
  'Good': 'bg-yellow-900/50 text-yellow-400 border-yellow-700/50',
  'Fair': 'bg-orange-900/50 text-orange-400 border-orange-700/50',
  'Poor': 'bg-red-900/50 text-red-400 border-red-700/50',
  'Project': 'bg-purple-900/50 text-purple-400 border-purple-700/50',
};

export default function CarCard({ car, compact = false }: CarCardProps) {
  const conditionClass = CONDITION_COLORS[car.condition] || 'bg-gray-900/50 text-gray-400 border-gray-700/50';

  return (
    <Link
      to={`/listing/${car.id}`}
      className={clsx(
        'block bg-dark-2 border border-gold/20 rounded-xl overflow-hidden hover:border-gold/50 transition-all hover:shadow-lg hover:shadow-gold/10 group',
        compact ? '' : ''
      )}
    >
      {/* Image placeholder */}
      <div className={clsx('bg-dark-3 relative overflow-hidden', compact ? 'h-36' : 'h-48')}>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 200 100" width="160" height="80" xmlns="http://www.w3.org/2000/svg" opacity="0.3">
            <path d="M20 65 L25 48 L50 35 L100 33 L150 35 L175 48 L180 65 L170 68 Q140 75 100 73 Q60 75 30 68 Z" fill="#c9a84c" />
            <path d="M50 48 L60 36 L100 34 L140 36 L150 48 Z" fill="#1a0a00" opacity="0.8" />
            <circle cx="55" cy="67" r="9" fill="#1a0a00" stroke="#c9a84c" strokeWidth="2" />
            <circle cx="145" cy="67" r="9" fill="#1a0a00" stroke="#c9a84c" strokeWidth="2" />
          </svg>
        </div>
        <div className="absolute top-2 left-2">
          <span className={clsx('text-xs px-2 py-1 rounded border font-medium', conditionClass)}>
            {car.condition}
          </span>
        </div>
        {car.status === 'sold' && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-red-400 font-bold text-lg border-2 border-red-400 px-4 py-1 rounded rotate-[-10deg]">SOLD</span>
          </div>
        )}
        {car.auctionId && (
          <div className="absolute top-2 right-2">
            <span className="text-xs px-2 py-1 bg-gold/20 border border-gold/50 text-gold rounded font-medium">AUCTION</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className={clsx('font-bold text-cream group-hover:text-gold transition-colors', compact ? 'text-sm' : 'text-base')}>
            {car.year} {car.make} {car.model}
          </h3>
          <span className={clsx('font-bold text-gold whitespace-nowrap', compact ? 'text-sm' : 'text-base')}>
            {formatCurrency(car.price)}
          </span>
        </div>

        {!compact && (
          <p className="text-xs text-cream/50 mb-1">{car.trim}</p>
        )}

        <div className="grid grid-cols-2 gap-1 mt-3">
          <div className="flex items-center gap-1 text-xs text-cream/50">
            <Gauge size={10} />
            <span>{formatMileage(car.mileage)}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-cream/50">
            <Calendar size={10} />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-cream/50">
            <MapPin size={10} />
            <span>{car.location}, {car.state}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-cream/50">
            <Tag size={10} />
            <span>{car.bodyStyle}</span>
          </div>
        </div>

        {!compact && (
          <div className="mt-3 flex flex-wrap gap-1">
            <span className="text-xs px-2 py-0.5 bg-dark border border-gold/20 rounded text-cream/50">{car.engine}</span>
            <span className="text-xs px-2 py-0.5 bg-dark border border-gold/20 rounded text-cream/50">{car.transmission}</span>
            <span className="text-xs px-2 py-0.5 bg-dark border border-gold/20 rounded text-cream/50">{car.restorationLevel}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
