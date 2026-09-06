import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  MerchantProfile,
  CatalogItem,
  PilgrimInquiry,
  BusinessCategory,
  BusinessScale,
  FoodLicenseInfo,
} from '@/types/merchant';

interface MerchantContextType {
  profile: MerchantProfile | null;
  isRegistered: boolean;
  isLoading: boolean;
  activeTab: 'catalog' | 'profile' | 'preview' | 'inquiries';
  setActiveTab: (tab: 'catalog' | 'profile' | 'preview' | 'inquiries') => void;

  // Catalog State
  catalogItems: CatalogItem[];
  addCatalogItem: (item: Omit<CatalogItem, 'id' | 'createdAt'>) => Promise<void>;
  updateCatalogItem: (id: string, updates: Partial<CatalogItem>) => Promise<void>;
  deleteCatalogItem: (id: string) => Promise<void>;
  toggleItemAvailability: (id: string) => Promise<void>;

  // Profile State
  registerMerchant: (data: Omit<MerchantProfile, 'id' | 'registeredDate'>) => Promise<void>;
  updateProfile: (updates: Partial<MerchantProfile>) => Promise<void>;
  toggleShopOpenStatus: () => Promise<void>;
  resetAccount: () => Promise<void>;

  // Inquiries State
  inquiries: PilgrimInquiry[];
  addInquiry: (inquiry: Omit<PilgrimInquiry, 'id' | 'timestamp' | 'isRead'>) => Promise<void>;
  markInquiryAsRead: (id: string) => Promise<void>;
}

const STORAGE_KEYS = {
  PROFILE: '@kumbh_merchant_profile',
  CATALOG: '@kumbh_merchant_catalog',
  INQUIRIES: '@kumbh_merchant_inquiries',
};

const MerchantContext = createContext<MerchantContextType | undefined>(undefined);

export const MerchantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<MerchantProfile | null>(null);
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [inquiries, setInquiries] = useState<PilgrimInquiry[]>([]);
  const [activeTab, setActiveTab] = useState<'catalog' | 'profile' | 'preview' | 'inquiries'>('catalog');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load persisted merchant data on launch
  useEffect(() => {
    const loadData = async () => {
      try {
        const [savedProfile, savedCatalog, savedInquiries] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.PROFILE),
          AsyncStorage.getItem(STORAGE_KEYS.CATALOG),
          AsyncStorage.getItem(STORAGE_KEYS.INQUIRIES),
        ]);

        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
        }

        if (savedCatalog) {
          setCatalogItems(JSON.parse(savedCatalog));
        }

        if (savedInquiries) {
          setInquiries(JSON.parse(savedInquiries));
        }
      } catch (err) {
        console.warn('Error loading merchant storage:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Register Merchant
  const registerMerchant = async (data: Omit<MerchantProfile, 'id' | 'registeredDate'>) => {
    const newProfile: MerchantProfile = {
      ...data,
      id: `mch_${Date.now()}`,
      registeredDate: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };

    setProfile(newProfile);
    await AsyncStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile));
  };

  // Update Profile
  const updateProfile = async (updates: Partial<MerchantProfile>) => {
    if (!profile) return;
    const updated = { ...profile, ...updates };
    setProfile(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
  };

  // Toggle Open/Closed Status
  const toggleShopOpenStatus = async () => {
    if (!profile) return;
    const updated = { ...profile, isOpenNow: !profile.isOpenNow };
    setProfile(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
  };

  // Catalog Actions
  const addCatalogItem = async (item: Omit<CatalogItem, 'id' | 'createdAt'>) => {
    const newItem: CatalogItem = {
      ...item,
      id: `item_${Date.now()}`,
      createdAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = [newItem, ...catalogItems];
    setCatalogItems(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(updated));
  };

  const updateCatalogItem = async (id: string, updates: Partial<CatalogItem>) => {
    const updated = catalogItems.map((item) => (item.id === id ? { ...item, ...updates } : item));
    setCatalogItems(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(updated));
  };

  const deleteCatalogItem = async (id: string) => {
    const updated = catalogItems.filter((item) => item.id !== id);
    setCatalogItems(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(updated));
  };

  const toggleItemAvailability = async (id: string) => {
    const updated = catalogItems.map((item) =>
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
    );
    setCatalogItems(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(updated));
  };

  // Inquiries Actions
  const addInquiry = async (inquiry: Omit<PilgrimInquiry, 'id' | 'timestamp' | 'isRead'>) => {
    const newInq: PilgrimInquiry = {
      ...inquiry,
      id: `inq_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    };
    const updated = [newInq, ...inquiries];
    setInquiries(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  };

  const markInquiryAsRead = async (id: string) => {
    const updated = inquiries.map((inq) => (inq.id === id ? { ...inq, isRead: true } : inq));
    setInquiries(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  };

  const resetAccount = async () => {
    setProfile(null);
    setCatalogItems([]);
    setInquiries([]);
    await Promise.all([
      AsyncStorage.removeItem(STORAGE_KEYS.PROFILE),
      AsyncStorage.removeItem(STORAGE_KEYS.CATALOG),
      AsyncStorage.removeItem(STORAGE_KEYS.INQUIRIES),
    ]);
  };

  return (
    <MerchantContext.Provider
      value={{
        profile,
        isRegistered: !!profile,
        isLoading,
        activeTab,
        setActiveTab,
        catalogItems,
        addCatalogItem,
        updateCatalogItem,
        deleteCatalogItem,
        toggleItemAvailability,
        registerMerchant,
        updateProfile,
        toggleShopOpenStatus,
        resetAccount,
        inquiries,
        addInquiry,
        markInquiryAsRead,
      }}
    >
      {children}
    </MerchantContext.Provider>
  );
};

export const useMerchant = () => {
  const context = useContext(MerchantContext);
  if (!context) {
    throw new Error('useMerchant must be used within a MerchantProvider');
  }
  return context;
};
