import { useState, useCallback } from 'react';
import { CarListing } from '@/types';
import { getListings, saveListings, addListing, generateId } from '@/lib/storage';

export function useListings() {
  const [listings, setListings] = useState<CarListing[]>(getListings());

  const refresh = useCallback(() => {
    setListings(getListings());
  }, []);

  const addNewListing = useCallback((listing: Omit<CarListing, 'id' | 'listingDate' | 'status'>) => {
    const newListing: CarListing = {
      ...listing,
      id: generateId(),
      listingDate: new Date().toISOString().split('T')[0],
      status: 'active',
    };
    addListing(newListing);
    setListings(getListings());
    return newListing;
  }, []);

  const markAsSold = useCallback((id: string) => {
    const all = getListings();
    const updated = all.map(l => l.id === id ? { ...l, status: 'sold' as const } : l);
    saveListings(updated);
    setListings(updated);
  }, []);

  return { listings, refresh, addNewListing, markAsSold };
}
