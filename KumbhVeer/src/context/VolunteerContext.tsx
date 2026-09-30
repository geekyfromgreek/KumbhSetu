import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { safeStorage } from '@/lib/safeStorage';
import {
  VolunteerProfile,
  GroundIncident,
  GroundFactCheck,
  IncidentStatus,
  FactCheckStatus,
} from '@/types/volunteer';
import { TRANSLATIONS, LanguageCode } from '@/constants/translations';
import { VolunteerSupabaseService } from '@/services/supabaseService';

interface VolunteerContextType {
  profile: VolunteerProfile | null;
  isRegistered: boolean;
  isLoading: boolean;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: typeof TRANSLATIONS['en'] | typeof TRANSLATIONS['mr'];

  activeTab: 'alerts' | 'factcheck' | 'resolved' | 'profile';
  setActiveTab: (tab: 'alerts' | 'factcheck' | 'resolved' | 'profile') => void;

  // Duty
  toggleDutyStatus: () => Promise<void>;
  updateAssignedSector: (sectorId: string) => Promise<void>;

  // Incident Actions
  incidents: GroundIncident[];
  claimIncident: (id: string) => Promise<void>;
  verifyAndSetSeverity: (id: string, severity: 'LOW' | 'MED' | 'HIGH', notes?: string) => Promise<void>;
  resolveIncidentOffline: (id: string, notes: string) => Promise<void>;
  dismissIncident: (id: string, reason: string) => Promise<void>;
  addMockIncidentAlert: (incident: Omit<GroundIncident, 'id' | 'token' | 'timestamp' | 'status'>) => Promise<void>;

  // Fact-Check Actions
  factChecks: GroundFactCheck[];
  submitFactCheckVerdict: (
    id: string,
    verdict: 'VERIFIED_TRUE' | 'DEBUNKED_FAKE',
    notes: string
  ) => Promise<void>;
  addFactCheckClaim: (claim: Omit<GroundFactCheck, 'id' | 'timestamp' | 'status'>) => Promise<void>;

  // Account
  registerVolunteer: (data: Omit<VolunteerProfile, 'id' | 'volunteerBadgeId' | 'completedTasksCount' | 'factChecksCount' | 'registeredDate' | 'isOnDuty'>) => Promise<void>;
  loginVolunteer: (query: string) => Promise<{ success: boolean; message?: string }>;
  logoutVolunteer: () => Promise<void>;
  updateProfile: (updates: Partial<VolunteerProfile>) => Promise<void>;
  resetAccount: () => Promise<void>;
  refreshAll: () => Promise<void>;
}

const STORAGE_KEYS = {
  PROFILE: '@kumbhveer_profile',
  INCIDENTS: '@kumbhveer_incidents',
  FACT_CHECKS: '@kumbhveer_fact_checks',
  LANGUAGE: '@kumbhveer_language',
};

const VolunteerContext = createContext<VolunteerContextType | undefined>(undefined);

