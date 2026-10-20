import React from 'react';
import { 
  X, 
  DollarSign, 
  TrendingUp, 
  Award, 
  Sparkles, 
  CreditCard, 
  ShieldCheck, 
  Layers, 
  ArrowRight,
  Building2,
  Users
} from 'lucide-react';

export default function MonetizationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const revenueStreams = [
    {
      icon: Award,
      color: '#f59e0b',
      title: '1. 健身房「首頁置頂 / 區域推薦廣告」',
      timeline: '最快啟動現金流 (上線第 1 個月起)',
      desc: '一般場館可免費刊登基本資訊。願意付月費的場館享有「金色皇冠認證」、「搜尋地圖特定行政區置頂曝光」、「社群與電子報主打推廣」。',
      pricing: '收費預估：每館 NT$ 1,000 ~ 2,500 / 月'
    },
    {
      icon: CreditCard,
      color: '#b4ff04',
      title: '2. 線上場租預訂交易手續費 / 批發差價',
      timeline: '核心營收 (導入預訂金流後)',
      desc: '教練透過平台一鍵下單預訂時段，平台向教練收取 3% ~ 5% 系統服務費；或與場館洽談專屬特約團購價（如現場 250 元，平台特約價 220 元，平台賣 235 元賺取差價）。',
      pricing: '收費預估：每筆訂單 3% ~ 5% 或 每小時 $15~25 差價'
    },
    {
      icon: Sparkles,
      color: '#ffffff',
      title: '3. 自由教練「PRO 專業會員訂閱制」',
      timeline: '高黏著穩定月月扣款 (SaaS)',
      desc: '提供教練專屬加值功能：尖峰熱門時段有人取消「即時空場推播」、教練專屬課表名片頁面（傳給學員直接看可預約場地）、免收預訂手續費。',
      pricing: '收費預估：教練訂閱 NT$ 199 ~ 399 / 月'
    },
    {
      icon: Layers,
      color: '#8b5cf6',
      title: '4. 全台跨館通用「課時點數包 (Token Pass)」',
      timeline: '龐大現金流與儲值金池',
      desc: '教練帶課常因學生地點換場地，平台發行「跨館時數卡」，教練預先儲值 30 / 50 小時，可在雙北或台中多家合作特約館打卡扣點，平台賺取沉澱資金與手續費。',
      pricing: '收費預估：時數包預付儲值現金流 + 5% 營運管理費'
    },
    {
      icon: ShieldCheck,
      color: '#ec4899',
      title: '5. 周邊品牌贊助、保險與證照培訓導流',
      timeline: 'B2B 異業結盟高毛利',
      desc: '平台聚集了台灣最活躍的自由教練與中小型健身房，是器材商（槓鈴、地墊、深蹲架）、教練商業責任保險公司、CPR/四大國際證照檢定培訓單位的精準投放管道。',
      pricing: '收費預估：每筆保險/課程導流分潤 10% ~ 20%'
    },
    {
      icon: Building2,
      color: '#ffffff',
      title: '6. 小型工作室「場租排程與門禁管理系統」',
      timeline: '深度綁定場館 (B2B SaaS)',
      desc: '許多獨立工作室老闆不想花時間人工在 Line 登記場租。平台提供簡易預約時段看板 + QR Code 門禁打卡整合，成為場館的營運基礎設施。',
      pricing: '收費預估：每館 NT$ 1,200 ~ 3,000 / 月'
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
          maxWidth: '820px',
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
        <div style={{ marginBottom: '22px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(245, 158, 11, 0.12)', color: '#fbbf24', fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '9999px', marginBottom: '8px' }}>
            <DollarSign size={14} /> 商業變現藍圖 · 獲利模式指南
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#f8fafc', marginBottom: '6px' }}>
            這個專案該從哪裡賺錢？（6 大商業營收管道）
          </h2>
          <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>
            自由教練與中小型場館的雙邊平台具有極高的客單價與精準消費力。建議採取「**初期以廣告置頂建立流動性，中後期切入金流抽成與 SaaS 訂閱**」的漸進式變現策略：
          </p>
        </div>

        {/* Revenue Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '14px' }}>
          {revenueStreams.map((stream, idx) => {
            const Icon = stream.icon;
            return (
              <div
                key={idx}
                style={{
                  background: '#0d131f',
                  border: '1px solid #1e293b',
                  borderRadius: '14px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: `${stream.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={18} color={stream.color} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                      {stream.title}
                    </h3>
                    <span style={{ fontSize: '11px', color: stream.color, fontWeight: 600 }}>
                      {stream.timeline}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                  {stream.desc}
                </p>

                <div style={{
                  marginTop: 'auto',
                  paddingTop: '8px',
                  borderTop: '1px solid #1a2233',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#b4ff04'
                }}>
                  {stream.pricing}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div style={{
          marginTop: '20px',
          background: 'rgba(180, 255, 4, 0.08)',
          border: '1px solid rgba(180, 255, 4, 0.25)',
          borderRadius: '12px',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#b4ff04' }}>
              策略結論：初期「先聚人」，後期「收過路費」
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>
              第一波免費招商 30~50 家雙北/台中/高雄熱門場館，資料越完整，教練自然離不開此地圖！
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#b4ff04',
              color: '#0a1402',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontWeight: 800,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            我瞭解了
          </button>
        </div>
      </div>
    </div>
  );
}
