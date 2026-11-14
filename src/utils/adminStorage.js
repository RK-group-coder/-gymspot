// 管理員後台資料存儲與同步服務 (Admin Storage Service)
// 支援本機安全持久化 (localStorage) 與 Supabase 資料庫無縫對接

const APPLICATIONS_STORAGE_KEY = 'gymspot_applications';
const APPROVED_GYMS_STORAGE_KEY = 'gymspot_approved_gyms';

// 初始示範審核資料 (包含待審核、已核准、退件範例)
const INITIAL_APPLICATIONS = [
  {
    id: 'app-seed-001',
    name: '硬派鐵人訓練中心 (大安旗艦館)',
    brand: '硬派體能',
    city: '台北市',
    district: '大安區',
    address: '台北市大安區忠孝東路四段 216 巷 19 號 B1',
    phone: '02-2771-5588',
    email: 'ironclub.tw@gmail.com',
    officialLine: '@ironclub_daan',
    igHandle: 'ironclub.training',
    fbPageUrl: '',
    verifyChannel: 'ig',
    verifyChannelLabel: '官方 Instagram 帳號',
    verifyAccount: '@ironclub.training',
    hourlyRate: 220,
    studentCleanFee: 0,
    cleanFeeDesc: '免收學員人頭清潔費',
    certRequired: '需具備合格國際體適能證照 (ACE / NASM / ACSM / NSCA)',
    verifiedDoc: '已透過場館官方帳號私訊核驗',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=900&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=900&auto=format&fit=crop'
    ],
    openSlotsCount: 96,
    coachIntro: '本館備有 4 座專業深蹲架與 Eleiko 競賽槓鈴，需著室內乾淨訓練鞋，熱門時段請禮貌輪替。',
    status: 'pending', // 'pending' | 'approved' | 'rejected'
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(), // 3 小時前
    reviewerNote: ''
  },
  {
    id: 'app-seed-002',
    name: '極限動能體適能中心 (板橋館)',
    brand: '極限動能',
    city: '新北市',
    district: '板橋區',
    address: '新北市板橋區文化路一段 188 號 2 樓',
    phone: '02-8952-3322',
    email: 'kinetic.banqiao@gmail.com',
    officialLine: '@kinetic_fitness',
    igHandle: 'kinetic.fit.tw',
    fbPageUrl: '',
    verifyChannel: 'line',
    verifyChannelLabel: '官方 LINE ID / 官方帳號',
    verifyAccount: '@kinetic_fitness',
    hourlyRate: 180,
    studentCleanFee: 50,
    cleanFeeDesc: '學員單次場地清潔維護費 50 元',
    certRequired: '需具備合格國際體適能證照 (ACE / NASM / ACSM / NSCA)',
    verifiedDoc: '已透過場館官方帳號私訊核驗',
    coverImage: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=900&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=900&auto=format&fit=crop'
    ],
    openSlotsCount: 112,
    coachIntro: '無特殊介紹',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 天前
    reviewerNote: ''
  }
];

export function getApplications() {
  try {
    const raw = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to get applications:', e);
    return INITIAL_APPLICATIONS;
  }
}

export function saveApplication(newApp) {
  try {
    const current = getApplications();
    // 檢查是否已存在
    const existingIndex = current.findIndex(a => a.id === newApp.id);
    let updated;
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = { ...updated[existingIndex], ...newApp };
    } else {
      updated = [newApp, ...current];
    }
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save application:', e);
    return [];
  }
}

export function updateApplicationStatus(id, newStatus, reviewerNote = '') {
  try {
    const current = getApplications();
    const target = current.find(a => a.id === id);
    if (!target) return current;

    const updated = current.map(app => {
      if (app.id === id) {
        return {
          ...app,
          status: newStatus,
          reviewerNote: reviewerNote || app.reviewerNote,
          reviewedAt: new Date().toISOString()
        };
      }
      return app;
    });

    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(updated));

    // 若核准，同步加入已核准場館名單 (供前台地圖讀取)
    if (newStatus === 'approved') {
      addApprovedGymFromApp(target);
    } else if (newStatus === 'rejected') {
      removeApprovedGym(id);
    }

    return updated;
  } catch (e) {
    console.error('Failed to update application status:', e);
    return [];
  }
}

export function getApprovedGyms() {
  try {
    const raw = localStorage.getItem(APPROVED_GYMS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function addApprovedGymFromApp(app) {
  try {
    const currentGyms = getApprovedGyms();
    const formattedGym = {
      id: app.id,
      name: app.name,
      brand: app.brand || app.name,
      city: app.city,
      district: app.district,
      address: app.address,
      nearMrt: '交通便利',
      lat: app.lat || (25.0400 + (Math.random() - 0.5) * 0.05),
      lng: app.lng || (121.5400 + (Math.random() - 0.5) * 0.05),
      rating: 5.0,
      reviewCount: 1,
      phone: app.phone,
      email: app.email,
      lineId: app.officialLine || '',
      igHandle: app.igHandle || '',
      gymIntro: app.gymIntro?.trim() || '無場館介紹',
      coachIntro: app.coachIntro?.trim() || '無特殊介紹',
      coverImage: app.coverImage || (app.photos && app.photos[0]),
      photos: app.photos || [],
      pricing: {
        hourlyRate: app.hourlyRate || 200,
        offPeakPerHour: app.hourlyRate || 200,
        peakPerHour: app.hourlyRate || 200,
        studentCleanFee: Number(app.studentCleanFee) || 0,
        cleanFeeDesc: app.cleanFeeDesc || '免收學員人頭清潔費',
        peakHoursRange: '全時段開放',
        offPeakHoursRange: '依週時段表格勾選開放',
        packageDeals: []
      },
      availableSchedule: app.availableSchedule || {},
      openSlotsCount: app.openSlotsCount || 112,
      equipment: {
        squatRacksCount: 4,
        turfZone: true,
        turfLength: '12米專用功能衝刺草皮',
        eleikoPlates: true,
        dumbbellsMaxKg: 50,
        privateRoom: true,
        showerAvailable: true,
        freeWater: true,
        freeParking: false
      },
      requirements: {
        certRequired: app.certRequired || '需具備合格國際體適能證照',
        cprRequired: true,
        indoorShoesOnly: true,
        insuranceIncluded: '已投保公共意外責任險',
        cancellationPolicy: '一經預約即無法取消'
      },
      tags: [
        Number(app.studentCleanFee) === 0 ? '免學員費' : '',
        '審核認證特約場館'
      ].filter(Boolean),
      isVerified: true,
      isFeatured: true,
      verifiedDoc: app.verifiedDoc || '營利事業登記證、消防安檢審查、公共意外責任險證明'
    };

    const nextList = [formattedGym, ...currentGyms.filter(g => g.id !== app.id)];
    localStorage.setItem(APPROVED_GYMS_STORAGE_KEY, JSON.stringify(nextList));
  } catch (e) {
    console.error('Failed to add approved gym:', e);
  }
}

function removeApprovedGym(appId) {
  try {
    const currentGyms = getApprovedGyms();
    const nextList = currentGyms.filter(g => g.id !== appId);
    localStorage.setItem(APPROVED_GYMS_STORAGE_KEY, JSON.stringify(nextList));
  } catch (e) {}
}

