import { AdminOfficer } from '@/types/admin';

export interface DBAAdminAccount extends AdminOfficer {
  officerId: string;
  securityPin: string;
  email: string;
}

/**
 * DBA-Provisioned Administrator Account
 */
export const DBA_PROVISIONED_ACCOUNTS: DBAAdminAccount[] = [
  {
    id: 'admin_gaurang',
    officerId: 'Gaurang',
    securityPin: 'pass123',
    email: 'gaurang@kumbhsetu.gov.in',
    name: 'Gaurang',
    role: 'DISTRICT_COLLECTOR',
    roleTitle: 'Super Administrator (God Mode)',
    badgeNumber: 'ADMIN-01',
    department: 'Kumbh Administration & Command',
    avatarIcon: 'user-shield',
  },
  {
    id: 'admin_police_123',
    officerId: 'Police123',
    securityPin: 'pols123',
    email: 'police.flyingsquad@nashikpolice.gov.in',
    name: 'Inspector Vijay Rathore',
    role: 'POLICE_CONTROL_ROOM',
    roleTitle: 'Mela Police Flying Squad (Rapid Enforcement)',
    badgeNumber: 'MH-POL-108',
    department: 'Nashik City Police & Flying Enforcement Wing',
    avatarIcon: 'shield-alt',
  },
];

export const ADMIN_OFFICERS = DBA_PROVISIONED_ACCOUNTS;
