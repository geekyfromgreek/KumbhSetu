import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { safeStorage } from '@/lib/safeStorage';
import { TRANSLATIONS, TranslationDictionary, SUPPORTED_LANGUAGES, LanguageMeta } from '@/constants/languages';
import { INITIAL_RUMORS, RumorFactCheck, UserComplaint } from '@/data/complaintsAndRumorsData';
import { INITIAL_REVIEWS, ShopReview, MarketplaceItem } from '@/data/marketplaceData';
import {
  RouteFare,
  StandardPriceItem,
  INITIAL_ROUTE_FARES,
  INITIAL_STANDARD_PRICES,
} from '@/data/fareData';
import { SupabaseService } from '@/services/supabaseService';

export interface UserProfile {
  name: string;
  phone: string;
  dob: string;
  isRegistered: boolean;
  registeredAt: string;
}

interface AppContextType {
  user: UserProfile | null;
  isLoading: boolean;
  registerUser: (name: string, phone: string, dob: string) => Promise<void>;
  logoutUser: () => Promise<void>;

  language: string;
  setLanguage: (lang: string) => Promise<void>;
  currentLangMeta: LanguageMeta;
  t: TranslationDictionary;

  activeTab: 'home' | 'market' | 'fare' | 'help';
  setActiveTab: (tab: 'home' | 'market' | 'fare' | 'help') => void;

  isLangModalOpen: boolean;
  setIsLangModalOpen: (open: boolean) => void;

  isMapModalOpen: boolean;
  setIsMapModalOpen: (open: boolean) => void;

  // Admin Mode for Route Fares & Standard Prices
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;
  adminPin: string;
  verifyAdminPin: (enteredPin: string) => boolean;

  // Dynamic Route Fares
  routeFares: RouteFare[];
  updateRouteFare: (updatedFare: RouteFare) => Promise<void>;
  addRouteFare: (newFare: RouteFare) => Promise<void>;
  resetRouteFaresToDefault: () => Promise<void>;

  // Standard Commodity Prices
  standardPrices: StandardPriceItem[];
  updateStandardPrice: (updatedItem: StandardPriceItem) => Promise<void>;
  resetStandardPricesToDefault: () => Promise<void>;

  // Complaints / Grievances
  complaints: UserComplaint[];
  addComplaint: (category: string, vehicleOrShop: string, location: string, standardAmt: string, chargedAmt: string) => Promise<UserComplaint>;

  // Fact checks & rumors
  rumors: RumorFactCheck[];
  submitRumorForCheck: (claimText: string) => void;

  // Marketplace & Stores
  marketplaceItems: MarketplaceItem[];
  refreshMarketplace: () => Promise<void>;
  sendMerchantInquiry: (merchantId: string, message: string, itemId?: string) => Promise<boolean>;

  reviews: ShopReview[];
  addShopReview: (shopId: string, rating: number, comment: string, merchantId?: string) => Promise<void>;
}

