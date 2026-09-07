export type IncidentStatus =
  | 'PENDING_VERIFICATION' // Reported from main app, waiting for volunteer
  | 'EN_ROUTE'              // Volunteer claimed and is physically traveling to spot
  | 'GROUND_VERIFIED'       // Volunteer arrived & inspected
  | 'ESCALATED_POLICE'      // Escalated to Police enforcement (Med/High severity)
  | 'RESOLVED_OFFLINE'      // Swiped to confirm, issue solved offline
  | 'DISMISSED';            // False alarm / unlocatable

export type FactCheckStatus =
  | 'UNVERIFIED'
  | 'INVESTIGATING'
  | 'VERIFIED_TRUE'
  | 'DEBUNKED_FAKE';

export interface VolunteerProfile {
  id: string;
  name: string;
  phone: string;
  age: string;
  gender: 'male' | 'female' | 'other';
  assignedSectorId: string;
  volunteerBadgeId: string; // e.g. KV-RAM-408
  profileImageUri: string;
  roleId: string;
  isOnDuty: boolean;
  completedTasksCount: number;
  factChecksCount: number;
  registeredDate: string;
}

export interface GroundIncident {
  id: string;
  token: string;
  category: string;
  location: string;
  sectorId: string;
  description: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
  severity?: 'LOW' | 'MED' | 'HIGH';
  pilgrimName?: string;
  pilgrimPhone?: string;
  offenderNameOrVehicle?: string;
  standardAmt?: string;
  chargedAmt?: string;
  status: IncidentStatus;
  assignedVolunteerId?: string;
  volunteerNotes?: string;
  timestamp: string;
  resolutionTimestamp?: string;
  escalatedToPolice?: boolean;
}

export interface GroundFactCheck {
  id: string;
  claimTitle: {
    en: string;
    mr: string;
  };
  claimSource: string;
  sectorId: string;
  status: FactCheckStatus;
  officialClarification?: {
    en: string;
    mr: string;
  };
  verifiedVolunteerId?: string;
  volunteerNotes?: string;
  timestamp: string;
}