export const VolunteerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<VolunteerProfile | null>(null);
  const [incidents, setIncidents] = useState<GroundIncident[]>([]);
  const [factChecks, setFactChecks] = useState<GroundFactCheck[]>([]);
  const [language, setLanguageState] = useState<LanguageCode>('mr');
  const [activeTab, setActiveTab] = useState<'alerts' | 'factcheck' | 'resolved' | 'profile'>('alerts');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const t = TRANSLATIONS[language];

  const setLanguage = async (lang: LanguageCode) => {
    setLanguageState(lang);
    await safeStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  };

  useEffect(() => {
    const loadStorage = async () => {
      try {
        const [savedProfile, savedIncidents, savedFactChecks, savedLang] = await Promise.all([
          safeStorage.getItem(STORAGE_KEYS.PROFILE),
          safeStorage.getItem(STORAGE_KEYS.INCIDENTS),
          safeStorage.getItem(STORAGE_KEYS.FACT_CHECKS),
          safeStorage.getItem(STORAGE_KEYS.LANGUAGE),
        ]);

        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
        }
        if (savedIncidents) {
          setIncidents(JSON.parse(savedIncidents));
        }
        if (savedFactChecks) {
          setFactChecks(JSON.parse(savedFactChecks));
        }
        if (savedLang === 'en' || savedLang === 'mr') {
          setLanguageState(savedLang);
        }

        // Fetch live incidents & fact-checks from Supabase
        await fetchLiveVolunteerData();
      } catch (err) {
        console.warn('Volunteer storage loading error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadStorage();

    // 1. Subscribe to realtime changes in incidents, fact checks, and volunteer roster
    const sub = VolunteerSupabaseService.subscribeToUpdates(() => {
      fetchLiveVolunteerData();
    });

    // 2. Periodic Live Sync Heartbeat (every 4 seconds)
    const liveSyncInterval = setInterval(() => {
      fetchLiveVolunteerData();
    }, 4000);

    // 3. Re-fetch immediately when app comes to foreground
    const appStateSub = AppState.addEventListener('change', (nextState: AppStateStatus) => {
      if (nextState === 'active') {
        fetchLiveVolunteerData();
      }
    });

    return () => {
      if (sub?.unsubscribe) sub.unsubscribe();
      clearInterval(liveSyncInterval);
      appStateSub.remove();
    };
  }, []);

  const fetchLiveVolunteerData = async () => {
    try {
      const [liveIncidents, liveFC] = await Promise.all([
        VolunteerSupabaseService.fetchIncidents(),
        VolunteerSupabaseService.fetchFactChecks(),
      ]);

      if (liveIncidents) {
        setIncidents(liveIncidents);
        safeStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(liveIncidents));
      }
      if (liveFC) {
        setFactChecks(liveFC);
        safeStorage.setItem(STORAGE_KEYS.FACT_CHECKS, JSON.stringify(liveFC));
      }
    } catch (e) {
      console.warn('Volunteer fetchLive error:', e);
    }
  };

  // Register Volunteer
  const registerVolunteer = async (
    data: Omit<VolunteerProfile, 'id' | 'volunteerBadgeId' | 'completedTasksCount' | 'factChecksCount' | 'registeredDate' | 'isOnDuty'>
  ) => {
    const randomBadgeNum = Math.floor(100 + Math.random() * 900);
    const badgePrefix = (data.assignedSectorId || 'RAM').replace('sector_', '').toUpperCase().slice(0, 3);
    const newProfile: VolunteerProfile = {
      ...data,
      id: `veer_${Date.now()}`,
      volunteerBadgeId: `KV-${badgePrefix}-${randomBadgeNum}`,
      isOnDuty: true,
      completedTasksCount: 0,
      factChecksCount: 0,
      registeredDate: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };

    setProfile(newProfile);
    await safeStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile));

    // Sync to Supabase
    const serverId = await VolunteerSupabaseService.saveVolunteerProfile(newProfile);
    if (serverId && serverId !== newProfile.id) {
      const updatedProfile = { ...newProfile, id: serverId };
      setProfile(updatedProfile);
      await safeStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updatedProfile));
    }
  };

  // Login Existing Volunteer by Phone or Badge ID
  const loginVolunteer = async (query: string): Promise<{ success: boolean; message?: string }> => {
    const clean = query.trim();
    if (!clean) {
      return {
        success: false,
        message: language === 'mr' ? 'कृपया मोबाईल क्रमांक किंवा बॅज आयडी टाका.' : 'Please enter Mobile Number or Badge ID.',
      };
    }

    try {
      const fetched = await VolunteerSupabaseService.fetchVolunteerByPhoneOrBadge(clean);
      if (fetched) {
        setProfile(fetched);
        await safeStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(fetched));
        await fetchLiveVolunteerData();
        return { success: true };
      }

      // Check local storage fallback
      const savedProfile = await safeStorage.getItem(STORAGE_KEYS.PROFILE);
      if (savedProfile) {
        const local = JSON.parse(savedProfile);
        if (local.phone === clean || local.volunteerBadgeId === clean) {
          setProfile(local);
          return { success: true };
        }
      }

      return {
        success: false,
        message:
          language === 'mr'
            ? 'नोंदणीकृत स्वयंसेवक सापडला नाही. कृपया प्रथम नोंदणी करा.'
            : 'No registered volunteer found. Please complete registration first.',
      };
    } catch (e) {
      return { success: false, message: 'Connection error. Please try again.' };
    }
  };

  const logoutVolunteer = async () => {
    setProfile(null);
    setIncidents([]);
    setFactChecks([]);
    await Promise.all([
      safeStorage.removeItem(STORAGE_KEYS.PROFILE),
      safeStorage.removeItem(STORAGE_KEYS.INCIDENTS),
      safeStorage.removeItem(STORAGE_KEYS.FACT_CHECKS),
    ]);
  };

  const updateProfile = async (updates: Partial<VolunteerProfile>) => {
    if (!profile) return;
    const updated = { ...profile, ...updates };
    setProfile(updated);
    await safeStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));

    VolunteerSupabaseService.saveVolunteerProfile(updated);
  };

  const toggleDutyStatus = async () => {
    if (!profile) return;
    const updated = { ...profile, isOnDuty: !profile.isOnDuty };
    setProfile(updated);
    await safeStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));

    VolunteerSupabaseService.saveVolunteerProfile(updated);
  };

  const updateAssignedSector = async (sectorId: string) => {
    if (!profile) return;
    const updated = { ...profile, assignedSectorId: sectorId };
    setProfile(updated);
    await safeStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));

    VolunteerSupabaseService.saveVolunteerProfile(updated);
  };

  // Incident Actions
  const claimIncident = async (id: string) => {
    if (!profile) return;
    const updated = incidents.map((inc) =>
      inc.id === id
        ? {
            ...inc,
            status: 'EN_ROUTE' as IncidentStatus,
            assignedVolunteerId: profile.id,
          }
        : inc
    );
    setIncidents(updated);
    await safeStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(updated));

    VolunteerSupabaseService.claimIncident(id, profile.id, profile.name);
  };

  const verifyAndSetSeverity = async (
    id: string,
    severity: 'LOW' | 'MED' | 'HIGH',
    notes: string = ''
  ) => {
    if (!profile) return;
    const isPolice = severity === 'MED' || severity === 'HIGH';
    const newStatus: IncidentStatus = isPolice ? 'ESCALATED_POLICE' : 'EN_ROUTE';

    const updated = incidents.map((inc) =>
      inc.id === id
        ? {
            ...inc,
            severity,
            status: newStatus,
            escalatedToPolice: isPolice,
            volunteerNotes: notes || `Severity set to ${severity} by ${profile.name}`,
          }
        : inc
    );

    setIncidents(updated);
    await safeStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(updated));

    VolunteerSupabaseService.verifyAndSetSeverity(id, severity, profile.name, notes);
  };

  const resolveIncidentOffline = async (id: string, notes: string) => {
    if (!profile) return;
    const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const updated = incidents.map((inc) =>
      inc.id === id
        ? {
            ...inc,
            status: 'RESOLVED_OFFLINE' as IncidentStatus,
            volunteerNotes: notes.trim(),
            resolutionTimestamp: nowTime,
          }
        : inc
    );
    setIncidents(updated);
    await safeStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(updated));

    // Increment completed tasks count
    const updatedProfile = {
      ...profile,
      completedTasksCount: profile.completedTasksCount + 1,
    };
    setProfile(updatedProfile);
    await safeStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updatedProfile));

    // Sync to Supabase
    VolunteerSupabaseService.resolveIncident(id, notes, profile.name);
    VolunteerSupabaseService.saveVolunteerProfile(updatedProfile);
  };

  const dismissIncident = async (id: string, reason: string) => {
    const updated = incidents.map((inc) =>
      inc.id === id
        ? {
            ...inc,
            status: 'DISMISSED' as IncidentStatus,
            volunteerNotes: `Dismissed: ${reason.trim()}`,
          }
        : inc
    );
    setIncidents(updated);
    await safeStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(updated));

    VolunteerSupabaseService.dismissIncident(id, reason);
  };

  const addMockIncidentAlert = async (
    incident: Omit<GroundIncident, 'id' | 'token' | 'timestamp' | 'status'>
  ) => {
    const randomTokenNum = Math.floor(100 + Math.random() * 900);
    const newInc: GroundIncident = {
      ...incident,
      id: `inc_${Date.now()}`,
      token: `CASE-G-${randomTokenNum}`,
      timestamp: 'Just now',
      status: 'PENDING_VERIFICATION',
    };
    const updated = [newInc, ...incidents];
    setIncidents(updated);
    await safeStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(updated));
  };

  // Fact-Check Actions
  const submitFactCheckVerdict = async (
    id: string,
    verdict: 'VERIFIED_TRUE' | 'DEBUNKED_FAKE',
    notes: string
  ) => {
    if (!profile) return;
    const updated = factChecks.map((fc) =>
      fc.id === id
        ? {
            ...fc,
            status: verdict,
            officialClarification: {
              en: notes,
              mr: notes,
            },
            verifiedVolunteerId: profile.id,
            volunteerNotes: notes,
          }
        : fc
    );
    setFactChecks(updated);
    await safeStorage.setItem(STORAGE_KEYS.FACT_CHECKS, JSON.stringify(updated));

    // Increment fact-check stat
    const updatedProfile = {
      ...profile,
      factChecksCount: profile.factChecksCount + 1,
    };
    setProfile(updatedProfile);
    await safeStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updatedProfile));

    // Sync to Supabase
    VolunteerSupabaseService.submitFactCheckVerdict(id, verdict, notes, profile.name);
    VolunteerSupabaseService.saveVolunteerProfile(updatedProfile);
  };

  const addFactCheckClaim = async (
    claim: Omit<GroundFactCheck, 'id' | 'timestamp' | 'status'>
  ) => {
    const newClaim: GroundFactCheck = {
      ...claim,
      id: `fc_${Date.now()}`,
      status: 'UNVERIFIED',
      timestamp: 'Just now',
    };
    const updated = [newClaim, ...factChecks];
    setFactChecks(updated);
    await safeStorage.setItem(STORAGE_KEYS.FACT_CHECKS, JSON.stringify(updated));
  };

  const resetAccount = async () => {
    setProfile(null);
    setIncidents([]);
    setFactChecks([]);
    await Promise.all([
      safeStorage.removeItem(STORAGE_KEYS.PROFILE),
      safeStorage.removeItem(STORAGE_KEYS.INCIDENTS),
      safeStorage.removeItem(STORAGE_KEYS.FACT_CHECKS),
    ]);
  };

  return (
    <VolunteerContext.Provider
      value={{
        profile,
        isRegistered: !!profile,
        isLoading,
        language,
        setLanguage,
        t,
        activeTab,
        setActiveTab,
        toggleDutyStatus,
        updateAssignedSector,
        incidents,
        claimIncident,
        verifyAndSetSeverity,
        resolveIncidentOffline,
        dismissIncident,
        addMockIncidentAlert,
        factChecks,
        submitFactCheckVerdict,
        addFactCheckClaim,
        registerVolunteer,
        loginVolunteer,
        logoutVolunteer,
        updateProfile,
        resetAccount,
        refreshAll: fetchLiveVolunteerData,
      }}
    >
      {children}
    </VolunteerContext.Provider>
  );
};

export const useVolunteer = () => {
  const context = useContext(VolunteerContext);
  if (!context) {
    throw new Error('useVolunteer must be used within a VolunteerProvider');
  }
  return context;
};
