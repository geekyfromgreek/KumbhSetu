import { supabase, uploadMediaToSupabase } from '@/lib/supabase';
import {
  MerchantProfile,
  CatalogItem,
  PilgrimInquiry,
  BusinessCategory,
  BusinessScale,
} from '@/types/merchant';

export const MerchantSupabaseService = {
  // Upload image/doc to Supabase Storage bucket 'kumbh-media'
  async uploadFile(uri: string, folder: string = 'merchants'): Promise<string> {
    return uploadMediaToSupabase(uri, folder);
  },

  // Save or update merchant profile
  async saveMerchantProfile(profile: MerchantProfile): Promise<string | null> {
    try {
      // If shopImageUri or license document is a local file, upload to Supabase bucket
      let uploadedShopImg = profile.shopImageUri;
      if (profile.shopImageUri && !profile.shopImageUri.startsWith('http')) {
        uploadedShopImg = await uploadMediaToSupabase(profile.shopImageUri, 'stall_facades');
      }

      if (!uploadedShopImg || !uploadedShopImg.startsWith('http')) {
        const cat = profile.category;
        uploadedShopImg = cat === 'EATERY_LARGE' 
          ? 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800'
          : cat === 'CHIVDA_SWEETS'
          ? 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800'
          : cat === 'PUJA_HANDICRAFT'
          ? 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800'
          : cat === 'AGRO_GRAPES'
          ? 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800'
          : cat === 'STAY_DHARAMSHALA'
          ? 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
          : 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800';
      }

      let uploadedLicenseDoc = profile.foodLicense?.documentImageUri;
      if (uploadedLicenseDoc && !uploadedLicenseDoc.startsWith('http')) {
        uploadedLicenseDoc = await uploadMediaToSupabase(uploadedLicenseDoc, 'fssai_licenses');
      }

      const categoryMap: Record<string, string> = {
        EATERY_LARGE: 'Eatery / Bhojanalaya',
        EATERY_SMALL: 'Sweets & Snacks',
        PUJA_HANDICRAFT: 'Puja Samagri',
        CHIVDA_SWEETS: 'Sweets & Snacks',
        AGRO_GRAPES: 'Handicrafts',
        STAY_DHARAMSHALA: 'Accommodations',
        GENERAL_UTILITY: 'General Store',
      };

      const scaleMap: Record<string, string> = {
        LARGE_SCALE: 'Large Scale Eatery',
        SMALL_SCALE: 'Small Eatery / Stall',
      };

      const payload = {
        business_name: profile.businessName,
        owner_name: profile.ownerName,
        phone: profile.phone,
        category: categoryMap[profile.category] || 'Eatery / Bhojanalaya',
        scale_type: scaleMap[profile.scale] || 'Small Eatery / Stall',
        fssai_number: profile.foodLicense?.licenseNumber || null,
        fssai_license_url: uploadedLicenseDoc || null,
        facade_image_url: uploadedShopImg || null,
        address: `${profile.address}${profile.landmark ? ` (Near ${profile.landmark})` : ''}`,
        sector: profile.landmark || 'Panchavati Ghats',
        is_verified: !!profile.foodLicense?.isVerifiedByAuthority,
        is_open_now: profile.isOpenNow !== false,
        updated_at: new Date().toISOString(),
      };

      // Check if existing record with this phone or ID
      const { data: existing } = await supabase
        .from('merchants')
        .select('id')
        .eq('phone', profile.phone)
        .maybeSingle();

      if (existing?.id) {
        await supabase.from('merchants').update(payload).eq('id', existing.id);
        return existing.id;
      } else {
        const { data: inserted, error } = await supabase
          .from('merchants')
          .insert([payload])
          .select('id')
          .single();

        if (error) {
          console.warn('[MerchantSupabase insert error]:', error.message);
          return null;
        }
        return inserted?.id || null;
      }
    } catch (e) {
      console.warn('[MerchantSupabase saveProfile exception]:', e);
      return null;
    }
  },

  // Toggle open/closed status directly in Supabase
  async updateShopOpenStatus(merchantId: string, isOpen: boolean): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('merchants')
        .update({
          is_open_now: isOpen,
          updated_at: new Date().toISOString(),
        })
        .eq('id', merchantId);
      return !error;
    } catch (e) {
      console.warn('[MerchantSupabase updateShopOpenStatus exception]:', e);
      return false;
    }
  },

  // Fetch merchant profile by phone for sign-in
  async fetchMerchantByPhone(phone: string): Promise<MerchantProfile | null> {
    try {
      const cleanPhone = phone.trim();
      const { data, error } = await supabase
        .from('merchants')
        .select('*')
        .eq('phone', cleanPhone)
        .maybeSingle();

      if (error || !data) return null;

      const catRevMap: Record<string, BusinessCategory> = {
        'Eatery / Bhojanalaya': 'EATERY_LARGE',
        'Sweets & Snacks': 'CHIVDA_SWEETS',
        'Puja Samagri': 'PUJA_HANDICRAFT',
        'Handicrafts': 'AGRO_GRAPES',
        'Accommodations': 'STAY_DHARAMSHALA',
        'General Store': 'GENERAL_UTILITY',
      };

      return {
        id: data.id,
        ownerName: data.owner_name,
        businessName: data.business_name,
        category: catRevMap[data.category] || 'EATERY_LARGE',
        scale: data.scale_type === 'Large Scale Eatery' ? 'LARGE_SCALE' : 'SMALL_SCALE',
        phone: data.phone,
        whatsappNumber: data.phone,
        address: data.address,
        landmark: data.sector || 'Panchavati Ghats',
        shopImageUri: data.facade_image_url || '',
        foodLicense: {
          hasLicense: !!data.fssai_number,
          licenseNumber: data.fssai_number || '',
          licenseHolderName: data.owner_name,
          documentImageUri: data.fssai_license_url || '',
          isVerifiedByAuthority: !!data.is_verified,
        },
        isOpenNow: data.is_open_now !== false,
        registeredDate: new Date(data.created_at).toLocaleDateString('en-IN'),
      };
    } catch (e) {
      console.warn('[MerchantSupabase fetchMerchantByPhone exception]:', e);
      return null;
    }
  },

  // Fetch catalog items for merchant
  async fetchCatalogItems(merchantId: string): Promise<CatalogItem[] | null> {
    try {
      if (!merchantId) return null;
      const { data, error } = await supabase
        .from('catalog_items')
        .select('*')
        .eq('merchant_id', merchantId)
        .order('created_at', { ascending: false });

      if (error) return null;
      if (!data) return null;

      return data.map((row: any) => ({
        id: row.id,
        name: row.name,
        category: row.category,
        description: row.description || '',
        price: Number(row.price),
        unit: 'per plate/item',
        imageUrl: row.image_url || '',
        isAvailable: !!row.is_available,
        createdAt: new Date(row.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }));
    } catch (e) {
      return null;
    }
  },

  // Add catalog item
  async addCatalogItem(item: Omit<CatalogItem, 'id' | 'createdAt'>, merchantId: string): Promise<string | null> {
    try {
      let uploadedImg = item.imageUrl;
      if (item.imageUrl && !item.imageUrl.startsWith('http')) {
        uploadedImg = await uploadMediaToSupabase(item.imageUrl, 'menu_items');
      }

      if (!uploadedImg || !uploadedImg.startsWith('http')) {
        uploadedImg = 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800';
      }

      const { data, error } = await supabase
        .from('catalog_items')
        .insert([
          {
            merchant_id: merchantId,
            name: item.name,
            category: item.category,
            price: item.price,
            description: item.description,
            image_url: uploadedImg,
            is_available: item.isAvailable,
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

  // Update catalog item
  async updateCatalogItem(id: string, updates: Partial<CatalogItem>): Promise<boolean> {
    try {
      let uploadedImg = updates.imageUrl;
      if (updates.imageUrl && !updates.imageUrl.startsWith('http')) {
        uploadedImg = await uploadMediaToSupabase(updates.imageUrl, 'menu_items');
      }

      const payload: any = {};
      if (updates.name !== undefined) payload.name = updates.name;
      if (updates.category !== undefined) payload.category = updates.category;
      if (updates.price !== undefined) payload.price = updates.price;
      if (updates.description !== undefined) payload.description = updates.description;
      if (uploadedImg !== undefined) payload.image_url = uploadedImg;
      if (updates.isAvailable !== undefined) payload.is_available = updates.isAvailable;

      const { error } = await supabase.from('catalog_items').update(payload).eq('id', id);
      return !error;
    } catch (e) {
      return false;
    }
  },

  // Delete catalog item
  async deleteCatalogItem(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('catalog_items').delete().eq('id', id);
      return !error;
    } catch (e) {
      return false;
    }
  },

  // Fetch pilgrim inquiries
  async fetchInquiries(merchantId: string): Promise<PilgrimInquiry[] | null> {
    try {
      if (!merchantId) return null;
      const { data, error } = await supabase
        .from('pilgrim_inquiries')
        .select('*')
        .eq('merchant_id', merchantId)
        .order('created_at', { ascending: false });

      if (error) return null;
      if (!data) return null;

      return data.map((row: any) => ({
        id: row.id,
        pilgrimName: row.pilgrim_name,
        pilgrimPhone: row.pilgrim_phone,
        message: row.message,
        timestamp: new Date(row.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: row.status !== 'NEW',
      }));
    } catch (e) {
      return null;
    }
  },

  // Mark inquiry read
  async markInquiryRead(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('pilgrim_inquiries')
        .update({ status: 'RESPONDED' })
        .eq('id', id);
      return !error;
    } catch (e) {
      return false;
    }
  },

  // Realtime subscription for incoming pilgrim inquiries, catalog updates & profile changes
  subscribeToInquiries(merchantId: string, callback: () => void) {
    return this.subscribeToMerchantUpdates(merchantId, callback);
  },

  subscribeToMerchantUpdates(merchantId: string, callback: () => void) {
    return supabase
      .channel(`public:merchant_live_${merchantId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'pilgrim_inquiries', filter: `merchant_id=eq.${merchantId}` },
        callback
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'catalog_items', filter: `merchant_id=eq.${merchantId}` },
        callback
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'merchants', filter: `id=eq.${merchantId}` },
        callback
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'shop_reviews', filter: `merchant_id=eq.${merchantId}` },
        callback
      )
      .subscribe();
  },
};
