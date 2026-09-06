import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { safeStorage } from '@/lib/safeStorage';
import {
  AdminRouteFare,
  AdminCommodityPrice,
  AdminBazaarShop,
  AdminFactCheck,
  AdminGrievanceTicket,
  AdminSnanMuhurat,
} from '@/types/admin';
import { DBA_PROVISIONED_ACCOUNTS, DBAAdminAccount } from '@/constants/roles';
import { AdminSupabaseService } from '@/services/supabaseService';
import { INITIAL_ADMIN_SNAN_MUHURATS } from '@/data/snanData';

interface AdminContextType {
  // Authentication & DBA Provisioning
  currentUser: DBAAdminAccount | null;
  currentOfficer: DBAAdminAccount;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (usernameOrEmail: string, pass: string) => { success: boolean; message?: string };
  logout: () => Promise<void>;

  // Navigation
  activeTab: 'dashboard' | 'tariffs' | 'bazaar' | 'factcheck' | 'grievances';
  setActiveTab: (tab: 'dashboard' | 'tariffs' | 'bazaar' | 'factcheck' | 'grievances') => void;

  // Transit Routes Management
  routes: AdminRouteFare[];
  addRoute: (route: Omit<AdminRouteFare, 'id' | 'updatedAt' | 'updatedBy'>) => Promise<void>;
  updateRoute: (route: AdminRouteFare) => Promise<void>;
  deleteRoute: (id: string) => Promise<void>;

  // Commodity Ceiling Rates
  commodities: AdminCommodityPrice[];
  addCommodity: (item: Omit<AdminCommodityPrice, 'id' | 'updatedAt'>) => Promise<void>;
  updateCommodity: (item: AdminCommodityPrice) => Promise<void>;
  deleteCommodity: (id: string) => Promise<void>;

  // Local Bazaar Merchants
  shops: AdminBazaarShop[];
  addShop: (shop: Omit<AdminBazaarShop, 'id' | 'registrationDate'>) => Promise<void>;
  updateShopStatus: (id: string, status: AdminBazaarShop['status'], warningInc?: boolean) => Promise<void>;
  deleteShop: (id: string) => Promise<void>;

  // Fact-Check & Rumor Buster Dispatcher
  factChecks: AdminFactCheck[];
  addFactCheck: (fc: Omit<AdminFactCheck, 'id' | 'timestamp' | 'reachCount'>) => Promise<void>;
  updateFactCheckStatus: (id: string, status: AdminFactCheck['status'], clarificationText: string) => Promise<void>;
  deleteFactCheck: (id: string) => Promise<void>;

  // Grievance Enforcement & Overcharging Desk
  tickets: AdminGrievanceTicket[];
  addTicket: (t: Omit<AdminGrievanceTicket, 'id' | 'token' | 'timestamp'>) => Promise<void>;
  updateTicketStatus: (
    id: string,
    status: AdminGrievanceTicket['status'],
    actionSummary?: string,
    penalty?: number
  ) => Promise<void>;

  // Shahi Snan & Muhurat Schedule
  snanMuhurats: AdminSnanMuhurat[];
  addSnanMuhurat: (snan: Omit<AdminSnanMuhurat, 'id' | 'updatedAt'>) => Promise<void>;
  updateSnanMuhurat: (snan: AdminSnanMuhurat) => Promise<void>;
  deleteSnanMuhurat: (id: string) => Promise<void>;

  // Refresh & Stats
  refreshAll: () => Promise<void>;
  stats: {
    activeRoutesCount: number;
    pendingGrievancesCount: number;
    openRumorsCount: number;
    approvedShopsCount: number;
    totalPenaltiesCollected: number;
    snanDatesCount: number;
  };
}

