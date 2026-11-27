import { supabase } from './supabase';

// =====================================================================
// 1. 場館申請與上架資料 (gym_applications)
// =====================================================================
export async function submitGymApplicationToSupabase(appData) {
  try {
    const row = {
      id: appData.id,
      status: appData.status || 'pending',
      name: appData.name,
      short_name: appData.shortName || appData.name,
      city: appData.city,
      district: appData.district,
      address: appData.address,
      phone: appData.phone,
      email: appData.email,
      hourly_rate: Number(appData.hourlyRate || appData.pricing?.hourlyRate || 200),
      gym_intro: appData.gymIntro || '',
      coach_intro: appData.coachIntro || '',
      cover_image: appData.coverImage || '',
      photos: appData.photos || [],
      available_schedule: appData.availableSchedule || {},
      agreed_terms: appData.agreedTerms !== false,
      agreed_terms_at: appData.agreedTermsAt || new Date().toLocaleString('zh-TW'),
      submitted_at: appData.submittedAt || new Date().toLocaleString('zh-TW')
    };
    const { data, error } = await supabase.from('gym_applications').upsert(row).select();
    if (error) {
      console.warn('[Supabase] submitGymApplication error:', error.message);
      return null;
    }
    return data?.[0] || row;
  } catch (e) {
    console.warn('[Supabase] submitGymApplication exception:', e);
    return null;
  }
}

export async function fetchGymApplicationsFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('gym_applications')
      .select('*')
      .order('created_at', { ascending: false });
    if (error || !data) return null;
    return data.map((r) => ({
      id: r.id,
      status: r.status,
      name: r.name,
      shortName: r.short_name || r.name,
      brand: r.short_name || r.name,
      city: r.city,
      district: r.district,
      address: r.address,
      phone: r.phone,
      email: r.email,
      hourlyRate: r.hourly_rate,
      pricing: { hourlyRate: r.hourly_rate, offPeakPerHour: r.hourly_rate, peakPerHour: r.hourly_rate },
      gymIntro: r.gym_intro,
      coachIntro: r.coach_intro,
      coverImage: r.cover_image,
      photos: r.photos || [],
      availableSchedule: r.available_schedule || {},
      agreedTerms: r.agreed_terms,
      agreedTermsAt: r.agreed_terms_at,
      reviewerNote: r.reviewer_note,
      submittedAt: r.submitted_at
    }));
  } catch {
    return null;
  }
}

export async function updateGymApplicationStatusInSupabase(id, status, reviewerNote = '') {
  try {
    const { error } = await supabase
      .from('gym_applications')
      .update({ status, reviewer_note: reviewerNote, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) console.warn('[Supabase] updateGymApplicationStatus error:', error.message);
  } catch {}
}

// =====================================================================
// 2. 教練會員資料 (coach_members)
// =====================================================================
export async function upsertCoachMemberToSupabase(profile, points = 300, authUid = null) {
  try {
    const row = {
      auth_uid: authUid || profile.authUid || null,
      coach_id: profile.coachId || 'A1001',
      name: profile.name || '自由教練',
      gender: profile.gender || '男',
      phone: profile.phone || '',
      email: profile.email || '',
      instagram: profile.instagram || '',
      primary_areas: profile.primaryAreas || '',
      certifications: profile.certifications || [],
      points: Number(points) || 0,
      updated_at: new Date().toISOString()
    };
    const { data, error } = await supabase
      .from('coach_members')
      .upsert(row, { onConflict: 'coach_id' })
      .select();
    if (error) {
      console.warn('[Supabase] upsertCoachMember error:', error.message);
      return null;
    }
    return data?.[0] || row;
  } catch {
    return null;
  }
}

export async function fetchCoachMembersFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('coach_members')
      .select('*')
      .order('coach_id', { ascending: true });
    if (error || !data) return null;
    return data.map((r) => ({
      coachId: r.coach_id,
      name: r.name,
      gender: r.gender || '男',
      phone: r.phone || '',
      email: r.email || '',
      instagram: r.instagram || '',
      primaryAreas: r.primary_areas || '',
      certifications: r.certifications || [],
      currentPoints: r.points ?? 300
    }));
  } catch {
    return null;
  }
}

// =====================================================================
// 3. 場館預約紀錄 (venue_bookings)
// =====================================================================
export async function addVenueBookingToSupabase(b) {
  try {
    const row = {
      booking_id: b.bookingId,
      gym_id: b.gymId,
      gym_name: b.gymName,
      coach_id: b.coach?.coachId || 'A1001',
      coach_name: b.coach?.name || b.coachName || '自由教練',
      coach_info: b.coach || {},
      date_str: b.dateStr,
      day_name: b.dayName,
      slots: b.slots || [],
      total_hours: b.totalHours || 1,
      total_points: b.totalPoints || 30,
      booking_note: b.bookingNote || '',
      status: b.status || 'pending',
      created_at_str: b.createdAt || new Date().toLocaleString('zh-TW')
    };
    const { error } = await supabase.from('venue_bookings').upsert(row);
    if (error) console.warn('[Supabase] addVenueBooking error:', error.message);
  } catch {}
}
