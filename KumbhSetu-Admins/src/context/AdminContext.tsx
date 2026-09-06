import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AdminOfficer,
  AdminRouteFare,
  AdminCommodityPrice,
  AdminBazaarShop,
  AdminFactCheck,
  AdminGrievanceTicket,
} from '@/types/admin';
import { DBA_PROVISIONED_ACCOUNTS, DBAAdminAccount } from '@/constants/roles';

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

  // Transit Routes Management (God Mode - Starts 100% clean)
  routes: AdminRouteFare[];
  addRoute: (route: Omit<AdminRouteFare, 'id' | 'updatedAt' | 'updatedBy'>) => Promise<void>;
  updateRoute: (route: AdminRouteFare) => Promise<void>;
  deleteRoute: (id: string) => Promise<void>;

  // Commodity Ceiling Rates (God Mode - Starts 100% clean)
  commodities: AdminCommodityPrice[];
  addCommodity: (item: Omit<AdminCommodityPrice, 'id' | 'updatedAt'>) => Promise<void>;
  updateCommodity: (item: AdminCommodityPrice) => Promise<void>;
  deleteCommodity: (id: string) => Promise<void>;

  // Local Bazaar Merchants (God Mode - Starts 100% clean)
  shops: AdminBazaarShop[];
  addShop: (shop: Omit<AdminBazaarShop, 'id' | 'registrationDate'>) => Promise<void>;
  updateShopStatus: (id: string, status: AdminBazaarShop['status'], warningInc?: boolean) => Promise<void>;
  deleteShop: (id: string) => Promise<void>;

  // Fact-Check & Rumor Buster Dispatcher (God Mode - Starts 100% clean)
  factChecks: AdminFactCheck[];
  addFactCheck: (fc: Omit<AdminFactCheck, 'id' | 'timestamp' | 'reachCount'>) => Promise<void>;
  updateFactCheckStatus: (id: string, status: AdminFactCheck['status'], clarificationText: string) => Promise<void>;
  deleteFactCheck: (id: string) => Promise<void>;

  // Grievance Enforcement & Overcharging Desk (God Mode - Starts 100% clean)
  tickets: AdminGrievanceTicket[];
  addTicket: (t: Omit<AdminGrievanceTicket, 'id' | 'token' | 'timestamp'>) => Promise<void>;
  updateTicketStatus: (
    id: string,
    status: AdminGrievanceTicket['status'],
    actionSummary?: string,
    penalty?: number
  ) => Promise<void>;

  // Dashboard Stats
  stats: {
    activeRoutesCount: number;
    pendingGrievancesCount: number;
    openRumorsCount: number;
    approvedShopsCount: number;
    totalPenaltiesCollected: number;
  };
}

