export interface MarketplaceItem {
  id: string;
  name: { [lang: string]: string };
  category: 'chivda' | 'food' | 'puja' | 'grapes' | 'stay';
  categoryLabel: { [lang: string]: string };
  shopName: string;
  location: string;
  price: number;
  unit: string;
  rating: number;
  reviewCount: number;
  isGovtVerified: boolean;
  phone: string;
  description: { [lang: string]: string };
  tags: string[];
  imageUrl: string;
  badgeText?: string;
}

export interface ShopReview {
  id: string;
  shopId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const MARKETPLACE_ITEMS: MarketplaceItem[] = [];

export const INITIAL_REVIEWS: ShopReview[] = [];
