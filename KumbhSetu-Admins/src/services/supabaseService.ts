import { supabase } from '@/lib/supabase';
import {
  AdminRouteFare,
  AdminCommodityPrice,
  AdminBazaarShop,
  AdminFactCheck,
  AdminGrievanceTicket,
} from '@/types/admin';

export const AdminSupabaseService = {
  // --------------------------------------------------------------------------
  // 1. TRANSIT ROUTE TARIFFS
  // --------------------------------------------------------------------------
  async fetchRoutes(): Promise<AdminRouteFare[] | null> {
    try {
      const { data, error } = await supabase
        .from('tariff_routes')
        .select('*')
        .order('route_name', { ascending: true });

      if (error) {
        console.warn('[AdminSupabase fetchRoutes Error]:', error.message);
        return null;
      }
      if (!data) return null;

      return data.map((row: any) => {
        const parts = row.route_name.includes(' ➔ ')
          ? row.route_name.split(' ➔ ')
          : [row.route_name, row.route_name];

        const stdRate = Number(row.standard_rate) || 50;

        return {
          id: row.id,
          fromName: parts[0]?.trim() || row.route_name,
          toName: parts[1]?.trim() || row.route_name,
          distanceKm: Number(row.distance_km) || 5,
          sharedAutoPerPerson: Math.round(stdRate * 0.4) || 20,
          privateAutoFixed: stdRate,
          kumbhCityBus: Math.round(stdRate * 0.25) || 15,
          taxiCab: Number(row.night_rate) || Math.round(stdRate * 1.8) || 120,
          approxMinutes: Math.round((Number(row.distance_km) || 5) * 4) || 20,
          trafficNote: row.vehicle_type ? `Vehicle: ${row.vehicle_type}` : 'Standard flow',
          status: 'ACTIVE',
          updatedAt: new Date(row.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          updatedBy: row.approved_by || 'RTO Nashik',
        };
      });
    } catch (e) {
      console.warn('[AdminSupabase fetchRoutes Exception]:', e);
      return null;
    }
  },

  async insertRoute(route: Omit<AdminRouteFare, 'id' | 'updatedAt' | 'updatedBy'>, officerName: string): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('tariff_routes')
        .insert([
          {
            route_name: `${route.fromName} ➔ ${route.toName}`,
            vehicle_type: 'Auto Rickshaw',
            standard_rate: route.privateAutoFixed,
            distance_km: route.distanceKm,
            night_rate: route.taxiCab,
            approved_by: officerName || 'RTO Authority',
          },
        ])
        .select('id')
        .single();

      if (error) {
        console.warn('[AdminSupabase insertRoute Error]:', error.message);
        return null;
      }
      return data?.id || null;
    } catch (e) {
      console.warn('[AdminSupabase insertRoute Exception]:', e);
      return null;
    }
  },

  async updateRoute(route: AdminRouteFare, officerName: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('tariff_routes')
        .update({
          route_name: `${route.fromName} ➔ ${route.toName}`,
          standard_rate: route.privateAutoFixed,
          distance_km: route.distanceKm,
          night_rate: route.taxiCab,
          approved_by: officerName || 'RTO Authority',
          updated_at: new Date().toISOString(),
        })
        .eq('id', route.id);

      return !error;
    } catch (e) {
      console.warn('[AdminSupabase updateRoute Exception]:', e);
      return false;
    }
  },

  async deleteRoute(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('tariff_routes').delete().eq('id', id);
      return !error;
    } catch (e) {
      return false;
    }
  },

  // --------------------------------------------------------------------------
  // 2. COMMODITY CEILING PRICES
  // --------------------------------------------------------------------------
  async fetchCommodities(): Promise<AdminCommodityPrice[] | null> {
    try {
      const { data, error } = await supabase
        .from('commodity_prices')
        .select('*')
        .order('category', { ascending: true });

      if (error) {
        console.warn('[AdminSupabase fetchCommodities Error]:', error.message);
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
          name: row.item_name,
          category: mappedCat,
          standardMaxPrice: Number(row.max_retail_price) || 20,
          unit: row.unit || 'per item',
          govtNotice: row.notes || 'Govt Approved Rate',
          complianceLevel: 'COMPLIANT',
          updatedAt: new Date(row.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      });
    } catch (e) {
      console.warn('[AdminSupabase fetchCommodities Exception]:', e);
      return null;
    }
  },

  async insertCommodity(item: Omit<AdminCommodityPrice, 'id' | 'updatedAt'>): Promise<string | null> {
    try {
      const dbCat = item.category === 'beverage' ? 'Water & Milk' : item.category === 'puja' ? 'Prasad & Puja' : item.category === 'utility' ? 'Essentials' : 'Food & Snacks';
      const { data, error } = await supabase
        .from('commodity_prices')
        .insert([
          {
            item_name: item.name,
            category: dbCat,
            max_retail_price: item.standardMaxPrice,
            unit: item.unit,
            notes: item.govtNotice,
          },
        ])
        .select('id')
        .single();

      if (error) return null;
      return data?.id || null;
    } catch (e) {
      return null;
    }
  },

  async updateCommodity(item: AdminCommodityPrice): Promise<boolean> {
    try {
      const dbCat = item.category === 'beverage' ? 'Water & Milk' : item.category === 'puja' ? 'Prasad & Puja' : item.category === 'utility' ? 'Essentials' : 'Food & Snacks';
      const { error } = await supabase
        .from('commodity_prices')
        .update({
          item_name: item.name,
          category: dbCat,
          max_retail_price: item.standardMaxPrice,
          unit: item.unit,
          notes: item.govtNotice,
          updated_at: new Date().toISOString(),
        })
        .eq('id', item.id);

      return !error;
    } catch (e) {
      return false;
    }
  },

  async deleteCommodity(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('commodity_prices').delete().eq('id', id);
      return !error;
    } catch (e) {
      return false;
    }
  },

  // --------------------------------------------------------------------------
  // 3. MERCHANTS / BAZAAR SHOPS
  // --------------------------------------------------------------------------
  async fetchShops(): Promise<AdminBazaarShop[] | null> {
    try {
      const { data, error } = await supabase
        .from('merchants')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('[AdminSupabase fetchShops Error]:', error.message);
        return null;
      }
      if (!data) return null;

      return data.map((row: any) => ({
        id: row.id,
        shopName: row.business_name,
        ownerName: row.owner_name,
        category: row.category,
        location: `${row.sector}, ${row.address}`,
        phone: row.phone,
        itemSampleName: row.scale_type || 'General Store',
        itemSamplePrice: 50,
        isVerified: !!row.is_verified,
        status: row.is_verified ? 'APPROVED' : 'PENDING_AUDIT',
        warningCount: 0,
        registrationDate: new Date(row.created_at).toLocaleDateString(),
      }));
    } catch (e) {
      console.warn('[AdminSupabase fetchShops Exception]:', e);
      return null;
    }
  },

  async updateShopStatus(id: string, isApproved: boolean): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('merchants')
        .update({
          is_verified: isApproved,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      return !error;
    } catch (e) {
      return false;
    }
  },

  async deleteShop(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('merchants').delete().eq('id', id);
      return !error;
    } catch (e) {
      return false;
    }
  },

  // --------------------------------------------------------------------------
  // 4. FACT-CHECKS & RUMORS
  // --------------------------------------------------------------------------
  async fetchFactChecks(): Promise<AdminFactCheck[] | null> {
    try {
      const { data, error } = await supabase
        .from('fact_checks_and_rumors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) return null;
      if (!data) return null;

      return data.map((row: any) => ({
        id: row.id,
        claimTitle: row.claim_title,
        claimSource: row.submitted_by || 'Social Media / Pilgrim Report',
        status: row.verdict === 'TRUE' ? 'verified_true' : row.verdict === 'FALSE' ? 'debunked_fake' : 'under_review',
        officialClarification: row.official_explanation || 'Pending official clarification',
        verifiedBy: row.verified_by_admin || row.verified_by_volunteer || 'Under Investigation',
        timestamp: new Date(row.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reachCount: 1420,
        priority: 'HIGH',
      }));
    } catch (e) {
      return null;
    }
  },

  async insertFactCheck(fc: Omit<AdminFactCheck, 'id' | 'timestamp' | 'reachCount'>, officerTitle: string): Promise<string | null> {
    try {
      const verdict = fc.status === 'verified_true' ? 'TRUE' : fc.status === 'debunked_fake' ? 'FALSE' : 'UNDER_REVIEW';
      const { data, error } = await supabase
        .from('fact_checks_and_rumors')
        .insert([
          {
            claim_title: fc.claimTitle,
            claim_details: fc.claimTitle,
            verdict,
            official_explanation: fc.officialClarification,
            submitted_by: fc.claimSource,
            verified_by_admin: officerTitle || 'District Administration',
          },
        ])
        .select('id')
        .single();

      if (error) return null;
      return data?.id || null;
    } catch (e) {
      return null;
    }
  },

  async updateFactCheckStatus(id: string, status: AdminFactCheck['status'], clarificationText: string, officerTitle: string): Promise<boolean> {
    try {
      const verdict = status === 'verified_true' ? 'TRUE' : status === 'debunked_fake' ? 'FALSE' : 'UNDER_REVIEW';
      const { error } = await supabase
        .from('fact_checks_and_rumors')
        .update({
          verdict,
          official_explanation: clarificationText,
          verified_by_admin: officerTitle || 'District Administration',
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      return !error;
    } catch (e) {
      return false;
    }
  },

  async deleteFactCheck(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('fact_checks_and_rumors').delete().eq('id', id);
      return !error;
    } catch (e) {
      return false;
    }
  },

  // --------------------------------------------------------------------------
  // 5. GRIEVANCES & ENFORCEMENT TICKETS
  // --------------------------------------------------------------------------
  async fetchGrievances(): Promise<AdminGrievanceTicket[] | null> {
    try {
      const { data, error } = await supabase
        .from('incidents_and_grievances')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) return null;
      if (!data) return null;

      return data.map((row: any) => ({
        id: row.id,
        token: `KS-ENF-${row.id.substring(0, 6).toUpperCase()}`,
        category: row.category,
        vehicleOrShop: row.title,
        location: `${row.sector} - ${row.location_details}`,
        standardAmt: 'Standard Rate',
        chargedAmt: 'Reported Violation',
        timestamp: new Date(row.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: row.status === 'RESOLVED' ? 'RESOLVED' : row.status === 'IN_PROGRESS' ? 'SQUAD_DISPATCHED' : 'REGISTERED',
        assignedOfficer: row.assigned_volunteer_name || 'Enforcement Flying Squad',
        actionSummary: row.resolution_notes || '',
        penaltyAmount: 0,
      }));
    } catch (e) {
      return null;
    }
  },

  async updateGrievanceStatus(id: string, status: AdminGrievanceTicket['status'], actionSummary?: string, penalty?: number, officerName?: string): Promise<boolean> {
    try {
      const dbStatus = status === 'RESOLVED' ? 'RESOLVED' : status === 'SQUAD_DISPATCHED' ? 'IN_PROGRESS' : 'PENDING';
      const { error } = await supabase
        .from('incidents_and_grievances')
        .update({
          status: dbStatus,
          resolution_notes: actionSummary || (penalty ? `Fine of ₹${penalty} levied.` : 'Resolved by squad.'),
          assigned_volunteer_name: officerName || 'Enforcement Squad',
          resolved_at: status === 'RESOLVED' ? new Date().toISOString() : null,
        })
        .eq('id', id);

      return !error;
    } catch (e) {
      return false;
    }
  },

  // --------------------------------------------------------------------------
  // REALTIME SUBSCRIPTIONS
  // --------------------------------------------------------------------------
  subscribeToAll(callback: () => void) {
    return supabase
      .channel('public:admin_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tariff_routes' }, callback)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'commodity_prices' }, callback)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'merchants' }, callback)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'incidents_and_grievances' }, callback)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'fact_checks_and_rumors' }, callback)
      .subscribe();
  },
};
