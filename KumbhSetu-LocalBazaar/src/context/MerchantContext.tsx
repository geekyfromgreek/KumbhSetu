import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { safeStorage } from '@/lib/safeStorage';
import {
  MerchantProfile,
  CatalogItem,
  PilgrimInquiry,
  BusinessCategory,
  BusinessScale,
  FoodLicenseInfo,
} from '@/types/merchant';
import { MerchantSupabaseService } from '@/services/supabaseService';

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
  loginMerchant: (phone: string) => Promise<{ success: boolean; message?: string }>;
  logoutMerchant: () => Promise<void>;
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
    let sub: any = null;

    const loadData = async () => {
      try {
        const [savedProfile, savedCatalog, savedInquiries] = await Promise.all([
          safeStorage.getItem(STORAGE_KEYS.PROFILE),
          safeStorage.getItem(STORAGE_KEYS.CATALOG),
          safeStorage.getItem(STORAGE_KEYS.INQUIRIES),
        ]);

        let parsedProfile: MerchantProfile | null = null;
        if (savedProfile) {
          parsedProfile = JSON.parse(savedProfile);
          setProfile(parsedProfile);
        }

        if (savedCatalog) {
          setCatalogItems(JSON.parse(savedCatalog));
        }

        if (savedInquiries) {
          setInquiries(JSON.parse(savedInquiries));
        }

        if (parsedProfile?.id) {
          // Fetch live catalog and inquiries
          const [liveItems, liveInq] = await Promise.all([
            MerchantSupabaseService.fetchCatalogItems(parsedProfile.id),
            MerchantSupabaseService.fetchInquiries(parsedProfile.id),
          ]);
          if (liveItems) {
            setCatalogItems(liveItems);
            safeStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(liveItems));
          }
          if (liveInq) {
            setInquiries(liveInq);
            safeStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(liveInq));
          }

          // Realtime subscription for inquiries
          sub = MerchantSupabaseService.subscribeToInquiries(parsedProfile.id, async () => {
            const updatedInq = await MerchantSupabaseService.fetchInquiries(parsedProfile!.id);
            if (updatedInq) {
              setInquiries(updatedInq);
              safeStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updatedInq));
            }
          });
        }
      } catch (err) {
        console.warn('Error loading merchant storage:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    return () => {
      if (sub?.unsubscribe) sub.unsubscribe();
    };
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
    await safeStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile));

    // Sync to Supabase in background
    const serverId = await MerchantSupabaseService.saveMerchantProfile(newProfile);
    if (serverId && serverId !== newProfile.id) {
      const updatedProfile = { ...newProfile, id: serverId };
      setProfile(updatedProfile);
      await safeStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updatedProfile));
    }
  };

  // Login Existing Merchant by Phone
  const loginMerchant = async (phone: string): Promise<{ success: boolean; message?: string }> => {
    const cleanPhone = phone.trim();
    if (!cleanPhone || cleanPhone.length < 10) {
      return { success: false, message: 'Please enter a valid 10-digit registered mobile number.' };
    }

    try {
      const fetched = await MerchantSupabaseService.fetchMerchantByPhone(cleanPhone);
      if (fetched) {
        setProfile(fetched);
        await safeStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(fetched));

        // Also fetch their catalog and inquiries
        const [liveItems, liveInq] = await Promise.all([
          MerchantSupabaseService.fetchCatalogItems(fetched.id),
          MerchantSupabaseService.fetchInquiries(fetched.id),
        ]);
        if (liveItems) {
          setCatalogItems(liveItems);
          await safeStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(liveItems));
        }
        if (liveInq) {
          setInquiries(liveInq);
          await safeStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(liveInq));
        }

        return { success: true };
      }

      // If offline or not found in cloud, check if local storage had this phone
      const savedProfile = await safeStorage.getItem(STORAGE_KEYS.PROFILE);
      if (savedProfile) {
        const local = JSON.parse(savedProfile);
        if (local.phone === cleanPhone) {
          setProfile(local);
          return { success: true };
        }
      }

      return {
        success: false,
        message: 'No registered merchant found with this phone number. Please register your stall first.',
      };
    } catch (e) {
      return { success: false, message: 'Connection error. Please try again.' };
    }
  };

  const logoutMerchant = async () => {
    setProfile(null);
    setCatalogItems([]);
    setInquiries([]);
    await Promise.all([
      safeStorage.removeItem(STORAGE_KEYS.PROFILE),
      safeStorage.removeItem(STORAGE_KEYS.CATALOG),
      safeStorage.removeItem(STORAGE_KEYS.INQUIRIES),
    ]);
  };

  // Update Profile
  const updateProfile = async (updates: Partial<MerchantProfile>) => {
    if (!profile) return;
    const updated = { ...profile, ...updates };
    setProfile(updated);
    await safeStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));

    // Sync update to Supabase
    MerchantSupabaseService.saveMerchantProfile(updated);
  };

  // Toggle Open/Closed Status
  const toggleShopOpenStatus = async () => {
    if (!profile) return;
    const newStatus = !profile.isOpenNow;
    const updated = { ...profile, isOpenNow: newStatus };
    setProfile(updated);
    await safeStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));

    if (profile.id) {
      await MerchantSupabaseService.updateShopOpenStatus(profile.id, newStatus);
    }
  };

  // Catalog Actions
  const addCatalogItem = async (item: Omit<CatalogItem, 'id' | 'createdAt'>) => {
    const tempId = `item_${Date.now()}`;
    const newItem: CatalogItem = {
      ...item,
      id: tempId,
      createdAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = [newItem, ...catalogItems];
    setCatalogItems(updated);
    await safeStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(updated));

    if (profile?.id) {
      const serverId = await MerchantSupabaseService.addCatalogItem(item, profile.id);
      if (serverId) {
        const synced = updated.map((i) => (i.id === tempId ? { ...i, id: serverId } : i));
        setCatalogItems(synced);
        await safeStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(synced));
      }
    }
  };

  const updateCatalogItem = async (id: string, updates: Partial<CatalogItem>) => {
    const updated = catalogItems.map((item) => (item.id === id ? { ...item, ...updates } : item));
    setCatalogItems(updated);
    await safeStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(updated));

    MerchantSupabaseService.updateCatalogItem(id, updates);
  };

  const deleteCatalogItem = async (id: string) => {
    const updated = catalogItems.filter((item) => item.id !== id);
    setCatalogItems(updated);
    await safeStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(updated));

    MerchantSupabaseService.deleteCatalogItem(id);
  };

  const toggleItemAvailability = async (id: string) => {
    const item = catalogItems.find((i) => i.id === id);
    const newAvail = item ? !item.isAvailable : false;

    const updated = catalogItems.map((i) =>
      i.id === id ? { ...i, isAvailable: newAvail } : i
    );
    setCatalogItems(updated);
    await safeStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(updated));

    MerchantSupabaseService.updateCatalogItem(id, { isAvailable: newAvail });
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
    await safeStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  };

  const markInquiryAsRead = async (id: string) => {
    const updated = inquiries.map((inq) => (inq.id === id ? { ...inq, isRead: true } : inq));
    setInquiries(updated);
    await safeStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));

    MerchantSupabaseService.markInquiryRead(id);
  };

  const resetAccount = async () => {
    setProfile(null);
    setCatalogItems([]);
    setInquiries([]);
    await Promise.all([
      safeStorage.removeItem(STORAGE_KEYS.PROFILE),
      safeStorage.removeItem(STORAGE_KEYS.CATALOG),
      safeStorage.removeItem(STORAGE_KEYS.INQUIRIES),
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
        loginMerchant,
        logoutMerchant,
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
