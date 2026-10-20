import React from 'react';
import { 
  ArrowLeft, 
  Dumbbell, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  TrendingUp, 
  Building2, 
  Mail, 
  MessageSquare, 
  Scale, 
  Users, 
  Flame 
} from 'lucide-react';

export default function AboutPage({ onNavigateHome, onOpenRegister, onOpenTerms }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#070a10',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* 1. Sticky Navigation Bar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(7, 10, 16, 0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #1e293b',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo link back */}
        <div 
          onClick={onNavigateHome}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <img 
            src="/brand-icon.png" 
            alt="肌動組" 
            style={{ height: '40px', width: 'auto', mixBlendMode: 'screen' }} 
          />
          <img 
            src="/brand-text.png" 
            alt="GYMspot" 
            style={{ height: '26px', width: 'auto', marginLeft: '6px', mixBlendMode: 'screen' }} 
          />
        </div>

        {/* Back to Map Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onNavigateHome}
            style={{
              background: '#b4ff04',
              color: '#0a1402',
              border: 'none',
              borderRadius: '12px',
              padding: '9px 18px',
              fontSize: '13px',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 16px rgba(180, 255, 4, 0.35)',
              transition: 'all 0.15s ease'
            }}
          >
            <ArrowLeft size={16} strokeWidth={3} />
            <span>返回地圖找場館</span>
          </button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section style={{
        padding: '70px 24px 60px',
        maxWidth: '1080px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Subtle Ambient Glow */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '450px',
          height: '250px',
          background: 'radial-gradient(ellipse at center, rgba(180, 255, 4, 0.15) 0%, rgba(7, 10, 16, 0) 70%)',
          filter: 'blur(40px)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(180, 255, 4, 0.08)',
            border: '1px solid rgba(180, 255, 4, 0.3)',
            borderRadius: '999px',
            padding: '6px 16px',
            fontSize: '12px',
            fontWeight: 800,
            color: '#b4ff04',
            marginBottom: '20px'
          }}>
            <Sparkles size={14} color="#b4ff04" />
            全台首創 · 自由健身教練專業場租媒合平台
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 54px)',
            fontWeight: 900,
            lineHeight: 1.2,
            margin: '0 0 20px',
            letterSpacing: '-0.5px',
            color: '#ffffff'
          }}>
            為自由教練而生的<br />
            <span style={{ 
              color: '#b4ff04', 
              textShadow: '0 0 25px rgba(180, 255, 4, 0.45)' 
            }}>
              健身場租新時代
            </span>
          </h1>

          <p style={{
            maxWidth: '680px',
            margin: '0 auto 36px',
            fontSize: '16px',
            lineHeight: 1.8,
            color: '#cbd5e1',
            fontWeight: 400
          }}>
            打破私訊問價的繁瑣、告別被抽成 20%~40% 的不公待遇。<br />
            肌動組 GYMspot 透過即時地圖與數位排程鎖位，讓優秀教練將 100% 收益留在手中，專注帶給學員最純粹的訓練成效。
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={onNavigateHome}
              style={{
                background: '#b4ff04',
                color: '#0a1402',
                border: 'none',
                borderRadius: '14px',
                padding: '14px 28px',
                fontSize: '15px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 0 24px rgba(180, 255, 4, 0.4)'
              }}
            >
              <MapPin size={18} />
              探索全台合作場館
            </button>

            <button
              onClick={onOpenRegister}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                border: '1px solid #243248',
                borderRadius: '14px',
                padding: '14px 28px',
                fontSize: '15px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ffffff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#243248'; }}
            >
              <Building2 size={18} />
              場館免費申請入駐
            </button>
          </div>
        </div>
      </section>

      {/* 3. The Problem & Solution (傳統痛點 vs 肌動組解法) */}
      <section style={{
        maxWidth: '1000px',
        margin: '0 auto 70px',
        padding: '0 24px'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#f8fafc', margin: '0 0 8px' }}>
            為什麼我們創立「肌動組 GYMspot」？
          </h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
            傳統體適能產業長期存在的兩大結構性失衡，我們用科技一次解決。
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {/* Pain Point 1 */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid #1e293b',
            borderRadius: '20px',
            padding: '24px'
          }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#f87171',
              padding: '4px 12px',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 800,
              marginBottom: '14px'
            }}>
              傳統自由教練痛點
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: '0 0 10px' }}>
              高額抽成與資訊不對稱
            </h3>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#94a3b8', margin: 0 }}>
              一般大型連鎖健身房私教課抽成高達 30%~50%，教練付出巨大勞力卻只能分潤少部分。轉做自由教練後，每次換學員就要逐一私訊各場館問場租、深蹲架台數與清潔費，撞課撞架更常引發尷尬糾紛。
            </p>
          </div>

          {/* Solution 1 */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(180, 255, 4, 0.08) 0%, rgba(13, 19, 31, 0.85) 100%)',
            border: '1.5px solid rgba(180, 255, 4, 0.4)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 0 30px rgba(180, 255, 4, 0.12)'
          }}>
            <div style={{
              display: 'inline-block',
              background: '#b4ff04',
              color: '#0a1402',
              padding: '4px 12px',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 900,
              marginBottom: '14px'
            }}>
              肌動組 GYMspot 的創新方案
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: '0 0 10px' }}>
              0 抽成 · 實價地圖 · 秒級排程鎖位
            </h3>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#e2e8f0', margin: 0 }}>
              我們不抽私教課一分錢！所有場館尖峰/離峰費率、深蹲架數量、草皮規格與淋浴配備一目瞭然。教練只要透過平台即可線上預約特定時段，系統自動鎖位保障專用深蹲架，教練、場館與學員三方皆贏。
            </p>
          </div>
        </div>
      </section>

      {/* 4. Three Core Pillars (三大核心承諾) */}
      <section style={{
        background: '#0c111a',
        borderTop: '1px solid #1e293b',
        borderBottom: '1px solid #1e293b',
        padding: '60px 24px'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff', margin: '0 0 8px' }}>
              肌動組的三大核心承諾
            </h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
              我們只做對自由健身生態真正有價值的事
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {/* Pillar 1 */}
            <div style={{
              background: '#080c14',
              border: '1px solid #1e293d',
              borderRadius: '18px',
              padding: '24px'
            }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: 'rgba(180, 255, 4, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#b4ff04',
                marginBottom: '16px'
              }}>
                <Dumbbell size={24} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', margin: '0 0 8px' }}>
                1. 課堂收益 100% 歸教練
              </h3>
              <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#94a3b8', margin: 0 }}>
                平台嚴格遵守「0 私教抽成」原則。教練與學員間的教學私約、定價與款項均由教練全額自主收取，平台僅作為便利的資訊與預約工具。
              </p>
            </div>

            {/* Pillar 2 */}
            <div style={{
              background: '#080c14',
              border: '1px solid #1e293d',
              borderRadius: '18px',
              padding: '24px'
            }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: 'rgba(180, 255, 4, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#b4ff04',
                marginBottom: '16px'
              }}>
                <MapPin size={24} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', margin: '0 0 8px' }}>
                2. 地圖實價與規格透明
              </h3>
              <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#94a3b8', margin: 0 }}>
                不只標出場租，連 Eleiko 賽事槓、專用雪橇草皮、深蹲架台數、學員清潔費減免等關鍵帶課條件一清二楚，不再花時間盲踩雷。
              </p>
            </div>

            {/* Pillar 3 */}
            <div style={{
              background: '#080c14',
              border: '1px solid #1e293d',
              borderRadius: '18px',
              padding: '24px'
            }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: 'rgba(180, 255, 4, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#b4ff04',
                marginBottom: '16px'
              }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', margin: '0 0 8px' }}>
                3. 合法立案與查核機制
              </h3>
              <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#94a3b8', margin: 0 }}>
                嚴格把關合作場館之營業登記、消防安檢與公共意外責任險，讓自由教練能驕傲地帶學員踏入每一個專業合格的訓練場域。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Brand Story (品牌故事) */}
      <section style={{
        maxWidth: '840px',
        margin: '0 auto',
        padding: '70px 24px'
      }}>
        <div style={{
          background: 'rgba(15, 23, 42, 0.45)',
          border: '1px solid #1e293b',
          borderRadius: '24px',
          padding: '36px 32px'
        }}>
          <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#ffffff', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={22} color="#b4ff04" /> 我們的故事：始於鐵槓，成於共享
          </h2>
          <div style={{ fontSize: '13.5px', lineHeight: 1.9, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p style={{ margin: 0 }}>
              「肌動組 GYMspot」由一群深耕體適能產業多年的自由教練與科技軟體工程師共同創辦。我們在健身房看過無數熱血有才華的教練，因為無法忍受傳統體系的業績高壓與層層抽成而走向自由授課；卻又常常在尋找合法、友善、不撞架的場租空間上耗盡心力。
            </p>
            <p style={{ margin: 0 }}>
              我們相信：<strong>「教練的專業價值，應該毫無保留地回饋在學員的身心蜕變上。」</strong>
            </p>
            <p style={{ margin: 0 }}>
              因此，我們打造了肌動組。透過最直觀的互動地圖、自動化預約排程與公平透明的評價生態，為全台優秀教練與用心經營的優質場館搭起最短的一座橋樑。
            </p>
          </div>
        </div>
      </section>

      {/* 6. Contact & Footer */}
      <footer style={{
        background: '#04060a',
        borderTop: '1px solid #1e293b',
        padding: '40px 24px'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/brand-icon.png" alt="肌動組" style={{ height: '32px', width: 'auto', mixBlendMode: 'screen' }} />
            <span style={{ fontSize: '15px', fontWeight: 900, color: '#ffffff' }}>肌動組 GYMspot</span>
          </div>

          <div style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            fontSize: '13px',
            color: '#94a3b8'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} color="#b4ff04" /> 客服信箱：contact@gymspot.tw
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MessageSquare size={14} color="#b4ff04" /> 官方 LINE 合作諮詢：@gymspot
            </span>
          </div>

          <div style={{
            display: 'flex',
            gap: '16px',
            fontSize: '12px',
            color: '#64748b'
          }}>
            <button
              onClick={onOpenTerms}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              服務條款與隱私權協議
            </button>
            <span>·</span>
            <span>© 2026 肌動組 GYMspot All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