const STORAGE_KEYS = {
  AUTH_USER: '@kumbhadmins_auth_user_v3',
  ROUTES: '@kumbhadmins_routes_v3',
  COMMODITIES: '@kumbhadmins_commodities_v3',
  SHOPS: '@kumbhadmins_shops_v3',
  FACTCHECKS: '@kumbhadmins_factchecks_v3',
  TICKETS: '@kumbhadmins_tickets_v3',
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<DBAAdminAccount | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tariffs' | 'bazaar' | 'factcheck' | 'grievances'>('dashboard');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // STRICT CLEAN SLATE - ZERO PRE-FILLED DATA
  const [routes, setRoutes] = useState<AdminRouteFare[]>([]);
  const [commodities, setCommodities] = useState<AdminCommodityPrice[]>([]);
  const [shops, setShops] = useState<AdminBazaarShop[]>([]);
  const [factChecks, setFactChecks] = useState<AdminFactCheck[]>([]);
  const [tickets, setTickets] = useState<AdminGrievanceTicket[]>([]);

  // Load stored admin records on startup
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
        ] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.AUTH_USER),
          AsyncStorage.getItem(STORAGE_KEYS.ROUTES),
          AsyncStorage.getItem(STORAGE_KEYS.COMMODITIES),
          AsyncStorage.getItem(STORAGE_KEYS.SHOPS),
          AsyncStorage.getItem(STORAGE_KEYS.FACTCHECKS),
          AsyncStorage.getItem(STORAGE_KEYS.TICKETS),
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
      } catch (err) {
        console.warn('Error loading AdminContext state:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadState();
  }, []);

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
      AsyncStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(matched));
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
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  };

  // ROUTE FARES CRUD
  const addRoute = async (route: Omit<AdminRouteFare, 'id' | 'updatedAt' | 'updatedBy'>) => {
    const newRoute: AdminRouteFare = {
      ...route,
      id: `rt_${Date.now()}`,
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      updatedBy: currentUser ? currentUser.name : 'Authorized Admin',
    };
    const updated = [newRoute, ...routes];
    setRoutes(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.ROUTES, JSON.stringify(updated));
  };

  const updateRoute = async (route: AdminRouteFare) => {
    const enriched: AdminRouteFare = {
      ...route,
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      updatedBy: currentUser ? currentUser.name : 'Authorized Admin',
    };
    const updated = routes.map((r: AdminRouteFare) => (r.id === enriched.id ? enriched : r));
    setRoutes(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.ROUTES, JSON.stringify(updated));
  };

  const deleteRoute = async (id: string) => {
    const updated = routes.filter((r: AdminRouteFare) => r.id !== id);
    setRoutes(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.ROUTES, JSON.stringify(updated));
  };

  // COMMODITY RATES CRUD
  const addCommodity = async (item: Omit<AdminCommodityPrice, 'id' | 'updatedAt'>) => {
    const newItem: AdminCommodityPrice = {
      ...item,
      id: `cmd_${Date.now()}`,
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updated = [newItem, ...commodities];
    setCommodities(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.COMMODITIES, JSON.stringify(updated));
  };

  const updateCommodity = async (item: AdminCommodityPrice) => {
    const updated = commodities.map((c: AdminCommodityPrice) =>
      c.id === item.id ? { ...item, updatedAt: 'Just Now' } : c
    );
    setCommodities(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.COMMODITIES, JSON.stringify(updated));
  };

  const deleteCommodity = async (id: string) => {
    const updated = commodities.filter((c: AdminCommodityPrice) => c.id !== id);
    setCommodities(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.COMMODITIES, JSON.stringify(updated));
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
    await AsyncStorage.setItem(STORAGE_KEYS.SHOPS, JSON.stringify(updated));
  };

  const updateShopStatus = async (
    id: string,
    status: AdminBazaarShop['status'],
    warningInc: boolean = false
  ) => {
    const updated = shops.map((s: AdminBazaarShop) => {
      if (s.id === id) {
        return {
          ...s,
          status,
          isVerified: status === 'APPROVED',
          warningCount: warningInc ? s.warningCount + 1 : s.warningCount,
        };
      }
      return s;
    });
    setShops(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.SHOPS, JSON.stringify(updated));
  };

  const deleteShop = async (id: string) => {
    const updated = shops.filter((s: AdminBazaarShop) => s.id !== id);
    setShops(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.SHOPS, JSON.stringify(updated));
  };

  // FACT CHECKS CRUD
  const addFactCheck = async (fc: Omit<AdminFactCheck, 'id' | 'timestamp' | 'reachCount'>) => {
    const newFc: AdminFactCheck = {
      ...fc,
      id: `fc_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reachCount: 1,
    };
    const updated = [newFc, ...factChecks];
    setFactChecks(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.FACTCHECKS, JSON.stringify(updated));
  };

  const updateFactCheckStatus = async (
    id: string,
    status: AdminFactCheck['status'],
    clarificationText: string
  ) => {
    const updated = factChecks.map((f: AdminFactCheck) => {
      if (f.id === id) {
        return {
          ...f,
          status,
          officialClarification: clarificationText,
          verifiedBy: currentUser ? currentUser.roleTitle : 'Mela Administration',
          reachCount: f.reachCount + 1,
        };
      }
      return f;
    });
    setFactChecks(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.FACTCHECKS, JSON.stringify(updated));
  };

  const deleteFactCheck = async (id: string) => {
    const updated = factChecks.filter((f: AdminFactCheck) => f.id !== id);
    setFactChecks(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.FACTCHECKS, JSON.stringify(updated));
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
    await AsyncStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(updated));
  };

  const updateTicketStatus = async (
    id: string,
    status: AdminGrievanceTicket['status'],
    actionSummary?: string,
    penalty?: number
  ) => {
    const updated = tickets.map((t: AdminGrievanceTicket) => {
      if (t.id === id) {
        return {
          ...t,
          status,
          assignedOfficer: currentUser ? currentUser.name : t.assignedOfficer,
          actionSummary: actionSummary || t.actionSummary,
          penaltyAmount: penalty !== undefined ? penalty : t.penaltyAmount,
        };
      }
      return t;
    });
    setTickets(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(updated));
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
