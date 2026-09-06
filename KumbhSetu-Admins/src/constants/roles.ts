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
];

export const ADMIN_OFFICERS = DBA_PROVISIONED_ACCOUNTS;
