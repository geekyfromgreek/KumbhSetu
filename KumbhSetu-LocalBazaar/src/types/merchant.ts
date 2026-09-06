export type BusinessCategory =
  | 'EATERY_LARGE'      // Large Scale Eatery / Bhojanalaya / Restaurant
  | 'EATERY_SMALL'      // Small Food Stall / Sweet Shop / Tea Stall
  | 'PUJA_HANDICRAFT'   // Puja Samagri, Murtis, Brass Articles
  | 'CHIVDA_SWEETS'     // Famous Nashik Chivda & Sweets
  | 'AGRO_GRAPES'       // Farm Fresh Grapes, Dry Fruits, Raisins
  | 'STAY_DHARAMSHALA'  // Pilgrim Lodging / Dharamshala
  | 'GENERAL_UTILITY';  // Mobile recharge, clothing, footwear

export type BusinessScale = 'LARGE_SCALE' | 'SMALL_SCALE';

export interface FoodLicenseInfo {
  hasLicense: boolean;
  licenseNumber: string;
  licenseHolderName: string;
  expiryDate?: string;
  documentImageUri?: string;
  isVerifiedByAuthority?: boolean;
}

export interface CatalogItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string; // e.g. 'per plate', 'per kg', 'per piece', 'per 500g', 'per night'
  imageUrl: string;
  isAvailable: boolean;
  isVegetarian?: boolean;
  createdAt: string;
}

export interface MerchantProfile {
  id: string;
  ownerName: string;
  businessName: string;
  category: BusinessCategory;
  scale: BusinessScale;
  phone: string;
  whatsappNumber: string;
  address: string;
  landmark: string;
  shopImageUri: string;
  foodLicense: FoodLicenseInfo;
  isOpenNow: boolean;
  registeredDate: string;
}

export interface PilgrimInquiry {
  id: string;
  pilgrimName: string;
  pilgrimPhone: string;
  itemName?: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}
