-- =====================================================================
-- 肌動組 GYMspot Supabase 資料表建置 SQL
-- 請至 Supabase Dashboard -> SQL Editor 貼上並點擊 Run 執行
-- =====================================================================

-- 1. 場館申請與上架資料表
CREATE TABLE IF NOT EXISTS public.gym_applications (
  id TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'approved' | 'rejected'
  name TEXT NOT NULL,
  short_name TEXT,
  city TEXT,
  district TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  hourly_rate INTEGER DEFAULT 200,
  gym_intro TEXT,
  coach_intro TEXT,
  cover_image TEXT,
  photos JSONB DEFAULT '[]'::jsonb,
  available_schedule JSONB DEFAULT '{}'::jsonb,
  agreed_terms BOOLEAN DEFAULT true,
  agreed_terms_at TEXT,
  reviewer_note TEXT,
  submitted_at TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 教練會員資料表（編號由 A1001 順序遞增）
CREATE TABLE IF NOT EXISTS public.coach_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  auth_uid TEXT UNIQUE,
  coach_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  gender TEXT DEFAULT '男',
  phone TEXT,
  email TEXT UNIQUE,
  instagram TEXT,
  primary_areas TEXT,
  certifications JSONB DEFAULT '[]'::jsonb,
  points INTEGER DEFAULT 300,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 場館預約與交易紀錄表
CREATE TABLE IF NOT EXISTS public.venue_bookings (
  booking_id TEXT PRIMARY KEY,
  gym_id TEXT NOT NULL,
  gym_name TEXT,
  coach_id TEXT,
  coach_name TEXT,
  coach_info JSONB DEFAULT '{}'::jsonb,
  date_str TEXT,
  day_name TEXT,
  slots JSONB DEFAULT '[]'::jsonb,
  total_hours INTEGER DEFAULT 1,
  total_points INTEGER DEFAULT 30,
  booking_note TEXT,
  status TEXT DEFAULT 'pending', -- 'pending' | 'approved' | 'cancelled'
  created_at_str TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 關閉或設定公開讀寫政策（方便前後台即時串接，正式上線後可依需求收緊 RLS）
ALTER TABLE public.gym_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coach_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venue_bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all on gym_applications" ON public.gym_applications;
CREATE POLICY "Allow all on gym_applications" ON public.gym_applications FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on coach_members" ON public.coach_members;
CREATE POLICY "Allow all on coach_members" ON public.coach_members FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on venue_bookings" ON public.venue_bookings;
CREATE POLICY "Allow all on venue_bookings" ON public.venue_bookings FOR ALL USING (true) WITH CHECK (true);
