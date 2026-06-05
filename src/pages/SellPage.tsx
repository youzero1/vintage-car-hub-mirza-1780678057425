import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useListings } from '@/hooks/useListings';
import { useAuth } from '@/hooks/useAuth';
import { CAR_MAKES, BODY_STYLES, RESTORATION_LEVELS, US_STATES } from '@/lib/utils';
import clsx from 'clsx';

const CONDITIONS = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor', 'Project'];
const TRANSMISSIONS = ['Automatic', 'Manual', '4-Speed Manual', '3-Speed Manual', 'Overdrive', 'Other'];
const FUEL_TYPES = ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Other'];
const DRIVE_TYPES = ['RWD', 'FWD', 'AWD', '4WD'];
const TITLE_STATUSES = ['Clean', 'Salvage', 'Rebuilt', 'Lien', 'Other'];

export default function SellPage() {
  const { currentUser } = useAuth();
  const { addNewListing } = useListings();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    make: '', model: '', year: '', trim: '', bodyStyle: '', color: '', interiorColor: '',
    mileage: '', engine: '', engineSize: '', horsepower: '', transmission: 'Automatic',
    fuelType: 'Gasoline', driveType: 'RWD', condition: 'Good', price: '', negotiable: false,
    vin: '', description: '', location: '', state: '', zipCode: '', titleStatus: 'Clean',
    serviceRecords: false, accidentHistory: false, certifiedPreOwned: false,
    numberOfOwners: '1', restorationLevel: 'Original', features: '',
  });

  function update(key: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    addNewListing({
      sellerId: currentUser.id,
      sellerName: currentUser.username,
      sellerContact: currentUser.email,
      make: form.make,
      model: form.model,
      year: parseInt(form.year) || 1970,
      trim: form.trim,
      bodyStyle: form.bodyStyle,
      color: form.color,
      interiorColor: form.interiorColor,
      mileage: parseInt(form.mileage) || 0,
      engine: form.engine,
      engineSize: form.engineSize,
      horsepower: form.horsepower,
      transmission: form.transmission as any,
      fuelType: form.fuelType as any,
      driveType: form.driveType as any,
      condition: form.condition as any,
      price: parseInt(form.price) || 0,
      negotiable: form.negotiable,
      vin: form.vin,
      description: form.description,
      features: form.features.split('\n').filter(f => f.trim()),
      images: [],
      location: form.location,
      state: form.state,
      zipCode: form.zipCode,
      titleStatus: form.titleStatus,
      serviceRecords: form.serviceRecords,
      accidentHistory: form.accidentHistory,
      certifiedPreOwned: form.certifiedPreOwned,
      numberOfOwners: parseInt(form.numberOfOwners) || 1,
      restorationLevel: form.restorationLevel,
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <CheckCircle size={64} className="text-gold mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-cream mb-4">Listing Submitted!</h2>
        <p className="text-cream/60 mb-8">Your vehicle has been listed successfully.</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => navigate('/browse')} className="px-6 py-3 bg-gold text-dark font-bold rounded-xl">Browse Listings</button>
          <button onClick={() => { setSubmitted(false); setForm({ make: '', model: '', year: '', trim: '', bodyStyle: '', color: '', interiorColor: '', mileage: '', engine: '', engineSize: '', horsepower: '', transmission: 'Automatic', fuelType: 'Gasoline', driveType: 'RWD', condition: 'Good', price: '', negotiable: false, vin: '', description: '', location: '', state: '', zipCode: '', titleStatus: 'Clean', serviceRecords: false, accidentHistory: false, certifiedPreOwned: false, numberOfOwners: '1', restorationLevel: 'Original', features: '' }); }} className="px-6 py-3 border border-gold text-gold font-bold rounded-xl">List Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-cream mb-2">List Your Classic Car</h1>
      <p className="text-cream/50 mb-8">Fill out the details below to list your vehicle on VCCP.</p>

      {!currentUser && (
        <div className="mb-6 p-4 bg-gold/10 border border-gold/30 rounded-xl text-cream/80 text-sm">
          You need to <button onClick={() => navigate('/login')} className="text-gold underline">sign in</button> or <button onClick={() => navigate('/register')} className="text-gold underline">register</button> to list a car.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <section className="bg-dark-2 border border-gold/20 rounded-xl p-6">
          <h3 className="text-lg font-bold text-cream mb-4">Vehicle Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-cream/50 mb-1">Make *</label>
              <select value={form.make} onChange={e => update('make', e.target.value)} required className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none">
                <option value="">Select Make</option>
                {CAR_MAKES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">Model *</label>
              <input value={form.model} onChange={e => update('model', e.target.value)} required placeholder="e.g. Mustang" className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none" />
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">Year *</label>
              <input value={form.year} onChange={e => update('year', e.target.value)} required type="number" min="1900" max="2004" placeholder="1967" className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none" />
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">Trim</label>
              <input value={form.trim} onChange={e => update('trim', e.target.value)} placeholder="e.g. GT Fastback" className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none" />
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">Body Style</label>
              <select value={form.bodyStyle} onChange={e => update('bodyStyle', e.target.value)} className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none">
                <option value="">Select Body Style</option>
                {BODY_STYLES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">Exterior Color</label>
              <input value={form.color} onChange={e => update('color', e.target.value)} placeholder="e.g. Highland Green" className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none" />
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">Interior Color</label>
              <input value={form.interiorColor} onChange={e => update('interiorColor', e.target.value)} placeholder="e.g. Black" className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none" />
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">Mileage</label>
              <input value={form.mileage} onChange={e => update('mileage', e.target.value)} type="number" placeholder="45200" className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none" />
            </div>
          </div>
        </section>

        {/* Engine & Drivetrain */}
        <section className="bg-dark-2 border border-gold/20 rounded-xl p-6">
          <h3 className="text-lg font-bold text-cream mb-4">Engine & Drivetrain</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-cream/50 mb-1">Engine Type</label>
              <input value={form.engine} onChange={e => update('engine', e.target.value)} placeholder="e.g. V8" className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none" />
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">Engine Size</label>
              <input value={form.engineSize} onChange={e => update('engineSize', e.target.value)} placeholder="e.g. 390 cu in" className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none" />
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">Horsepower</label>
              <input value={form.horsepower} onChange={e => update('horsepower', e.target.value)} placeholder="e.g. 320" className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none" />
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">Transmission</label>
              <select value={form.transmission} onChange={e => update('transmission', e.target.value)} className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none">
                {TRANSMISSIONS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">Fuel Type</label>
              <select value={form.fuelType} onChange={e => update('fuelType', e.target.value)} className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none">
                {FUEL_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">Drive Type</label>
              <select value={form.driveType} onChange={e => update('driveType', e.target.value)} className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none">
                {DRIVE_TYPES.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Condition & History */}
        <section className="bg-dark-2 border border-gold/20 rounded-xl p-6">
          <h3 className="text-lg font-bold text-cream mb-4">Condition & History</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-cream/50 mb-1">Condition</label>
              <select value={form.condition} onChange={e => update('condition', e.target.value)} className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none">
                {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">Restoration Level</label>
              <select value={form.restorationLevel} onChange={e => update('restorationLevel', e.target.value)} className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none">
                {RESTORATION_LEVELS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">Title Status</label>
              <select value={form.titleStatus} onChange={e => update('titleStatus', e.target.value)} className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none">
                {TITLE_STATUSES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">Number of Owners</label>
              <input value={form.numberOfOwners} onChange={e => update('numberOfOwners', e.target.value)} type="number" min="1" className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none" />
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">VIN</label>
              <input value={form.vin} onChange={e => update('vin', e.target.value)} placeholder="Vehicle Identification Number" className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none" />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {[
              { key: 'serviceRecords', label: 'Service Records Available' },
              { key: 'accidentHistory', label: 'Accident History' },
              { key: 'certifiedPreOwned', label: 'Certified Pre-Owned' },
              { key: 'negotiable', label: 'Price Negotiable' },
            ].map(item => (
              <label key={item.key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form[item.key as keyof typeof form] as boolean}
                  onChange={e => update(item.key, e.target.checked)}
                  className="accent-gold"
                />
                <span className="text-sm text-cream/70">{item.label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Pricing & Location */}
        <section className="bg-dark-2 border border-gold/20 rounded-xl p-6">
          <h3 className="text-lg font-bold text-cream mb-4">Pricing & Location</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-cream/50 mb-1">Asking Price ($) *</label>
              <input value={form.price} onChange={e => update('price', e.target.value)} required type="number" placeholder="89500" className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none" />
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">City</label>
              <input value={form.location} onChange={e => update('location', e.target.value)} placeholder="Detroit" className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none" />
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">State</label>
              <select value={form.state} onChange={e => update('state', e.target.value)} className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none">
                <option value="">Select State</option>
                {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">ZIP Code</label>
              <input value={form.zipCode} onChange={e => update('zipCode', e.target.value)} placeholder="48201" className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none" />
            </div>
          </div>
        </section>

        {/* Description & Features */}
        <section className="bg-dark-2 border border-gold/20 rounded-xl p-6">
          <h3 className="text-lg font-bold text-cream mb-4">Description & Features</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-cream/50 mb-1">Description *</label>
              <textarea value={form.description} onChange={e => update('description', e.target.value)} required rows={5} placeholder="Describe your vehicle in detail..." className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none resize-none" />
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">Features & Options (one per line)</label>
              <textarea value={form.features} onChange={e => update('features', e.target.value)} rows={4} placeholder="Power Steering\nRally Pac Gauge Cluster\nGT Equipment Group" className="w-full bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:border-gold outline-none resize-none" />
            </div>
          </div>
        </section>

        <button
          type="submit"
          className={clsx(
            'w-full py-4 font-bold text-lg rounded-xl transition-colors',
            currentUser
              ? 'bg-gold text-dark hover:bg-gold-light'
              : 'bg-gold/40 text-dark/60 cursor-not-allowed'
          )}
          disabled={!currentUser}
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
}
