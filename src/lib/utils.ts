import { SearchFilters, CarListing } from '@/types';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

export function formatMileage(miles: number): string {
  return new Intl.NumberFormat('en-US').format(miles) + ' mi';
}

export function getTimeLeft(endTime: string): { hours: number; minutes: number; seconds: number; total: number } {
  const end = new Date(endTime).getTime();
  const now = Date.now();
  const total = end - now;
  if (total <= 0) return { hours: 0, minutes: 0, seconds: 0, total: 0 };
  const hours = Math.floor(total / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((total % (1000 * 60)) / 1000);
  return { hours, minutes, seconds, total };
}

export function filterListings(listings: CarListing[], filters: SearchFilters): CarListing[] {
  return listings.filter(car => {
    if (filters.make && car.make.toLowerCase() !== filters.make.toLowerCase()) return false;
    if (filters.model && !car.model.toLowerCase().includes(filters.model.toLowerCase())) return false;
    if (filters.yearMin && car.year < parseInt(filters.yearMin)) return false;
    if (filters.yearMax && car.year > parseInt(filters.yearMax)) return false;
    if (filters.priceMin && car.price < parseInt(filters.priceMin)) return false;
    if (filters.priceMax && car.price > parseInt(filters.priceMax)) return false;
    if (filters.condition && car.condition !== filters.condition) return false;
    if (filters.bodyStyle && car.bodyStyle.toLowerCase() !== filters.bodyStyle.toLowerCase()) return false;
    if (filters.transmission && car.transmission !== filters.transmission) return false;
    if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
    if (filters.driveType && car.driveType !== filters.driveType) return false;
    if (filters.mileageMax && car.mileage > parseInt(filters.mileageMax)) return false;
    if (filters.color && !car.color.toLowerCase().includes(filters.color.toLowerCase())) return false;
    if (filters.restorationLevel && car.restorationLevel !== filters.restorationLevel) return false;
    if (filters.location && !car.location.toLowerCase().includes(filters.location.toLowerCase()) &&
        !car.state.toLowerCase().includes(filters.location.toLowerCase())) return false;
    return true;
  });
}

export const CAR_MAKES = [
  'Alfa Romeo', 'Aston Martin', 'Auburn', 'Austin-Healey', 'Bentley', 'BMW',
  'Bugatti', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Cord',
  'De Tomaso', 'Dodge', 'Duesenberg', 'Ferrari', 'Ford', 'Hudson',
  'Jaguar', 'Jensen', 'Lamborghini', 'Lancia', 'Lincoln', 'Lotus',
  'Maserati', 'Mercedes-Benz', 'MG', 'Nash', 'Oldsmobile', 'Packard',
  'Plymouth', 'Pontiac', 'Porsche', 'Rolls-Royce', 'Shelby', 'Studebaker',
  'Sunbeam', 'Talbot-Lago', 'Triumph', 'Tucker', 'Volkswagen', 'Volvo'
];

export const BODY_STYLES = [
  'Convertible', 'Coupe', 'Fastback', 'Hardtop', 'Limousine', 'Pickup Truck',
  'Roadster', 'Sedan', 'Spider', 'Station Wagon', 'Targa', 'Van'
];

export const RESTORATION_LEVELS = [
  'Original', 'Driver Quality', 'Partial Restoration', 'Full Restoration',
  'Concours Restoration', 'Resto-Mod', 'Project Car'
];

export const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY'
];
