import { supabase } from '@/lib/supabase';
import { RouteFare, StandardPriceItem } from '@/data/fareData';
import { RumorFactCheck } from '@/data/complaintsAndRumorsData';
import { MarketplaceItem } from '@/data/marketplaceData';
import { SnanMuhurat } from '@/data/snanData';


function resolveValidHttpImageUrl(url?: string, category: string = 'food'): string {
  if (url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:image/'))) {
    return url;
  }
  const catLower = category.toLowerCase();
  if (catLower.includes('sweet') || catLower.includes('chivda')) {
    return 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600';
  }
  if (catLower.includes('puja') || catLower.includes('samagri')) {
    return 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600';
  }
  if (catLower.includes('grape') || catLower.includes('fruit')) {
    return 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600';
  }
  if (catLower.includes('stay') || catLower.includes('dharamshala') || catLower.includes('hotel') || catLower.includes('lodging')) {
    return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600';
  }
  return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600';
}

export const SupabaseService = {
  // Fetch active route fares
  async fetchRouteFares(): Promise<RouteFare[] | null> {
    try {
      const { data, error } = await supabase
        .from('tariff_routes')
        .select('*')
        .order('route_name', { ascending: true });

      if (error) {
        console.warn('[Supabase fetchRouteFares Error]:', error.message);
        return null;
      }

      if (!data) return null;

      return data.map((row: any) => {
        const parts = row.route_name.includes(' ➔ ')
          ? row.route_name.split(' ➔ ')
          : row.route_name.includes(' to ')
          ? row.route_name.split(' to ')
          : [row.route_name, row.route_name];

        const stdRate = Number(row.standard_rate) || 50;
        const fromName = parts[0]?.trim() || row.route_name;
        const toName = parts[1]?.trim() || row.route_name;

        return {
          id: row.id,
          fromName,
          toName,
          fromId: fromName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
          toId: toName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
          distanceKm: Number(row.distance_km) || 5,
          sharedAutoPerPerson: Number(row.shared_auto_rate) || Math.round(stdRate * 0.4) || 20,
          privateAutoFixed: stdRate,
          kumbhCityBus: Number(row.bus_rate) || Math.round(stdRate * 0.25) || 15,
          taxiCab: Number(row.night_rate) || Math.round(stdRate * 1.8) || 120,
          approxMinutes: Number(row.approx_minutes) || Math.round((Number(row.distance_km) || 5) * 4) || 20,
          trafficNote: row.traffic_note || (row.vehicle_type ? `Vehicle: ${row.vehicle_type}` : 'Official Gazette Fare'),
          lastUpdatedBy: row.approved_by || 'RTO Nashik',
          lastUpdatedAt: new Date(row.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      });
    } catch (e) {
      console.warn('[Supabase fetchRouteFares Exception]:', e);
      return null;
    }
  },

  // Fetch standard commodity ceiling rates
  async fetchCommodityPrices(): Promise<StandardPriceItem[] | null> {
    try {
      const { data, error } = await supabase
        .from('commodity_prices')
        .select('*')
        .order('category', { ascending: true });

      if (error) {
        console.warn('[Supabase fetchCommodityPrices Error]:', error.message);
        return null;
      }
      if (!data) return null;

      return data.map((row: any) => {
        const catLower = (row.category || '').toLowerCase();
        const mappedCat: 'food' | 'beverage' | 'puja' | 'utility' = catLower.includes('water') || catLower.includes('milk') || catLower.includes('beverage')
          ? 'beverage'
          : catLower.includes('puja') || catLower.includes('prasad')
          ? 'puja'
          : catLower.includes('lodging') || catLower.includes('utility') || catLower.includes('essential')
          ? 'utility'
          : 'food';

        return {
          id: row.id,
          name: { hi: row.item_name, mr: row.item_name, gu: row.item_name, en: row.item_name },
          category: mappedCat,
          standardMaxPrice: Number(row.max_retail_price) || 20,
          unit: row.unit || 'per item',
          iconName: mappedCat === 'beverage' ? 'water' : mappedCat === 'puja' ? 'flame' : mappedCat === 'food' ? 'restaurant' : 'pricetag',
          govtNotice: row.notes || 'सरकारी नियत दर (Approved Maximum Rate)',
          lastUpdatedBy: 'District Administration',
        };
      });
    } catch (e) {
      console.warn('[Supabase fetchCommodityPrices Exception]:', e);
      return null;
    }
  },

  // Fetch verified merchants and their catalog items
  async fetchMarketplaceItems(): Promise<MarketplaceItem[] | null> {
    try {
      const { data: merchants, error: mError } = await supabase
        .from('merchants')
        .select('*')
        .eq('is_verified', true);

      if (mError) {
        console.warn('[Supabase fetchMarketplaceItems Error]:', mError.message);
        return null;
      }

      if (!merchants || merchants.length === 0) return [];

      const { data: catalogItems } = await supabase
        .from('catalog_items')
        .select('*')
        .eq('is_available', true);

      const items: MarketplaceItem[] = [];

      for (const m of merchants) {
        if (m.is_verified !== true) continue;
        const mItems = catalogItems?.filter((ci: any) => ci.merchant_id === m.id) || [];
        const shopRating = Number(m.rating) || 4.8;
        const shopReviews = Number(m.review_count) || 1;
        const isOpen = m.is_open_now !== false;

        if (mItems.length > 0) {
          for (const ci of mItems) {
            items.push({
              id: ci.id,
              merchantId: m.id,
              name: { hi: ci.name, mr: ci.name, gu: ci.name, en: ci.name },
              category: m.category.includes('Eatery') ? 'food' : m.category.includes('Puja') ? 'puja' : 'chivda',
              categoryLabel: { hi: m.category, mr: m.category, gu: m.category, en: m.category },
              shopName: m.business_name,
              location: `${m.sector}, ${m.address}`,
              price: Number(ci.price),
              unit: 'per plate/item',
              rating: shopRating,
              reviewCount: shopReviews,
              isOpenNow: isOpen,
              isGovtVerified: !!m.is_verified,
              phone: m.phone,
              description: { hi: ci.description || m.business_name, mr: ci.description || m.business_name, gu: ci.description || m.business_name, en: ci.description || m.business_name },
              tags: [m.scale_type, m.fssai_number ? 'FSSAI Certified' : 'Local Bazaar'],
              imageUrl: resolveValidHttpImageUrl(ci.image_url || m.facade_image_url, m.category),
              badgeText: m.fssai_number ? `FSSAI: ${m.fssai_number}` : 'Govt Registered',
            });
          }
        } else {
          // Add eatery/merchant store entry
          items.push({
            id: m.id,
            merchantId: m.id,
            name: { hi: m.business_name, mr: m.business_name, gu: m.business_name, en: m.business_name },
            category: m.category.includes('Eatery') ? 'food' : m.category.includes('Puja') ? 'puja' : 'chivda',
            categoryLabel: { hi: m.category, mr: m.category, gu: m.category, en: m.category },
            shopName: m.business_name,
            location: `${m.sector}, ${m.address}`,
            price: 50,
            unit: 'varies',
            rating: shopRating,
            reviewCount: shopReviews,
            isOpenNow: isOpen,
            isGovtVerified: !!m.is_verified,
            phone: m.phone,
            description: { hi: `${m.owner_name} • ${m.scale_type}`, mr: `${m.owner_name} • ${m.scale_type}`, gu: `${m.owner_name} • ${m.scale_type}`, en: `${m.owner_name} • ${m.scale_type}` },
            tags: [m.scale_type, m.fssai_number ? 'FSSAI Certified' : 'Local Bazaar'],
            imageUrl: resolveValidHttpImageUrl(m.facade_image_url, m.category),
            badgeText: m.fssai_number ? `FSSAI: ${m.fssai_number}` : 'Govt Registered',
          });
        }
      }

      // Sort with highest rating first
      return items.sort((a, b) => b.rating - a.rating);
    } catch (e) {
      console.warn('[Supabase fetchMarketplaceItems Exception]:', e);
      return null;
    }
  },

  // Submit shop review and rating
  async submitShopReview(merchantId: string, rating: number, comment: string, userName?: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('shop_reviews').insert([
        {
          merchant_id: merchantId,
          user_name: userName || 'Kumbh Pilgrim',
          rating,
          comment,
        },
      ]);
      if (error) {
        console.warn('[Supabase submitShopReview Error]:', error.message);
        return false;
      }
      return true;
    } catch (e) {
      console.warn('[Supabase submitShopReview Exception]:', e);
      return false;
    }
  },

  // Submit Complaint/Incident
  async submitGrievance(complaint: {
    category: string;
    vehicleOrShop: string;
    location: string;
    standardAmt: string;
    chargedAmt: string;
    reporterName?: string;
    reporterPhone?: string;
  }): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('incidents_and_grievances')
        .insert([
          {
            title: `Overcharging: ${complaint.vehicleOrShop} at ${complaint.location}`,
            description: `Standard rate ₹${complaint.standardAmt} vs Charged ₹${complaint.chargedAmt}. Category: ${complaint.category}`,
            category: 'Overcharging',
            sector: complaint.location,
            location_details: complaint.location,
            status: 'PENDING',
            priority: 'HIGH',
            reporter_name: complaint.reporterName || 'Pilgrim',
            reporter_phone: complaint.reporterPhone || '',
          },
        ])
        .select('id')
        .single();

      if (error) {
        console.warn('[Supabase submitGrievance Error]:', error.message);
        return null;
      }
      return data?.id || null;
    } catch (e) {
      console.warn('[Supabase submitGrievance Exception]:', e);
      return null;
    }
  },

  // Fetch Fact-Checks & Rumors
  async fetchFactChecks(): Promise<RumorFactCheck[] | null> {
    try {
      const { data, error } = await supabase
        .from('fact_checks_and_rumors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('[Supabase fetchFactChecks Error]:', error.message);
        return null;
      }
      if (!data) return null;

      return data.map((row: any) => ({
        id: row.id,
        claimTitle: {
          hi: row.claim_title,
          mr: row.claim_title,
          gu: row.claim_title,
          en: row.claim_title,
        },
        claimSource: row.submitted_by || 'तीर्थयात्री / सोशल मीडिया',
        status: (row.verdict === 'TRUE'
          ? 'real'
          : row.verdict === 'FALSE'
          ? 'fake'
          : 'under_review') as any,
        officialClarification: {
          hi: row.official_explanation || 'सत्यापन प्रक्रियाधीन है।',
          mr: row.official_explanation || 'तपासणी सुरू आहे.',
          gu: row.official_explanation || 'તપાસ ચાલુ છે.',
          en: row.official_explanation || 'Verification in progress by Ground Patrol.',
        },
        verifiedBy: row.verified_by_admin || row.verified_by_volunteer || 'कुंभ कंट्रोल रूम व कुंभवीर',
        timestamp: new Date(row.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }));
    } catch (e) {
      console.warn('[Supabase fetchFactChecks Exception]:', e);
      return null;
    }
  },

  // Submit Rumor for checking
  async submitRumor(claimText: string, reporterName?: string): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('fact_checks_and_rumors')
        .insert([
          {
            claim_title: claimText,
            claim_details: claimText,
            verdict: 'UNDER_REVIEW',
            official_explanation: 'Forwarded to Ground Volunteers (KumbhVeer) and District Administration for physical verification.',
            submitted_by: reporterName ? `${reporterName} (Pilgrim)` : 'Pilgrim App',
          },
        ])
        .select('id')
        .single();

      if (error) {
        console.warn('[Supabase submitRumor Error]:', error.message);
        return null;
      }
      return data?.id || null;
    } catch (e) {
      console.warn('[Supabase submitRumor Exception]:', e);
      return null;
    }
  },

  // Send inquiry to merchant
  async sendMerchantInquiry(inquiry: {
    merchantId: string;
    itemId?: string;
    pilgrimName: string;
    pilgrimPhone: string;
    message: string;
  }): Promise<boolean> {
    try {
      const { error } = await supabase.from('pilgrim_inquiries').insert([
        {
          merchant_id: inquiry.merchantId,
          item_id: inquiry.itemId || null,
          pilgrim_name: inquiry.pilgrimName,
          pilgrim_phone: inquiry.pilgrimPhone,
          message: inquiry.message,
          status: 'NEW',
        },
      ]);
      return !error;
    } catch (e) {
      console.warn('[Supabase sendMerchantInquiry Exception]:', e);
      return false;
    }
  },

  // Fetch Snan Muhurat auspicious timings
  async fetchSnanMuhurats(): Promise<SnanMuhurat[] | null> {
    try {
      const { data, error } = await supabase
        .from('snan_muhurats')
        .select('*')
        .order('order_num', { ascending: true });

      if (error) {
        // Table not created yet in Supabase schema cache
        return null;
      }
      if (!data || data.length === 0) return null;

      return data.map((row: any) => ({
        id: String(row.id),
        title: row.title,
        titleHi: row.title_hi || row.title,
        titleMr: row.title_mr || row.title,
        snanDate: row.snan_date || row.date,
        muhuratTime: row.muhurat_time,
        ghatLocation: row.ghat_location,
        importance: row.importance || '',
        crowdLevel: row.crowd_level || 'High',
        isMajor: row.is_major !== false,
        orderNum: Number(row.order_num) || 0,
      }));
    } catch (e) {
      return null;
    }
  },


  // Realtime Subscriptions
  subscribeToTariffs(callback: () => void) {
    return supabase
      .channel('public:tariff_routes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tariff_routes' }, () => {
        callback();
      })
      .subscribe();
  },

  subscribeToFactChecks(callback: () => void) {
    return supabase
      .channel('public:fact_checks_and_rumors')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'fact_checks_and_rumors' }, () => {
        callback();
      })
      .subscribe();
  },

  subscribeToMerchants(callback: () => void) {
    return supabase
      .channel('public:merchants')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'merchants' }, () => {
        callback();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'shop_reviews' }, () => {
        callback();
      })
      .subscribe();
  },

  subscribeToSnanMuhurats(callback: () => void) {
    return supabase
      .channel('public:snan_muhurats')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'snan_muhurats' }, () => {
        callback();
      })
      .subscribe();
  },
};

