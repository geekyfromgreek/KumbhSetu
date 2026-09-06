export type AdminRole = 
  | 'DISTRICT_COLLECTOR'
  | 'RTO_COMMISSIONER'
  | 'POLICE_CONTROL_ROOM'
  | 'FOOD_SAFETY_INSPECTOR'
  | 'MUNICIPAL_OFFICER';

export interface AdminOfficer {
  id: string;
  name: string;
  role: AdminRole;
  roleTitle: string;
  badgeNumber: string;
  department: string;
  avatarIcon: string;
}

export interface AdminRouteFare {
  id: string;
  fromName: string;
  toName: string;
  distanceKm: number;
  sharedAutoPerPerson: number;
  privateAutoFixed: number;
  kumbhCityBus: number;
  taxiCab: number;
  approxMinutes: number;
  trafficNote: string;
  status: 'ACTIVE' | 'SURCHARGE_NIGHT' | 'RESTRICTED';
  updatedAt: string;
  updatedBy: string;
}

export interface AdminCommodityPrice {
  id: string;
  name: string;
  category: 'beverage' | 'food' | 'puja' | 'utility';
  standardMaxPrice: number;
  unit: string;
  govtNotice: string;
  complianceLevel: 'COMPLIANT' | 'PRICE_WATCH' | 'ENFORCEMENT_ORDER';
  updatedAt: string;
}

export interface AdminBazaarShop {
  id: string;
  shopName: string;
  ownerName: string;
  category: string;
  location: string;
  phone: string;
  itemSampleName: string;
  itemSamplePrice: number;
  isVerified: boolean;
  status: 'APPROVED' | 'PENDING_AUDIT' | 'FLAGGED_OVERCHARGING' | 'SUSPENDED';
  warningCount: number;
  registrationDate: string;
}

export interface AdminFactCheck {
  id: string;
  claimTitle: string;
  claimSource: string;
  status: 'verified_true' | 'debunked_fake' | 'under_review';
  officialClarification: string;
  verifiedBy: string;
  timestamp: string;
  reachCount: number;
  priority: 'CRITICAL' | 'HIGH' | 'NORMAL';
}

export interface AdminGrievanceTicket {
  id: string;
  token: string;
  category: string;
  vehicleOrShop: string;
  location: string;
  standardAmt: string;
  chargedAmt: string;
  timestamp: string;
  status: 'REGISTERED' | 'SQUAD_DISPATCHED' | 'FINE_ISSUED' | 'RESOLVED';
  assignedOfficer: string;
  actionSummary?: string;
  penaltyAmount?: number;
}
