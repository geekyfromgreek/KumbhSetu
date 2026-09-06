import { supabase, uploadMediaToSupabase } from '@/lib/supabase';
import {
  VolunteerProfile,
  GroundIncident,
  GroundFactCheck,
  IncidentStatus,
  FactCheckStatus,
} from '@/types/volunteer';

export const VolunteerSupabaseService = {
  // Upload avatar image
  async uploadAvatar(uri: string): Promise<string> {
    return uploadMediaToSupabase(uri, 'volunteers');
  },

  // Save or update volunteer profile
  async saveVolunteerProfile(profile: VolunteerProfile): Promise<string | null> {
    try {
      let avatarUrl = profile.profileImageUri;
      if (profile.profileImageUri && !profile.profileImageUri.startsWith('http')) {
        avatarUrl = await uploadMediaToSupabase(profile.profileImageUri, 'volunteers');
      }

      const payload = {
        full_name: profile.name,
        phone: profile.phone,
        id_card_number: profile.volunteerBadgeId,
        assigned_sector: profile.assignedSectorId,
        avatar_url: avatarUrl || null,
        is_active: profile.isOnDuty,
        tasks_resolved_count: profile.completedTasksCount,
      };

      const { data: existing } = await supabase
        .from('volunteer_profiles')
        .select('id')
        .eq('phone', profile.phone)
        .maybeSingle();

      if (existing?.id) {
        await supabase.from('volunteer_profiles').update(payload).eq('id', existing.id);
        return existing.id;
      } else {
        const { data: inserted, error } = await supabase
          .from('volunteer_profiles')
          .insert([payload])
          .select('id')
          .single();

        if (error) {
          console.warn('[VolunteerSupabase insert error]:', error.message);
          return null;
        }
        return inserted?.id || null;
      }
    } catch (e) {
      console.warn('[VolunteerSupabase saveProfile exception]:', e);
      return null;
    }
  },

  // Fetch volunteer by phone number or badge ID for sign in
  async fetchVolunteerByPhoneOrBadge(query: string): Promise<VolunteerProfile | null> {
    try {
      const clean = query.trim();
      const { data, error } = await supabase
        .from('volunteer_profiles')
        .select('*')
        .or(`phone.eq.${clean},id_card_number.ilike.%${clean}%`)
        .maybeSingle();

      if (error || !data) return null;

      return {
        id: data.id,
        name: data.full_name,
        phone: data.phone,
        age: '24',
        gender: 'male',
        assignedSectorId: data.assigned_sector || 'sector_ramkund',
        volunteerBadgeId: data.id_card_number,
        profileImageUri: data.avatar_url || '',
        roleId: 'role_crowd_safety',
        isOnDuty: data.is_active !== false,
        completedTasksCount: data.tasks_resolved_count || 0,
        factChecksCount: 0,
        registeredDate: new Date(data.created_at).toLocaleDateString('en-IN'),
      };
    } catch (e) {
      console.warn('[VolunteerSupabase fetchVolunteerByPhoneOrBadge exception]:', e);
      return null;
    }
  },

  // Fetch incidents reported by pilgrims & admins
  async fetchIncidents(): Promise<GroundIncident[] | null> {
    try {
      const { data, error } = await supabase
        .from('incidents_and_grievances')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('[VolunteerSupabase fetchIncidents error]:', error.message);
        return null;
      }
      if (!data) return null;

      return data.map((row: any) => {
        let status: IncidentStatus = 'PENDING_VERIFICATION';
        if (row.status === 'IN_PROGRESS' || row.status === 'ASSIGNED') {
          status = 'EN_ROUTE';
        } else if (row.status === 'RESOLVED') {
          status = 'RESOLVED_OFFLINE';
        } else if (row.status === 'REJECTED') {
          status = 'DISMISSED';
        }

        return {
          id: row.id,
          token: `CASE-G-${row.id.substring(0, 5).toUpperCase()}`,
          category: row.category || 'Overcharging',
          location: `${row.sector} - ${row.location_details}`,
          sectorId: (row.sector || 'sector_ramkund').toLowerCase().replace(/[^a-z0-9]/g, '_'),
          description: row.description || row.title,
          pilgrimName: row.reporter_name || 'Pilgrim',
          pilgrimPhone: row.reporter_phone || '',
          offenderNameOrVehicle: row.title,
          status,
          assignedVolunteerId: row.assigned_volunteer_id,
          volunteerNotes: row.resolution_notes,
          timestamp: new Date(row.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          resolutionTimestamp: row.resolved_at ? new Date(row.resolved_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
        };
      });
    } catch (e) {
      return null;
    }
  },

  // Claim Incident (Volunteer en route)
  async claimIncident(id: string, volunteerId: string, volunteerName: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('incidents_and_grievances')
        .update({
          status: 'IN_PROGRESS',
          assigned_volunteer_name: volunteerName,
        })
        .eq('id', id);

      return !error;
    } catch (e) {
      return false;
    }
  },

  // Resolve Incident on Ground
  async resolveIncident(id: string, notes: string, volunteerName: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('incidents_and_grievances')
        .update({
          status: 'RESOLVED',
          resolution_notes: notes,
          assigned_volunteer_name: volunteerName,
          resolved_at: new Date().toISOString(),
        })
        .eq('id', id);

      return !error;
    } catch (e) {
      return false;
    }
  },

  // Dismiss Incident (False alarm)
  async dismissIncident(id: string, reason: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('incidents_and_grievances')
        .update({
          status: 'REJECTED',
          resolution_notes: `Dismissed: ${reason}`,
          resolved_at: new Date().toISOString(),
        })
        .eq('id', id);

      return !error;
    } catch (e) {
      return false;
    }
  },

  // Fetch Fact-Checks
  async fetchFactChecks(): Promise<GroundFactCheck[] | null> {
    try {
      const { data, error } = await supabase
        .from('fact_checks_and_rumors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) return null;
      if (!data) return null;

      return data.map((row: any) => {
        let status: FactCheckStatus = 'UNVERIFIED';
        if (row.verdict === 'TRUE') status = 'VERIFIED_TRUE';
        else if (row.verdict === 'FALSE') status = 'DEBUNKED_FAKE';
        else if (row.verified_by_volunteer) status = 'INVESTIGATING';

        return {
          id: row.id,
          claimTitle: {
            en: row.claim_title,
            mr: row.claim_title,
          },
          claimSource: row.submitted_by || 'Social Media / Pilgrim Claim',
          sectorId: 'sector_ramkund',
          status,
          officialClarification: {
            en: row.official_explanation || 'Pending physical check.',
            mr: row.official_explanation || 'तपासणी सुरू आहे.',
          },
          verifiedVolunteerId: row.verified_by_volunteer,
          volunteerNotes: row.official_explanation,
          timestamp: new Date(row.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      });
    } catch (e) {
      return null;
    }
  },

  // Submit ground fact check verdict
  async submitFactCheckVerdict(id: string, verdict: 'VERIFIED_TRUE' | 'DEBUNKED_FAKE', notes: string, volunteerName: string): Promise<boolean> {
    try {
      const dbVerdict = verdict === 'VERIFIED_TRUE' ? 'TRUE' : 'FALSE';
      const { error } = await supabase
        .from('fact_checks_and_rumors')
        .update({
          verdict: dbVerdict,
          official_explanation: notes,
          verified_by_volunteer: volunteerName || 'KumbhVeer Ground Patrol',
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      return !error;
    } catch (e) {
      return false;
    }
  },

  // Realtime subscription for alerts and fact-checks
  subscribeToUpdates(callback: () => void) {
    return supabase
      .channel('public:kumbhveer_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'incidents_and_grievances' }, callback)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'fact_checks_and_rumors' }, callback)
      .subscribe();
  },
};
