-- ==========================================================
-- 肌動組 GYMspot · 場館入駐審核系統資料庫結構與 RLS 安全政策
-- 執行位置：Supabase Dashboard -> SQL Editor
-- ==========================================================

-- 1. 建立審核申請資料表 (gym_applications)
CREATE TABLE IF NOT EXISTS public.gym_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- 店家基本資訊
    name TEXT NOT NULL,
    brand TEXT,
    city TEXT NOT NULL,
    district TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    
    -- 店家身分確認：對外官方聯絡管道（三選一：ig / line / fb）
    verify_channel TEXT NOT NULL DEFAULT 'ig' CHECK (verify_channel IN ('ig', 'line', 'fb')),
    verify_channel_label TEXT,
    verify_account TEXT NOT NULL,
    official_line TEXT,
    ig_handle TEXT,
    fb_page_url TEXT,
    
    -- 給教練的簡介與特殊要求 (至多 300 字)
    coach_intro TEXT DEFAULT '無特殊介紹',
    
    -- 場租費用與開放課表
    hourly_rate NUMERIC DEFAULT 200,
    student_clean_fee NUMERIC DEFAULT 0,
    clean_fee_desc TEXT DEFAULT '免收學員人頭清潔費',
    open_slots_count INT DEFAULT 112,
    available_schedule JSONB DEFAULT '{}'::jsonb,
    
    -- 證照要求與合作條款簽署紀錄
    cert_required TEXT DEFAULT '需具備合格國際體適能證照',
    verified_doc TEXT DEFAULT '已透過場館官方帳號私訊核驗',
    agreed_terms BOOLEAN NOT NULL DEFAULT true,
    agreed_terms_at TEXT,
    
    -- 場館環境照 (4~10 張)
    cover_image TEXT,
    photos TEXT[] DEFAULT '{}', -- 存放於 public bucket 的圖片網址
    
    -- 審核狀態管理
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    reviewer_note TEXT,
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES auth.users(id)
);

-- 建立索引提升查詢效率
CREATE INDEX IF NOT EXISTS idx_gym_applications_status ON public.gym_applications(status);
CREATE INDEX IF NOT EXISTS idx_gym_applications_city ON public.gym_applications(city, district);

-- 2. 啟用 Row Level Security (RLS 嚴格資料庫列級安全隔離)
ALTER TABLE public.gym_applications ENABLE ROW LEVEL SECURITY;

-- 政策 A: 允許任何人 (一般店家訪客) 提交申請單 (只能 INSERT，無法讀取別人的資料)
DROP POLICY IF EXISTS "Public can submit gym applications" ON public.gym_applications;
CREATE POLICY "Public can submit gym applications"
ON public.gym_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 政策 B: 只有「授權管理員」可以檢視所有申請單 (SELECT)
-- (可透過 email 白名單或 auth.jwt() 的 app_metadata 判斷)
DROP POLICY IF EXISTS "Only admins can view applications" ON public.gym_applications;
CREATE POLICY "Only admins can view applications"
ON public.gym_applications
FOR SELECT
TO authenticated
USING (
    -- 方式 1: 判定管理員 Email 白名單 (請換成您的管理員信箱)
    auth.jwt() ->> 'email' IN (
        'your-admin-email@gmail.com',
        'admin@gymspot.tw'
    )
    -- 方式 2: 或者判定自訂 role 宣告
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

-- 政策 C: 只有「授權管理員」可以審核修改狀態 (UPDATE)
DROP POLICY IF EXISTS "Only admins can update applications" ON public.gym_applications;
CREATE POLICY "Only admins can update applications"
ON public.gym_applications
FOR UPDATE
TO authenticated
USING (
    auth.jwt() ->> 'email' IN ('your-admin-email@gmail.com', 'admin@gymspot.tw')
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
)
WITH CHECK (
    auth.jwt() ->> 'email' IN ('your-admin-email@gmail.com', 'admin@gymspot.tw')
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

-- ==========================================================
-- 3. Supabase Storage 儲存桶安全配置
-- ==========================================================

-- 儲存桶: gym-public-photos (公開儲存桶)
-- 用於存放場館全貌、深蹲架、啞鈴區等 4~10 張宣傳照片（不收取任何公司公文與統編檔案）
INSERT INTO storage.buckets (id, name, public)
VALUES ('gym-public-photos', 'gym-public-photos', true)
ON CONFLICT (id) DO NOTHING;