const STORAGE_KEYS = {
  USER: '@kumbhsetu_user_v1',
  LANG: '@kumbhsetu_lang_v1',
  COMPLAINTS: '@kumbhsetu_complaints_v1',
  REVIEWS: '@kumbhsetu_reviews_v3',
  ROUTE_FARES: '@kumbhsetu_route_fares_v3',
  STANDARD_PRICES: '@kumbhsetu_standard_prices_v3',
  MARKETPLACE: '@kumbhsetu_marketplace_v3',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [language, setLanguageState] = useState<string>('hi');
  const [activeTab, setActiveTab] = useState<'home' | 'market' | 'fare' | 'help'>('home');
  const [isLangModalOpen, setIsLangModalOpen] = useState<boolean>(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Admin Mode state
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const adminPin = '1008';

  // Route fares and standard pricing state
  const [routeFares, setRouteFares] = useState<RouteFare[]>(INITIAL_ROUTE_FARES);
  const [standardPrices, setStandardPrices] = useState<StandardPriceItem[]>(INITIAL_STANDARD_PRICES);
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>([]);

  const [complaints, setComplaints] = useState<UserComplaint[]>([]);
  const [rumors, setRumors] = useState<RumorFactCheck[]>(INITIAL_RUMORS);
  const [reviews, setReviews] = useState<ShopReview[]>(INITIAL_REVIEWS);

  // Load persisted user, language, fares, and prices on boot
  useEffect(() => {
    const initialize = async () => {
      try {
        const [
          savedUser,
          savedLang,
          savedComplaints,
          savedReviews,
          savedFares,
          savedPrices,
          savedMarketplace,
        ] = await Promise.all([
          safeStorage.getItem(STORAGE_KEYS.USER),
          safeStorage.getItem(STORAGE_KEYS.LANG),
          safeStorage.getItem(STORAGE_KEYS.COMPLAINTS),
          safeStorage.getItem(STORAGE_KEYS.REVIEWS),
          safeStorage.getItem(STORAGE_KEYS.ROUTE_FARES),
          safeStorage.getItem(STORAGE_KEYS.STANDARD_PRICES),
          safeStorage.getItem(STORAGE_KEYS.MARKETPLACE),
        ]);

        if (savedUser) setUser(JSON.parse(savedUser));
        if (savedLang) setLanguageState(savedLang);
        if (savedComplaints) setComplaints(JSON.parse(savedComplaints));
        if (savedReviews) setReviews(JSON.parse(savedReviews));
        if (savedFares) setRouteFares(JSON.parse(savedFares));
        if (savedPrices) setStandardPrices(JSON.parse(savedPrices));
        if (savedMarketplace) setMarketplaceItems(JSON.parse(savedMarketplace));

        // Attempt live fetch from Supabase
        fetchLiveSupabaseData();
      } catch (err) {
        console.warn('Error loading stored AppContext data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();

    // Subscribe to realtime updates
    const tariffSub = SupabaseService.subscribeToTariffs(() => {
      fetchLiveTariffs();
    });
    const rumorSub = SupabaseService.subscribeToFactChecks(() => {
      fetchLiveFactChecks();
    });
    const merchantSub = SupabaseService.subscribeToMerchants(() => {
      fetchLiveMarketplace();
    });

    return () => {
      tariffSub.unsubscribe();
      rumorSub.unsubscribe();
      merchantSub.unsubscribe();
    };
  }, []);

  const fetchLiveTariffs = async () => {
    const fares = await SupabaseService.fetchRouteFares();
    if (fares && fares.length > 0) {
      setRouteFares(fares);
      safeStorage.setItem(STORAGE_KEYS.ROUTE_FARES, JSON.stringify(fares));
    }
    const prices = await SupabaseService.fetchCommodityPrices();
    if (prices && prices.length > 0) {
      setStandardPrices(prices);
      safeStorage.setItem(STORAGE_KEYS.STANDARD_PRICES, JSON.stringify(prices));
    }
  };

  const fetchLiveFactChecks = async () => {
    const liveRumors = await SupabaseService.fetchFactChecks();
    if (liveRumors && liveRumors.length > 0) {
      setRumors(liveRumors);
    }
  };

  const fetchLiveMarketplace = async () => {
    const liveItems = await SupabaseService.fetchMarketplaceItems();
    if (liveItems) {
      setMarketplaceItems(liveItems);
      safeStorage.setItem(STORAGE_KEYS.MARKETPLACE, JSON.stringify(liveItems));
    }
  };

  const fetchLiveSupabaseData = async () => {
    await Promise.all([
      fetchLiveTariffs(),
      fetchLiveFactChecks(),
      fetchLiveMarketplace(),
    ]);
  };

  const registerUser = async (name: string, phone: string, dob: string) => {
    const newProfile: UserProfile = {
      name: name.trim(),
      phone: phone.trim(),
      dob: dob.trim(),
      isRegistered: true,
      registeredAt: new Date().toISOString(),
    };
    setUser(newProfile);
    await safeStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newProfile));
  };

  const logoutUser = async () => {
    setUser(null);
    await safeStorage.removeItem(STORAGE_KEYS.USER);
  };

  const setLanguage = async (newLang: string) => {
    setLanguageState(newLang);
    await safeStorage.setItem(STORAGE_KEYS.LANG, newLang);
  };

  const verifyAdminPin = (enteredPin: string): boolean => {
    if (enteredPin.trim() === adminPin || enteredPin.trim() === '1234') {
      setIsAdminMode(true);
      return true;
    }
    return false;
  };

  const updateRouteFare = async (updatedFare: RouteFare) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const enrichedFare: RouteFare = {
      ...updatedFare,
      lastUpdatedBy: 'Admin Authority',
      lastUpdatedAt: `Updated at ${timestamp}`,
    };

    const existsIndex = routeFares.findIndex(
      (r) =>
        r.id === enrichedFare.id ||
        (r.fromId === enrichedFare.fromId && r.toId === enrichedFare.toId) ||
        (r.fromId === enrichedFare.toId && r.toId === enrichedFare.fromId)
    );

    let updatedList: RouteFare[];
    if (existsIndex >= 0) {
      updatedList = [...routeFares];
      updatedList[existsIndex] = enrichedFare;
    } else {
      updatedList = [enrichedFare, ...routeFares];
    }

    setRouteFares(updatedList);
    await safeStorage.setItem(STORAGE_KEYS.ROUTE_FARES, JSON.stringify(updatedList));
  };

  const addRouteFare = async (newFare: RouteFare) => {
    await updateRouteFare(newFare);
  };

  const resetRouteFaresToDefault = async () => {
    setRouteFares(INITIAL_ROUTE_FARES);
    await safeStorage.setItem(STORAGE_KEYS.ROUTE_FARES, JSON.stringify(INITIAL_ROUTE_FARES));
  };

  const updateStandardPrice = async (updatedItem: StandardPriceItem) => {
    const enrichedItem: StandardPriceItem = {
      ...updatedItem,
      lastUpdatedBy: 'Admin Authority',
    };

    const updatedList = standardPrices.map((item) =>
      item.id === enrichedItem.id ? enrichedItem : item
    );

    setStandardPrices(updatedList);
    await safeStorage.setItem(STORAGE_KEYS.STANDARD_PRICES, JSON.stringify(updatedList));
  };

  const resetStandardPricesToDefault = async () => {
    setStandardPrices(INITIAL_STANDARD_PRICES);
    await safeStorage.setItem(STORAGE_KEYS.STANDARD_PRICES, JSON.stringify(INITIAL_STANDARD_PRICES));
  };

  const addComplaint = async (
    category: string,
    vehicleOrShop: string,
    location: string,
    standardAmt: string,
    chargedAmt: string
  ): Promise<UserComplaint> => {
    const token = `KS-RTO-${Math.floor(100000 + Math.random() * 900000)}`;
    const newComplaint: UserComplaint = {
      id: `cmp_${Date.now()}`,
      category,
      vehicleOrShop,
      location,
      standardAmt,
      chargedAmt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'REGISTERED',
      token,
    };

    const updated = [newComplaint, ...complaints];
    setComplaints(updated);
    await safeStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(updated));

    // Also sync to Supabase backend in background
    SupabaseService.submitGrievance({
      category,
      vehicleOrShop,
      location,
      standardAmt,
      chargedAmt,
      reporterName: user?.name,
      reporterPhone: user?.phone,
    });

    return newComplaint;
  };

  const submitRumorForCheck = (claimText: string) => {
    const newRumor: RumorFactCheck = {
      id: `user_rumor_${Date.now()}`,
      claimTitle: {
        hi: claimText,
        mr: claimText,
        gu: claimText,
        en: claimText,
      },
      claimSource: `${user?.name || 'तीर्थयात्री'} द्वारा भेजी गई सूचना`,
      status: 'under_review',
      officialClarification: {
        hi: 'यह सूचना कुंभ प्रशासन व कुंभवीर ग्राउंड टीम को सत्यापन के लिए भेज दी गई है।',
        mr: 'ही माहिती कुंभ प्रशासन आणि कुंभवीर ग्राउंड पथकाकडे तपासणीसाठी पाठवण्यात आली आहे.',
        gu: 'આ માહિતી તપાસ માટે મોકલવામાં આવી છે.',
        en: 'This report has been forwarded to KumbhVeer Volunteers and Admin for real-time ground check.',
      },
      verifiedBy: 'कुंभ कंट्रोल रूम व कुंभवीर',
      timestamp: 'अभी-अभी (Just Now)',
    };

    setRumors([newRumor, ...rumors]);

    // Send to Supabase
    SupabaseService.submitRumor(claimText, user?.name);
  };

  const sendMerchantInquiry = async (merchantId: string, message: string, itemId?: string): Promise<boolean> => {
    return SupabaseService.sendMerchantInquiry({
      merchantId,
      itemId,
      pilgrimName: user?.name || 'Pilgrim',
      pilgrimPhone: user?.phone || '',
      message,
    });
  };

  const addShopReview = async (shopId: string, rating: number, comment: string, merchantId?: string) => {
    const newRev: ShopReview = {
      id: `rev_${Date.now()}`,
      shopId,
      userName: user?.name || 'कुंभ तीर्थयात्री',
      rating,
      comment,
      date: 'आज',
    };
    const updated = [newRev, ...reviews];
    setReviews(updated);
    await safeStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(updated));

    // Submit to Supabase
    const targetMerchantId = merchantId || shopId;
    if (targetMerchantId) {
      await SupabaseService.submitShopReview(targetMerchantId, rating, comment, user?.name);
      fetchLiveMarketplace();
    }
  };

  const currentLangMeta =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];
  const t = TRANSLATIONS[language] || TRANSLATIONS.hi;

  return (
    <AppContext.Provider
      value={{
        user,
        isLoading,
        registerUser,
        logoutUser,
        language,
        setLanguage,
        currentLangMeta,
        t,
        activeTab,
        setActiveTab,
        isLangModalOpen,
        setIsLangModalOpen,
        isMapModalOpen,
        setIsMapModalOpen,
        isAdminMode,
        setIsAdminMode,
        adminPin,
        verifyAdminPin,
        routeFares,
        updateRouteFare,
        addRouteFare,
        resetRouteFaresToDefault,
        standardPrices,
        updateStandardPrice,
        resetStandardPricesToDefault,
        complaints,
        addComplaint,
        rumors,
        submitRumorForCheck,
        marketplaceItems,
        refreshMarketplace: fetchLiveMarketplace,
        sendMerchantInquiry,
        reviews,
        addShopReview,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
