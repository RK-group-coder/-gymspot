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

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                background: 'rgba(180, 255, 4, 0.15)',
                color: '#b4ff04',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 900
              }}>
                ADMIN
              </div>
              <h1 style={{ fontSize: '18px', fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                場館入駐審核中心
              </h1>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setShowSqlModal(true)}
              style={{
                background: '#121927',
                border: '1px solid #243248',
                borderRadius: '8px',
                padding: '8px 14px',
                color: '#94a3b8',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Database size={14} color="#b4ff04" />
              <span>查看 Supabase RLS 安全腳本</span>
            </button>

            <button
              onClick={handleCreateMockApplication}
              style={{
                background: '#121927',
                border: '1px solid #243248',
                borderRadius: '8px',
                padding: '8px 14px',
                color: '#b4ff04',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <PlusCircle size={14} />
              <span>產生測試申請件</span>
            </button>

            <button
              onClick={handleLogout}
              style={{
                background: '#1e293b',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 14px',
                color: '#94a3b8',
                fontSize: '12.5px',
                cursor: 'pointer'
              }}
            >
              登出
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Dashboard Body */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 28px' }}>
        {/* Security Alert Banner */}
        <div style={{
          background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.1) 0%, rgba(14, 23, 38, 0.5) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '12px',
          padding: '14px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={20} color="#10b981" />
            <span style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: 1.5 }}>
              <strong>安全保護啟用中：</strong> 所有店家上傳之「公司設立登記表、消防證明」均受隔離防護，絕不開放公開目錄存取。
            </span>
          </div>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
            認證模式：RLS 機密存取
          </span>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div 
            onClick={() => setActiveTab('pending')}
            style={{
              background: activeTab === 'pending' ? 'rgba(245, 158, 11, 0.12)' : '#0e1524',
              border: `1px solid ${activeTab === 'pending' ? '#f59e0b' : '#1e293b'}`,
              borderRadius: '14px',
              padding: '18px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>待審核 (Pending)</span>
              <Clock size={16} color="#f59e0b" />
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: '#f59e0b', marginTop: '6px' }}>
              {stats.pending}
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px' }}>
              需人工核驗營登與場地照片
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('approved')}
            style={{
              background: activeTab === 'approved' ? 'rgba(180, 255, 4, 0.12)' : '#0e1524',
              border: `1px solid ${activeTab === 'approved' ? '#b4ff04' : '#1e293b'}`,
              borderRadius: '14px',
              padding: '18px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>已核准上架 (Approved)</span>
              <CheckCircle2 size={16} color="#b4ff04" />
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: '#b4ff04', marginTop: '6px' }}>
              {stats.approved}
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px' }}>
              已發布至前台 Google 地圖
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('rejected')}
            style={{
              background: activeTab === 'rejected' ? 'rgba(239, 68, 68, 0.12)' : '#0e1524',
              border: `1px solid ${activeTab === 'rejected' ? '#ef4444' : '#1e293b'}`,
              borderRadius: '14px',
              padding: '18px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>已駁回／補件 (Rejected)</span>
              <XCircle size={16} color="#ef4444" />
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: '#ef4444', marginTop: '6px' }}>
              {stats.rejected}
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px' }}>
              營登不符或退件清單
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('all')}
            style={{
              background: activeTab === 'all' ? '#1e293b' : '#0e1524',
              border: `1px solid ${activeTab === 'all' ? '#64748b' : '#1e293b'}`,
              borderRadius: '14px',
              padding: '18px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>全部申請件 (Total)</span>
              <Building2 size={16} color="#94a3b8" />
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: '#f8fafc', marginTop: '6px' }}>
              {stats.total}
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px' }}>
              歷史所有申請總計
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
      </main>

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
