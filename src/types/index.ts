export type CarCondition = 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor' | 'Project';
export type TransmissionType = 'Automatic' | 'Manual' | '4-Speed Manual' | '3-Speed Manual' | 'Overdrive' | 'Other';
export type FuelType = 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid' | 'Other';
export type DriveType = 'RWD' | 'FWD' | 'AWD' | '4WD';
export type ListingStatus = 'active' | 'sold' | 'pending';
export type AuctionStatus = 'upcoming' | 'live' | 'ended' | 'cancelled';

export interface CarListing {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerContact: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  bodyStyle: string;
  color: string;
  interiorColor: string;
  mileage: number;
  engine: string;
  engineSize: string;
  horsepower: string;
  transmission: TransmissionType;
  fuelType: FuelType;
  driveType: DriveType;
  condition: CarCondition;
  price: number;
  negotiable: boolean;
  vin: string;
  description: string;
  features: string[];
  images: string[];
  location: string;
  state: string;
  zipCode: string;
  listingDate: string;
  status: ListingStatus;
  certifiedPreOwned: boolean;
  accidentHistory: boolean;
  titleStatus: string;
  serviceRecords: boolean;
  numberOfOwners: number;
  restorationLevel: string;
  auctionId?: string;
}

export interface Bid {
  id: string;
  auctionId: string;
  bidderId: string;
  bidderName: string;
  amount: number;
  timestamp: string;
}

export interface Auction {
  id: string;
  carId: string;
  sellerId: string;
  sellerName: string;
  startingBid: number;
  reservePrice: number;
  currentBid: number;
  currentBidderId: string;
  currentBidderName: string;
  status: AuctionStatus;
  startTime: string;
  endTime: string;
  durationHours: number;
  bids: Bid[];
  car: CarListing;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: 'seller' | 'bidder' | 'both';
  joinDate: string;
  phone?: string;
}

export interface SearchFilters {
  make: string;
  model: string;
  yearMin: string;
  yearMax: string;
  priceMin: string;
  priceMax: string;
  condition: string;
  bodyStyle: string;
  transmission: string;
  fuelType: string;
  driveType: string;
  location: string;
  mileageMax: string;
  color: string;
  restorationLevel: string;
}
