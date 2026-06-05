import { CarListing, Auction, User, Bid } from '@/types';

const KEYS = {
  listings: 'vccp_listings',
  auctions: 'vccp_auctions',
  users: 'vccp_users',
  currentUser: 'vccp_current_user',
};

export function getListings(): CarListing[] {
  try {
    const raw = localStorage.getItem(KEYS.listings);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveListings(listings: CarListing[]): void {
  localStorage.setItem(KEYS.listings, JSON.stringify(listings));
}

export function getAuctions(): Auction[] {
  try {
    const raw = localStorage.getItem(KEYS.auctions);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveAuctions(auctions: Auction[]): void {
  localStorage.setItem(KEYS.auctions, JSON.stringify(auctions));
}

export function getUsers(): User[] {
  try {
    const raw = localStorage.getItem(KEYS.users);
    const users = raw ? JSON.parse(raw) : [];
    if (users.length === 0) {
      const defaults: User[] = [
        { id: 'u1', username: 'ClassicSeller', email: 'seller@vccp.com', password: 'pass123', role: 'seller', joinDate: '2024-01-01', phone: '555-0101' },
        { id: 'u2', username: 'VintageBidder', email: 'bidder@vccp.com', password: 'pass123', role: 'bidder', joinDate: '2024-01-02', phone: '555-0102' },
        { id: 'u3', username: 'CarCollector', email: 'collector@vccp.com', password: 'pass123', role: 'both', joinDate: '2024-01-03', phone: '555-0103' },
      ];
      localStorage.setItem(KEYS.users, JSON.stringify(defaults));
      return defaults;
    }
    return users;
  } catch { return []; }
}

export function saveUsers(users: User[]): void {
  localStorage.setItem(KEYS.users, JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(KEYS.currentUser);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function setCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(KEYS.currentUser, JSON.stringify(user));
  } else {
    localStorage.removeItem(KEYS.currentUser);
  }
}

export function addListing(listing: CarListing): void {
  const listings = getListings();
  listings.push(listing);
  saveListings(listings);
}

export function addAuction(auction: Auction): void {
  const auctions = getAuctions();
  auctions.push(auction);
  saveAuctions(auctions);
}

export function updateAuction(updated: Auction): void {
  const auctions = getAuctions();
  const idx = auctions.findIndex(a => a.id === updated.id);
  if (idx !== -1) {
    auctions[idx] = updated;
    saveAuctions(auctions);
  }
}

export function placeBid(auctionId: string, bid: Bid, newAmount: number): boolean {
  const auctions = getAuctions();
  const auction = auctions.find(a => a.id === auctionId);
  if (!auction) return false;
  if (auction.status !== 'live') return false;
  if (bid.amount <= auction.currentBid) return false;
  auction.bids.push(bid);
  auction.currentBid = newAmount;
  auction.currentBidderId = bid.bidderId;
  auction.currentBidderName = bid.bidderName;
  saveAuctions(auctions);
  return true;
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

export function initSampleData(): void {
  const listings = getListings();
  if (listings.length > 0) return;

  const sampleListings: CarListing[] = [
    {
      id: 'car001', sellerId: 'u1', sellerName: 'ClassicSeller', sellerContact: 'seller@vccp.com',
      make: 'Ford', model: 'Mustang', year: 1967, trim: 'GT Fastback', bodyStyle: 'Fastback',
      color: 'Highland Green', interiorColor: 'Black', mileage: 45200, engine: 'V8',
      engineSize: '390 cu in', horsepower: '320', transmission: 'Manual', fuelType: 'Gasoline',
      driveType: 'RWD', condition: 'Excellent', price: 89500, negotiable: true,
      vin: '7R01C125639', description: 'Stunning 1967 Ford Mustang GT Fastback in Highland Green. Numbers matching engine, professionally restored.',
      features: ['Power Steering', 'Rally Pac Gauge Cluster', 'GT Equipment Group', 'Deluxe Interior', 'Fold-Down Rear Seat'],
      images: [], location: 'Detroit', state: 'MI', zipCode: '48201', listingDate: '2024-11-01',
      status: 'active', certifiedPreOwned: false, accidentHistory: false, titleStatus: 'Clean',
      serviceRecords: true, numberOfOwners: 2, restorationLevel: 'Full Restoration'
    },
    {
      id: 'car002', sellerId: 'u3', sellerName: 'CarCollector', sellerContact: 'collector@vccp.com',
      make: 'Chevrolet', model: 'Camaro', year: 1969, trim: 'Z/28', bodyStyle: 'Coupe',
      color: 'Fathom Green', interiorColor: 'Black', mileage: 38000, engine: 'V8',
      engineSize: '302 cu in', horsepower: '290', transmission: '4-Speed Manual', fuelType: 'Gasoline',
      driveType: 'RWD', condition: 'Very Good', price: 125000, negotiable: false,
      vin: '124379N601234', description: 'Rare 1969 Chevrolet Camaro Z/28. Documented, matching numbers car with original window sticker.',
      features: ['Rally Sport Package', 'Cowl Induction Hood', 'Houndstooth Interior', 'Positraction Rear', 'Chrome Bumpers'],
      images: [], location: 'Chicago', state: 'IL', zipCode: '60601', listingDate: '2024-11-05',
      status: 'active', certifiedPreOwned: false, accidentHistory: false, titleStatus: 'Clean',
      serviceRecords: true, numberOfOwners: 1, restorationLevel: 'Original'
    },
    {
      id: 'car003', sellerId: 'u1', sellerName: 'ClassicSeller', sellerContact: 'seller@vccp.com',
      make: 'Porsche', model: '911', year: 1973, trim: 'Carrera RS', bodyStyle: 'Coupe',
      color: 'Grand Prix White', interiorColor: 'Black', mileage: 62000, engine: 'Flat-6',
      engineSize: '2.7L', horsepower: '210', transmission: 'Manual', fuelType: 'Gasoline',
      driveType: 'RWD', condition: 'Excellent', price: 475000, negotiable: false,
      vin: '9113600xxx', description: 'Legendary 1973 Porsche 911 Carrera RS 2.7. One of the most desirable 911s ever produced.',
      features: ['Ducktail Spoiler', 'Lightweight Body Panels', 'Bucket Seats', 'Sport Suspension', 'Magnesium Wheels'],
      images: [], location: 'Los Angeles', state: 'CA', zipCode: '90001', listingDate: '2024-11-10',
      status: 'active', certifiedPreOwned: false, accidentHistory: false, titleStatus: 'Clean',
      serviceRecords: true, numberOfOwners: 3, restorationLevel: 'Original'
    },
    {
      id: 'car004', sellerId: 'u3', sellerName: 'CarCollector', sellerContact: 'collector@vccp.com',
      make: 'Dodge', model: 'Charger', year: 1970, trim: 'R/T', bodyStyle: 'Coupe',
      color: 'Plum Crazy Purple', interiorColor: 'Black', mileage: 55000, engine: 'V8',
      engineSize: '440 cu in', horsepower: '375', transmission: 'Automatic', fuelType: 'Gasoline',
      driveType: 'RWD', condition: 'Very Good', price: 98000, negotiable: true,
      vin: 'XS29H0B123456', description: 'Eye-catching 1970 Dodge Charger R/T in Plum Crazy. The iconic muscle car at its finest.',
      features: ['Ramcharger Air Induction', 'Power Windows', 'Bench Seat', 'AM/FM Radio', 'Heavy Duty Suspension'],
      images: [], location: 'Nashville', state: 'TN', zipCode: '37201', listingDate: '2024-11-12',
      status: 'active', certifiedPreOwned: false, accidentHistory: false, titleStatus: 'Clean',
      serviceRecords: false, numberOfOwners: 2, restorationLevel: 'Partial Restoration'
    },
    {
      id: 'car005', sellerId: 'u1', sellerName: 'ClassicSeller', sellerContact: 'seller@vccp.com',
      make: 'Ferrari', model: '308 GTB', year: 1978, trim: 'Base', bodyStyle: 'Coupe',
      color: 'Rosso Corsa', interiorColor: 'Tan', mileage: 28000, engine: 'V8',
      engineSize: '3.0L', horsepower: '255', transmission: 'Manual', fuelType: 'Gasoline',
      driveType: 'RWD', condition: 'Excellent', price: 195000, negotiable: false,
      vin: 'ZFFGA21B000023456', description: 'Immaculate 1978 Ferrari 308 GTB Vetroresina. Dry sump engine, fiberglass body.',
      features: ['Fiberglass Body', 'Dry Sump Engine', 'Borrani Wire Wheels', 'Leather Interior', 'Tool Roll'],
      images: [], location: 'Miami', state: 'FL', zipCode: '33101', listingDate: '2024-11-15',
      status: 'active', certifiedPreOwned: false, accidentHistory: false, titleStatus: 'Clean',
      serviceRecords: true, numberOfOwners: 2, restorationLevel: 'Original'
    },
    {
      id: 'car006', sellerId: 'u3', sellerName: 'CarCollector', sellerContact: 'collector@vccp.com',
      make: 'Mercedes-Benz', model: '300SL', year: 1955, trim: 'Gullwing', bodyStyle: 'Coupe',
      color: 'Silver', interiorColor: 'Red', mileage: 42000, engine: 'Inline-6',
      engineSize: '3.0L', horsepower: '215', transmission: 'Manual', fuelType: 'Gasoline',
      driveType: 'RWD', condition: 'Excellent', price: 1450000, negotiable: false,
      vin: '1980410002345', description: 'The iconic 1955 Mercedes-Benz 300SL Gullwing. One of the most significant cars of the 20th century.',
      features: ['Gullwing Doors', 'Fuel Injection', 'Tubular Space Frame', 'Leather Interior', 'Original Tools'],
      images: [], location: 'New York', state: 'NY', zipCode: '10001', listingDate: '2024-11-18',
      status: 'active', certifiedPreOwned: false, accidentHistory: false, titleStatus: 'Clean',
      serviceRecords: true, numberOfOwners: 3, restorationLevel: 'Concours Restoration'
    },
  ];

  saveListings(sampleListings);

  const auctions = getAuctions();
  if (auctions.length > 0) return;

  const now = new Date();
  const liveEnd = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  const upcomingStart = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const upcomingEnd = new Date(now.getTime() + 48 * 60 * 60 * 1000);

  const sampleAuctions: Auction[] = [
    {
      id: 'auc001',
      carId: 'car001',
      sellerId: 'u1',
      sellerName: 'ClassicSeller',
      startingBid: 70000,
      reservePrice: 85000,
      currentBid: 76500,
      currentBidderId: 'u2',
      currentBidderName: 'VintageBidder',
      status: 'live',
      startTime: now.toISOString(),
      endTime: liveEnd.toISOString(),
      durationHours: 2,
      bids: [
        { id: 'b1', auctionId: 'auc001', bidderId: 'u2', bidderName: 'VintageBidder', amount: 70500, timestamp: new Date(now.getTime() - 30 * 60000).toISOString() },
        { id: 'b2', auctionId: 'auc001', bidderId: 'u3', bidderName: 'CarCollector', amount: 73000, timestamp: new Date(now.getTime() - 20 * 60000).toISOString() },
        { id: 'b3', auctionId: 'auc001', bidderId: 'u2', bidderName: 'VintageBidder', amount: 76500, timestamp: new Date(now.getTime() - 10 * 60000).toISOString() },
      ],
      car: sampleListings[0],
    },
    {
      id: 'auc002',
      carId: 'car003',
      sellerId: 'u1',
      sellerName: 'ClassicSeller',
      startingBid: 400000,
      reservePrice: 450000,
      currentBid: 415000,
      currentBidderId: 'u3',
      currentBidderName: 'CarCollector',
      status: 'live',
      startTime: now.toISOString(),
      endTime: new Date(now.getTime() + 4 * 60 * 60 * 1000).toISOString(),
      durationHours: 4,
      bids: [
        { id: 'b4', auctionId: 'auc002', bidderId: 'u3', bidderName: 'CarCollector', amount: 415000, timestamp: new Date(now.getTime() - 15 * 60000).toISOString() },
      ],
      car: sampleListings[2],
    },
    {
      id: 'auc003',
      carId: 'car006',
      sellerId: 'u3',
      sellerName: 'CarCollector',
      startingBid: 1200000,
      reservePrice: 1400000,
      currentBid: 1200000,
      currentBidderId: '',
      currentBidderName: '',
      status: 'upcoming',
      startTime: upcomingStart.toISOString(),
      endTime: upcomingEnd.toISOString(),
      durationHours: 24,
      bids: [],
      car: sampleListings[5],
    },
  ];

  saveAuctions(sampleAuctions);
}
