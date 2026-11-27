import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Eye, 
  Download, 
  FileText, 
  ExternalLink, 
  Building2, 
  Phone, 
  Mail, 
  MessageSquare, 
  MapPin, 
  ArrowLeft, 
  Sparkles, 
  AlertTriangle,
  RefreshCw,
  PlusCircle,
  Database,
  Image as ImageIcon,
  Check,
  ChevronRight,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ensureVenuePortalCreds, getVenuePortalCreds } from '../utils/venuePortalStore';
import { 
  getApplications, 
  updateApplicationStatus, 
  saveApplication 
} from '../utils/adminStorage';

const DEFAULT_ADMIN_PASSCODE = 'gymspot-admin';

export default function AdminDashboard({ onNavigateHome }) {
  // 1. 管理員授權（暫時開放直接進入）
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  // 2. 審核列表與篩選狀態
  const [adminSection, setAdminSection] = useState('overview'); // 'overview' | 'venues' | 'members'
  const [overviewRange, setOverviewRange] = useState('total'); // 'day' | 'week' | 'month' | 'total'
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberSearch, setMemberSearch] = useState('');
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('pending'); // 'all' | 'pending' | 'approved' | 'rejected'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [rejectReasonInput, setRejectReasonInput] = useState('');
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const loadData = () => {
    setApplications(getApplications());
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // 登入驗證
  const handleVerifyPasscode = (e) => {
    e.preventDefault();
    if (passcodeInput.trim() === DEFAULT_ADMIN_PASSCODE) {
      sessionStorage.setItem('gymspot_admin_authed', 'true');
      setIsAuthenticated(true);
      setPasscodeError('');
      loadData();
    } else {
      setPasscodeError('管理員安全金鑰不正確，請重新輸入');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('gymspot_admin_authed');
    setIsAuthenticated(false);
    setPasscodeInput('');
  };

  // 審核動作：核准通過
  const handleApprove = (app) => {
    if (!window.confirm(`確定核准「${app.name}」並正式上架到網站地圖嗎？`)) return;

    const updated = updateApplicationStatus(app.id, 'approved', '經管理員核對營登與器材符合標準，核准上線');
    setApplications(updated);
    if (selectedApp?.id === app.id) {
      setSelectedApp(prev => ({ ...prev, status: 'approved' }));
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    showToast(`✅ 已核准「${app.name}」，已正式同步上線至地圖！`);
  };

  // 審核動作：退件駁回
  const handleConfirmReject = () => {
    if (!selectedApp) return;
    const reason = rejectReasonInput.trim() || '上傳文件未符合標準，請補正資料';
    const updated = updateApplicationStatus(selectedApp.id, 'rejected', reason);
    setApplications(updated);
    setSelectedApp(prev => ({ ...prev, status: 'rejected', reviewerNote: reason }));
    setIsRejectModalOpen(false);
    setRejectReasonInput('');
    showToast(`❌ 已將「${selectedApp.name}」標記為退件`);
  };

  // 統計數據
  const stats = useMemo(() => {
    return {
      total: applications.length,
      pending: applications.filter(a => a.status === 'pending').length,
      approved: applications.filter(a => a.status === 'approved').length,
      rejected: applications.filter(a => a.status === 'rejected').length
    };
  }, [applications]);

  // 篩選列表
  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchTab = activeTab === 'all' || app.status === activeTab;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        app.name?.toLowerCase().includes(q) ||
        app.brand?.toLowerCase().includes(q) ||
        app.city?.toLowerCase().includes(q) ||
        app.district?.toLowerCase().includes(q);
      return matchTab && matchSearch;
    });
  }, [applications, activeTab, searchQuery]);

  // 快速新增一筆測試申請
  const handleCreateMockApplication = () => {
    const timestamp = Date.now();
    const mock = {
      id: `app-test-${timestamp}`,
      name: `動力極限工作室 (${['信義旗艦', '中山分館', '西屯店', '南屯館'][Math.floor(Math.random() * 4)]})`,
      brand: '動力極限體能',
      city: '台北市',
      district: '信義區',
      address: '台北市信義區松德路 65 號 1 樓',
      phone: '02-2727-8899',
      email: 'powerlimit.tw@gmail.com',
      officialLine: '@power_limit',
      igHandle: 'powerlimit.tw',
      fbPageUrl: '',
      verifyChannel: 'ig',
      verifyChannelLabel: '官方 Instagram 帳號',
      verifyAccount: '@powerlimit.tw',
      hourlyRate: 200,
      studentCleanFee: 0,
      cleanFeeDesc: '免收學員清潔費',
      certRequired: '需具備合格國際體適能證照 (ACE / NASM / ACSM / NSCA)',
      verifiedDoc: '已透過場館官方帳號私訊核驗',
      coverImage: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=900&auto=format&fit=crop',
      photos: [
        'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=900&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=900&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=900&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=900&auto=format&fit=crop'
      ],
      openSlotsCount: 104,
      coachIntro: '本館備有 4 座深蹲架與競賽槓鈴，需著室內乾淨訓練鞋，熱門時段請禮貌輪替。',
      status: 'pending',
      createdAt: new Date().toISOString(),
      reviewerNote: ''
    };
    const updated = saveApplication(mock);
    setApplications(updated);
    setSelectedApp(mock);
    showToast('✨ 已生成一筆測試待審核店家資料！');
  };

  // -------------------------------------------------------------
  // 介面 1: 管理員安全密鑰解鎖畫面
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#070a10',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        color: '#f8fafc',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '440px',
          background: '#0f172a',
          border: '1px solid #1e293b',
          borderRadius: '20px',
          padding: '36px 32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(180, 255, 4, 0.1)',
            border: '2px solid rgba(180, 255, 4, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px',
            boxShadow: '0 0 20px rgba(180, 255, 4, 0.2)'
          }}>
            <Lock size={28} color="#b4ff04" />
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#f8fafc', margin: '0 0 8px' }}>
            肌動組 GYMspot · 審核後台
          </h2>
          <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 24px' }}>
            本後台涉及店家「公司設立登記表、營登機密與負責人個資」，受嚴格存取限制。請輸入管理員安全金鑰解鎖。
          </p>

          <form onSubmit={handleVerifyPasscode}>
            <div style={{ textAlign: 'left', marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', fontWeight: 600, marginBottom: '6px' }}>
                管理員金鑰 (Master Key)
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="請輸入管理密鑰 (預設: gymspot-admin)"
                value={passcodeInput}
                onChange={(e) => {
                  setPasscodeInput(e.target.value);
                  setPasscodeError('');
                }}
                style={{
                  width: '100%',
                  background: '#090e17',
                  border: passcodeError ? '1px solid #ef4444' : '1px solid #243248',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              {passcodeError && (
                <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '6px' }}>
                  {passcodeError}
                </div>
              )}
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #b4ff04 0%, #8ce000 100%)',
                color: '#0a1402',
                border: 'none',
                borderRadius: '10px',
                padding: '12px',
                fontSize: '14px',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(180, 255, 4, 0.4)',
                marginBottom: '14px'
              }}
            >
              進入審核控制台
            </button>
          </form>

          <button
            onClick={onNavigateHome}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ArrowLeft size={14} /> 返回首頁
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 介面 2: 管理員審核儀表板主畫面
  // -------------------------------------------------------------
  return (
    <div style={{
      minHeight: '100vh',
      background: '#070a10',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          background: '#1e293b',
          border: '1px solid #10b981',
          color: '#10b981',
          padding: '12px 20px',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          fontSize: '14px',
          fontWeight: 700
        }}>
          {toastMessage}
        </div>
      )}

      {/* Top Admin Header */}
      <header style={{
        background: 'rgba(11, 16, 27, 0.95)',
        borderBottom: '1px solid #1e293b',
        padding: '14px 28px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(12px)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={onNavigateHome}
              style={{
                background: '#192336',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#cbd5e1',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ArrowLeft size={14} /> 前台首頁
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '17px', fontWeight: 700, color: '#f8fafc', margin: 0, letterSpacing: '0.01em' }}>
                GYMspot 管理後台
              </h1>
              <div style={{ display: 'flex', gap: '4px', marginLeft: '12px', background: '#111622', padding: '3px', borderRadius: '6px', border: '1px solid #1f2937' }}>
                <button
                  type="button"
                  onClick={() => setAdminSection('overview')}
                  style={{
                    background: adminSection === 'overview' ? '#1e293b' : 'transparent',
                    color: adminSection === 'overview' ? '#ffffff' : '#94a3b8',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 12px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  總覽數據
                </button>
                <button
                  type="button"
                  onClick={() => setAdminSection('venues')}
                  style={{
                    background: adminSection === 'venues' ? '#1e293b' : 'transparent',
                    color: adminSection === 'venues' ? '#ffffff' : '#94a3b8',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 12px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  場館入駐審核
                </button>
                <button
                  type="button"
                  onClick={() => setAdminSection('members')}
                  style={{
                    background: adminSection === 'members' ? '#1e293b' : 'transparent',
                    color: adminSection === 'members' ? '#ffffff' : '#94a3b8',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 12px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  會員專區
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setShowSqlModal(true)}
              style={{
                background: '#111622',
                border: '1px solid #263042',
                borderRadius: '6px',
                padding: '7px 12px',
                color: '#cbd5e1',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Database size={14} color="#94a3b8" />
              <span>資料庫權限設定</span>
            </button>

            <button
              onClick={handleLogout}
              style={{
                background: '#182030',
                border: '1px solid #263042',
                borderRadius: '6px',
                padding: '7px 14px',
                color: '#cbd5e1',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              登出
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Dashboard Body */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: adminSection === 'overview' ? '16px 28px' : '24px 28px' }}>
        {adminSection === 'overview' ? (() => {
          let bookingTx = [];
          try { bookingTx = JSON.parse(localStorage.getItem('gymspot_venue_bookings_v1') || '[]'); } catch {}
          let topupTx = [];
          try { topupTx = JSON.parse(localStorage.getItem('gymspot_topup_history_v1') || '[]'); } catch {}

          const totalVenues = 13 + applications.filter(a => a.status === 'approved').length;
          const totalMembers = 1; // 目前註冊帳號數（A1001 起）
          const totalRevenue = topupTx.reduce((s, t) => s + (Number(t.price) || 0), 0);
          const totalBookings = bookingTx.length;
          const approvedBookings = bookingTx.filter(b => b.status === 'approved').length;
          const pendingBookings = bookingTx.filter(b => b.status === 'pending').length;
          const approvalRate = totalBookings > 0 ? Math.round((approvedBookings / totalBookings) * 100) : 100;
          const avgOrderValue = topupTx.length > 0 ? Math.round(totalRevenue / topupTx.length) : 0;

          const rangeConfig = {
            day: {
              label: '今日 (24小時)',
              labels: Array.from({ length: 24 }, (_, h) => `${String(h).padStart(2, '0')}:00`),
              revSeries: [0, 0, 0, 0, 0, 0, 0, 0, 0, 290, 290, 290, 580, 580, 580, 580, 870, 870, 870, 870, 870, 870, 870, totalRevenue || 870],
              bookSeries: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 6, 6, 6, totalBookings || 6],
              venueGrowth: '+0',
              memberGrowth: '+1',
              revDelta: '+100%',
              bookDelta: '+100%'
            },
            week: {
              label: '本週',
              labels: ['週一', '週二', '週三', '週四', '週五', '週六', '週日'],
              revSeries: [290, 580, 580, 870, 1160, 1450, totalRevenue || 1450],
              bookSeries: [2, 4, 5, 7, 9, 11, totalBookings || 11],
              venueGrowth: `+${applications.filter(a => a.status === 'approved').length}`,
              memberGrowth: '+1',
              revDelta: '+24%',
              bookDelta: '+18%'
            },
            month: {
              label: '本月',
              labels: ['第1週', '第2週', '第3週', '第4週'],
              revSeries: [580, 1450, 2610, totalRevenue || 2610],
              bookSeries: [4, 10, 18, totalBookings || 18],
              venueGrowth: `+${applications.length}`,
              memberGrowth: '+1',
              revDelta: '+42%',
              bookDelta: '+36%'
            },
            year: {
              label: '今年',
              labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              revSeries: [0, 0, 0, 0, 0, 0, 0, 580, 1160, 1740, totalRevenue || 2610, totalRevenue || 2610],
              bookSeries: [0, 0, 0, 0, 0, 0, 0, 4, 9, 14, totalBookings || 18, totalBookings || 18],
              venueGrowth: `+${totalVenues}`,
              memberGrowth: '+1',
              revDelta: '+68%',
              bookDelta: '+54%'
            },
            total: {
              label: '總計',
              labels: ['8月', '9月', '10月', '11月'],
              revSeries: [0, 580, 1740, totalRevenue || 1740],
              bookSeries: [0, 5, 14, totalBookings || 14],
              venueGrowth: `${totalVenues} 間`,
              memberGrowth: `${totalMembers} 位`,
              revDelta: '累積',
              bookDelta: '累積'
            }
          };
          const cfg = rangeConfig[overviewRange];

          // 專業級 SVG 面積折線圖座標計算
          const buildCoords = (values, maxVal, w = 540, h = 160, padL = 46, padR = 20, padT = 20, padB = 26) => {
            const safeMax = Math.max(maxVal, 1);
            return values.map((v, i) => {
              const x = padL + (i * (w - padL - padR)) / Math.max(values.length - 1, 1);
              const y = h - padB - ((v / safeMax) * (h - padT - padB));
              return { x, y, v };
            });
          };

          const maxRev = Math.max(...cfg.revSeries, 100);
          const maxBook = Math.max(...cfg.bookSeries, 5);
          const revCoords = buildCoords(cfg.revSeries, maxRev);
          const bookCoords = buildCoords(cfg.bookSeries, maxBook);
          const revPoints = revCoords.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
          const bookPoints = bookCoords.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
          const revArea = `46,134 ${revPoints} ${revCoords[revCoords.length - 1].x.toFixed(1)},134`;
          const bookArea = `46,134 ${bookPoints} ${bookCoords[bookCoords.length - 1].x.toFixed(1)},134`;

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: 'calc(100vh - 96px)', overflow: 'hidden' }}>
              {/* 頂部標題與時間區間切換 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', flexShrink: 0 }}>
                <div>
                  <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#f8fafc', margin: 0 }}>平台營運總覽數據</h2>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                    即時彙整場館數、會員數、累積營收、預約次數與增幅趨勢
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '4px', background: '#111622', padding: '3px', borderRadius: '6px', border: '1px solid #1f2937' }}>
                  {[
                    { key: 'day', label: '日' },
                    { key: 'week', label: '週' },
                    { key: 'month', label: '月' },
                    { key: 'year', label: '年' },
                    { key: 'total', label: '總共' }
                  ].map((r) => (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => setOverviewRange(r.key)}
                      style={{
                        background: overviewRange === r.key ? '#1e293b' : 'transparent',
                        color: overviewRange === r.key ? '#ffffff' : '#94a3b8',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '5px 14px',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6 張核心指標卡片（單排自適應，無須滑動） */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', flexShrink: 0 }}>
                {[
                  { title: '總場館數', val: `${totalVenues}`, sub: `待審核 ${stats.pending} 間` },
                  { title: '總會員數', val: `${totalMembers}`, sub: '自由教練帳號' },
                  { title: '平台累積營收', val: `NT$ ${totalRevenue.toLocaleString()}`, sub: `${cfg.label} ${cfg.revDelta}` },
                  { title: '累積預約次數', val: `${totalBookings} 次`, sub: `${cfg.label} ${cfg.bookDelta}` },
                  { title: '場館核准率', val: `${approvalRate}%`, sub: `待確認 ${pendingBookings} 筆` },
                  { title: '平均方案客單價', val: `NT$ ${avgOrderValue.toLocaleString()}`, sub: `共 ${topupTx.length} 筆訂單` }
                ].map((k, idx) => (
                  <div key={idx} style={{ background: '#111622', border: '1px solid #1f2937', borderRadius: '8px', padding: '14px 16px' }}>
                    <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>{k.title}</div>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: '#f8fafc', marginTop: '6px', fontVariantNumeric: 'tabular-nums' }}>{k.val}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>{k.sub}</div>
                  </div>
                ))}
              </div>

              {/* 雙增幅圖表區（填滿剩餘螢幕高度，一頁完整呈現） */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', flex: 1, minHeight: 0 }}>
                {/* 圖表 1：營收增幅趨勢圖 */}
                <div style={{ background: '#111622', border: '1px solid #1f2937', borderRadius: '8px', padding: '18px 20px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc' }}>平台營收增幅趨勢 ({cfg.label})</div>
                      <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>單位：新台幣 (NTD)</div>
                    </div>
                    <span style={{ fontSize: '14px', color: '#10b981', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>NT$ {totalRevenue.toLocaleString()}</span>
                  </div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
                    <svg viewBox="0 0 540 165" style={{ width: '100%', height: '100%', maxHeight: '280px' }}>
                      <defs>
                        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {[
                        { y: 20, label: maxRev.toLocaleString() },
                        { y: 77, label: Math.round(maxRev / 2).toLocaleString() },
                        { y: 134, label: '0' }
                      ].map((tick, idx) => (
                        <g key={idx}>
                          <line x1="46" y1={tick.y} x2="520" y2={tick.y} stroke="#1f2937" strokeDasharray={idx === 2 ? undefined : '4 4'} strokeWidth="1" />
                          <text x="38" y={tick.y + 4} fill="#64748b" fontSize="10" textAnchor="end">{tick.label}</text>
                        </g>
                      ))}
                      <polygon points={revArea} fill="url(#revGrad)" />
                      <polyline fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinejoin="round" points={revPoints} />
                      {revCoords.map((pt, i) => {
                        const showLabel = cfg.labels.length <= 12 || i % 3 === 0 || i === cfg.labels.length - 1;
                        return (
                          <g key={i}>
                            <circle cx={pt.x} cy={pt.y} r={cfg.labels.length > 12 ? 2.5 : 3.5} fill="#111622" stroke="#10b981" strokeWidth="1.8" />
                            {showLabel && pt.v > 0 && (
                              <text x={pt.x} y={pt.y - 8} fill="#cbd5e1" fontSize="9.5" textAnchor="middle" fontWeight="600">
                                {pt.v.toLocaleString()}
                              </text>
                            )}
                          </g>
                        );
                      })}
                      {cfg.labels.map((lbl, i) => {
                        const showTick = cfg.labels.length <= 12 || i % 3 === 0 || i === cfg.labels.length - 1;
                        if (!showTick) return null;
                        return (
                          <text key={i} x={revCoords[i].x} y="155" fill="#64748b" fontSize="10" textAnchor="middle">
                            {lbl}
                          </text>
                        );
                      })}
                    </svg>
                  </div>
                  <div style={{ borderTop: '1px solid #1f2937', paddingTop: '10px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
                    <span>峰值：<strong style={{ color: '#f8fafc' }}>NT$ {Math.max(...cfg.revSeries).toLocaleString()}</strong></span>
                    <span>期均：<strong style={{ color: '#f8fafc' }}>NT$ {Math.round(cfg.revSeries.reduce((a, b) => a + b, 0) / cfg.revSeries.length).toLocaleString()}</strong></span>
                    <span>增幅：<strong style={{ color: '#10b981' }}>{cfg.revDelta}</strong></span>
                  </div>
                </div>

                {/* 圖表 2：預約次數增幅趨勢圖 */}
                <div style={{ background: '#111622', border: '1px solid #1f2937', borderRadius: '8px', padding: '18px 20px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc' }}>預約次數增幅趨勢 ({cfg.label})</div>
                      <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>單位：預約次數 (次)</div>
                    </div>
                    <span style={{ fontSize: '14px', color: '#b4ff04', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{totalBookings} 次</span>
                  </div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
                    <svg viewBox="0 0 540 165" style={{ width: '100%', height: '100%', maxHeight: '280px' }}>
                      <defs>
                        <linearGradient id="bookGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#b4ff04" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#b4ff04" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {[
                        { y: 20, label: String(maxBook) },
                        { y: 77, label: String(Math.round(maxBook / 2)) },
                        { y: 134, label: '0' }
                      ].map((tick, idx) => (
                        <g key={idx}>
                          <line x1="46" y1={tick.y} x2="520" y2={tick.y} stroke="#1f2937" strokeDasharray={idx === 2 ? undefined : '4 4'} strokeWidth="1" />
                          <text x="38" y={tick.y + 4} fill="#64748b" fontSize="10" textAnchor="end">{tick.label}</text>
                        </g>
                      ))}
                      <polygon points={bookArea} fill="url(#bookGrad)" />
                      <polyline fill="none" stroke="#b4ff04" strokeWidth="2.5" strokeLinejoin="round" points={bookPoints} />
                      {bookCoords.map((pt, i) => {
                        const showLabel = cfg.labels.length <= 12 || i % 3 === 0 || i === cfg.labels.length - 1;
                        return (
                          <g key={i}>
                            <circle cx={pt.x} cy={pt.y} r={cfg.labels.length > 12 ? 2.5 : 3.5} fill="#111622" stroke="#b4ff04" strokeWidth="1.8" />
                            {showLabel && pt.v > 0 && (
                              <text x={pt.x} y={pt.y - 8} fill="#cbd5e1" fontSize="9.5" textAnchor="middle" fontWeight="600">
                                {pt.v}
                              </text>
                            )}
                          </g>
                        );
                      })}
                      {cfg.labels.map((lbl, i) => {
                        const showTick = cfg.labels.length <= 12 || i % 3 === 0 || i === cfg.labels.length - 1;
                        if (!showTick) return null;
                        return (
                          <text key={i} x={bookCoords[i].x} y="155" fill="#64748b" fontSize="10" textAnchor="middle">
                            {lbl}
                          </text>
                        );
                      })}
                    </svg>
                  </div>
                  <div style={{ borderTop: '1px solid #1f2937', paddingTop: '10px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
                    <span>峰值：<strong style={{ color: '#f8fafc' }}>{Math.max(...cfg.bookSeries)} 次</strong></span>
                    <span>期均：<strong style={{ color: '#f8fafc' }}>{Math.round(cfg.bookSeries.reduce((a, b) => a + b, 0) / cfg.bookSeries.length)} 次</strong></span>
                    <span>增幅：<strong style={{ color: '#b4ff04' }}>{cfg.bookDelta}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          );
        })() : adminSection === 'members' ? (() => {
          // 讀取目前註冊會員資料與交易紀錄
          let currentCoach = {
            coachId: 'A1001',
            name: '林峻 (Alex Lin)',
            phone: '0912-345-678',
            email: 'alex.lin.fitness@gmail.com',
            instagram: '@alex_coach_fit',
            primaryAreas: '台北大安 / 信義 / 板橋',
            certifications: []
          };
          try {
            const saved = JSON.parse(localStorage.getItem('gymspot_coach_profile') || 'null');
            if (saved) {
              currentCoach = {
                ...currentCoach,
                ...saved,
                coachId: (saved.coachId === 'A001' || saved.coachId === 'A0001') ? 'A1001' : (saved.coachId || 'A1001')
              };
            }
          } catch {}
          const currentPts = Number(localStorage.getItem('gymspot_points') ?? 300);
          let bookingTx = [];
          try {
            bookingTx = JSON.parse(localStorage.getItem('gymspot_venue_bookings_v1') || '[]');
          } catch {}
          let topupTx = [];
          try {
            topupTx = JSON.parse(localStorage.getItem('gymspot_topup_history_v1') || '[]');
          } catch {}
          const usedPts = bookingTx.reduce((sum, b) => sum + (Number(b.totalPoints) || (Number(b.totalHours) || 1) * 30), 0);
          const transactions = [
            ...topupTx.map((t) => ({
              id: t.id || `TOP-${t.createdAt}`,
              time: t.createdAt || '—',
              type: '購買媒合方案',
              detail: t.planName || `儲值 ${t.points} 點`,
              pointsDelta: `+${t.points} 點 (+${Math.floor((t.points || 0) / 30)} 次)`,
              amount: t.price ? `NT$ ${t.price}` : '—'
            })),
            ...bookingTx.map((b) => ({
              id: b.bookingId,
              time: b.createdAt || '—',
              type: '預約場館扣點',
              detail: `${b.gymName} (${b.dateStr} ${(b.slots || []).join('、')})`,
              pointsDelta: `-${b.totalPoints || (b.totalHours || 1) * 30} 點 (-${b.totalHours || 1} 次)`,
              amount: b.status === 'cancelled' ? '已婉拒' : b.status === 'approved' ? '已同意' : '待確認'
            }))
          ];
          const membersList = [
            {
              ...currentCoach,
              currentPoints: currentPts,
              currentCredits: Math.floor(currentPts / 30),
              usedPoints: usedPts,
              usedCredits: Math.floor(usedPts / 30),
              transactions
            }
          ].filter((m) => {
            const q = memberSearch.trim().toLowerCase();
            if (!q) return true;
            return (
              (m.coachId || '').toLowerCase().includes(q) ||
              (m.name || '').toLowerCase().includes(q) ||
              (m.email || '').toLowerCase().includes(q) ||
              (m.phone || '').toLowerCase().includes(q)
            );
          }).sort((a, b) => (a.coachId || '').localeCompare(b.coachId || '', undefined, { numeric: true }));

          return (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', margin: 0 }}>會員專區</h2>
                  <div style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '4px' }}>
                    檢視所有註冊教練會員資料、專業證照、聯絡方式、預約點數餘額與交易紀錄
                  </div>
                </div>
                <input
                  type="text"
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  placeholder="搜尋會員編號、姓名、電話或 Gmail..."
                  style={{
                    background: '#111622',
                    border: '1px solid #263042',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    color: '#fff',
                    fontSize: '13px',
                    width: '280px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ background: '#111622', border: '1px solid #1f2937', borderRadius: '10px', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px', minWidth: '920px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #1f2937', color: '#94a3b8', fontSize: '12px' }}>
                      <th style={{ padding: '12px 16px' }}>會員編號</th>
                      <th style={{ padding: '12px 16px' }}>姓名</th>
                      <th style={{ padding: '12px 16px' }}>教練證照（現有填寫）</th>
                      <th style={{ padding: '12px 16px' }}>聯絡方式</th>
                      <th style={{ padding: '12px 16px' }}>現有預約點數</th>
                      <th style={{ padding: '12px 16px' }}>已使用點數</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>交易紀錄</th>
                    </tr>
                  </thead>
                  <tbody>
                    {membersList.map((m) => (
                      <tr key={m.coachId} style={{ borderBottom: '1px solid #182030' }}>
                        <td style={{ padding: '14px 16px', fontWeight: 700, color: '#f8fafc', fontFamily: 'ui-monospace, monospace' }}>
                          {m.coachId}
                        </td>
                        <td style={{ padding: '14px 16px', fontWeight: 700, color: '#f8fafc' }}>{m.name}</td>
                        <td style={{ padding: '14px 16px', color: '#cbd5e1', maxWidth: '260px' }}>
                          {Array.isArray(m.certifications) && m.certifications.length > 0
                            ? m.certifications.map((c) => c.name || c).join('、')
                            : <span style={{ color: '#64748b' }}>尚未填寫</span>}
                        </td>
                        <td style={{ padding: '14px 16px', color: '#cbd5e1', lineHeight: 1.5 }}>
                          <div>電話：{m.phone || '—'}</div>
                          <div>Gmail：{m.email || '—'}</div>
                          <div>IG：{m.instagram || '—'}</div>
                        </td>
                        <td style={{ padding: '14px 16px', fontWeight: 700, color: '#b4ff04' }}>
                          {m.currentPoints} 點（{m.currentCredits} 次）
                        </td>
                        <td style={{ padding: '14px 16px', color: '#cbd5e1' }}>
                          {m.usedPoints} 點（{m.usedCredits} 次）
                        </td>
                        <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={() => setSelectedMember(m)}
                            style={{
                              background: '#182030',
                              border: '1px solid #263042',
                              borderRadius: '6px',
                              padding: '6px 12px',
                              color: '#f8fafc',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            查看交易紀錄 ({m.transactions.length})
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })() : (
        <>
        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px',
          marginBottom: '24px'
        }}>
          <div 
            onClick={() => setActiveTab('pending')}
            style={{
              background: activeTab === 'pending' ? '#161d2b' : '#111622',
              border: `1px solid ${activeTab === 'pending' ? '#94a3b8' : '#1f2937'}`,
              borderRadius: '8px',
              padding: '16px 18px',
              cursor: 'pointer',
              transition: 'border-color 0.15s ease, background 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12.5px', color: '#94a3b8', fontWeight: 600 }}>待審核</span>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#f59e0b' }} />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#f8fafc', marginTop: '8px', fontVariantNumeric: 'tabular-nums' }}>
              {stats.pending}
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('approved')}
            style={{
              background: activeTab === 'approved' ? '#161d2b' : '#111622',
              border: `1px solid ${activeTab === 'approved' ? '#94a3b8' : '#1f2937'}`,
              borderRadius: '8px',
              padding: '16px 18px',
              cursor: 'pointer',
              transition: 'border-color 0.15s ease, background 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12.5px', color: '#94a3b8', fontWeight: 600 }}>已核准上架</span>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981' }} />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#f8fafc', marginTop: '8px', fontVariantNumeric: 'tabular-nums' }}>
              {stats.approved}
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('rejected')}
            style={{
              background: activeTab === 'rejected' ? '#161d2b' : '#111622',
              border: `1px solid ${activeTab === 'rejected' ? '#94a3b8' : '#1f2937'}`,
              borderRadius: '8px',
              padding: '16px 18px',
              cursor: 'pointer',
              transition: 'border-color 0.15s ease, background 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12.5px', color: '#94a3b8', fontWeight: 600 }}>已駁回／退件</span>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ef4444' }} />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#f8fafc', marginTop: '8px', fontVariantNumeric: 'tabular-nums' }}>
              {stats.rejected}
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('all')}
            style={{
              background: activeTab === 'all' ? '#161d2b' : '#111622',
              border: `1px solid ${activeTab === 'all' ? '#94a3b8' : '#1f2937'}`,
              borderRadius: '8px',
              padding: '16px 18px',
              cursor: 'pointer',
              transition: 'border-color 0.15s ease, background 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12.5px', color: '#94a3b8', fontWeight: 600 }}>全部申請件</span>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#64748b' }} />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#f8fafc', marginTop: '8px', fontVariantNumeric: 'tabular-nums' }}>
              {stats.total}
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          marginBottom: '20px'
        }}>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            background: '#0e1524',
            padding: '4px',
            borderRadius: '10px',
            border: '1px solid #1e293b'
          }}>
            {[
              { id: 'pending', label: `待審核 (${stats.pending})` },
              { id: 'approved', label: `已核准 (${stats.approved})` },
              { id: 'rejected', label: `已退件 (${stats.rejected})` },
              { id: 'all', label: `全部 (${stats.total})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? '#1e293b' : 'transparent',
                  color: activeTab === tab.id ? '#b4ff04' : '#94a3b8',
                  border: 'none',
                  borderRadius: '7px',
                  padding: '7px 16px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '320px'
          }}>
            <Search size={15} color="#64748b" style={{ position: 'absolute', left: '12px', top: '11px' }} />
            <input
              type="text"
              placeholder="搜尋場館名稱、品牌、城市..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: '#0e1524',
                border: '1px solid #1e293b',
                borderRadius: '10px',
                padding: '9px 12px 9px 34px',
                color: '#fff',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Applications List Table */}
        <div style={{
          background: '#0e1524',
          borderRadius: '16px',
          border: '1px solid #1e293b',
          overflow: 'hidden'
        }}>
          {filteredApplications.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>
              <Building2 size={40} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
              <div style={{ fontSize: '15px', fontWeight: 600 }}>目前沒有符合條件的申請件</div>
              <div style={{ fontSize: '13px', marginTop: '6px' }}>可點擊右上角「產生測試申請件」快速測試審核流程</div>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#090e17', borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
                    <th style={{ padding: '14px 20px', fontWeight: 700 }}>場館資訊</th>
                    <th style={{ padding: '14px 16px', fontWeight: 700 }}>地區</th>
                    <th style={{ padding: '14px 16px', fontWeight: 700 }}>小時場租</th>
                    <th style={{ padding: '14px 16px', fontWeight: 700 }}>上傳照片</th>
                    <th style={{ padding: '14px 16px', fontWeight: 700 }}>身分確認管道</th>
                    <th style={{ padding: '14px 16px', fontWeight: 700 }}>狀態</th>
                    <th style={{ padding: '14px 20px', textAlign: 'right', fontWeight: 700 }}>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map(app => {
                    const photosCount = (app.photos && app.photos.length) || 0;

                    return (
                      <tr 
                        key={app.id} 
                        style={{ 
                          borderBottom: '1px solid #141c2c',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#121927'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <td style={{ padding: '14px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img
                              src={app.coverImage || (app.photos && app.photos[0]) || 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=200'}
                              alt={app.name}
                              style={{
                                width: '48px',
                                height: '36px',
                                objectFit: 'cover',
                                borderRadius: '6px',
                                background: '#1e293b'
                              }}
                            />
                            <div>
                              <div style={{ fontWeight: 800, color: '#f8fafc', fontSize: '14px' }}>
                                {app.name}
                              </div>
                              <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                                {app.brand} · 申請時間：{new Date(app.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: '14px 16px', color: '#cbd5e1' }}>
                          <div>{app.city} {app.district}</div>
                          <div style={{ fontSize: '11px', color: '#64748b', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {app.address}
                          </div>
                        </td>

                        <td style={{ padding: '14px 16px' }}>
                          <span style={{ color: '#b4ff04', fontWeight: 800 }}>${app.hourlyRate}</span>
                          <span style={{ fontSize: '11px', color: '#64748b' }}> / hr</span>
                        </td>

                        <td style={{ padding: '14px 16px' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: photosCount >= 4 ? 'rgba(180, 255, 4, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            color: photosCount >= 4 ? '#b4ff04' : '#ef4444',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 700
                          }}>
                            <ImageIcon size={12} />
                            <span>{photosCount} 張</span>
                          </span>
                        </td>

                        <td style={{ padding: '14px 16px' }}>
                          {(() => {
                            const channelText = app.verifyChannelLabel
                              ? `${app.verifyChannelLabel.replace('官方 ', '').replace(' 帳號', '')}：${app.verifyAccount || ''}`
                              : (app.igHandle ? `Instagram：${app.igHandle}` : app.officialLine ? `LINE：${app.officialLine}` : app.fbPageUrl ? 'FB 粉專' : '');
                            return (
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                background: channelText ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                color: channelText ? '#10b981' : '#ef4444',
                                padding: '3px 8px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: 700,
                                maxWidth: '180px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}>
                                <ShieldCheck size={12} style={{ flexShrink: 0 }} />
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{channelText || '未填寫'}</span>
                              </span>
                            );
                          })()}
                        </td>

                        <td style={{ padding: '14px 16px' }}>
                          {app.status === 'pending' && (
                            <span style={{
                              background: 'rgba(245, 158, 11, 0.15)',
                              color: '#f59e0b',
                              border: '1px solid rgba(245, 158, 11, 0.3)',
                              padding: '4px 10px',
                              borderRadius: '9999px',
                              fontSize: '11.5px',
                              fontWeight: 800,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <Clock size={11} /> 待人工審核
                            </span>
                          )}
                          {app.status === 'approved' && (
                            <span style={{
                              background: 'rgba(180, 255, 4, 0.15)',
                              color: '#b4ff04',
                              border: '1px solid rgba(180, 255, 4, 0.3)',
                              padding: '4px 10px',
                              borderRadius: '9999px',
                              fontSize: '11.5px',
                              fontWeight: 800,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <CheckCircle2 size={11} /> 已核准上架
                            </span>
                          )}
                          {app.status === 'rejected' && (
                            <span style={{
                              background: 'rgba(239, 68, 68, 0.15)',
                              color: '#f87171',
                              border: '1px solid rgba(239, 68, 68, 0.3)',
                              padding: '4px 10px',
                              borderRadius: '9999px',
                              fontSize: '11.5px',
                              fontWeight: 800,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <XCircle size={11} /> 已駁回退件
                            </span>
                          )}
                        </td>

                        <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                          <button
                            onClick={() => setSelectedApp(app)}
                            style={{
                              background: '#192336',
                              color: '#cbd5e1',
                              border: '1px solid #243248',
                              borderRadius: '8px',
                              padding: '6px 14px',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#b4ff04';
                              e.currentTarget.style.color = '#0a1402';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#192336';
                              e.currentTarget.style.color = '#cbd5e1';
                            }}
                          >
                            <Eye size={13} />
                            <span>審核明細</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        </>
        )}
      </main>

      {/* 會員交易紀錄明細彈窗 */}
      {selectedMember && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setSelectedMember(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '680px',
              maxHeight: '85vh',
              background: '#111622',
              border: '1px solid #1f2937',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #1f2937', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>會員編號：{selectedMember.coachId}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc', margin: '2px 0 0' }}>
                  {selectedMember.name} · 交易與點數紀錄
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                style={{ background: '#182030', border: 'none', borderRadius: '6px', color: '#cbd5e1', padding: '6px', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>
            <div style={{ padding: '18px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '16px', fontSize: '13px', marginBottom: '6px' }}>
                <span>現有預約點數：<strong style={{ color: '#b4ff04' }}>{selectedMember.currentPoints} 點（{selectedMember.currentCredits} 次）</strong></span>
                <span>已使用預約點數：<strong style={{ color: '#f8fafc' }}>{selectedMember.usedPoints} 點（{selectedMember.usedCredits} 次）</strong></span>
              </div>
              {selectedMember.transactions.length === 0 ? (
                <div style={{ padding: '28px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
                  尚無交易或預約扣點紀錄
                </div>
              ) : (
                selectedMember.transactions.map((tx, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#090d16',
                      border: '1px solid #1f2937',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '13px'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: '#f8fafc' }}>{tx.type} · {tx.detail}</div>
                      <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '3px' }}>單號 #{tx.id} · {tx.time}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontWeight: 700, color: tx.pointsDelta.startsWith('+') ? '#10b981' : '#f8fafc' }}>{tx.pointsDelta}</div>
                      <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>{tx.amount}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          Modal / Drawer: 審核明細檢視抽屜
      ------------------------------------------------------------- */}
      {selectedApp && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
          onClick={() => setSelectedApp(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '680px',
              height: '100%',
              background: '#0d131f',
              borderLeft: '1px solid #1e293b',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-20px 0 50px rgba(0, 0, 0, 0.7)'
            }}
          >
            {/* Drawer Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #1e293b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              background: '#0d131f',
              zIndex: 10
            }}>
              <div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 700 }}>
                  申請單號：{selectedApp.id}
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#f8fafc', margin: '4px 0 0' }}>
                  {selectedApp.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                style={{
                  background: '#192336',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Drawer Content */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '22px', flex: 1 }}>
              {/* Status Header Bar */}
              <div style={{
                background: '#121927',
                borderRadius: '12px',
                padding: '14px 18px',
                border: '1px solid #1e293b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>目前審核狀態</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, marginTop: '2px', color: selectedApp.status === 'approved' ? '#b4ff04' : selectedApp.status === 'pending' ? '#f59e0b' : '#ef4444' }}>
                    {selectedApp.status === 'pending' && '⏳ 待人工審核'}
                    {selectedApp.status === 'approved' && '✅ 已核准上架地圖'}
                    {selectedApp.status === 'rejected' && '❌ 已駁回退件'}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: selectedApp.agreedTerms !== false ? 'rgba(180, 255, 4, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: selectedApp.agreedTerms !== false ? '#b4ff04' : '#ef4444',
                    border: selectedApp.agreedTerms !== false ? '1px solid rgba(180, 255, 4, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
                  }}>
                    {selectedApp.agreedTerms !== false ? '✓ 已線上簽署合作規範' : '⚠️ 未簽署合作規範'}
                  </span>
                  {selectedApp.reviewerNote && (
                    <div style={{ fontSize: '11.5px', color: '#cbd5e1', maxWidth: '300px', textAlign: 'right' }}>
                      備註：{selectedApp.reviewerNote}
                    </div>
                  )}
                </div>
              </div>

              {/* 1. 場館基本資料 */}
              <div style={{
                background: '#101726',
                borderRadius: '14px',
                border: '1px solid #1e293b',
                padding: '18px'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc', margin: '0 0 14px' }}>
                  1. 場館基本資料
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '13px' }}>
                  <div>
                    <span style={{ color: '#64748b' }}>場館完整名稱：</span>
                    <span style={{ color: '#e2e8f0', fontWeight: 700 }}>{selectedApp.name || '未填寫'}</span>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>場館簡稱 (地圖顯示)：</span>
                    <span style={{ color: '#b4ff04', fontWeight: 700 }}>{selectedApp.shortName || selectedApp.brand || selectedApp.name || '未填寫'}</span>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>所在城市：</span>
                    <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{selectedApp.city || '未填寫'}</span>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>行政區：</span>
                    <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{selectedApp.district || '未填寫'}</span>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <span style={{ color: '#64748b' }}>詳細營業地址：</span>
                    <span style={{ color: '#e2e8f0' }}>{selectedApp.address || '未填寫'}</span>
                    <button
                      onClick={() => {
                        const q = encodeURIComponent(selectedApp.address || `${selectedApp.city} ${selectedApp.name}`);
                        window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, '_blank');
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#b4ff04',
                        cursor: 'pointer',
                        fontSize: '12px',
                        marginLeft: '8px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '2px'
                      }}
                    >
                      <ExternalLink size={12} /> 在 Google Maps 上預覽核對
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. 小時制場租費用與每週開放時段 */}
              <div style={{
                background: '#101726',
                borderRadius: '14px',
                border: '1px solid #1e293b',
                padding: '18px'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc', margin: '0 0 12px' }}>
                  2. 小時制場租費用與每週開放時段
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px', marginBottom: '14px' }}>
                  <div style={{ background: '#090e17', padding: '12px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>小時制場租費用 (NT$)</div>
                    <div style={{ fontSize: '20px', fontWeight: 900, color: '#b4ff04', marginTop: '2px' }}>
                      ${selectedApp.hourlyRate || selectedApp.pricing?.hourlyRate || 200} <span style={{ fontSize: '12px', color: '#94a3b8' }}>/ 小時（僅限 1 對 1）</span>
                    </div>
                  </div>
                  <div style={{ background: '#090e17', padding: '12px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>每週開放時段總計</div>
                    <div style={{ fontSize: '20px', fontWeight: 900, color: '#f8fafc', marginTop: '2px' }}>
                      {selectedApp.availableSchedule
                        ? Object.values(selectedApp.availableSchedule).filter(Boolean).length
                        : (selectedApp.openSlotsCount ?? 112)} <span style={{ fontSize: '12px', color: '#94a3b8' }}>/ 112 格</span>
                    </div>
                  </div>
                </div>

                {/* 每週開放時段表 (1~7, 08:00~24:00) */}
                <div style={{ overflowX: 'auto', background: '#090e17', borderRadius: '10px', border: '1px solid #1e293b', padding: '10px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'center', minWidth: '480px' }}>
                    <thead>
                      <tr>
                        <th style={{ padding: '6px 4px', color: '#94a3b8', borderBottom: '1px solid #1e293b' }}>時段</th>
                        {['一', '二', '三', '四', '五', '六', '日'].map((d, i) => (
                          <th key={i} style={{ padding: '6px 4px', color: '#cbd5e1', borderBottom: '1px solid #1e293b' }}>週{d}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 16 }, (_, idx) => 8 + idx).map((hr) => (
                        <tr key={hr}>
                          <td style={{ padding: '4px', color: '#94a3b8', borderBottom: '1px solid #141d2c', fontWeight: 600 }}>
                            {String(hr).padStart(2, '0')}:00
                          </td>
                          {[1, 2, 3, 4, 5, 6, 7].map((dayKey) => {
                            const isOpen = selectedApp.availableSchedule
                              ? !!selectedApp.availableSchedule[`${dayKey}-${hr}`]
                              : true;
                            return (
                              <td key={dayKey} style={{ padding: '3px', borderBottom: '1px solid #141d2c' }}>
                                <span style={{
                                  display: 'inline-block',
                                  width: '100%',
                                  padding: '2px 0',
                                  borderRadius: '4px',
                                  background: isOpen ? 'rgba(180, 255, 4, 0.14)' : 'rgba(255, 255, 255, 0.03)',
                                  color: isOpen ? '#b4ff04' : '#475569',
                                  fontWeight: isOpen ? 800 : 500
                                }}>
                                  {isOpen ? '可預約' : '—'}
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3. 場館介紹 */}
              <div style={{
                background: '#101726',
                borderRadius: '14px',
                border: '1px solid #1e293b',
                padding: '18px'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc', margin: '0 0 10px' }}>
                  3. 場館介紹
                </h3>
                <div style={{
                  fontSize: '13px',
                  color: selectedApp.gymIntro && selectedApp.gymIntro !== '無場館介紹' ? '#e2e8f0' : '#94a3b8',
                  lineHeight: 1.6,
                  background: '#090e17',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid #1e293b',
                  whiteSpace: 'pre-wrap'
                }}>
                  {selectedApp.gymIntro?.trim() || '無場館介紹'}
                </div>
              </div>

              {/* 4. 給教練的話或規則 */}
              <div style={{
                background: '#101726',
                borderRadius: '14px',
                border: '1px solid #1e293b',
                padding: '18px'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc', margin: '0 0 10px' }}>
                  4. 給教練的話或規則
                </h3>
                <div style={{
                  fontSize: '13px',
                  color: selectedApp.coachIntro && selectedApp.coachIntro !== '無特殊介紹' ? '#e2e8f0' : '#94a3b8',
                  lineHeight: 1.6,
                  background: '#090e17',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid #1e293b',
                  whiteSpace: 'pre-wrap'
                }}>
                  {selectedApp.coachIntro?.trim() || '無特殊介紹'}
                </div>
              </div>

              {/* 5. 場館聯繫管道 */}
              <div style={{
                background: '#101726',
                borderRadius: '14px',
                border: '1px solid #1e293b',
                padding: '18px'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc', margin: '0 0 12px' }}>
                  5. 場館聯繫管道
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                  <div style={{ background: '#090e17', padding: '12px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                    <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>場館聯繫電話</div>
                    <a href={`tel:${selectedApp.phone}`} style={{ color: '#b4ff04', textDecoration: 'none', fontWeight: 700 }}>{selectedApp.phone || '未填寫'}</a>
                  </div>
                  <div style={{ background: '#090e17', padding: '12px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                    <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>場租專用 Gmail</div>
                    <a href={`mailto:${selectedApp.email}`} style={{ color: '#b4ff04', textDecoration: 'none', fontWeight: 700 }}>{selectedApp.email || '未填寫'}</a>
                  </div>
                </div>
              </div>

              {/* 6. 首頁圖與場館／器材照片 */}
              <div style={{
                background: '#101726',
                borderRadius: '14px',
                border: '1px solid #1e293b',
                padding: '18px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                    6. 首頁圖與場館／器材照片 ({selectedApp.photos?.length || 0} / 10 張)
                  </h3>
                  <span style={{ fontSize: '11px', color: (selectedApp.photos?.length || 0) >= 4 ? '#b4ff04' : '#ef4444', fontWeight: 700 }}>
                    {(selectedApp.photos?.length || 0) >= 4 ? '符合至少 4 張標準' : '照片不足 4 張'}
                  </span>
                </div>

                {selectedApp.coverImage && (
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '6px', fontWeight: 700 }}>首頁圖（封面圖）</div>
                    <div
                      onClick={() => setLightboxImage(selectedApp.coverImage)}
                      style={{
                        width: '200px',
                        aspectRatio: '4 / 3',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '2px solid #b4ff04',
                        cursor: 'pointer',
                        background: '#090e17'
                      }}
                    >
                      <img src={selectedApp.coverImage} alt="首頁圖" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                )}

                <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px', fontWeight: 700 }}>場館／器材照片（點擊放大）</div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                  gap: '10px'
                }}>
                  {(selectedApp.photos || []).map((imgUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLightboxImage(imgUrl)}
                      style={{
                        position: 'relative',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid #243248',
                        aspectRatio: '4 / 3',
                        cursor: 'pointer',
                        background: '#090e17'
                      }}
                    >
                      <img
                        src={imgUrl}
                        alt={`Photo ${idx + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{
                        position: 'absolute',
                        bottom: '4px',
                        right: '4px',
                        background: 'rgba(0,0,0,0.7)',
                        color: '#fff',
                        fontSize: '10px',
                        padding: '1px 4px',
                        borderRadius: '3px'
                      }}>
                        #{idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. 合作條款 */}
              <div style={{
                background: '#101726',
                borderRadius: '14px',
                border: '1px solid #1e293b',
                padding: '18px'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc', margin: '0 0 8px' }}>
                  7. 合作條款（《GYMspot 合作場館服務條款 V1.0》）
                </h3>
                <div style={{ fontSize: '13px', color: selectedApp.agreedTerms !== false ? '#b4ff04' : '#ef4444', fontWeight: 700 }}>
                  {selectedApp.agreedTerms !== false
                    ? `✓ 已於 ${selectedApp.agreedTermsAt || selectedApp.submittedAt || '提交時'} 完成線上詳閱並簽署同意`
                    : '尚未同意合作條款'}
                </div>
              </div>

              {/* 8. 合作場館專屬後台路由與密碼（總部後台全程可見，含商家變更後之密碼） */}
              {(() => {
                const portalCreds = getVenuePortalCreds(selectedApp.id);
                const portalUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://www.gymspot.space'}/venue/${selectedApp.id}`;
                return (
                  <div style={{
                    background: '#101726',
                    borderRadius: '14px',
                    border: '1px solid #1e293b',
                    padding: '18px'
                  }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc', margin: '0 0 10px' }}>
                      廠商專屬後台路由與登入密碼
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                      <div>
                        <span style={{ color: '#64748b' }}>專屬路由：</span>
                        <a
                          href={`/venue/${selectedApp.id}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: '#b4ff04', textDecoration: 'underline', fontWeight: 700 }}
                        >
                          {portalUrl}
                        </a>
                      </div>
                      <div>
                        <span style={{ color: '#64748b' }}>目前登入密碼：</span>
                        <strong style={{ color: '#f8fafc', fontFamily: 'ui-monospace, monospace' }}>
                          {portalCreds.passcode}
                        </strong>
                        {portalCreds.updatedAt && (
                          <span style={{ fontSize: '11.5px', color: '#94a3b8', marginLeft: '8px' }}>
                            (商家於 {portalCreds.updatedAt} 更新)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Drawer Actions Footer */}
            <div style={{
              padding: '18px 24px',
              borderTop: '1px solid #1e293b',
              background: '#0d131f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '12px',
              position: 'sticky',
              bottom: 0,
              zIndex: 10
            }}>
              {selectedApp.status === 'pending' && (
                <>
                  <button
                    onClick={() => setIsRejectModalOpen(true)}
                    style={{
                      background: 'rgba(239, 68, 68, 0.15)',
                      color: '#ef4444',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '10px',
                      padding: '11px 20px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    駁回退件
                  </button>

                  <button
                    onClick={() => handleApprove(selectedApp)}
                    style={{
                      background: 'linear-gradient(135deg, #b4ff04 0%, #8ce000 100%)',
                      color: '#0a1402',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '11px 28px',
                      fontSize: '14px',
                      fontWeight: 900,
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(180, 255, 4, 0.4)'
                    }}
                  >
                    核准通過並發布上架
                  </button>
                </>
              )}

              {selectedApp.status === 'approved' && (
                <button
                  onClick={() => setIsRejectModalOpen(true)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    color: '#ef4444',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '10px',
                    padding: '10px 18px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  下架此場館
                </button>
              )}

              {selectedApp.status === 'rejected' && (
                <button
                  onClick={() => handleApprove(selectedApp)}
                  style={{
                    background: '#192336',
                    color: '#b4ff04',
                    border: '1px solid #b4ff04',
                    borderRadius: '10px',
                    padding: '10px 18px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  重新核准上架
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          Modal: 駁回原因輸入視窗
      ------------------------------------------------------------- */}
      {isRejectModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          background: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '460px',
            width: '100%'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#f8fafc', margin: '0 0 10px' }}>
              請填寫退件／補件原因
            </h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 16px' }}>
              此原因將記錄於後台，並可發送 Gmail / LINE 通知店家補正資料。
            </p>
            <textarea
              rows={4}
              placeholder="例如：營利事業登記證圖片模糊不清，請重新上傳清晰版；照片非現場設備實景等..."
              value={rejectReasonInput}
              onChange={(e) => setRejectReasonInput(e.target.value)}
              style={{
                width: '100%',
                background: '#090e17',
                border: '1px solid #243248',
                borderRadius: '10px',
                padding: '12px',
                color: '#fff',
                fontSize: '13px',
                outline: 'none',
                resize: 'none',
                marginBottom: '16px'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setIsRejectModalOpen(false)}
                style={{
                  background: '#1e293b',
                  color: '#cbd5e1',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '9px 16px',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                取消
              </button>
              <button
                onClick={handleConfirmReject}
                style={{
                  background: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '9px 20px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                確定駁回
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          Modal: 圖片放大檢視 (Lightbox)
      ------------------------------------------------------------- */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            background: 'rgba(0, 0, 0, 0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <img
            src={lightboxImage}
            alt="Enlarged preview"
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: '12px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
            }}
          />
        </div>
      )}

      {/* -------------------------------------------------------------
          Modal: Supabase SQL 安全結構與 RLS 政策說明
      ------------------------------------------------------------- */}
      {showSqlModal && (
        <div 
          onClick={() => setShowSqlModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '16px',
              maxWidth: '720px',
              width: '100%',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px rgba(0,0,0,0.7)'
            }}
          >
            <div style={{
              padding: '18px 24px',
              borderBottom: '1px solid #1e293b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Database size={18} color="#b4ff04" />
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                  Supabase RLS 安全政策腳本已生成
                </h3>
              </div>
              <button
                onClick={() => setShowSqlModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '20px 24px', overflowY: 'auto', fontSize: '13px', color: '#cbd5e1', lineHeight: 1.6 }}>
              <p style={{ margin: '0 0 12px' }}>
                專案根目錄下已為您建立完整 SQL 檔案：<code style={{ color: '#b4ff04' }}>supabase_schema.sql</code>。
                包含以下三大銀行級安全防護機制：
              </p>

              <ol style={{ paddingLeft: '20px', margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong>Row Level Security (RLS) 列級隔離</strong>：一般訪客送單僅有 INSERT 權限，無法讀取或竊視任何其他店家的營登資料。</li>
                <li><strong>私有儲存桶 (gym-private-docs)</strong>：關閉 Public Read，只有經過認證的管理員能調用簽署臨時網址 (Signed URL) 查閱。</li>
                <li><strong>公開照片儲存桶 (gym-public-photos)</strong>：存放審核通過後的 4～10 張場地器材展示照。</li>
              </ol>

              <div style={{
                background: '#090e17',
                border: '1px solid #1e293b',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '12px',
                color: '#94a3b8'
              }}>
                💡 <strong>如何部署：</strong> 請登入 Supabase 後台 ➔ 點選左側「SQL Editor」➔ 貼上 <code style={{ color: '#b4ff04' }}>supabase_schema.sql</code> 內容並點擊「Run」即可自動配置完成！
              </div>
            </div>

            <div style={{ padding: '14px 24px', borderTop: '1px solid #1e293b', textAlign: 'right' }}>
              <button
                onClick={() => setShowSqlModal(false)}
                style={{
                  background: '#b4ff04',
                  color: '#0a1402',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 20px',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                我了解了
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
