import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown, ChevronUp, Grid, List } from 'lucide-react';
import CarCard from '@/components/CarCard';
import { getListings } from '@/lib/storage';
import { CarListing, SearchFilters } from '@/types';
import { filterListings, CAR_MAKES, BODY_STYLES, RESTORATION_LEVELS, US_STATES } from '@/lib/utils';
import clsx from 'clsx';

const DEFAULT_FILTERS: SearchFilters = {
  make: '', model: '', yearMin: '', yearMax: '', priceMin: '', priceMax: '',
  condition: '', bodyStyle: '', transmission: '', fuelType: '', driveType: '',
  location: '', mileageMax: '', color: '', restorationLevel: ''
};

const CONDITIONS = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor', 'Project'];
const TRANSMISSIONS = ['Automatic', 'Manual', '4-Speed Manual', '3-Speed Manual', 'Overdrive', 'Other'];
const FUEL_TYPES = ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Other'];
const DRIVE_TYPES = ['RWD', 'FWD', 'AWD', '4WD'];

export default function BrowsePage() {
  const [searchParams] = useSearchParams();
  const [allListings, setAllListings] = useState<CarListing[]>([]);
  const [filtered, setFiltered] = useState<CarListing[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    ...DEFAULT_FILTERS,
    make: searchParams.get('make') || '',
    yearMin: searchParams.get('yearMin') || '',
    yearMax: searchParams.get('yearMax') || '',
  });
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState<Record<string, boolean>>({
    make: true, price: true, year: true, condition: true, specs: false, location: false
  });

  useEffect(() => {
    const listings = getListings();
    setAllListings(listings);
  }, []);

  useEffect(() => {
    let result = filterListings(allListings, filters);
    result = [...result].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'year-desc') return b.year - a.year;
      if (sortBy === 'year-asc') return a.year - b.year;
      if (sortBy === 'mileage') return a.mileage - b.mileage;
      return new Date(b.listingDate).getTime() - new Date(a.listingDate).getTime();
    });
    setFiltered(result);
  }, [allListings, filters, sortBy]);

  function updateFilter(key: keyof SearchFilters, value: string) {
    setFilters(prev => ({ ...prev, [key]: value }));
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  function toggleSection(key: string) {
    setFiltersOpen(prev => ({ ...prev, [key]: !prev[key] }));
  }

  const activeFilterCount = Object.values(filters).filter(v => v !== '').length;
  const years = Array.from({ length: 80 }, (_, i) => 2004 - i);

  function FilterSection({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (
      <div className="border-b border-gold/10 pb-4 mb-4">
        <button
          onClick={() => toggleSection(id)}
          className="flex items-center justify-between w-full text-sm font-semibold text-cream/80 mb-3"
        >
          {title}
          {filtersOpen[id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {filtersOpen[id] && children}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-cream mb-2">Browse Vintage Cars</h1>
        <p className="text-cream/50">{filtered.length} listings found</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters */}
        {showFilters && (
          <aside className="w-72 flex-shrink-0">
            <div className="bg-dark-2 border border-gold/20 rounded-xl p-5 sticky top-20">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-cream flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-gold" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="text-xs px-2 py-0.5 bg-gold/20 text-gold rounded-full">{activeFilterCount}</span>
                  )}
                </h3>
                {activeFilterCount > 0 && (
                  <button onClick={clearFilters} className="text-xs text-rust-light hover:text-rust flex items-center gap-1">
                    <X size={12} /> Clear All
                  </button>
                )}
              </div>

              <FilterSection title="Make" id="make">
                <select
                  value={filters.make}
                  onChange={(e: any) => updateFilter('make', e.target.value)}
                  className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none"
                >
                  <option value="">All Makes</option>
                  {CAR_MAKES.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <input
                  value={filters.model}
                  onChange={(e: any) => updateFilter('model', e.target.value)}
                  placeholder="Model..."
                  className="mt-2 w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none"
                />
              </FilterSection>

              <FilterSection title="Year" id="year">
                <div className="flex gap-2">
                  <select
                    value={filters.yearMin}
                    onChange={(e: any) => updateFilter('yearMin', e.target.value)}
                    className="flex-1 bg-dark border border-gold/20 rounded-lg px-2 py-2 text-cream text-xs focus:border-gold outline-none"
                  >
                    <option value="">Min Year</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                  <select
                    value={filters.yearMax}
                    onChange={(e: any) => updateFilter('yearMax', e.target.value)}
                    className="flex-1 bg-dark border border-gold/20 rounded-lg px-2 py-2 text-cream text-xs focus:border-gold outline-none"
                  >
                    <option value="">Max Year</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </FilterSection>

              <FilterSection title="Price" id="price">
                <div className="flex gap-2">
                  <input
                    value={filters.priceMin}
                    onChange={(e: any) => updateFilter('priceMin', e.target.value)}
                    placeholder="Min $"
                    type="number"
                    className="flex-1 bg-dark border border-gold/20 rounded-lg px-2 py-2 text-cream text-xs focus:border-gold outline-none"
                  />
                  <input
                    value={filters.priceMax}
                    onChange={(e: any) => updateFilter('priceMax', e.target.value)}
                    placeholder="Max $"
                    type="number"
                    className="flex-1 bg-dark border border-gold/20 rounded-lg px-2 py-2 text-cream text-xs focus:border-gold outline-none"
                  />
                </div>
              </FilterSection>

              <FilterSection title="Condition" id="condition">
                <div className="space-y-1">
                  {CONDITIONS.map(c => (
                    <label key={c} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="condition"
                        value={c}
                        checked={filters.condition === c}
                        onChange={(e: any) => updateFilter('condition', e.target.value)}
                        className="accent-gold"
                      />
                      <span className="text-sm text-cream/70">{c}</span>
                    </label>
                  ))}
                  {filters.condition && (
                    <button onClick={() => updateFilter('condition', '')} className="text-xs text-rust-light mt-1">Clear</button>
                  )}
                </div>
              </FilterSection>

              <FilterSection title="Specs & Style" id="specs">
                <div className="space-y-2">
                  <select
                    value={filters.bodyStyle}
                    onChange={(e: any) => updateFilter('bodyStyle', e.target.value)}
                    className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-xs focus:border-gold outline-none"
                  >
                    <option value="">Body Style</option>
                    {BODY_STYLES.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <select
                    value={filters.transmission}
                    onChange={(e: any) => updateFilter('transmission', e.target.value)}
                    className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-xs focus:border-gold outline-none"
                  >
                    <option value="">Transmission</option>
                    {TRANSMISSIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <select
                    value={filters.fuelType}
                    onChange={(e: any) => updateFilter('fuelType', e.target.value)}
                    className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-xs focus:border-gold outline-none"
                  >
                    <option value="">Fuel Type</option>
                    {FUEL_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <select
                    value={filters.driveType}
                    onChange={(e: any) => updateFilter('driveType', e.target.value)}
                    className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-xs focus:border-gold outline-none"
                  >
                    <option value="">Drive Type</option>
                    {DRIVE_TYPES.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <select
                    value={filters.restorationLevel}
                    onChange={(e: any) => updateFilter('restorationLevel', e.target.value)}
                    className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-xs focus:border-gold outline-none"
                  >
                    <option value="">Restoration Level</option>
                    {RESTORATION_LEVELS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <input
                    value={filters.mileageMax}
                    onChange={(e: any) => updateFilter('mileageMax', e.target.value)}
                    placeholder="Max Mileage"
                    type="number"
                    className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-xs focus:border-gold outline-none"
                  />
                </div>
              </FilterSection>

              <FilterSection title="Location" id="location">
                <div className="space-y-2">
                  <input
                    value={filters.location}
                    onChange={(e: any) => updateFilter('location', e.target.value)}
                    placeholder="City or State..."
                    className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none"
                  />
                  <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto scrollbar-hide">
                    {US_STATES.slice(0, 15).map(s => (
                      <button
                        key={s}
                        onClick={() => updateFilter('location', s)}
                        className={clsx(
                          'text-xs px-2 py-1 rounded border transition-colors',
                          filters.location === s
                            ? 'bg-gold/20 border-gold text-gold'
                            : 'bg-dark border-gold/20 text-cream/50 hover:border-gold/50'
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </FilterSection>
            </div>
          </aside>
        )}

        {/* Main content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 bg-dark-2 border border-gold/20 rounded-lg text-cream/70 hover:border-gold hover:text-gold text-sm transition-colors"
            >
              <SlidersHorizontal size={14} />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-dark-2 border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-desc">Year: Newest</option>
              <option value="year-asc">Year: Oldest</option>
              <option value="mileage">Lowest Mileage</option>
            </select>
            <div className="ml-auto flex gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={clsx('p-2 rounded-lg border', viewMode === 'grid' ? 'bg-gold/20 border-gold text-gold' : 'bg-dark-2 border-gold/20 text-cream/50')}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={clsx('p-2 rounded-lg border', viewMode === 'list' ? 'bg-gold/20 border-gold text-gold' : 'bg-dark-2 border-gold/20 text-cream/50')}
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-bold text-cream mb-2">No listings found</h3>
              <p className="text-cream/50 mb-6">Try adjusting your filters to see more results.</p>
              <button onClick={clearFilters} className="px-6 py-2 bg-gold text-dark font-bold rounded-lg">
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={clsx(
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'
                : 'flex flex-col gap-4'
            )}>
              {filtered.map(car => <CarCard key={car.id} car={car} compact={viewMode === 'list'} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
