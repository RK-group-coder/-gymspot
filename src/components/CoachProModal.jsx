import React from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Bell, 
  FileCheck, 
  Share2, 
  Layers, 
  ShieldCheck,
  Dumbbell
} from 'lucide-react';

export default function CoachProModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const proPerks = [
    {
      icon: Bell,
      title: '即時空場推播 (Rush Slot Alerts)',
      desc: '尖峰熱門時段（平日 18:00 - 21:00）一旦有其他教練退訂釋出場地，系統第一時間 Line 推播搶時段。'
    },
    {
      icon: Share2,
      title: '教練專屬預約名片系統',
      desc: '一鍵產生專屬於您的上課名片頁面，學員可查看您配合的「認證場租健身房清單與評價」，直接選擇離學員家最近的場地。'
    },
    {
      icon: Layers,
      title: '全台跨館時數通 (VIP 批發特約價)',
      desc: '單次購買 20 小時，可於全台特約聯盟健身房跨館自由使用，不用在單一場館被綁死時數。'
    },
    {
      icon: ShieldCheck,
      title: '學員訓練公共意外責任險加保',
      desc: '每堂課只需銅板價，自動涵蓋學員在合約場租場館內的個人意外醫療保障，保護教練與學員。'
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2100,
      background: 'rgba(5, 8, 15, 0.88)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#111827',
          border: '1px solid #243248',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
          position: 'relative',
          padding: '28px'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(17, 24, 39, 0.8)',
            border: '1px solid #374151',
            color: '#cbd5e1',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #b4ff04 0%, #ffffff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            boxShadow: '0 4px 20px rgba(180, 255, 4, 0.4)'
          }}>
            <Sparkles size={28} color="#0a1402" />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#f8fafc', marginBottom: '6px' }}>
            Coach PRO 自由教練專屬特權
          </h2>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>
            省去一間間私訊問場租的時間，專注於提供頂級的教學品質
          </p>
        </div>

        {/* Perks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {proPerks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                style={{
                  background: '#0d131f',
                  border: '1px solid #1e293b',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={18} color="#ffffff" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
                    {perk.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                    {perk.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Card */}
        <div style={{
          background: 'linear-gradient(145deg, #182234 0%, #111827 100%)',
          border: '1px solid #243248',
          borderRadius: '16px',
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <div style={{ fontSize: '12px', color: '#ffffff', textShadow: '0 0 6px rgba(255, 255, 255, 0.5)', fontWeight: 800 }}>
              自由教練早鳥體驗方案
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '26px', fontWeight: 900, color: '#f8fafc' }}>
                $299
              </span>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>/ 月 (首月免費試用)</span>
            </div>
          </div>

          <button
            onClick={() => {
              alert('感謝支持！已登記為 PRO 創始教練早鳥名單，系統正式發布時將透過簡訊通知您領取 1 個月免費試用！');
              onClose();
            }}
            style={{
              background: 'linear-gradient(135deg, #b4ff04 0%, #ffffff 100%)',
              color: '#0a1402',
              border: 'none',
              borderRadius: '10px',
              padding: '12px 22px',
              fontSize: '14px',
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(180, 255, 4, 0.4)'
            }}
          >
            立即搶先登記 PRO
          </button>
        </div>
      </div>
    </div>
  );
}
