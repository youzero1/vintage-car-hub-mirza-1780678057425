import { useState, useCallback, useEffect } from 'react';
import { Auction, Bid } from '@/types';
import { getAuctions, saveAuctions, addAuction, updateAuction, placeBid as storagePlaceBid, generateId } from '@/lib/storage';

export function useAuctions() {
  const [auctions, setAuctions] = useState<Auction[]>(getAuctions());

  const refresh = useCallback(() => {
    const all = getAuctions();
    const now = new Date();
    let changed = false;
    const updated = all.map(a => {
      if (a.status === 'live' && new Date(a.endTime) <= now) {
        changed = true;
        return { ...a, status: 'ended' as const };
      }
      if (a.status === 'upcoming' && new Date(a.startTime) <= now) {
        changed = true;
        return { ...a, status: 'live' as const };
      }
      return a;
    });
    if (changed) saveAuctions(updated);
    setAuctions(updated);
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, [refresh]);

  const createAuction = useCallback((auction: Omit<Auction, 'id' | 'bids' | 'currentBid' | 'currentBidderId' | 'currentBidderName'>) => {
    const newAuction: Auction = {
      ...auction,
      id: generateId(),
      bids: [],
      currentBid: auction.startingBid,
      currentBidderId: '',
      currentBidderName: '',
    };
    addAuction(newAuction);
    setAuctions(getAuctions());
    return newAuction;
  }, []);

  const bid = useCallback((auctionId: string, bidderId: string, bidderName: string, amount: number): { success: boolean; error?: string } => {
    const all = getAuctions();
    const auction = all.find(a => a.id === auctionId);
    if (!auction) return { success: false, error: 'Auction not found' };
    if (auction.status !== 'live') return { success: false, error: 'Auction is not active' };
    if (amount <= auction.currentBid) return { success: false, error: `Bid must be higher than ${auction.currentBid}` };
    const newBid: Bid = {
      id: generateId(),
      auctionId,
      bidderId,
      bidderName,
      amount,
      timestamp: new Date().toISOString(),
    };
    const success = storagePlaceBid(auctionId, newBid, amount);
    if (success) {
      setAuctions(getAuctions());
      return { success: true };
    }
    return { success: false, error: 'Failed to place bid' };
  }, []);

  const cancelAuction = useCallback((auctionId: string) => {
    const all = getAuctions();
    const auction = all.find(a => a.id === auctionId);
    if (auction) {
      updateAuction({ ...auction, status: 'cancelled' });
      setAuctions(getAuctions());
    }
  }, []);

  return { auctions, refresh, createAuction, bid, cancelAuction };
}