const STORAGE_KEYS = {
  AUTH_USER: '@kumbhadmins_auth_user_v3',
  ROUTES: '@kumbhadmins_routes_v3',
  COMMODITIES: '@kumbhadmins_commodities_v3',
  SHOPS: '@kumbhadmins_shops_v3',
  FACTCHECKS: '@kumbhadmins_factchecks_v3',
  TICKETS: '@kumbhadmins_tickets_v3',
  SNAN_MUHURATS: '@kumbhadmins_snan_muhurats_v3',
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<DBAAdminAccount | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tariffs' | 'bazaar' | 'factcheck' | 'grievances'>('dashboard');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [routes, setRoutes] = useState<AdminRouteFare[]>([]);
  const [commodities, setCommodities] = useState<AdminCommodityPrice[]>([]);
  const [shops, setShops] = useState<AdminBazaarShop[]>([]);
  const [factChecks, setFactChecks] = useState<AdminFactCheck[]>([]);
  const [tickets, setTickets] = useState<AdminGrievanceTicket[]>([]);
  const [snanMuhurats, setSnanMuhurats] = useState<AdminSnanMuhurat[]>(INITIAL_ADMIN_SNAN_MUHURATS);

  // Load state and sync with Supabase
  useEffect(() => {
    const loadState = async () => {
      try {
        const [
          savedAuth,
          savedRoutes,
          savedComm,
          savedShops,
          savedFC,
          savedTickets,
          savedSnan,
        ] = await Promise.all([
          safeStorage.getItem(STORAGE_KEYS.AUTH_USER),
          safeStorage.getItem(STORAGE_KEYS.ROUTES),
          safeStorage.getItem(STORAGE_KEYS.COMMODITIES),
          safeStorage.getItem(STORAGE_KEYS.SHOPS),
          safeStorage.getItem(STORAGE_KEYS.FACTCHECKS),
          safeStorage.getItem(STORAGE_KEYS.TICKETS),
          safeStorage.getItem(STORAGE_KEYS.SNAN_MUHURATS),
        ]);

        if (savedAuth) {
          const parsed = JSON.parse(savedAuth);
          setCurrentUser(parsed);
          setIsAuthenticated(true);
        }
        if (savedRoutes) setRoutes(JSON.parse(savedRoutes));
        if (savedComm) setCommodities(JSON.parse(savedComm));
        if (savedShops) setShops(JSON.parse(savedShops));
        if (savedFC) setFactChecks(JSON.parse(savedFC));
        if (savedTickets) setTickets(JSON.parse(savedTickets));
        if (savedSnan) setSnanMuhurats(JSON.parse(savedSnan));

        // Fetch live data from Supabase
        await fetchLiveAdminData();
      } catch (err) {
        console.warn('Error loading AdminContext state:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadState();


    // Subscribe to realtime changes
    const sub = AdminSupabaseService.subscribeToAll(() => {
      fetchLiveAdminData();
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  const fetchLiveAdminData = async () => {
    try {
      const [liveRoutes, liveComm, liveShops, liveFC, liveTickets, liveSnan] = await Promise.all([
        AdminSupabaseService.fetchRoutes(),
        AdminSupabaseService.fetchCommodities(),
        AdminSupabaseService.fetchShops(),
        AdminSupabaseService.fetchFactChecks(),
        AdminSupabaseService.fetchGrievances(),
        AdminSupabaseService.fetchSnanMuhurats(),
      ]);

      if (liveRoutes) {
        setRoutes(liveRoutes);
        safeStorage.setItem(STORAGE_KEYS.ROUTES, JSON.stringify(liveRoutes));
      }
      if (liveComm) {
        setCommodities(liveComm);
        safeStorage.setItem(STORAGE_KEYS.COMMODITIES, JSON.stringify(liveComm));
      }
      if (liveShops) {
        setShops(liveShops);
        safeStorage.setItem(STORAGE_KEYS.SHOPS, JSON.stringify(liveShops));
      }
      if (liveFC) {
        setFactChecks(liveFC);
        safeStorage.setItem(STORAGE_KEYS.FACTCHECKS, JSON.stringify(liveFC));
      }
      if (liveTickets) {
        setTickets(liveTickets);
        safeStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(liveTickets));
      }
      if (liveSnan) {
        setSnanMuhurats(liveSnan);
        safeStorage.setItem(STORAGE_KEYS.SNAN_MUHURATS, JSON.stringify(liveSnan));
      }
    } catch (e) {
      console.warn('Admin fetchLiveAdminData error:', e);
    }
  };


  // LOGIN AUTHENTICATION (Username: Gaurang, Password: pass123)
  const login = (usernameOrEmail: string, pass: string): { success: boolean; message?: string } => {
    const cleanUser = usernameOrEmail.trim().toLowerCase();
    const cleanPass = pass.trim();

    const matched = DBA_PROVISIONED_ACCOUNTS.find(
      (acc) =>
        (acc.officerId.toLowerCase() === cleanUser || acc.name.toLowerCase() === cleanUser || acc.email.toLowerCase() === cleanUser) &&
        acc.securityPin === cleanPass
    );

    if (matched) {
      setCurrentUser(matched);
      setIsAuthenticated(true);
      safeStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(matched));
      return { success: true };
    }

    return {
      success: false,
      message: 'Invalid Username or Password.',
    };
  };

  const logout = async () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    await safeStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  };

  // ROUTE FARES CRUD
  const addRoute = async (route: Omit<AdminRouteFare, 'id' | 'updatedAt' | 'updatedBy'>) => {
    const officerName = currentUser ? currentUser.name : 'Authorized Admin';
    const serverId = await AdminSupabaseService.insertRoute(route, officerName);

    const newRoute: AdminRouteFare = {
      ...route,
      id: serverId || `rt_${Date.now()}`,
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      updatedBy: officerName,
    };
    const updated = [newRoute, ...routes];
    setRoutes(updated);
    await safeStorage.setItem(STORAGE_KEYS.ROUTES, JSON.stringify(updated));
  };

  const updateRoute = async (route: AdminRouteFare) => {
    const officerName = currentUser ? currentUser.name : 'Authorized Admin';
    await AdminSupabaseService.updateRoute(route, officerName);

    const enriched: AdminRouteFare = {
      ...route,
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      updatedBy: officerName,
    };
    const updated = routes.map((r: AdminRouteFare) => (r.id === enriched.id ? enriched : r));
    setRoutes(updated);
    await safeStorage.setItem(STORAGE_KEYS.ROUTES, JSON.stringify(updated));
  };

  const deleteRoute = async (id: string) => {
    await AdminSupabaseService.deleteRoute(id);
    const updated = routes.filter((r: AdminRouteFare) => r.id !== id);
    setRoutes(updated);
    await safeStorage.setItem(STORAGE_KEYS.ROUTES, JSON.stringify(updated));
  };

  // COMMODITY RATES CRUD
  const addCommodity = async (item: Omit<AdminCommodityPrice, 'id' | 'updatedAt'>) => {
    const serverId = await AdminSupabaseService.insertCommodity(item);

    const newItem: AdminCommodityPrice = {
      ...item,
      id: serverId || `cmd_${Date.now()}`,
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updated = [newItem, ...commodities];
    setCommodities(updated);
    await safeStorage.setItem(STORAGE_KEYS.COMMODITIES, JSON.stringify(updated));
  };

  const updateCommodity = async (item: AdminCommodityPrice) => {
    await AdminSupabaseService.updateCommodity(item);

    const updated = commodities.map((c: AdminCommodityPrice) =>
      c.id === item.id ? { ...item, updatedAt: 'Just Now' } : c
    );
    setCommodities(updated);
    await safeStorage.setItem(STORAGE_KEYS.COMMODITIES, JSON.stringify(updated));
  };

  const deleteCommodity = async (id: string) => {
    await AdminSupabaseService.deleteCommodity(id);
    const updated = commodities.filter((c: AdminCommodityPrice) => c.id !== id);
    setCommodities(updated);
    await safeStorage.setItem(STORAGE_KEYS.COMMODITIES, JSON.stringify(updated));
  };

  // BAZAAR SHOPS CRUD
  const addShop = async (shop: Omit<AdminBazaarShop, 'id' | 'registrationDate'>) => {
    const newShop: AdminBazaarShop = {
      ...shop,
      id: `shp_${Date.now()}`,
      registrationDate: new Date().toLocaleDateString(),
    };
    const updated = [newShop, ...shops];
    setShops(updated);
    await safeStorage.setItem(STORAGE_KEYS.SHOPS, JSON.stringify(updated));
  };

  const updateShopStatus = async (
    id: string,
    status: AdminBazaarShop['status'],
    warningInc: boolean = false
  ) => {
    const isApproved = status === 'APPROVED';
    await AdminSupabaseService.updateShopStatus(id, isApproved);

    const updated = shops.map((s: AdminBazaarShop) => {
      if (s.id === id) {
        return {
          ...s,
          status,
          isVerified: isApproved,
          warningCount: warningInc ? s.warningCount + 1 : s.warningCount,
        };
      }
      return s;
    });
    setShops(updated);
    await safeStorage.setItem(STORAGE_KEYS.SHOPS, JSON.stringify(updated));
  };

  const deleteShop = async (id: string) => {
    await AdminSupabaseService.deleteShop(id);
    const updated = shops.filter((s: AdminBazaarShop) => s.id !== id);
    setShops(updated);
    await safeStorage.setItem(STORAGE_KEYS.SHOPS, JSON.stringify(updated));
  };

  // FACT CHECKS CRUD
  const addFactCheck = async (fc: Omit<AdminFactCheck, 'id' | 'timestamp' | 'reachCount'>) => {
    const officerTitle = currentUser ? currentUser.roleTitle : 'Mela Administration';
    const serverId = await AdminSupabaseService.insertFactCheck(fc, officerTitle);

    const newFc: AdminFactCheck = {
      ...fc,
      id: serverId || `fc_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reachCount: 1,
    };
    const updated = [newFc, ...factChecks];
    setFactChecks(updated);
    await safeStorage.setItem(STORAGE_KEYS.FACTCHECKS, JSON.stringify(updated));
  };

  const updateFactCheckStatus = async (
    id: string,
    status: AdminFactCheck['status'],
    clarificationText: string
  ) => {
    const officerTitle = currentUser ? currentUser.roleTitle : 'Mela Administration';
    await AdminSupabaseService.updateFactCheckStatus(id, status, clarificationText, officerTitle);

    const updated = factChecks.map((f: AdminFactCheck) => {
      if (f.id === id) {
        return {
          ...f,
          status,
          officialClarification: clarificationText,
          verifiedBy: officerTitle,
          reachCount: f.reachCount + 1,
        };
      }
      return f;
    });
    setFactChecks(updated);
    await safeStorage.setItem(STORAGE_KEYS.FACTCHECKS, JSON.stringify(updated));
  };

  const deleteFactCheck = async (id: string) => {
    await AdminSupabaseService.deleteFactCheck(id);
    const updated = factChecks.filter((f: AdminFactCheck) => f.id !== id);
    setFactChecks(updated);
    await safeStorage.setItem(STORAGE_KEYS.FACTCHECKS, JSON.stringify(updated));
  };

  // GRIEVANCES DESK
  const addTicket = async (t: Omit<AdminGrievanceTicket, 'id' | 'token' | 'timestamp'>) => {
    const newTicket: AdminGrievanceTicket = {
      ...t,
      id: `tkt_${Date.now()}`,
      token: `KS-ENF-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updated = [newTicket, ...tickets];
    setTickets(updated);
    await safeStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(updated));
  };

  const updateTicketStatus = async (
    id: string,
    status: AdminGrievanceTicket['status'],
    actionSummary?: string,
    penalty?: number
  ) => {
    const officerName = currentUser ? currentUser.name : 'Enforcement Squad';
    await AdminSupabaseService.updateGrievanceStatus(id, status, actionSummary, penalty, officerName);

    const updated = tickets.map((t: AdminGrievanceTicket) => {
      if (t.id === id) {
        return {
          ...t,
          status,
          assignedOfficer: officerName,
          actionSummary: actionSummary || t.actionSummary,
          penaltyAmount: penalty !== undefined ? penalty : t.penaltyAmount,
        };
      }
      return t;
    });
    setTickets(updated);
    await safeStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(updated));
  };

  // SHAHI SNAN & MUHURAT SCHEDULE CRUD
  const addSnanMuhurat = async (snan: Omit<AdminSnanMuhurat, 'id' | 'updatedAt'>) => {
    const serverId = await AdminSupabaseService.insertSnanMuhurat(snan);
    const newSnan: AdminSnanMuhurat = {
      ...snan,
      id: serverId || `snan_${Date.now()}`,
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updated = [...snanMuhurats, newSnan].sort((a, b) => a.orderNum - b.orderNum);
    setSnanMuhurats(updated);
    await safeStorage.setItem(STORAGE_KEYS.SNAN_MUHURATS, JSON.stringify(updated));
  };

  const updateSnanMuhurat = async (snan: AdminSnanMuhurat) => {
    await AdminSupabaseService.updateSnanMuhurat(snan);
    const enriched: AdminSnanMuhurat = {
      ...snan,
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updated = snanMuhurats.map((s) => (s.id === enriched.id ? enriched : s)).sort((a, b) => a.orderNum - b.orderNum);
    setSnanMuhurats(updated);
    await safeStorage.setItem(STORAGE_KEYS.SNAN_MUHURATS, JSON.stringify(updated));
  };

  const deleteSnanMuhurat = async (id: string) => {
    await AdminSupabaseService.deleteSnanMuhurat(id);
    const updated = snanMuhurats.filter((s) => s.id !== id);
    setSnanMuhurats(updated);
    await safeStorage.setItem(STORAGE_KEYS.SNAN_MUHURATS, JSON.stringify(updated));
  };

  // Dynamic Dashboard Stats
  const stats = {
    activeRoutesCount: routes.filter((r: AdminRouteFare) => r.status === 'ACTIVE').length,
    pendingGrievancesCount: tickets.filter(
      (t: AdminGrievanceTicket) => t.status === 'REGISTERED' || t.status === 'SQUAD_DISPATCHED'
    ).length,
    openRumorsCount: factChecks.filter((f: AdminFactCheck) => f.status === 'under_review').length,
    approvedShopsCount: shops.filter((s: AdminBazaarShop) => s.status === 'APPROVED').length,
    totalPenaltiesCollected: tickets.reduce(
      (acc: number, t: AdminGrievanceTicket) => acc + (t.penaltyAmount || 0),
      0
    ),
    snanDatesCount: snanMuhurats.length,
  };

  return (
    <AdminContext.Provider
      value={{
        currentUser,
        currentOfficer: currentUser || DBA_PROVISIONED_ACCOUNTS[0],
        isAuthenticated,
        isLoading,
        login,
        logout,
        activeTab,
        setActiveTab,
        routes,
        addRoute,
        updateRoute,
        deleteRoute,
        commodities,
        addCommodity,
        updateCommodity,
        deleteCommodity,
        shops,
        addShop,
        updateShopStatus,
        deleteShop,
        factChecks,
        addFactCheck,
        updateFactCheckStatus,
        deleteFactCheck,
        tickets,
        addTicket,
        updateTicketStatus,
        snanMuhurats,
        addSnanMuhurat,
        updateSnanMuhurat,
        deleteSnanMuhurat,
        refreshAll: fetchLiveAdminData,
        stats,
      }}
    >
      {children}
    </AdminContext.Provider>
  );

};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
